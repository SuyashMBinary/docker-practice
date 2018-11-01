const redis = require('redis')

const rcl = redis.createClient({
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || 6379
})

rcl.on('ready', () => {
    console.log('Connection established')
    rcl.config('set', 'notify-keyspace-events', 'AK')
    rcl.subscribe('__keyspace@0__:counter')
})

rcl.on('error', (err) => {
    console.log(`ERROR: ${err}`)
})

rcl.on('subscribe', (channel, count) => {
    console.log(`Subscribed to ${channel}`)
})

rcl.on('message', (channel, message) => {
    //console.log(`Message recieved on ${channel} :::: ${message}`)
    if(channel.trim() == '__keyspace@0__:counter' && message.trim() == 'incrby') {
        console.log(`Counter incremented`)

    }
})

