choco install visualstudio2022buildtools
python -m pip install -r /path/to/requirements.txt

python -m pip install --user pipx
python -m pipx install mitmproxy

cd ~/.mitmproxy
certutil -addstore root mitmproxy-ca-cert.cer

curl https://raw.githubusercontent.com/StevenBlack/hosts/master/alternates/fakenews-gambling-porn-social/hosts > hosts.txt

cd ___project
mitmproxy --scripts main.py --listen-host 0.0.0.0 --listen-port 15080
