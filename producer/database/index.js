const mongoose = require('mongoose')

// const { MONGO_CONFIG } = require("../config/var");
const connectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://dinhlun99hy:Boladinh99@cluster0.fbb4pqq.mongodb.net/msg-brk?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    )
    console.log('connect success')
  } catch (error) {
    console.log('connect fail')
    console.log(error)
  }
}

module.exports = { connectDB }
