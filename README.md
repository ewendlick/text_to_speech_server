# Text to Speech Server

This is a server written in Node.js that accepts incoming POST requests and plays a text-to-speech version on the speakers __of the server__. 

This project was originally written to be used with a Raspberry Pi, but any Linux machine with speakers would work.

The server also serves a webpage that makes sending the POST requests quick and easy, and is akin to a soundboard.

# Setup
This setup process assumes that you are using Linux and have already installed Node.js 10 or greater

Install [mpg123](mpg123.org):
`sudo apt-get install mpg123`

Set up iptables to be accessible to the outside world:
`sudo iptables -A INPUT -p tcp --dport xxxx -j ACCEPT` where xxxx is the port number you wish to open up

Edit "index.html:5" to include the domain of the API. Examples below:
 - `const DOMAIN = 'localhost'`
 - `const DOMAIN = 'example.com'`
 - `const DOMAIN = '123.123.123.123'`
 - `const DOMAIN = '[2000:2000:2000:2000:2000:2000]'`

Install the NPM packages:

NPM: `npm install`

Yarn: `yarn install`

# Usage
Run the server:
`node index.js`

With the server running, you have two ways of using it; directly sending API requests or by accessing the served dashboard:

1) Sending direct requests (`curl -d "This is the text it will convert" -H "Content-Type: text/plain" -X POST http://localhost:3000`)

2) Accessing the dashboard ("index.html") in the browser with a GET request (i.e. http://localhost:3000)

# Additional reading regarding the dev process
All development was done on a Raspberry Pi 3 B+. The highest version of Node that I could easily install was version 10, which is what this project uses.

I tried using Hapi, which looks like and is something that I would consider using in the future, but it would not run with Node 10 as it uses Node 12 features related to private class fields.

I switched to Koa for this project simply because I wanted to use something that wasn't Express. Koa is okay. It really benefits from koa-router and koa-bodyparser.

From creating this I learned that despite having an IPv4 address provided by my ISP, the IPv4 address is likely having all incoming requests blocked. I was only able to have success running this from my home network by using IPv6, enabling DMZ on the router, not changing port forwarding, and leaving the packet filter at "high". It looks like the IPv6 address changes frequently but remains in a subnet, so adding firewall rules won't be a major issue.
