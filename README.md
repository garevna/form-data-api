# FormData

## endpoint

~~~console
https://garevna-form-data.glitch.me/form/<id>
~~~

**Sample**

~~~js
const main = document.body.appendChild(document.createElement('main'))

const ready = () => validateName() &&  validateAge() && validateImage()

main.innerHTML = `
  <form id="form">
    <input
      id="userName"
      name="name"
      onchange="validateName()"
    />
    <input
      type="number"
      id="userAge" 
      name="age" 
      onchange="validateAge()"
    />
    <input
      type="file" 
      id="avatar" 
      name="avatar" 
      onchange="validateImage()"
    />
  </form>

  <button id="submit" onclick="submitForm(event)">
    Submit
  </button>
`

const validateName = () => userName.value.length > 1
  ? 'OK'
  : console.warn('Invalide name')

const validateAge = () => userAge.value > 5 && userAge.value < 120
  ? 'OK'
  : console.warn('Invalide age')

const validateImage = () => avatar.files[0].type.indexOf('image') === 0
  ? avatar.files[0].size < 100000
    ? 'OK'
    : console.warn('File is too large')
  : console.warn('It\'s not an image file')

const submitForm = event => {
  if (!ready()) return console.warn('Form not ready yet')

  const formData = new FormData(form)

  fetch('https://garevna-form-data.glitch.me/form/frodo', {
    method: 'POST',
    body: formData
  }).then(response => console.log(response))
}
~~~

Receive data from server:

~~~js
const dataURL = 'https://garevna-form-data.glitch.me/forms/frodo'

async function getFormData (url) {
  const formData = await (await fetch(url)).formData()

  const user = {}

  formData.forEach(prop => prop instanceof File
    ? document.body
      .appendChild(document.createElement('img'))
      .src = URL.createObjectURL(prop)
    : document.body
      .appendChild(document.createElement('p'))
      .innerText = prop
    )
}

getFormData(dataURL)
~~~
