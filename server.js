const express = require("express");
const app = express();
const fs = require('fs');

app.use(express.static("public"));

app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

app.get( "/uploads/large.txt", function ( req, res ) {
  const file = new fs.ReadStream('./uploads/large.txt');
  file.pipe(res);
  file.on('error', function(err){
        res.statusCode = 500;
        res.end("Server Error");
        console.error(err);
  });
  file
    .on( 'open', () => console.log("open") )
    .on( 'close', () => res.send("End of file") )
 
    res.on('close', () => file.destroy() )
})

const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
