import argparse
import time
from dataclasses import asdict
from typing import List, Optional

from hospital_scraper.db import initialize_database, save_hospital_data
from hospital_scraper.scraper import scrape_hospital

DEFAULT_SEEDS = [
    "https://shaukatkhanum.org.pk/",
    "https://www.mayohospital.gop.pk/",
]


def load_seeds(seed_file: Optional[str]) -> List[str]:
    if not seed_file:
        return DEFAULT_SEEDS

    with open(seed_file, "r", encoding="utf-8") as handle:
        seeds = [
            line.strip()
            for line in handle
            if line.strip() and not line.strip().startswith("#")
        ]
    return seeds or DEFAULT_SEEDS


def run_bulk_scrape(seeds: List[str], db_path: str, pages: int, delay: int) -> None:
    initialize_database(db_path)

    for index, seed_url in enumerate(seeds, start=1):
        print(f"[{index}/{len(seeds)}] Scraping {seed_url}")
        try:
            hospital_data = scrape_hospital(seed_url, max_pages=pages)
            save_hospital_data(db_path, asdict(hospital_data))
            print(f"  saved: {seed_url}")
        except Exception as exc:
            print(f"  failed: {seed_url} ({exc})")

        if index < len(seeds):
            time.sleep(delay)


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Bulk scrape a couple of Lahore hospital websites."
    )
    parser.add_argument("--db", default="hospital_data.db", help="SQLite database file")
    parser.add_argument(
        "--pages",
        type=int,
        default=8,
        help="Maximum pages to crawl per site",
    )
    parser.add_argument(
        "--delay",
        type=int,
        default=5,
        help="Seconds to wait between each hospital scrape",
    )
    parser.add_argument(
        "--seeds",
        help="Optional path to a newline-separated seed URL file",
    )
    args = parser.parse_args()

    seeds = load_seeds(args.seeds)
    run_bulk_scrape(seeds, args.db, args.pages, args.delay)


if __name__ == "__main__":
    main()
