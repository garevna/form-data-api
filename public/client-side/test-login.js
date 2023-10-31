function testLogin (login) {
  return window[Symbol.for('users')].includes(login)
}
