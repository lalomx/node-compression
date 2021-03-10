'use strict'

const axios = require('axios')
const { brotliCompress } = require("zlib");

module.exports = function (event, _, callback, { post } = axios) {
  // Compressing data using google's brotli
  brotliCompress(event, function (err, data) {
    if (err) {
      console.log("An error occured in data compression")
      callback(err)
      return
    }

    post('http://localhost:8081/event', data)
      .then(_ => callback())
      .catch(err => {
        console.log(`ERROR: ${err.message}`)
        callback(err)
      })
  })
}
