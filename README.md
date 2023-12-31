# API

### Description

This API is intended for training purposes as a complement to the project:

[![](https://cdn.glitch.com/a4e0a9fd-ea7b-47cf-b52a-48fd6359c559%2Fjs-ico.png)](https://js-lessons.glitch.me/)

The API serves requests with data in **multipart/form-data** format

Supported http-methods: _GET_, _POST_, _PUT_, _PATCH_, _DELETE_

### Start

```console
$ node server
```

### api host

##### localhost

```js
const api = 'http://localhost:3000'
```

##### remote

```js
const api = 'https://garevna-form-data.glitch.me'
```

### endpoints

```js
/* GET: */

${api}/forms/all

${api}/forms/${userLogin}

/* POST, PUT, PATCH, DELETE: */

${api}/form/${userLogin}
```

### Examples

##### GET all users:
```js
fetch(`${api}/forms/all`)
  .then(response => response.status === 200 ? response.json() : {})
  .then(users => console.log(users))
```

##### GET user by login:

```js
const addElem = (tagName) => document.body
  .appendChild(document.createElement(tagName))

async function getFormData (login) {
  const formData = await (await fetch(`${api}/forms/${login}`)).formData()

  formData
    .forEach(prop => prop instanceof File ? addElem('img').src = URL.createObjectURL(prop) : addElem('p').innerText = prop)
}

getFormData('frodo')
```

#### POST, PUT, PATCH

```js
const method = 'POST' /* ('PUT', 'PATCH') */

async function updateUser (login, formData) {
  const response = await fetch(`${api}/form/${login}`, {
    method,
    body: formData
  })

  console.log(response.status)
}
```

#### DELETE

```js
async function deleteUser (login) {
  const response = await fetch(`${api}/form/${login}`, {
    method: 'DELETE'
  })

  console.log(response.status)
}
```
