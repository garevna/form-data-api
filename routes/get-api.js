module.exports = async function getAPI (req, res) {
  const api = process.env.PROJECT_NAME
    ? `https://${process.env.PROJECT_NAME}.glitch.me`
    : `http://localhost:${process.env.PORT || 3000}`
  res.status(200).json({ api })
}
