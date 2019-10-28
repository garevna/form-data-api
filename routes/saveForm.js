const writeDB = require( "./writeDB" );
const getError = require ( "./getError" );

function saveForm ( req, res, dbpath, dbcontent, result ) {
    let error = null;
    req.method.toUpperCase() === "POST" ?
      dbcontent [ req.params.id ] ?
         error = getError ( 475, req.params.id ) :
             dbcontent [ req.params.id ] = result :
         !dbcontent [ req.params.id ] ?
            error = getError ( 480, req.params.id ) :
               req.method.toUpperCase() === "PATCH" ?
                  Object.assign ( dbcontent [ req.params.id ], result ) :
                      req.method.toUpperCase() === "DELETE" ?
                          delete dbcontent [ req.params.id ] :
                              dbcontent [ req.params.id ] = result;
  
    if ( error ) return res.json ( error );
    error = writeDB ( dbpath, dbcontent );
    if ( error ) return res.json ( error );
    return res.json ( dbcontent [ req.params.id ] );
};

module.exports = saveForm;