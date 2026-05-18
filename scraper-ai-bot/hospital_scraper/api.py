from typing import Any, Dict, List, Optional

from fastapi import FastAPI, HTTPException

from .db import get_hospital_by_id, get_hospital_list

app = FastAPI(title="Hospital Scraper API", version="0.1.0")


@app.get("/health")
def health() -> Dict[str, str]:
    return {"status": "ok"}


@app.get("/hospitals")
def list_hospitals(db: Optional[str] = None) -> List[Dict[str, Any]]:
    db_path = db or "hospital_data.db"
    try:
        return get_hospital_list(db_path)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))


@app.get("/hospitals/{hospital_id}")
def get_hospital(hospital_id: int, db: Optional[str] = None) -> Dict[str, Any]:
    db_path = db or "hospital_data.db"
    hospital = get_hospital_by_id(hospital_id, db_path)
    if hospital is None:
        raise HTTPException(status_code=404, detail="Hospital not found")
    return hospital
