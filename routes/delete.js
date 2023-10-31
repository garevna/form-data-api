const { deleteRecord } = require('../helpers')

module.exports = async function del (req, res) {
  const { status, result, error } = await deleteRecord(req, res)
  res.status(status).json({ status, result, error })
}
