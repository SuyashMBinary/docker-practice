const express = require('express')
const redis = require('redis')

const app = express()
const port = process.env.PORT || 8081

const rcl = redis.createClient({
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || 6379
})

app.get('/', (req, res) => {
    res.send('Hello! World')
})

app.get('/inc', (req, res) => {
    rcl.incr('counter', redis.print)
    rcl.get("counter", (err, result) => {
        res.send(`Counter is at ${result}`)
    })
})

app.listen(port, () => {
    console.log(`Server is running at port ${port}`)
})
