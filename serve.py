#!/usr/bin/env python3
import http.server, os, sys, json, psycopg2, psycopg2.extras
from urllib.parse import urlparse, parse_qs

ROOT = os.path.join(os.path.dirname(__file__), "dist/public")
DB_URL = "postgresql://boostdb_8mqz_user:ELYNYSU4KtYI9P1LlKnHJyYbJ6m69AX6@dpg-d63p8spr0fns73bqeg6g-a.virginia-postgres.render.com:5432/boostdb_8mqz?sslmode=require"

def get_db():
    return psycopg2.connect(DB_URL, cursor_factory=psycopg2.extras.RealDictCursor)

def camel(row):
    """Convert snake_case DB row to camelCase dict"""
    out = {}
    for k, v in row.items():
        parts = k.split('_')
        out[parts[0] + ''.join(p.capitalize() for p in parts[1:])] = v
    return out

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def send_json(self, data, status=200):
        body = json.dumps(data, default=str).encode()
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Content-Length', len(body))
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path

        try:
            # API routes
            if path == '/api/creators/featured':
                with get_db() as conn:
                    with conn.cursor() as cur:
                        cur.execute("SELECT * FROM creators LIMIT 6")
                        rows = [camel(r) for r in cur.fetchall()]
                return self.send_json(rows)

            if path == '/api/creators':
                qs = parse_qs(parsed.query)
                category = qs.get('category', [None])[0]
                with get_db() as conn:
                    with conn.cursor() as cur:
                        if category:
                            cur.execute("SELECT * FROM creators WHERE category = %s ORDER BY patron_count DESC", (category,))
                        else:
                            cur.execute("SELECT * FROM creators ORDER BY patron_count DESC")
                        rows = [camel(r) for r in cur.fetchall()]
                return self.send_json(rows)

            if path.startswith('/api/creators/') and '/products' in path:
                slug = path.split('/api/creators/')[1].replace('/products', '')
                with get_db() as conn:
                    with conn.cursor() as cur:
                        cur.execute("SELECT c.id FROM creators c WHERE c.slug = %s", (slug,))
                        creator = cur.fetchone()
                        if creator:
                            cur.execute("SELECT * FROM products WHERE creator_id = %s ORDER BY created_at DESC", (creator['id'],))
                            rows = [camel(r) for r in cur.fetchall()]
                        else:
                            rows = []
                return self.send_json(rows)

            if path.startswith('/api/creators/'):
                slug = path.split('/api/creators/')[1]
                with get_db() as conn:
                    with conn.cursor() as cur:
                        cur.execute("SELECT * FROM creators WHERE slug = %s", (slug,))
                        row = cur.fetchone()
                        if row:
                            return self.send_json(camel(row))
                        else:
                            return self.send_json({'error': 'Not found'}, 404)

            if path.startswith('/api/'):
                return self.send_json({'error': 'Not found'}, 404)

        except Exception as e:
            print(f"API error: {e}")
            return self.send_json({'error': str(e)}, 500)

        # Static file serving with SPA fallback
        full = os.path.join(ROOT, path.lstrip('/'))
        if os.path.isfile(full):
            return super().do_GET()

        # SPA fallback - serve index.html
        self.path = '/index.html'
        return super().do_GET()

    def log_message(self, format, *args):
        print(f"[{args[0]}] {args[1]}")

port = int(sys.argv[1]) if len(sys.argv) > 1 else 8080
print(f"Starting SwordPay server on http://127.0.0.1:{port}")
server = http.server.HTTPServer(("127.0.0.1", port), Handler)
server.serve_forever()
