const userName = document.getElementById('userName')
const userAge = document.getElementById('userAge')
const avatar = document.getElementById('avatar')
const message = document.getElementById('message')
const submit = document.getElementById('submit')
const registration = document.getElementById('registration')

let currentUser = null

function getInput (users) {
  const logins = Object.keys(users)

  const userInput = document.getElementById('login')
    
  userInput.oninput = event => {
    const test = logins.filter(login => login.indexOf(event.target.value) !== -1).length > 0
  
    event.target.style.color = test ? 'green' : 'red'
    event.target.title = test ? '...' : 'There are no such user in DB'
  }
    
    return new Promise((resolve, reject) => {
      userInput.onchange = event => {
        const userLogin = event.target.value
        const res = logins.find(login => login === event.target.value)

        userInput.remove()

        console.log(userLogin)

        !res ? reject(userLogin) : resolve(userLogin)
      }
    })
}

// ======================= getLogin ========================= 

async function getLogin () {
  const users = await (await fetch('https://garevna-form-data.glitch.me/forms/all')).json()

  return await getInput(users)
}

// ==========================================================

const addElemToBody = tagName => document.body.appendChild(document.createElement('img'))

const resolve = userLogin => {
  const dataURL = `https://garevna-form-data.glitch.me/forms/${userLogin}`

  async function getFormData (url) {
    const formData = await (await fetch(url)).formData()
    const user = {}
    formData
      .forEach(prop => prop instanceof File
        ? document.body.appendChild(document.createElement('img')).src = URL.createObjectURL(prop)
        : document.body.appendChild(document.createElement('p')).innerText = prop
        );
    }

    getFormData ( dataURL );
    document.getElementsByTagName ( "header" )[0].remove();
}

const register = login => {
    registration.style.display = "block";
    message.innerText = "";
    const validateImage = event => {
      message.innerText = 
          avatar.files[0].type.indexOf ( "image" ) === 0 ? avatar.files[0].size < 100000 ? "" : 
              "File is too large" : "It's not an image file";
      const userPhoto = document.getElementById ( "userPhoto" );
      userPhoto.src = URL.createObjectURL( event.target.files [0] );
    }
    
    avatar.onchange = validateImage;
    
    let ready = () => userName.value.length > 1 && userAge.value < 100 && userAge.value > 5 && !message.innerText;
  
    submit.onclick = event => {
        
        if ( !ready() ) {
          setTimeout ( ()=> {
            message.innerText = "User data will not be saved";
            registration.style.display = "none";
          }, 1500 );
          
          return;
        }

        let formData = new FormData ( document.getElementById ( "form" ) );

        fetch ( `https://garevna-form-data.glitch.me/form/${login}`, {
            method: "POST",
            body: formData
        }).then ( response => {
          registration.style.display = "none";
          document.getElementsByTagName ( "header" )[0].remove();
          resolve ( login );
        });
    };
}


getLogin ().then ( resolve, register )








    
    
    



