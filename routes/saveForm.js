const writeDB = require( "./writeDB" );
const getError = require ( "./getError" );

function saveForm ( req, res, dbpath, dbcontent, result ) {
    console.log ( "saveForm: ", req.method, req.params.id );
    console.log ( "RESULT:\n", result );
    req.method.toUpperCase() === "POST" ?
      dbcontent [ req.params.id ] ?
         res.json ( getError ( 475, req.params.id ) ) :
             dbcontent [ req.params.id ] = result :
         !dbcontent [ req.params.id ] ?
            res.json ( getError ( 480, req.params.id ) ) :
               req.method.toUpperCase() === "PATCH" ?
                  Object.assign ( dbcontent [ req.params.id ], result ) :
                      req.method.toUpperCase() === "DELETE" ?
                          delete dbcontent [ req.params.id ] :
                              dbcontent [ req.params.id ] = result;

    let error = writeDB ( dbpath, dbcontent );
    return res.json ( error ? error : dbcontent [ req.params.id ] );
};

module.exports = saveForm;