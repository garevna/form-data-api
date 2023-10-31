const { readDB } = require('../helpers')

module.exports = async function getAll (req, res) {
  const { status, result: dbcontent, error } = await readDB(req, res)

  if (status !== 200) res.status(status).json({ status, error })

  res.json(dbcontent)
}
