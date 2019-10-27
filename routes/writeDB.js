const fs = require( "fs" );
const getError = require ( "./getError" );

const writeDB = function ( dbpath, dbcontent ) {
    let error = null;
    fs.writeFile(
        dbpath,
        JSON.stringify( dbcontent ),
        err => err ? error = getError ( 520 ) : null
    );
    return error || "OK";
}

module.exports = writeDB;