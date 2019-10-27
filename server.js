const express = require("express");
const path = require ( "path" );
const app = express();
const fs = require('fs');

const async = require ( 'async' );
const Promise = require("promise");
const FormData = require('form-data');
const formidable = require('formidable');
const bodyParser = require('body-parser');

const readDB = require( "./routes/readDB" );
const writeDB = require( "./routes/writeDB" );
const saveForm = require( "./routes/saveForm" );
const getError = require ( "./routes/getError" );

const assets = require('./assets');

// app.use(express.static("public"));
// app.use ( function (req, res, next )  {
//   console.log ( "request params: ", req.params );
//   console.log ( "request url: ", req.url, "\nrequest original url: ", req.originalUrl );
  
//   if ( req.originalUrl.indexOf ( "images/" ) !== -1 && req.originalUrl.indexOf ( "icons/" ) !== -1 ) {
//     req.params.url = "https://cdn.glitch.com/52ccd94a-ef5a-4ac4-b91a-4b8fa19be956%2F" + "js-08.png"
//   }
// })

app.use( "/assets", assets );
// app.use ( "", );

// app.options( "/*", function (req, res, next ) {
//   console.log ( "Pre flight request" );
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE,HEADERS,OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
//   res.sendStatus(200);
// });

// app.use( function(req, res, next) {
//   console.log ( req.originalUrl );
//   res.header( "Access-Control-Allow-Origin", req.headers.origin );
//   res.header(
//       "Access-Control-Allow-Methods",
//       "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
//   );
//   res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

app.get ( "/forms/all", async function ( req, res ) {
    console.log ( "Forms all" );
    let { dbpath, dbcontent } = await readDB ( req, res );
    res.json ( dbcontent );
});

app.get ( "/forms/:id", async function ( req, res ) {

    let { dbpath, dbcontent } = await readDB ( req, res );
    if ( !dbcontent [ req.params.id ] ) return res.json ( getError ( 404 ) );
    console.log ( dbcontent [ req.params.id ] );

    let form = new FormData();
    for ( let prop in dbcontent [ req.params.id ] ) {
        if ( dbcontent [ req.params.id ][ prop ].path ) {
          form.
        }
        //   form.append( 'file', {
        //       // filename: 'unicycle.jpg', // ... or:
        //       filepath: dbcontent [ req.params.id ][ prop ].path,
        //       contentType: dbcontent [ req.params.id ][ prop ].type,
        //       knownLength: dbcontent [ req.params.id ][ prop ].size
        //   });
        // }
        form.append( prop, dbcontent [ req.params.id ][ prop ] );
    }
    
    res.setHeader( 'Content-Type', 'multipart/form-data; boundary=' + form.getBoundary() );
    return res.send( form );
});

app.get ( "/uploads/:file", function ( req, res ) {
  const file = `${__dirname}/uploads/${req.params.file}`;
  return res.download( file );
});

[ "post", "put", "patch", "delete" ].map(
  method => app[method] ( "/form/:id", async function ( req, res ) {
    let form = new formidable.IncomingForm({
        uploadDir: __dirname + '/uploads',
        keepExtensions: true,
        keepFileNames: true
    });

    let { dbpath, dbcontent } = await readDB ( req, res );
    console.log ( "DB content:\n", dbcontent );
    // if ( !dbcontent ) { console.log ( "Empty " ); return };
    let error = null;
    form.parse( req, function ( err, fields, files ) {
      let result = {};
      if ( err ) {
        console.log ( "Error: ", err.stack );
        return res.json ({ error: 500, message: err.stack });
      }
      Object.assign ( result, fields );
      for ( let file in files ) {
        if ( files[file].type.indexOf ( "image" ) === -1 ) {
            fs.unlink( files[file].path, function(err) {
                if( err ) console.log( 'Error deleting file: ', err );
                else console.log( 'file deleted successfully' );
            });
            return res.json ({ error: 415, message: `Invalid file type ${files[file].name}. Only images are available` });
        };
        if ( files[file].size > 307200 ) {
          fs.unlink( files[file].path, function(err) {
              if( err ) return console.log( 'Error deleting file: ', err );
              else console.log( 'file deleted successfully' );
          });
          return res.json ({ error: 413, message: `File ${files[file].name} is too large. Max available size 300Kb` })
        }
        Object.assign ( result, {
          [file]: {
            path: files[file].path,
            name: files[file].name,
            size: files[file].size,
            type: files[file].type
          }
        });
        let dbpath = path.join ( path.resolve( "." ), `forms/db.json` );
        console.log ( "DB path: ", dbpath );
        error = saveForm ( req, res, dbpath, dbcontent, result );
        // console.log ( "Server.js: writing DB result is ", error );
        if ( error ) break;
        // console.log ( file );
        console.log ( "path: ", files[file].path );
        console.log ( "name: ", files[file].name );
        console.log ( "size: ", files[file].size );
        console.log ( "type: ", files[file].type );
      }
    });
  })
);

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
  console.log("Your app is listening on port " + listener.address().port);
});
