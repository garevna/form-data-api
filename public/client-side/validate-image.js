function validateImage (event) {
  console.log(event.target.files[0])
  const { userPhoto, message } = window[Symbol.for('elements')]

  const [testImage, testSize] = [
    event.target.files[0].type.indexOf('image') === 0,
    event.target.files[0].size < 100000
  ]

  message.innerText = !testImage
    ? 'It\'s not an image file'
    : !testSize
      ? 'File is too large'
      : ''
  testImage && testSize && Object.assign(userPhoto, { src: URL.createObjectURL(event.target.files[0]) })
}
