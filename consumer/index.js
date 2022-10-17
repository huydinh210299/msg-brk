const express = require('express')
const AMQP = require('./handle/rabitmq')
const EventEmitter = require('events')
const cors = require('cors')
const port = 3002

const consumeChannel = AMQP('create_post')
const app = express()
const ee = new EventEmitter()

const runConsumer = async () => {
  const consumeChl = await consumeChannel.getChannel()
  consumeChl.consume('create_post', (msg) => {
    if (msg !== null) {
      ee.emit('notification', msg.content.toString())
      console.log(msg.content.toString())
    } else {
      console.log('Consumer cancelled by server')
    }
  })
}

runConsumer()

app.use(cors())

app.get('/notification', (req, res, next) => {
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Access-Control-Allow-Origin': '*',
    Connection: 'keep-alive'
  })

  ee.on('notification', (notification = {}) => {
    res.write(`data: ${notification}\n\n`)
  })

  res.on('close', () => {
    console.log('Client closed connection')
    res.end()
  })
})

app.listen(port, () => {
  console.log(`app listen at port: ${port}`)
})
