# test Api Node JS

lien de production: [Sayna-TestFront-NodeJs](https://test-api-sayna-nao.herokuapp.com/)

## Running Locally

Soyons en sure que nous avons [Node.js](http://nodejs.org/) déjà installé.

```sh
$ npm install --save-dev prettier
$ git clone https://github.com/naojulius/Sayna-TestFront-NodeJs.git
$ cd Sayna-TestFront-NodeJs
$ npm install
$ npm run dev
```

L'application devra être lancée sous [localhost:6060](http://localhost:6060/).

## Déploiement sur Heroku

```
$ heroku create
$ git push heroku main
$ heroku open
```

## Uri
Authentification enregistrement
```
https://test-api-sayna-nao.herokuapp.com/auth/register

{
    "firstname": "nao",
     "lastname": "julius",
    "email": "naoj8lius@gmail.com",
    "password": "nao",
    "dateNaissance": "11-12-2020",
    "sexe": "Homme"
}
```



Authentification login
```
https://test-api-sayna-nao.herokuapp.com/auth/login
```




