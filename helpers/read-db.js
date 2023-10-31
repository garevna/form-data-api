const fs = require('fs')
const Promise = require('promise')

const getError = require('./get-error')
const { dbpath } = require('../configs')

function readDB () {
  return new Promise(function (resolve) {
    fs.readFile(dbpath, 'utf8', function(error, content) {
      error
        ? resolve({ status: 500, result: null, error })
        : resolve({ status: 200, result: JSON.parse(content), error: null })
    })
  })
}

module.exports = readDB
