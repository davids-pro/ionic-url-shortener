# URL Shortener pour mobiles iOS et Android

## Fonctionnalités

- **Raccourcissement d'URLs**. URL Shortener est une application mobile permettant de réduire drastiquement n'importe quelle URL en une URL courte du type *https://mondomaine/id* avec un id unique sur 6 caractères.
- **Création de compte**. L'application permet de créer un compte utilisateur. Une fois enregistré, l'utilisateur aura la possibilité de personnaliser ses ids *https://mondomaine/mon-id*, si disponibles car ils doivent rester uniques, et pourra accéder à une interface d'adminstration d'où il pourra retrouver tous les liens générés, les supprimer si besoin mais aussi monitorer leurs nombres de clicks.
- **Création de QR Code**. Chaque URL générée sera accompagnée d'un QR Code.
- **Intégration sur réseaux sociaux**. Les URLs générées imitent parfaitement leur destination et l'utilisateur bénéficie ainsi d'une intégration parfaite avec aperçu sur les différents réseaux sociaux.
- **Rapidité**. La génération de lien ainsi que leur consultation, et donc la redirection vers la page d'origine, est quasiment instantanée.
- **Sécurité**. Toutes les données utilisateurs sont cryptées par l'API et stockés ensuite dans cet état en base de donnée. Les données locales sont elles aussi cryptées afin de garantir une sécurisation des informations utilisateur jusque dans l'appareil du client. En cas d'oubli du mot de passe, celui-ci est récupérable via un code de sécurité qui sera envoyé directement sur l'adresse mail de l'utilisateur.


## Technologies

- **Ionic CLI 6**. Framework de développement applicatif mobile. *https://ionicframework.com/*
- **Angular CLI 10**. Framework de développement applicatif. *https://cli.angular.io/*
- **CryptoJS**. Librairie JS de cryptage de données. *https://www.npmjs.com/package/crypto-js*

## Installation

```bash
npm install
```

## Environnement

L'adresse de l'API doit être renseignée dans la variable *apiEndPoint* du fichier

```bash
src/environments/environment.ts
```

## Démarrage

```bash
ionic serve
```

## License

License ISC - Internet Systems Consortium License

Créé par David Somaré - https://github.com/davids-pro