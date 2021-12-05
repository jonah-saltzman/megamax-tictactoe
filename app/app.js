
// Requires
const authEvents = require('./auth/events')
const gameEvents = require('./game/events')
const Modal = require('bootstrap').Modal
const testing = require('./testing')

$(() => {
    // Modal instantiation
    const authModal = new Modal($('#authModal'))

    // Initially hidden elements
    $('#account-created-badge').hide(0)
    $('#signin-failed-badge').hide(0)
    $('#signup-failed-badge').hide(0)
	$('#password-match-badge').hide(0)
    $('#reset-game-btn').hide(0)
    $('#signout-button').hide(0)
    $('.signup-toggled').hide(0)
    $('#modal-signup').hide(0)

    // On-click game events
    $('#reset-game-btn').on('click', gameEvents.onResetGame)
    $('.box').on('click', gameEvents.onBoardClick)
    // $('#start-game-btn').on('click', gameEvents.onNewGame)

    // Start-game form
    $('#players-form').on('submit', gameEvents.onStartGame)

    // On-click authenticaion events
    $('#launch-authModal').on('click', (event) => authEvents.onSigninButton(event, authModal))
    $('#signin-register').on('click', authEvents.onSigninRegisterButton)
    $('#register-signin').on('click', authEvents.onRegisterSigninButton)
    $('#signout-button').on('click', authEvents.onSignout)
    $('#close-auth-modal').on('click', () => authEvents.onCloseAuthModal(authModal))

    // On-submits (auth forms)
    $('#authmodal-signin-form').on('submit', event => {authEvents.onSigninSubmit(event, authModal)})
    $('#authmodal-signup-form').on('submit', event => {authEvents.onRegister(event, authModal)})
})