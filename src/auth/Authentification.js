export const userService = {
    login,
    logout,
    register,
    forgot
};

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

function login(username, password, auth) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return sleep(500).then(() => {
        fetch(`/users/authenticate`, requestOptions)
        .then(user => {
            auth()
            return;
            // login successful if there's a user in the response
            if (user) {
                // store user details and basic auth credentials in local storage 
                // to keep user logged in between page refreshes
                user.authdata = window.btoa(username + ':' + password);
                localStorage.setItem('user', JSON.stringify(user));
                
            }

            return user;
        });
    })
}

function register(username, password, pseudo, auth) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return sleep(500).then(() => {
        fetch(`/users/authenticate`, requestOptions)
        .then(user => {
            auth()
            return;
            // login successful if there's a user in the response
            if (user) {
                // store user details and basic auth credentials in local storage 
                // to keep user logged in between page refreshes
                user.authdata = window.btoa(username + ':' + password);
                localStorage.setItem('user', JSON.stringify(user));
                
            }

            return user;
        });
    })
}

function forgot(email) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    };

    return sleep(500).then(() => {
        fetch(`/users/authenticate`, requestOptions)
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

