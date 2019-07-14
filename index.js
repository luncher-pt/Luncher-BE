require('dotenv').config()

const server = require('./Server/server.js')

const PORT = process.env.PORT || 9000;

server.listen(PORT, () => {
    console.log(`=== Luncher-BE Server Listening on http://localHost:${PORT} ===`)
})