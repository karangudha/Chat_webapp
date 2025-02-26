const express = require('express')
const app = express()
const http = require('http').createServer(app)
// Server Configuration
const PORT = process.env.PORT || 3000

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
// Serving static files
app.use(express.static(__dirname + '/public'))
// Routing
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})
// Socket 
const io = require('socket.io')(http)

io.on('connection', (socket) => {
    console.log('Connected...')
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })

})