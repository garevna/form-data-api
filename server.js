const express = require("express")
const path = require ( "path" )
const app = express()
const fs = require('fs')

const async = require ( 'async' )
const Promise = require("promise")
const FormData = require('form-data')
const formidable = require('formidable')
const bodyParser = require('body-parser')

const readDB = require( "./routes/readDB" )
const writeDB = require( "./routes/writeDB" )
const saveForm = require( "./routes/saveForm" )
const getError = require ( "./routes/getError" )

const assets = require('./assets')

app.use(express.static("public"))

app.use( "/assets", assets )

app.options( "/*", function (req, res, next ) {
  console.log ( "Pre flight request" )
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE,HEADERS,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
  res.sendStatus(200)
})

app.use( function(req, res, next) {
  console.log(req.originalUrl)
  res.header('Access-Control-Allow-Origin', req.headers.origin)
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html')
})

app.get('/forms/all', async function (req, res) {
    const { dbpath, dbcontent } = await readDB(req, res)
    res.json(dbcontent)
})

app.get('/forms/:id', async function (req, res) {
  const { dbpath, dbcontent } = await readDB(req, res)
  if (!dbcontent[req.params.id]) return res.json(getError(404))

  const form = new FormData()
  for (let prop in dbcontent[req.params.id]) {
    if (dbcontent[req.params.id][prop].path) {
      form.append(prop, fs.createReadStream(dbcontent[req.params.id][prop].path))
    } else form.append(prop, dbcontent[req.params.id][prop])
  }
    
  res.setHeader('Content-Type', 'multipart/form-data; boundary=' + form.getBoundary())
  form.pipe(res)
})

;['post', 'put', 'patch', 'delete']
  .map(method => app[method]('/form/:id', async function (req, res) {
    const form = new formidable.IncomingForm({
      uploadDir: __dirname + '/uploads',
      keepExtensions: true,
      keepFileNames: true
    })

    const { dbpath, dbcontent } = await readDB(req, res)
    
    let error = null

    form.parse(req, function (err, fields, files) {
      const result = {}
      if (err) {
        console.log('Error: ', err.stack)
        return res.status(500).send(err.stack)
      }
      
      Object.assign(result, fields)
      
      for (const file in files) {
          // if ( files[file].type.indexOf ( "image" ) === -1 ) {
          //     fs.unlink( files[file].path, err => err ? 
          //               console.log( 'Error deleting file: ', err ) :
          //               console.log( 'file deleted successfully' )
          //     );
          //     return res.json ({
          //       error: 415, 
          //       message: `Invalid file type ${files[file].name}. Only images are available`
          //     });
          // };
          // if ( files[file].size > 307200 ) {
          //   fs.unlink( files[file].path, err => err ? 
          //               console.log( 'Error deleting file: ', err ) :
          //               console.log( 'file deleted successfully' )
          //   );
          //   return res.json ({
          //     error: 413,
          //     message: `File ${files[file].name} is too large. Max available size 300Kb`
          //   })
          // }
          Object.assign(result, {
            [file]: {
              path: files[file].path,
              name: files[file].name,
              size: files[file].size,
              type: files[file].type
            }
          })
      }
      let dbpath = path.join ( path.resolve( "." ), `forms/db.json` )
      error = saveForm ( req, res, dbpath, dbcontent, result )
      if ( error ) return null;
    })
  })
)

// app.get( "/uploads/large.txt", function ( req, res ) {
//   const file = new fs.ReadStream('./uploads/large.txt');
//   file.pipe(res);
//   let data = file.read();
//   console.log ( data );
//   file.on('error', function(err){
//         res.statusCode = 500;
//         res.end("Server Error");
//         console.error(err);
//   });
//   file
//     .on( 'open', () => console.log ("open") )
//     .on( 'close', () => console.log ("End of file") )
 
//     res.on('close', () => file.destroy() )
// })

// =============================================================================

const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port)
})
