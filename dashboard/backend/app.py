from flask import Flask, request, jsonify
from osdr_download_publications import fetch_page, normalize_record

app = Flask(__name__)

@app.route("/search", methods=["GET"])
def search_publications():
    term = request.args.get("q", "")
    data = fetch_page(term=term, from_idx=0, size=5)  # solo traemos los 5 primeros
    hits = []

    if isinstance(data, dict):
        hits = data.get("results") or data.get("hits") or data.get("data") or []
    elif isinstance(data, list):
        hits = data

    results = [normalize_record(rec) for rec in hits]

    # Ahora resumimos de forma simple (puedes conectar GPT u otro modelo luego)
    summaries = []
    for r in results:
        summaries.append({
            "title": r["title"],
            "year": r["year"],
            "summary": (
                f"🔬 {r['title']} ({r['year']})\n\n"
                f"{r['abstract'][:300]}..."
                f"\n👉 Más detalles: {r['link']}"
            )
        })

    return jsonify(summaries)

if __name__ == "__main__":
    app.run(debug=True, port=5000)
