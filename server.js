const express = require("express");
const path = require ( "path" );
const app = express();
const fs = require('fs');

// app.use(express.static("public"));
// app.use ( function (req, res, next )  {
//   console.log ( "request params: ", req.params );
//   console.log ( "request url: ", req.url, "\nrequest original url: ", req.originalUrl );
  
//   if ( req.originalUrl.indexOf ( "images/" ) !== -1 && req.originalUrl.indexOf ( "icons/" ) !== -1 ) {
//     req.params.url = "https://cdn.glitch.com/52ccd94a-ef5a-4ac4-b91a-4b8fa19be956%2F" + "js-08.png"
//   }
// })

const assets = process.env.ASSETS;
console.log (assets);

app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

[ "/images/:imageName", "/images/lessons/:imageName", "/icons/:imageName" ]
  .forEach (
    item => app.get ( item, function ( req, res ) {
      console.log ( "request params: ", req.params );
      console.log ( "request url: ", req.url, "\nrequest original url: ", req.originalUrl );
      // res.sendFile( path.join( path.resolve ( "." ), `52ccd94a-ef5a-4ac4-b91a-4b8fa19be956%2F${req.params.imageName}` ));
      // let filePath = `https://cdn.glitch.com/52ccd94a-ef5a-4ac4-b91a-4b8fa19be956/${req.params.imageName}`
//       https://cdn.glitch.com/c54bf865-364f-4c70-a071-e24900743fd0/a-level-ico.png?v=1561722122996
      fs.readFile (
          `https://cdn.glitch.com/${}/${req.params.imageName}`,
          'utf8',
          function( err, content ) {
            if ( err ) return console.log ( err );
            console.log( content );
            res.send( content );
          }
      );
    })
  );

app.get( "/uploads/large.txt", function ( req, res ) {
  const file = new fs.ReadStream('./uploads/large.txt');
  file.pipe(res);
  let data = file.read();
  console.log ( data );
  file.on('error', function(err){
        res.statusCode = 500;
        res.end("Server Error");
        console.error(err);
  });
  file
    .on( 'open', () => console.log ("open") )
    .on( 'close', () => console.log ("End of file") )
 
    res.on('close', () => file.destroy() )
})

const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
