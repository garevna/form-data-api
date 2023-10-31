const express = require('express')
const app = express()

const { getAPI, getAll, get, post, patch, del, stream } = require('./routes')

app.use(express.static('public'))
app.use(express.static('images'))

// const assets = require('./assets')
// app.use('/assets', assets)

app.options('/*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE,HEADERS,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
  res.sendStatus(200)
})

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin)
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html')
})

app.get('/api', getAPI)

app.get('/forms/all', getAll)
app.get('/forms/:id', get)
app.delete('/form/:id', del)
app.post('/form/:id', post)
app.put('/form/:id', post)
app.patch('/form/:id', patch)

app.get('/stream/:fileName', stream)

// =============================================================================

const listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port)
})
