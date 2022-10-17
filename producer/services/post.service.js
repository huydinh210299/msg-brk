const Post = require('../models/post.model')

const createPost = async (postData) => {
  const createdpost = new Post(postData)
  return await Post.create(createdpost)
}

module.exports = { createPost }
