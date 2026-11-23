"""
ANAS Mechanical Design Portfolio - Python Backend
Supports FastAPI (or built-in http.server fallback) for inquiries, CAD processing, and dynamic server logic.
"""

import json
import os
from datetime import datetime
from http.server import HTTPServer, BaseHTTPRequestHandler

PORT = 8000
DATA_DIR = os.path.join(os.path.dirname(__file__), "..", "data")
INQUIRIES_FILE = os.path.join(DATA_DIR, "inquiries.json")

os.makedirs(DATA_DIR, exist_ok=True)

class PortfolioBackendHandler(BaseHTTPRequestHandler):
    def _set_cors_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")

    def do_OPTIONS(self):
        self.send_response(200)
        self._set_cors_headers()
        self.end_headers()

    def do_GET(self):
        if self.path == "/api/health":
            self.send_response(200)
            self._set_cors_headers()
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            response = {"status": "ok", "service": "ANAS Portfolio Python Backend"}
            self.wfile.write(json.dumps(response).encode("utf-8"))
            return

        if self.path == "/api/inquiries":
            self.send_response(200)
            self._set_cors_headers()
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            inquiries = []
            if os.path.exists(INQUIRIES_FILE):
                try:
                    with open(INQUIRIES_FILE, "r", encoding="utf-8") as f:
                        inquiries = json.load(f)
                except Exception:
                    inquiries = []
            self.wfile.write(json.dumps(inquiries).encode("utf-8"))
            return

        self.send_response(404)
        self.end_headers()

    def do_POST(self):
        if self.path == "/api/contact":
            content_length = int(self.headers.get("Content-Length", 0))
            post_data = self.rfile.read(content_length)
            try:
                data = json.loads(post_data.decode("utf-8"))
                data["received_at"] = datetime.utcnow().isoformat() + "Z"
                
                inquiries = []
                if os.path.exists(INQUIRIES_FILE):
                    try:
                        with open(INQUIRIES_FILE, "r", encoding="utf-8") as f:
                            inquiries = json.load(f)
                    except Exception:
                        inquiries = []
                inquiries.append(data)
                with open(INQUIRIES_FILE, "w", encoding="utf-8") as f:
                    json.dump(inquiries, f, indent=2)

                self.send_response(200)
                self._set_cors_headers()
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                response = {"success": True, "message": "Inquiry recorded by Python backend"}
                self.wfile.write(json.dumps(response).encode("utf-8"))
            except Exception as e:
                self.send_response(500)
                self._set_cors_headers()
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                response = {"error": str(e)}
                self.wfile.write(json.dumps(response).encode("utf-8"))
            return

        self.send_response(404)
        self.end_headers()

def run(server_class=HTTPServer, handler_class=PortfolioBackendHandler, port=PORT):
    server_address = ("", port)
    httpd = server_class(server_address, handler_class)
    print(f"ANAS Portfolio Python Backend listening on http://127.0.0.1:{port}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    httpd.server_close()

if __name__ == "__main__":
    run()
