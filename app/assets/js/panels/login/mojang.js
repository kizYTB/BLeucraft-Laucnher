const { auth, config } = require('./assets/js/utils.js')
const dataDirectory = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Application Support' : process.env.HOME)

document.getElementsByName('pseudo')[0].placeholder='Adresse E-mail';

document.querySelector(".login-btn").addEventListener("click", () => {
    if (document.querySelector(".pseudo").value == ""){
        document.querySelector(".info-login").innerHTML = "Entrez votre adresse email / nom d'utilisateur"
        document.querySelector(".info-login").style.color = "red";
        document.querySelector(".info-login").style.display = "block"
        return;
    }

    if (document.querySelector(".password").value == ""){
        document.querySelector(".info-login").innerHTML = "Entrez votre mot de passe"
        document.querySelector(".info-login").style.color = "red";
        document.querySelector(".info-login").style.display = "block"
        return;
    }

    document.querySelector(".login-btn").disabled = true
    document.querySelector(".pseudo").disabled = true
    document.querySelector(".password").disabled = true
    document.querySelector(".info-login").style.color = "#000000";
    document.querySelector(".info-login").innerHTML = "Connexion en cours..."
    document.querySelector(".info-login").style.display = "block"
    auth.loginMojang(document.querySelector(".pseudo").value, document.querySelector(".password").value).then(user => {

        if(document.querySelector(".loginRemember").checked == true){
            const Account = {
                "login":{
                    "Mojang": {
                        "user": user
                    }
                }
            }
            config.config().then(res => fs.writeFileSync(`${dataDirectory}/${res.dataDirectory}/config.json`, JSON.stringify(Account, null, 4), 'UTF-8'))
        }

        changePanel("login", "home")
    }).catch (err => {
        document.querySelector(".login-btn").disabled = false
        document.querySelector(".pseudo").disabled = false
        document.querySelector(".password").disabled = false
        document.querySelector(".info-login").innerHTML = "Adresse E-mail ou mot de passe invalide"
        document.querySelector(".info-login").style.color = "red";
        document.querySelector(".info-login").style.display = "block"
    })
})