const fs = require( "fs" );

const writeDB = require( "./writeDB" );
const getError = require ( "./getError" );
const deleteRecord = ( dbcontent, id ) => {
  let files = Object.keys ( dbcontent [id] )
    .filter ( prop => prop.path );
  console.log ( files );
  files.forEach (
      file => fs.unlink( file.path, err => err ? 
         console.log( 'Error deleting file: ', err ) :
         console.log( 'file deleted successfully' )
      )
  )
  delete dbcontent [id];
}

function saveForm ( req, res, dbpath, dbcontent, result ) {
    console.log ( "RESULT:\n", result, "\n_" );
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
                          deleteRecord ( dbcontent, req.params.id ) :
                              dbcontent [ req.params.id ] = result;
  
    if ( error ) return res.status ( error.num ).send ( error.message );
    // console.log ( dbpath, dbcontent );
    error = writeDB ( dbpath, dbcontent );
    if ( error ) return res.status ( error.num ).send ( error.message );
    return res.status ( 200 ).send ( JSON.stringify ( dbcontent [ req.params.id ] ) );
};

module.exports = saveForm;