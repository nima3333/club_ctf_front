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

function login(username, password, auth, setError) {
    var data = JSON.stringify({
        "pseudo": username,
        "password": password
      });
      
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      
      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                var res = JSON.parse(this.responseText);          
                localStorage.setItem('jwt', res.jwt);
                auth();
            } else {
                // TODO : afficher messsage erreur
                setError()
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
      xhr.timeout = 2000;
      xhr.send(data);
}

function register(mail, password, confirmPassword, pseudo, phone, auth) {

    if (password !== confirmPassword) {
        // FIXME : Message d'erreur
        console.log("Les mots de passe ne correspondent pas");
    } else {
        var data = JSON.stringify({
            "pseudo": pseudo,
            "hash": password,
            "mail": mail,
            "phone": phone
          });
          
          var xhr = new XMLHttpRequest();
          xhr.withCredentials = true;
          
          xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    login(pseudo, password, auth);
                } else {
                    // FIXME : afficher messsage erreur
                    console.log("Impossible de créer le compte");
                }
            }
          });
          
          xhr.open("POST", env.server_url + "api/v1/user/create.php");
          xhr.setRequestHeader("Content-Type", "application/json");
          xhr.setRequestHeader("Authorization", "Basic Q1RGQVBJR0VORVJJQzpVYTIyTVR2UW9Xa0Vld1pXTTMyaERNOGVWRGZlUFI=");
          xhr.setRequestHeader("Accept", "*/*");
          xhr.setRequestHeader("Cache-Control", "no-cache");
          xhr.setRequestHeader("cache-control", "no-cache");
          
          xhr.send(data);
    }
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
    localStorage.removeItem('jwt');
}

