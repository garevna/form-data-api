const fs = require('fs')
const FormData = require('form-data')
const { readDB, getFileName, getFilePath } = require('../helpers')

module.exports = async function get (req, res) {
  const { status, result: dbcontent, error } = await readDB(req, res)

  if (status !== 200) return { status, result, error }

  const id = req.params.id

  if (!dbcontent[id]) return res.json(getError(404))

  const formData = new FormData()

  for (const prop in dbcontent[id]) {
    if (dbcontent[id][prop].path) {
      const fileName = getFileName(dbcontent[id][prop].path)

      const filePath = await getFilePath(fileName)

      const stream = fs.createReadStream(filePath)
      stream.on('error', error => console.log('STREAM ERROR:\n', error))

      formData.append(prop, stream)
    } else formData.append(prop, dbcontent[id][prop])
  }

  res.setHeader('Content-Type', 'multipart/form-data; boundary=' + formData.getBoundary())
  formData.pipe(res)
}
