const { Schema, model } = require('mongoose')

const post = new Schema({
  title: {
    type: String
  }
})

module.exports = model('post', post, 'post')
