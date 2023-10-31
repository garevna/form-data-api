async function save () {
  const { form, login } = window[Symbol.for('elements')]
  const apiURL = window[Symbol.for('api-url')]

  const formData = new FormData(form)

  const method = window[Symbol.for('users')].includes(login.value) ? 'PATCH' : 'POST'

  const response = await fetch(`${apiURL}/form/${login.value}`, {
    method,
    body: formData
  })

  console.log(await response.json())
}
