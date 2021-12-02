// use require with a reference to bundle the file and use it in this file
// const example = require('./example')\

const authEvents = require('./auth/events')
const Modal = require('bootstrap').Modal



// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
    $('#signup').hide(0)
    $('#signin').hide(0)
    $('#launch-authModal').on('click', authEvents.onSigninButton)
    $('#signup-form').on('submit', authEvents.onRegister)
    $('#signin-form').on('submit', authEvents.onSignin)
})
