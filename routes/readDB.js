const fs = require( "fs" );
const Promise = require("promise");
const path = require('path');
const getError = require ( "./getError" );
const dbnames = require ( "./databases" );

function readDB ( req, res ) {
  return new Promise ( function ( resolve, reject ) {
      let dbname, dbpath;

      if ( req.originalUrl.indexOf ( "form" ) !== -1 ) {
          dbname = "db";
          dbpath = path.join ( path.resolve( "./" ), `forms/db.json` );
      } else {
          dbname = dbnames.filter (
            item => req.originalUrl.indexOf ( item.slice(0,-1) ) >= 0
          )[0];
          dbpath = path.join ( path.resolve( "./" ), `json/${dbname}.json` );
      };

      if ( !dbname ) {
        reject ( "dbname is not defined", dbname );
      };

      fs.readFile ( dbpath, "utf8", function( err, content ) {
          if ( err ) {
            reject ( `Error reading the file ${dbpath}` );
          } else {
            resolve ({
                dbpath: dbpath,
                dbcontent: JSON.parse ( content )
            });
          }
      });
  })
};

module.exports = readDB;