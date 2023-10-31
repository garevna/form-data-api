function validateImage (event) {
  message.innerText = avatar.files[0].type.indexOf('image') === 0
    ? avatar.files[0].size < 100000
      ? ''
      : 'File is too large'
    : 'It\'s not an image file'
    userPhoto.src = URL.createObjectURL(event.target.files[0])
}
