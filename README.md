# AuthentificationBase-Boilerplate

AuthentificationBase : A broilerplate for starting new project for .Net 9 and React 19 with user registraction and login including JWT and refresh token.

## Used Technology
- .NET 9
- React 19
- SQL
- Tailwind CSS

## Planned Features
- User will be able to log in and will have 1 Refresh Token and 1 JWT token and will only be able to connect to a device at a time. 
- When the JWT token is refreshed, the Refresh Token is also refreshed.
- When the account is connected from another device, the old Refresh Token becomes invalid.
- When the user logs out of the account, the Refresh Token becomes invalid.