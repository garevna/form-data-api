const userName = document.getElementById ( "userName" );
const userAge = document.getElementById ( "userAge" );
const avatar = document.getElementById ( "avatar" );
let currentUser = null

function getInput ( users ) {

    let logins = Object.keys ( users );

    let userInput = document.getElementById ( "login" );
    
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
                let userLogin = event.target.value;
                let res = logins.find ( login => login === event.target.value );

                userInput.remove();

                !res ? reject ( userLogin ) : resolve ( userLogin )
            };
        }
    )
}

// ======================= getLogin ========================= 

async function getLogin () {
   
    let users = await (
        await fetch ( "https://garevna-form-data.glitch.me/forms/all" )
    ).json();

    return await getInput ( users )
}

// ==========================================================

const resolve = userLogin => {
    console.log ( userLogin );
    let dataURL = `https://garevna-form-data.glitch.me/forms/${userLogin}`

    async function getFormData ( url ) {
        let formData = await ( await fetch ( url ) ).formData()
        let user = {}
        formData.forEach (
            prop => prop instanceof File ? 
                document.body.appendChild (
                    document.createElement ( "img" )
                ).src = URL.createObjectURL ( prop ) :
                document.body.appendChild (
                    document.createElement ( "p" )
                ).innerText = prop
        )
    }

    getFormData ( dataURL )
}

const register = login => {
    
    const validateName = () => userName.value.length > 1 ? 
               "OK" : console.warn ( "Invalide name" );
    const validateAge = () => userAge.value > 5 && userAge.value < 120 ? 
               "OK" : console.warn ( "Invalide age" );
    const validateImage = () => avatar.files[0].type.indexOf ( "image" ) === 0 ?
                            avatar.files[0].size < 100000 ? "OK" : 
                            console.warn ( "File is too large" ) :
                            console.warn ( "It's not an image file" );
    userName.onchange = validate
    
    let ready = () => validateName() && validateAge() && validateImage();
  
    const submitForm = event => {

        if ( !ready() ) return console.warn ( "Form not ready yet" );

        let formData = new FormData ( document.getElementById ( "form" ) );

        fetch ( `https://garevna-form-data.glitch.me/form/${login}`, {
            method: "POST",
            body: formData
        }).then ( response => console.log ( response ) );
    };
}


getLogin ().then ( resolve, register )








    
    
    



