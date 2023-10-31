const [login, userName, userPhoto, avatar, message, submit, form, formTitle] = [
  "user-login",
  'user-name',
  'user-photo',
  'avatar',
  'message',
  'submit',
  'form',
  'form-title'
].map(id => document.getElementById(id))

Object.assign(form.style, { display: 'none' })

window[Symbol.for('elements')] = { login, userName, userPhoto, avatar, message, submit, form, formTitle }

window[Symbol.for('api-url')] = location.origin

getUsers()
  .then(() => {
    Object.assign(form.style, { display: 'block' })
    setLoginCallbacks()
    avatar.onchange = validateImage
    submit.onclick = save
  })
