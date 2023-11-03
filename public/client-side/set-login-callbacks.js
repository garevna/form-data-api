function setLoginCallbacks () {
  const { formTitle, message, login, changed, submit } = window[Symbol.for('elements')]

  const callback = event => {
    const test = testLogin(event.target.value)

    formTitle.innerText = test
      ? 'Edit user details'
      : 'Register new user'
    message.innerText = test
      ? 'User exists'
      : 'There are no such user in DB'

    submit.innerText = test
      ? 'Update'
      : 'Register'

    return test ? event.target.value : null
  }

  login.oninput = callback

  changed.onclick = event => {
    ;[userName, userPhoto, submit].forEach(elem => Object.assign(elem, { disabled: !testLogin(login.value) }))
    showUserData(login.value)
  }

  // login.onchange = event => {
  //   const login = callback(event)
  //   showUserData(login)
  // }
}
