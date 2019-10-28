const fs = require( "fs" );

const writeDB = require( "./writeDB" );
const getError = require ( "./getError" );

function saveForm ( req, res, dbpath, dbcontent, result ) {
    const deleteRecord = ( dbcontent, id ) => {
      console.log ( `id: ${id}\nObject.keys ( ${dbcontent [id]} )`, Object.keys ( dbcontent [id] ) );
      let keys = Object.keys ( dbcontent [id] ;
      f
        .filter ( prop => prop.path );
      console.log ( "function deleteRecord\nFILES:\n", files );
      files.forEach (
          file => fs.unlink( file.path, err => err ? 
             console.log( 'Error deleting file: ', err ) :
             console.log( 'file deleted successfully' )
          )
      )
      delete dbcontent [id];
    }
    console.log ( "RESULT:\n", result );
    if ( Object.keys ( result ).length === 0 ) 
        return res.status ( 404 )
            .send ( `${req.params.id} not found` );
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