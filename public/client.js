const [login, changed, userName, userPhoto, avatar, message, submit, form, formTitle] = [
  'user-login',
  'user-login-changed',
  'user-name',
  'user-photo',
  'avatar',
  'message',
  'submit',
  'form',
  'form-title'
].map(id => document.getElementById(id))

Object.assign(form.style, { display: 'none' })

window[Symbol.for('elements')] = { login, changed, userName, userPhoto, avatar, message, submit, form, formTitle }

console.log(window[Symbol.for('elements')])

;[userName, userPhoto, submit].forEach(elem => Object.assign(elem, { disabled: true }))

window[Symbol.for('api-url')] = location.origin

getUsers()
  .then(() => {
    Object.assign(form.style, { display: 'block' })
    setLoginCallbacks()
    avatar.onchange = validateImage
    submit.onclick = save
  })
