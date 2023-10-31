module.exports = function (req, res) {
  const fileName = req.params.fileName
  const file = new fs.ReadStream(`./uploads/${fileName}`)
  file.pipe(res)
  const data = file.read()

  file
    .on('error', (err) => res.status(500).end(err))
    .on('open', () => console.log('open'))
    .on('close', () => console.log('End of file'))

  res.on('close', () => file.destroy() )
}
