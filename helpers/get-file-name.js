const [slash, backSlash] = ['/', '\\']

module.exports = function getFileName (filePath) {
  const delimiter = [slash, backSlash].find(item => filePath.indexOf(item) !== -1)
  return filePath.split(delimiter).pop()
}
