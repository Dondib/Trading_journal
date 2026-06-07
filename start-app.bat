@echo off
cd /d "%~dp0"
echo Starting CORTEXA_VORA at http://127.0.0.1:4173/index.html
python -m http.server 4173 --bind 127.0.0.1
