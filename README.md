
# Setup

Install [mpg123](mpg123.org)

`sudo apt-get install mpg123`

### Sample CURL payload
`curl -d "This is the text it will convert" -H "Content-Type: text/plain" -X POST http://localhost:3000

All development was done on a Raspberry Pi, which comes with its own set of limitations and issues. The highest version of Node that I (easily) got onto here was version 10.
I tried using Hapi, which looks like and is something that I would consider using in the future, but it uses Node 12 features related to private class fields.
I switched to Koa simply because I wanted to use something that wasn't Express. Koa is... okay. It really benefits from koa-router and koa-bodyparser.

## Set up iptables to be accessible to the outside world
`sudo iptables -A INPUT -p tcp --dport xxxx -j ACCEPT` where xxxx is the port number you wish to open up

I am not having luck with this. Information is not set to persist (which isn't an issue yet) but opening ports doesn't seem to work despite opening ping working.wiki.debian.org/iptables

It looks like incoming traffic via ipv4 on Softbank just doesn't want to work right.
Is Softbank blocking it? (highly likely)

I was able to access NGINX via [2400:2411:18c3:6000:25dc:80de:c69:abe7]:31234 (http)
I got an ERR_SOCKET_NOT_CONNECTED for 31235 (https)

I enabled DMZ on the router, port forwarding wasn't required, packet filter was left at "high"
