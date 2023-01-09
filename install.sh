google-chrome 'https://www.lfd.uci.edu/~gohlke/pythonlibs/#lxml' # windows only : grab compiled lxml here
/usr/bin/python3 -m pip install -r requirements.txt
/home/focus/.local/pipx/venvs/mitmproxy/bin/python -m pip install -r requirements.txt

python -m pip install --user pipx
python -m pipx install mitmproxy

cd ~/.mitmproxy
certutil -addstore root mitmproxy-ca-cert.cer

cd ___project
mitmproxy --scripts main.py --listen-host 0.0.0.0 --listen-port 51080 # prod
python3 run.py # dev
