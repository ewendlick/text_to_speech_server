
# Setup

Install [mpg123](mpg123.org)

`sudo apt-get install mpg123`

### Sample CURL payload
`curl -d "This is the text it will convert" -H "Content-Type: text/plain" -X POST http://localhost:3000

All development was done on a Raspberry Pi, which comes with its own set of limitations and issues. The highest version of Node that I (easily) got onto here was version 10.
I tried using Hapi, which looks like and is something that I would consider using in the future, but it uses Node 12 features related to private class fields.
I switched to Koa simply because I wanted to use something that wasn't Express. Koa is... okay. It really benefits from koa-router and koa-bodyparser.
