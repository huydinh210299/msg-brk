const request = require('supertest')
const { app, server } = require('../index')

jest.mock('../services/post.service', () => {
  return {
    createPost: (postData) => {
      return postData
    }
  }
})

jest.mock('../database/index', () => {
  return {
    connectDB: () => {}
  }
})

describe('Test create post API', () => {
  test('the status code must be 200', () => {
    return request(app)
      .post('/posts')
      .send({ title: 'hello' })
      .then((res) => {
        expect(res.statusCode).toBe(200)
      })
  })

  test('response must be a post object', () => {
    return request(app)
      .post('/posts')
      .send({ title: 'hello' })
      .set('Accept', 'application/json')
      .then((res) => {
        expect(res.body.data).toHaveProperty('title')
      })
  })

  afterAll(() => {
    server.close()
  })
})
