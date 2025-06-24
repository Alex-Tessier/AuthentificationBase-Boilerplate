# AccessHub Boilerplate

AccessHub : Un boilerplate complet pour démarrer vos projets .NET 9 et React 19, incluant un système d'authentification avec jeton JWT et Refresh Token.

## Technologies utilisées
- .NET 9
- React 19
- SQL
- Tailwind CSS

## Fonctionnalités prévues
- Chaque utilisateur pourra se connecter et aura 1 Refresh Token et 1 jeton JWT, et ne pourra donc être connecté qu'à partir d'un seul appareil à la fois. Ceci est mis en place car il n'y a pas de MFA.
- Lorsque le jeton JWT est rafraîchi, le Refresh Token l'est également.
- Lorsque le compte est connecté sur un autre appareil, l'ancien Refresh Token devient invalide.
- Lorsque l'utilisateur se déconnecte du compte, le Refresh Token devient invalide.
- Chaque utilisateur pourra avoir des rôles de sécurité et pourra faire partie d'équipes.
- Les rôles de sécurité et les équipes pourront avoir des permissions.
- Les permissions ne retirent pas des accès mais en donnent.