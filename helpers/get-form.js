const async = require('async')
const bodyParser = require('body-parser')
const path = require('path')

const formidable = require('formidable')

module.exports = function getForm (req, res) {
  const sourceData = new formidable.IncomingForm({
    uploadDir: path.join(__dirname, '../uploads'),
    keepExtensions: true,
    keepFileNames: true
  })

  return new Promise(resolve => {
    const result = {}
    sourceData.parse(req, function (error, fields, files) {
      if (error) return { status: error.httpCode, result: null, error: error.stack }

      Object.assign(result, fields)

      Object.keys(files)
        .forEach(file => {
          const { path, name, size, type } = files[file]
          Object.assign(result, { [file]: { path, name, size, type } })
        })

      resolve({ status: 200, result, error: null })
    })
  })
}
