const express = require('express')
var app = express()

app.use('/download', require('./download'))
app.get('/', (req, res) => {
    res.status(200).end()
})

app.use(function(req, res, next) {
    var err = new Error('Not Found')
    err.status = 404
    next(err)
  })
var server = app.listen(4000)
server.on('error', err => console.log('WARNING: http server error', err))
server.on('timeout', () => console.log('WARNING: http server timeout'))