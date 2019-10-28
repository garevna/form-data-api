function getInput ( users ) {

    let logins = Object.keys ( users );

    let userInput = document.body.appendChild (
        document.createElement ( "input" )
    );
    
    userInput.oninput = event => {
        let test = logins.filter (
            login => login.indexOf ( event.target.value ) !== -1
        ).length > 0;
        
        event.target.style.color = test ? "green" : "red";
        event.target.title = test ? "..." : "There are no such user in DB";
    };
    
    return new Promise (
        ( resolve, reject ) => {
            userInput.onchange = event => {
                let res = logins.find ( login => login === event.target.value );

                userInput.remove();

                !res ? reject ( "Not found" ) : resolve ( users[ res ] )
            };
        }
    )
}

// ======================= getLogin ========================= 

async function getLogin () {
   
    let users = await (
        await fetch ( "https://garevna-rest-api.glitch.me/users/all" )
    ).json();

    return await getInput ( users )
}

// ==========================================================

const resolve = response => {
    
}
const reject = error => console.warn ( error )


getLogin ().then ( resolve, reject )


const userName = document.getElementById ( "userName" );
const userAge = document.getElementById ( "userAge" );
const avatar = document.getElementById ( "avatar" );

[ userName, userAge, avatar ].forEach ( elem => elem.disabled = true )

const validateName = () => userName.value.length > 1 ? 
               "OK" : console.warn ( "Invalide name" );
    const validateAge = () => userAge.value > 5 && userAge.value < 120 ? 
               "OK" : console.warn ( "Invalide age" );
    const validateImage = () => avatar.files[0].type.indexOf ( "image" ) === 0 ?
                            avatar.files[0].size < 100000 ? "OK" : 
                            console.warn ( "File is too large" ) :
                            console.warn ( "It's not an image file" );
    let ready = () => validateName() && validateAge() && validateImage();

getLogin ( 
  res => {
    
    
    
  }, 
  err => console.error ( err )
)









const submitForm = event => {

    if ( !ready() ) return console.warn ( "Form not ready yet" );

    let formData = new FormData ( document.getElementById ( "form" ) );

    fetch ( "https://garevna-form-data.glitch.me/form/frodo", {
        method: "POST",
        body: formData
    }).then ( response => console.log ( response ) );
};