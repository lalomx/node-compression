'use strict'

const http = require('http')
const { brotliDecompressSync } = require("zlib");

process.on('SIGTERM', function () {
  process.exit(0)
})

const server = http.createServer(function (req, res) {
  req
    .on('end', _ => res.end())
    .on('data', (msg) => {
      // Decompress brotli stream
      const output = brotliDecompressSync(msg).toString()
      console.log(output) // STDOUT
    })
    .on('error', err => console.log(`An error has occured: ${err}`))

})

server.listen(8081)
