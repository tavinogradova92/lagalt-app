# :bulb: Lagalt - Frontend for The Great Project Manager :bulb:

### By [Tanja Vinogradova](https://github.com/tavinogradova92), [Andreas Kjelstrup](https://github.com/AndreasKjelstrup) and [Rune Hou Thode](https://github.com/Kikkomann)

A platform for managing projects of all kinds. Create a project within a specific industry and get members to hjoin that project or join other peoples projects. :sunny:
<br>

_This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.2._

## :dancers: and install dependencies:

```
git clone https://github.com/tavinogradova92/lagalt-app.git
cd lagalt-front
npm i
```

## :runner: the application:

Run `ng serve` in the project directory to start the development server for a dev server. Navigate to `http://localhost:4200/` to play around with the application.

It needs access to the [Lagalt API](https://gitlab.com/rhout/lagalt-back), which you can run locally (recommended) or you can use the deployed version by setting `https://lagalt-app.herokuapp.com/api/v1/` as the `baseUrl` in [environment.ts](./src/environments/environment.ts).

**Note:** _For now the application only support pre-defined industries. These can be added in the backend manually, or feel free to start extending the functionality._
