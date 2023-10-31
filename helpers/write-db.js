const fs = require('fs')
const getError = require('./get-error')
const { dbpath } = require('../configs')

const writeDB = function (dbcontent) {
  return new Promise(resolve => {
    fs.writeFile(dbpath, JSON.stringify(dbcontent), error => error
      ? resolve({ status: 520, error, result: null })
      : resolve({ status: 200, error: null, result: dbcontent })
    )
  })

  return error
}

module.exports = writeDB
