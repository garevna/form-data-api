var express = require('express');
var fs = require('fs');

var router = express.Router();
var content = fs.readFileSync( '.glitch-assets', 'utf8' );
var rows = content.split("\n");
var assets = rows.map((row) => {
  try {
    return JSON.parse(row)
  } catch (e) {}
});

assets = assets.filter( asset => asset && asset.name );
console.log ( assets.map ( asset => [ asset.name, asset.url ] ) );

router.use( ( request, response ) => {
  response.header( "Access-Control-Allow-Origin", "*" );
  response.header( "Access-Control-Allow-Methods", "GET" );
  response.header( "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization" );
  
  var path = request.path.substring(1);
  
  var [ file ] = assets.filter( asset => {
    if ( asset.name ) return asset.name.replace(/ /g,'%20') === path
  })
  
  if ( !file || !file.url ) {
    return response.status(404).end("No such file")
  }
  console.log ( file.url );
  
  return response.redirect( file.url );
})

module.exports = router
