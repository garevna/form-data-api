const { getForm, readDB, writeDB } = require('../helpers')

module.exports = async function post (req, res) {
  const id = req.params.id

  const { status: st, result: form, error: err } = await getForm(req, res)

  if (st !== 200) return res.status(st).json({ status: st, result: null, error: err })

  const { status: stat, result: dbcontent, error: er } = await readDB()

  if (stat !== 200) return res.status(stat).json({ status: stat, result: null, error: er })

  Object.assign(dbcontent, { [id]: form })

  const { status, result, error } = await writeDB(dbcontent)

  res.status(status).json({ status, result, error })
}
