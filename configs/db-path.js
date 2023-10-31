const path = require('path')

const [dbfolder, dbname] = ['db', 'db.json']

module.exports = path.resolve(__dirname, '..', dbfolder, dbname)
