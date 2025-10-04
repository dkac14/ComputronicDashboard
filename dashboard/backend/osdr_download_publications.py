# 📄 osdr_download_publications.py

import requests
from bs4 import BeautifulSoup

def fetch_page(url: str) -> str:
    """
    Descarga el contenido HTML de una página web.
    Retorna el HTML como string.
    """
    print(f"Descargando página: {url}")
    response = requests.get(url)
    response.raise_for_status()
    return response.text

def normalize_record(record: dict) -> dict:
    """
    Limpia y normaliza un diccionario de datos (por ejemplo, publicaciones).
    - Elimina espacios innecesarios
    - Capitaliza strings
    """
    normalized = {}
    for key, value in record.items():
        if isinstance(value, str):
            normalized[key] = value.strip().title()
        else:
            normalized[key] = value
    return normalized
