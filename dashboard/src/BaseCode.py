# guardar como osdr_download_publications.py
import requests
import csv
import time
import os
import openai

# HOLA MUNDO

os.getenv("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")

BASE = "https://osdr.nasa.gov/osdr/data/search"

def fetch_page(term="", from_idx=0, size=50):
    params = {
        "term": term,
        "from": from_idx,
        "size": size
    }
    r = requests.get(BASE, params=params, timeout=30)
    r.raise_for_status()
    return r.json()

def normalize_record(rec):
    # intentar extraer los campos más útiles; dependerá del JSON que devuelva la API
    # rec puede tener keys como 'title', 'description', 'authors', 'accession', 'publicationDate', etc.
    # adaptad según lo que imprimáis en la fase de exploración.
    title = rec.get("title") or rec.get("studyTitle") or rec.get("projectTitle") or ""
    abstract = rec.get("description") or rec.get("abstract") or rec.get("summary") or ""
    accession = rec.get("accession") or rec.get("Accession") or rec.get("OSDAccession") or rec.get("id") or ""
    authors = ""
    # algunos registros tienen 'authors' o 'contributors' como lista
    if rec.get("authors"):
        if isinstance(rec["authors"], list):
            authors = "; ".join([a.get("name", str(a)) if isinstance(a, dict) else str(a) for a in rec["authors"]])
        else:
            authors = str(rec["authors"])
    elif rec.get("contributors"):
        if isinstance(rec["contributors"], list):
            authors = "; ".join([c.get("name", str(c)) if isinstance(c, dict) else str(c) for c in rec["contributors"]])
        else:
            authors = str(rec["contributors"])
    year = rec.get("publicationDate") or rec.get("year") or rec.get("submissionDate") or ""
    # enlaces útiles: doi, url, remote_url, links
    link = rec.get("url") or rec.get("link") or rec.get("remote_url") or ""
    return {
        "accession": accession,
        "title": title,
        "abstract": abstract,
        "authors": authors,
        "year": year,
        "link": link,
        "raw": rec  # guardamos el JSON crudo por si luego queréis inspeccionar
    }

def main(output_csv="publicaciones_nasa.csv", term="", max_pages=None):
    size = 50   # número por página (podéis ajustar)
    from_idx = 0
    all_rows = []
    page = 0

    while True:
        print(f"Fetching from={from_idx} size={size} ... (page {page})")
        data = fetch_page(term=term, from_idx=from_idx, size=size)
        # Estructura esperada: puede variar; buscar listas en keys claves
        # Explotamos los lugares probables
        hits = []
        # distintos formatos posibles según la API: 'hits', 'results', 'studies', 'data'
        if isinstance(data, dict):
            if "results" in data and isinstance(data["results"], list):
                hits = data["results"]
            elif "hits" in data and isinstance(data["hits"], list):
                hits = data["hits"]
            elif "studies" in data:
                # studies puede ser dict de OSD-xxx -> convertir a lista
                if isinstance(data["studies"], dict):
                    for k, v in data["studies"].items():
                        # intentar extraer 'title' y demás
                        v_copy = v.copy()
                        v_copy["accession"] = k
                        hits.append(v_copy)
                elif isinstance(data["studies"], list):
                    hits = data["studies"]
            elif "data" in data and isinstance(data["data"], list):
                hits = data["data"]
            else:
                # fallback: buscar la primera lista dentro del dict
                for v in data.values():
                    if isinstance(v, list):
                        hits = v
                        break
        elif isinstance(data, list):
            hits = data

        if not hits:
            print("No more hits found (or API returned unexpected structure).")
            break

        for rec in hits:
            norm = normalize_record(rec)
            all_rows.append(norm)

        # Control de paginación: la API usa 'from' como offset
        from_idx += size
        page += 1
        # stop condition opcional
        if max_pages is not None and page >= max_pages:
            break

        # Cortesía: no bombardear la API
        time.sleep(0.5)

    # Guardar CSV (sin la columna 'raw' en CSV, pero dejamos JSON crudo en un archivo aparte)
    csv_fields = ["accession", "title", "abstract", "authors", "year", "link"]
    with open(output_csv, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=csv_fields)
        writer.writeheader()
        for r in all_rows:
            writer.writerow({k: (r.get(k) or "") for k in csv_fields})

    # guardar JSON crudo completo por si necesitáis metadatos extra
    import json
    with open(output_csv.replace(".csv", "_raw.json"), "w", encoding="utf-8") as f:
        json.dump([r["raw"] for r in all_rows], f, ensure_ascii=False, indent=2)

    print(f"Guardadas {len(all_rows)} entradas en {output_csv} y raw en {output_csv.replace('.csv','_raw.json')}")

if __name__ == "__main__":
    # Ejemplo: buscar todo (vacío) o poner un término específico como "plants" o "microgravity"
    main(output_csv="publicaciones_nasa.csv", term="", max_pages=None)


