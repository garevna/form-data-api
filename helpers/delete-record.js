const fs = require('fs')
const readDB = require('./read-db')
const writeDB = require('./write-db')

const callback = (error, path) => error ? { status: 500, result: null, error } : { status: 200, result: path, error: null }

module.exports = async function deleteRecord (req, res) {
  const { status, result: dbcontent, error } = await readDB(req, res)

  const id = req.params.id

  if (status !== 200) return res.status(status).send(JSON.stringify(error))

  if (!dbcontent[id]) resolve({ status: 404, result: null, error: `${id} not found` })

  return new Promise(resolve => {
    const error = []

    Object.keys(dbcontent[id])
      .filter(propName => !!dbcontent[id][propName].path)
      .forEach(key => fs.unlink(dbcontent[id][key].path, err => err && error.push(err)))

    delete dbcontent[id]

    writeDB(dbcontent).then(response => resolve(response))
  })
}
