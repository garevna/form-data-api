const fs = require('fs')

const { uploadsDir } = require('../configs')

module.exports = function testFile (fileName) {
  const test = (error, files) => error ? false : files.includes(fileName)

  return new Promise(resolve => fs.readdir(uploadsDir, (error, files) => resolve(test(error, files))))
}
