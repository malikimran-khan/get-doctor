from argparse import ArgumentParser

from hospital_scraper.db import initialize_database, save_hospital_data
from hospital_scraper.scraper import DEFAULT_SEED_URL, scrape_hospital


def main() -> None:
    parser = ArgumentParser(description="Hospital scraper CLI")
    parser.add_argument("--url", default=DEFAULT_SEED_URL, help="Seed hospital URL to scrape")
    parser.add_argument("--db", default="hospital_data.db", help="SQLite database path")
    parser.add_argument("--pages", type=int, default=12, help="Maximum pages to crawl")
    args = parser.parse_args()

    initialize_database(args.db)
    hospital_data = scrape_hospital(args.url, max_pages=args.pages)
    save_hospital_data(args.db, hospital_data.__dict__)

    print(f"Scraped {hospital_data.page_count} pages for {hospital_data.seed_url}")
    print(f"Saved hospital data to {args.db}")
    print(hospital_data)


if __name__ == "__main__":
    main()
