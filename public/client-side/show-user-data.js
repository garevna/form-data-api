async function showUserData (login) {
  if (!login) return

  const apiURL = window[Symbol.for('api-url')]

  const { userName, userPhoto } = window[Symbol.for('elements')]

  const formData = await (await fetch(`${apiURL}/forms/${login}`)).formData()

  window[Symbol.for('user')] = formData

  const iterator = formData.entries()

  do {
    var { value, done } = iterator.next()
    if (!Array.isArray(value)) continue
    const [propName, propValue] = value
    if (propName === 'name') {
      Object.assign(userName, { value: propValue })
    }
    if (propName === 'avatar') {
      Object.assign(userPhoto, { src: URL.createObjectURL(propValue), width: 120 })
    }
  } while (!done)
}
