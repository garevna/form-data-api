async function getUsers () {
  const apiURL = window[Symbol.for('api-url')]
  const users = await (await fetch(`${apiURL}/forms/all`)).json()

  window[Symbol.for('users')] = Object.keys(users)
}
