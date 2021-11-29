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
### Authentification enregistrement
```diff
- POST https://test-api-sayna-nao.herokuapp.com/auth/register
```
```json
{
    "firstname": "nom",
    "lastname": "prénom",
    "email": "email",
    "password": "mot de passe",
    "dateNaissance": "1date de naissance",
    "sexe": "sexe"
}
```

### Authentification login/connexion
```diff
+ POST https://test-api-sayna-nao.herokuapp.com/auth/login
```
```json
{
    "email": "email",
    "password": "mot de passe"
}
```

### Authentification login/connexion
```diff
+ POST https://test-api-sayna-nao.herokuapp.com/auth/login
```
```json
{
    "email": "email",
    "password": "mot de passe"
}
```

### toutes les utilisateurs
```diff
@@ GET https://test-api-sayna-nao.herokuapp.com/user/all/{token}
```

### Un utilisateur
```diff
@@ GET https://test-api-sayna-nao.herokuapp.com/user/{token}
```

### Déconnexion utilisateur
```diff
@@ DELETE https://test-api-sayna-nao.herokuapp.com/user/{token}
```

### Mise à jour utilisateur
```diff
! PUT https://test-api-sayna-nao.herokuapp.com/user/{token}
```




