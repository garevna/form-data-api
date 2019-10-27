const fs = require( "fs" );
const getError = require ( "./getError" );

const writeDB = function ( dbpath, dbcontent ) {
    fs.writeFile(
        dbpath,
        JSON.stringify( dbcontent ),
        err => err ? getError ( 520 ) : null
    );
}

module.exports = writeDB;