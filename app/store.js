const testing = require('./testing')

// Store object to hold authorization information

const store = {
    authed: false,
    email: null,
    token: null
}

// Function and code to automatically authenticate with API

const autoSignin = (email, password) => {
    return $.ajax({
			url: 'https://tic-tac-toe-api-development.herokuapp.com/sign-in/',
			method: 'POST',
			data: {
				credentials: {
					email: email,
					password: password,
				},
			},
	})
}

if (testing) {
	const [email, password] = ['q@yt.com', 'q']
	const autoLogin = autoSignin('mac@book.com', 'Jonah').then((autoResponse) => {
        store.authed = true
        store.email = autoResponse.user.email
        store.token = autoResponse.user.token
		return autoResponse
	})
	
}

module.exports = store
