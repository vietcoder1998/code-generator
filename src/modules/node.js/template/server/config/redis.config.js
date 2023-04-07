const { createClient } = require('redis')

const client = createClient({
  host: 'localhost',
  port: '6379',
})

client.on('error', (err) => console.log('Redis Client Error', err))

module.exports = client
