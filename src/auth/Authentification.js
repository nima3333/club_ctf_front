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
            } else if (this.status === 404){
                setError();
            } else if (this.status === 400) {
                console.log(this.responseText);
            }
            //erreur de co au back
            else if (this.status === 0) {
                setError();
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

function register(mail, password, confirmPassword, pseudo, phone, auth, setError) {

    //TODO: regex pour mail, tel, taille mot de passe etc (pas urgent)
    // Pas de vérification de la disponibilité du pseudo / mail côté front, le back
    // devrait renvoyer différents messages d'erreurs (pas encore implémenté).
    if (mail === "" || password === "" || confirmPassword === "" || pseudo === "" || phone === "" ) {
        setError("Veuillez remplir tous les champs");
    } else if (password !== confirmPassword) {
        setError("Les mots de passe ne correspondent pas");
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
            console.dir(this)
            if (this.readyState === 4) {
                if (this.status === 201 || this.status === 200) {
                    login(pseudo, password, auth, setError);
                } else if (this.status === 503){
                    setError("Impossible de créer le compte");
                }
                //erreur de co au back
                else if (this.status === 0){
                    setError("Problème de connexion");
                }
            }
          });
          
          xhr.open("POST", env.server_url + "api/v1/user/create.php");
          xhr.setRequestHeader("Content-Type", "application/json");
          xhr.setRequestHeader("Authorization", "Basic Q1RGQVBJR0VORVJJQzpVYTIyTVR2UW9Xa0Vld1pXTTMyaERNOGVWRGZlUFI=");
          xhr.setRequestHeader("Accept", "*/*");
          xhr.setRequestHeader("Cache-Control", "no-cache");
          xhr.setRequestHeader("cache-control", "no-cache");
          xhr.timeout = 2000;
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

