import os
import mysql.connector
from urllib.request import urlopen
from dotenv import load_dotenv

load_dotenv()  # take environment variables from .env.

con = mysql.connector.connect(
    host = os.getenv('HOST'),
    user = os.getenv('USER'),
    password = os.getenv('PASSWORD'),
    database = os.getenv('DATABASE'),
)

cur = con.cursor()
hosts=[]

### StevenBlack #######################
url = "https://raw.githubusercontent.com/StevenBlack/hosts/master/hosts"
file = urlopen(url)
content = file.read().decode()
lines = content.splitlines()

for line in lines:
    if not line.startswith("0.0.0.0 "): continue
    line_segments = line.split(" ")
    if line_segments[1] == "0.0.0.0": continue
    hosts.append(line_segments[1])
    
### notrack ###########################
url = "https://gitlab.com/quidsup/notrack-blocklists/raw/master/notrack-blocklist.txt"
file = urlopen(url)
content = file.read().decode()
lines = content.splitlines()

for line in lines:
    if line.startswith("#"): continue
    if line == "": continue
    line_segments = line.split(" #")
    hosts.append(line_segments[0])

### notrack 2 #########################
url = "https://gitlab.com/quidsup/notrack-blocklists/raw/master/notrack-malware.txt"
file = urlopen(url)
content = file.read().decode()
lines = content.splitlines()

for line in lines:
    if line.startswith("#"): continue
    if line == "": continue
    line_segments = line.split(" #")
    hosts.append(line_segments[0])

### AdAway ############################
url = "https://raw.githubusercontent.com/AdAway/adaway.github.io/master/hosts.txt"
file = urlopen(url)
content = file.read().decode()
lines = content.splitlines()

for line in lines:
    if not line.startswith("127.0.0.1 "): continue
    line_segments = line.split(" ")
    hosts.append(line_segments[1])

hosts = list(set(hosts))
hosts = list(filter(lambda l: l!="", hosts))

sql = "INSERT IGNORE INTO hosts_blacklist (host) VALUES (%s)"
for host in hosts: 
    cur.execute(sql, [host])
con.commit()
print(con)
