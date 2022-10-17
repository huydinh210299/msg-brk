const express = require('express')
const EventEmitter = require('events')
const bodyParser = require('body-parser')
const PostService = require('./services/post.service')
const { connectDB } = require('./database')
const AMQP = require('./handle/rabitmq')
const port = 3003

const ee = new EventEmitter()

const produceChanel = AMQP('create_post')

const app = express()

connectDB()

app.use(bodyParser.json())

app.post('/posts', async (req, res, next) => {
  const createdPost = await PostService.createPost(req.body)
  ee.emit('post_create', createdPost)
  res.status(200).send({ data: createdPost })
})

ee.on('post_create', async (post) => {
  console.log(`new post create: ${post.title}`)
  const produceChl = await produceChanel.getChannel()
  produceChl.sendToQueue('create_post', Buffer.from(JSON.stringify(post)))
})

const server = app.listen(port, () => {
  console.log(`Producer listen at port ${port}`)
})

module.exports = { app, server }
