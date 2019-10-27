# FormData

## endpoint

~~~console
https://garevna-form-data.glitch.me/form/<id>
~~~

~~~js
let main = document.body.appendChild (
    document.createElement ( "main" )
)

let ready = () => validateName() && 
                  validateAge() &&
                  validateImage()

main.innerHTML = `
  <form id="form">
    <input id="userName" name="name" onchange="validateName()">
    <input type="number"
           id="userAge" 
           name="age" 
           onchange="validateAge()">
    <input type="file" 
           id="avatar" 
           name="avatar" 
           onchange="validateImage()"
    >
  </form>
  <button id="submit" onclick="submitForm(event)">Submit</button>
`

const validateName = () => userName.value.length > 1 ? 
               "OK" : console.warn ( "Invalide name" )
const validateAge = () => userAge.value > 5 && userAge.value < 120 ? 
               "OK" : console.warn ( "Invalide age" )
const validateImage = () => avatar.files[0].type.indexOf ( "image" ) === 0 ?
                            avatar.files[0].size < 100000 ? "OK" : 
                            console.warn ( "File is too large" ) :
                            console.warn ( "It's not an image file" )

const submitForm = event => {

    if ( !ready() ) return console.warn ( "Form not ready yet" )

    let formData = new FormData ( form )

    fetch ( "https://garevna-form-data.glitch.me/form/frodo", {
        method: "POST",
        body: formData
    }).then ( response => console.log ( response ) )
}
~~~
