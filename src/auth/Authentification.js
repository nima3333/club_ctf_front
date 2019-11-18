var env = require('../misc/env.js');

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
    var data = JSON.stringify({
        "pseudo": username,
        "password": password
      });
      
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      
      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                // TODO : Lorsque log out, virer le localstorage
                var res = JSON.parse(this.responseText);          
                localStorage.setItem('jwt', res.jwt);
                var jwt = localStorage.getItem('jwt');
                auth();
            } else {
                // TODO : afficher messsage erreur
                console.log("Erreur de login");
            }
        }
      });
      
      xhr.open("POST", env.server_url + "api/v1/auth/login.php");
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.setRequestHeader("Authorization", "Basic Q1RGQVBJR0VORVJJQzpVYTIyTVR2UW9Xa0Vld1pXTTMyaERNOGVWRGZlUFI=");
      xhr.setRequestHeader("Accept", "*/*");
      xhr.setRequestHeader("Cache-Control", "no-cache");
      xhr.setRequestHeader("cache-control", "no-cache");
      
      xhr.send(data);
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

