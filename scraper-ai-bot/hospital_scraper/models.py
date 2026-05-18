from dataclasses import dataclass, field
from datetime import datetime
from typing import List, Optional


@dataclass
class PageData:
    url: str
    title: Optional[str] = None
    description: Optional[str] = None
    keywords: Optional[str] = None
    canonical: Optional[str] = None
    phones: Optional[List[str]] = field(default_factory=list)
    emails: Optional[List[str]] = field(default_factory=list)
    addresses: Optional[List[str]] = field(default_factory=list)
    services: Optional[List[str]] = field(default_factory=list)
    departments: Optional[List[str]] = field(default_factory=list)
    links: Optional[List[str]] = field(default_factory=list)


@dataclass
class HospitalData:
    seed_url: str
    scraped_at: str
    page_count: int
    pages: List[PageData]
    name: Optional[str] = None
    description: Optional[str] = None
    canonical: Optional[str] = None
    phones: Optional[List[str]] = field(default_factory=list)
    emails: Optional[List[str]] = field(default_factory=list)
    addresses: Optional[List[str]] = field(default_factory=list)
    services: Optional[List[str]] = field(default_factory=list)
    departments: Optional[List[str]] = field(default_factory=list)
