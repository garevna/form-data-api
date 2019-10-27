const getError = function ( errNum, data ) {
  return  {
    error: errNum,
    message:
      errNum === 500 ? "Database was corrupted or it doesn't exist" :
        errNum === 404 ? "There is no requested data in database" :
          errNum === 470 ? "Invalid or missing Content-Type header" :
            errNum === 475 ? `${data} allready exist` :
              errNum === 480 ? `There is no requested data: ${data}` :
                errNum === 520 ? "Unknown Server Error" : 
                  null
  }
}

module.exports = getError;