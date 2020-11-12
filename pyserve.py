#!/usr/bin/env python3

import http.server
import socketserver

PORT = 8080

Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print("serving at port", PORT)
    httpd.serve_forever()

# https://docs.python.org/3/library/http.server.html
# python3 -m http.server 8080
# python3 -m http.server 8000 --bind 127.0.0.1
