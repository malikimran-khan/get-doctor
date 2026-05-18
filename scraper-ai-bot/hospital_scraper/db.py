import json
import sqlite3
from dataclasses import asdict
from typing import Any, Dict, List, Optional, Sequence, Union

CREATE_HOSPITAL_TABLE_SQL = (
    "CREATE TABLE IF NOT EXISTS hospitals ("
    "id INTEGER PRIMARY KEY AUTOINCREMENT, "
    "seed_url TEXT UNIQUE, "
    "name TEXT, "
    "description TEXT, "
    "canonical TEXT, "
    "phones TEXT, "
    "emails TEXT, "
    "addresses TEXT, "
    "services TEXT, "
    "departments TEXT, "
    "page_count INTEGER, "
    "scraped_at TEXT, "
    "raw_json TEXT"
    ")"
)


def connect_db(db_path: str = "hospital_data.db") -> sqlite3.Connection:
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    conn.execute(CREATE_HOSPITAL_TABLE_SQL)
    return conn


def initialize_database(db_path: str = "hospital_data.db") -> None:
    conn = connect_db(db_path)
    conn.commit()
    conn.close()


def _serialize_value(value: Optional[Union[Sequence[Any], Any]]) -> Any:
    if value is None:
        return None
    if isinstance(value, str):
        return value
    if isinstance(value, dict):
        return value
    if isinstance(value, Sequence):
        return [asdict(item) if hasattr(item, "__dataclass_fields__") else item for item in value]
    return value


def save_hospital_data(db_path: str, hospital_data: Dict[str, Any]) -> None:
    conn = connect_db(db_path)
    serialized = {
        "phones": _serialize_value(hospital_data.get("phones")),
        "emails": _serialize_value(hospital_data.get("emails")),
        "addresses": _serialize_value(hospital_data.get("addresses")),
        "services": _serialize_value(hospital_data.get("services")),
        "departments": _serialize_value(hospital_data.get("departments")),
        "pages": _serialize_value(hospital_data.get("pages")),
    }
    conn.execute(
        "INSERT OR REPLACE INTO hospitals (seed_url, name, description, canonical, phones, emails, addresses, services, departments, page_count, scraped_at, raw_json) "
        "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        (
            hospital_data["seed_url"],
            hospital_data.get("name"),
            hospital_data.get("description"),
            hospital_data.get("canonical"),
            json.dumps(serialized["phones"], ensure_ascii=False),
            json.dumps(serialized["emails"], ensure_ascii=False),
            json.dumps(serialized["addresses"], ensure_ascii=False),
            json.dumps(serialized["services"], ensure_ascii=False),
            json.dumps(serialized["departments"], ensure_ascii=False),
            hospital_data.get("page_count"),
            hospital_data.get("scraped_at"),
            json.dumps(serialized, ensure_ascii=False),
        ),
    )
    conn.commit()
    conn.close()


def _parse_json_column(value: Optional[str]) -> Any:
    if not value:
        return None
    try:
        return json.loads(value)
    except json.JSONDecodeError:
        return value


def get_hospital_list(db_path: str = "hospital_data.db") -> List[Dict[str, Any]]:
    conn = connect_db(db_path)
    cur = conn.execute(
        "SELECT id, seed_url, name, description, page_count, scraped_at FROM hospitals ORDER BY id DESC"
    )
    rows = [dict(row) for row in cur.fetchall()]
    conn.close()
    return rows


def get_hospital_by_id(hospital_id: int, db_path: str = "hospital_data.db") -> Optional[Dict[str, Any]]:
    conn = connect_db(db_path)
    cur = conn.execute("SELECT * FROM hospitals WHERE id = ?", (hospital_id,))
    row = cur.fetchone()
    conn.close()
    if not row:
        return None

    data = dict(row)
    for key in ("phones", "emails", "addresses", "services", "departments", "raw_json"):
        data[key] = _parse_json_column(data.get(key))
    return data
