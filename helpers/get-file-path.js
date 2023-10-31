const path = require('path')
const fs = require('fs')

const { uploadsDir, folderErrorIcon, errorFilePath } = require('../configs')

module.exports = function getFilePath (fileName) {
  const uploadsPath = path.resolve(__dirname, '..', `uploads/${fileName}`)

  const getPath = (error, files) => error ? folderErrorIcon : files.includes(fileName) ? uploadsPath : errorFilePath

  return new Promise(resolve => fs.readdir(uploadsDir, (error, files) => resolve(getPath(error, files))))
}
