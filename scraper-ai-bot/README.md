# Scraper AI Bot

Professional hospital scraping package for Pakistan hospital websites.

## Project structure

- `requirements.txt` — Python dependencies.
- `README.md` — this file.
- `main.py` — FastAPI entrypoint for serving scraped hospital data.
- `scraper.py` — CLI entrypoint for scraping a hospital and saving results.
- `hospital_scraper/` — package code:
  - `__init__.py` — package exports.
  - `api.py` — FastAPI routes and API wiring.
  - `db.py` — SQLite persistence logic.
  - `models.py` — typed dataclasses for pages and hospitals.
  - `scraper.py` — scraping and crawling logic.

## Setup

From the `scraper-ai-bot` directory:

```bash
/usr/bin/python3 -m pip install --user -r requirements.txt
```

## Scrape a hospital

```bash
/usr/bin/python3 scraper.py --url "https://www.ghurkitrust.org.pk/?utm_source=chatgpt.com" --db hospital_data.db --pages 15
```

- `--url` is the seed hospital website.
- `--db` is the SQLite file that stores scraped hospitals.
- `--pages` controls how many pages to crawl.

## Run the API server

```bash
/usr/bin/python3 -m uvicorn main:app --host 127.0.0.1 --port 8001
```

Then use Postman or browser:

- `http://127.0.0.1:8001/health`
- `http://127.0.0.1:8001/hospitals`
- `http://127.0.0.1:8001/hospitals/1`

## Recommended future extension

This structure is ready for:

- multiple hospital sources
- richer hospital schemas
- vector indexing / RAG models
- additional persistence layers beyond SQLite
- separate crawler worker and API service
