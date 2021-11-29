# Api nodejs 
Cette application est faite à partir de la technologie NodeJS et typescript en utilisant une base de donnée NOSQL MongoDB (hébergé sur ATLAS)
Note 1:  L"application devra être transpilée avant le déploiement en production ou en locale. ```npm run build```. la version tanspilé seras dans la répértoire ```build```.

Note 2: 


*** Par Nao Julius ***

lien de production: [Sayna-TestFront-NodeJs](https://test-api-sayna-nao.herokuapp.com/)

## Déploiement en serveur local

Soyons en sure que nous avons [Node.js](http://nodejs.org/) déjà installé.

```sh
$ npm install --save-dev prettier
$ git clone https://github.com/naojulius/Sayna-TestFront-NodeJs.git
$ cd Sayna-TestFront-NodeJs
$ npm install
$ npm run dev
```

L'application devra être lancée sous [localhost:6060](http://localhost:6060/).

## Les uri et méthodes
### Authentification enregistrement
```diff
+ POST https://test-api-sayna-nao.herokuapp.com/auth/register
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
### Authentification Déconnexion utilisateur
```diff
- DELETE https://test-api-sayna-nao.herokuapp.com/user/{token}
```
### Toutes les utilisateurs
```diff
# GET https://test-api-sayna-nao.herokuapp.com/user/all/{token}
```

### Un utilisateur
```diff
# GET https://test-api-sayna-nao.herokuapp.com/user/{token}
```
### Mise à jour utilisateur
```diff
! PUT https://test-api-sayna-nao.herokuapp.com/user/{token}
```




