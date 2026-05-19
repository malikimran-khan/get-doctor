import json
import re
import urllib.parse
from dataclasses import asdict
from datetime import datetime
from typing import Dict, List, Optional, Set

import requests
from bs4 import BeautifulSoup

from .models import HospitalData, PageData

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0 Safari/537.36"
    )
}

DEFAULT_SEED_URL = "https://www.ghurkitrust.org.pk/?utm_source=chatgpt.com"
KNOWN_ENDPOINTS = ["/contact-us", "/contactus", "/about-us", "/all-doctors"]


class ScraperError(Exception):
    pass


def fetch_html(url: str) -> str:
    response = requests.get(url, headers=HEADERS, timeout=20)
    response.raise_for_status()
    return response.text


def normalize_text(value: Optional[str]) -> Optional[str]:
    if not value:
        return None
    text = " ".join(value.split())
    return text.strip() or None


def extract_meta(soup: BeautifulSoup) -> Dict[str, Optional[str]]:
    data = {
        "title": None,
        "description": None,
        "canonical": None,
        "keywords": None,
    }
    if soup.title and soup.title.string:
        data["title"] = normalize_text(soup.title.string)

    description_tag = soup.find("meta", attrs={"name": "description"})
    if description_tag and description_tag.get("content"):
        data["description"] = normalize_text(description_tag["content"])

    keywords_tag = soup.find("meta", attrs={"name": "keywords"})
    if keywords_tag and keywords_tag.get("content"):
        data["keywords"] = normalize_text(keywords_tag["content"])

    canonical_tag = soup.find("link", attrs={"rel": "canonical"})
    if canonical_tag and canonical_tag.get("href"):
        data["canonical"] = normalize_text(canonical_tag["href"])

    return data


def extract_contact_data(soup: BeautifulSoup, html: str) -> Dict[str, Optional[List[str]]]:
    phones: List[str] = []
    emails: List[str] = []
    addresses: List[str] = []

    for link in soup.select("a[href^='tel:']"):
        phone = link["href"].replace("tel:", "").strip()
        if phone:
            phones.append(phone)

    for link in soup.select("a[href^='mailto:']"):
        email = link["href"].replace("mailto:", "").strip()
        if email:
            emails.append(email)

    for icon in soup.select("i.fas.fa-location-dot, i.fas.fa-map-marker-alt, i.fas.fa-map-marker"):
        container = icon.parent
        if container:
            text = normalize_text(container.get_text(separator=" ", strip=True))
            if text:
                addresses.append(text)

    if not addresses:
        address_match = re.search(r"GT RD[^<\n]{10,200}", html, flags=re.I)
        if address_match:
            addresses.append(normalize_text(address_match.group(0)))

    return {
        "phones": sorted(set(phones)) if phones else None,
        "emails": sorted(set(emails)) if emails else None,
        "addresses": sorted(set(addresses)) if addresses else None,
    }


def extract_listed_items(soup: BeautifulSoup, prefix: str) -> List[str]:
    values: Set[str] = set()
    selector = f"a[href*='{prefix}']"
    for link in soup.select(selector):
        heading = None
        for tag_name in ["h1", "h2", "h3", "h4", "h5", "h6"]:
            heading_tag = link.find(tag_name)
            if heading_tag and heading_tag.get_text(strip=True):
                heading = normalize_text(heading_tag.get_text(separator=" ", strip=True))
                break

        if heading:
            values.add(heading)
            continue

        text = normalize_text(link.get_text(separator=" ", strip=True))
        if text:
            values.add(text)
            continue

        path = urllib.parse.urlparse(link["href"]).path
        values.add(path.strip("/"))
    return sorted(values)


def get_root_name(hostname: str) -> str:
    parts = hostname.lower().split(".")
    if len(parts) >= 3:
        return parts[-3]
    return parts[0]


def is_same_site(link: str, seed_root_name: str) -> bool:
    parsed = urllib.parse.urlparse(link)
    hostname = parsed.hostname or ""
    return seed_root_name in hostname.lower()


def get_seed_url_variants(seed_url: str) -> List[str]:
    parsed = urllib.parse.urlparse(seed_url)
    hostname = parsed.hostname
    if not hostname:
        return [seed_url]

    variants = [seed_url]
    alternate_hostname = (
        hostname.removeprefix("www.")
        if hostname.startswith("www.")
        else f"www.{hostname}"
    )
    alternate = parsed._replace(netloc=alternate_hostname).geturl()
    if alternate not in variants:
        variants.append(alternate)
    return variants


def extract_internal_links(soup: BeautifulSoup, base_url: str, seed_root_name: str) -> List[str]:
    links: Set[str] = set()
    for anchor in soup.find_all("a", href=True):
        href = anchor["href"].strip()
        if href.startswith("#") or href.lower().startswith("javascript:"):
            continue
        full = urllib.parse.urljoin(base_url, href)
        if is_same_site(full, seed_root_name):
            cleaned = urllib.parse.urldefrag(full).url
            links.add(cleaned)
    return sorted(links)


def scrape_page(url: str, seed_root_name: str) -> PageData:
    html = fetch_html(url)
    soup = BeautifulSoup(html, "html.parser")
    meta = extract_meta(soup)
    contact = extract_contact_data(soup, html)
    services = extract_listed_items(soup, "/service/")
    departments = extract_listed_items(soup, "/department/")

    return PageData(
        url=url,
        title=meta["title"],
        description=meta["description"],
        keywords=meta["keywords"],
        canonical=meta["canonical"],
        phones=contact["phones"],
        emails=contact["emails"],
        addresses=contact["addresses"],
        services=services or None,
        departments=departments or None,
        links=extract_internal_links(soup, url, seed_root_name),
    )


def merge_lists(*lists: Optional[List[str]]) -> Optional[List[str]]:
    merged: List[str] = []
    for value in lists:
        if value:
            for item in value:
                if item not in merged:
                    merged.append(item)
    return merged or None


def scrape_hospital(seed_url: str, max_pages: int = 12) -> HospitalData:
    parsed_seed = urllib.parse.urlparse(seed_url)
    seed_root_name = get_root_name(parsed_seed.hostname or "")
    seed_variants = get_seed_url_variants(seed_url)
    pages_to_visit: List[str] = seed_variants.copy()
    for root_url in seed_variants:
        pages_to_visit.extend(urllib.parse.urljoin(root_url, endpoint) for endpoint in KNOWN_ENDPOINTS)
    visited: Set[str] = set()
    collected: List[PageData] = []
    failed_pages: List[str] = []

    while pages_to_visit and len(collected) < max_pages:
        url = pages_to_visit.pop(0)
        if url in visited:
            continue
        visited.add(url)

        try:
            page_data = scrape_page(url, seed_root_name)
        except Exception as exc:
            failed_pages.append(f"{url}: {exc}")
            continue

        collected.append(page_data)

        for link in page_data.links or []:
            if link not in visited and link not in pages_to_visit:
                pages_to_visit.append(link)

    if not collected:
        details = "; ".join(failed_pages[:3]) or "no pages were available"
        if len(failed_pages) > 3:
            details = f"{details}; plus {len(failed_pages) - 3} more"
        raise ScraperError(f"ERROR scraping {seed_url}: {details}")

    summary = HospitalData(
        seed_url=seed_url,
        scraped_at=datetime.utcnow().isoformat() + "Z",
        page_count=len(collected),
        pages=collected,
        name=None,
        description=None,
        canonical=None,
        phones=None,
        emails=None,
        addresses=None,
        services=None,
        departments=None,
    )

    for page in collected:
        if not summary.name and page.title:
            summary.name = page.title
        if not summary.description and page.description:
            summary.description = page.description
        if not summary.canonical and page.canonical:
            summary.canonical = page.canonical

    summary.phones = merge_lists(*(page.phones for page in collected))
    summary.emails = merge_lists(*(page.emails for page in collected))
    summary.addresses = merge_lists(*(page.addresses for page in collected))
    summary.services = merge_lists(*(page.services for page in collected))
    summary.departments = merge_lists(*(page.departments for page in collected))

    return summary
