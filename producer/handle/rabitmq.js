const amqplib = require('amqplib')

// use when run in localhost
const host = 'amqp://localhost:5672'
//use when run by docker
// const host = 'amqp://guest:guest@rabbitmq:5672'

function AMQP(queue) {
  var channel = null

  const getChanel = async () => {
    const conn = await amqplib.connect(host)
    const ch = await conn.createChannel()
    ch.assertQueue(queue)
    return ch
  }
  return {
    getChannel: async function () {
      if (!channel) channel = await getChanel()
      return channel
    }
  }
}

module.exports = AMQP
