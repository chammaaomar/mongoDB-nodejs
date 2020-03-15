const mongoose = require('mongoose')
const connect = (url) => mongoose.connect(url, {useUnifiedTopology: true, useNewUrlParser: true, keepAlive: true, keepAliveInitialDelay: 1, poolSize: 10})
module.exports = connect
