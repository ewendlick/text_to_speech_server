console.log('Starting webserver...')
const Koa = require('koa')
const Router = require('koa-router')
const BodyParser = require('koa-bodyparser')
const serve = require('koa-static')
const cors = require('@koa/cors')
const gTTS = require('gtts')
const player = require('play-sound')(opts = {})
	
const PORT = 3000
const webserver = new Koa()
const router = new Router()
const bodyParserOptions = BodyParser({
	enableTypes: ['text']
})

webserver
  .use(bodyParserOptions)
  .use(cors())

// TODO: Break into another file and import
const generateText = (text) => {
	const gtts = new gTTS(text, 'en')

	gtts.save(`audio_output/generated.mp3`, (error, result) => {
		if (error) {
			throw new Error(error)
			console.log('converted')
		} else {
			playGenerated('generated.mp3')
		}
	})
}

const playGenerated = (filename) => {
	player.play(`audio_output/${filename}`, (error) => {
	  if (error) throw error
	})
}

router
	.post('/', (ctx, next) => {
		if (ctx.request.body.length > 500) {
			ctx.body = 'Request too large, failed' // TODO: 400 bad request response
			return
		} else {
			// TODO: checks to make sure we are using English
      console.log('Received request with body: ', ctx.request.body)
			generateText(ctx.request.body)
			ctx.body = ctx.request.body
			return
		}
	})

webserver.on('error', error => {
	log.error('server error', error)
})

webserver
	.use(router.routes())
	.use(router.allowedMethods())
  .use(serve('.'))

webserver.listen(PORT)
console.log(`Webserver running and listening on port ${PORT}`)
