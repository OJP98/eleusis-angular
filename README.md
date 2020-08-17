# eleusis-angular
Eleusis game made with Angular as Frontend and Javascript for backend with **WebSockets**.

## Requirements

* **NodeJS**: Version 10 or higher.

## Features

* Made with Angular 10.0.4.
* Backend communication made exclusively with [WebSockets](https://www.npmjs.com/package/ws).
* Support for multiple-rooms.
* Live chat with other players on the same room.

## Run the game in a local enviroment

1. Make sure you are running the frontend project from either *Development* or *Production* enviroment. For more details, please go into [eleusis-app](https://github.com/OJP98/eleusis-angular/tree/master/eleusis-app) and check out the README file. You should be able to see the home screen asking you for a *Server URL* in order to continue.

2. Running the server.
  * Go into the [server](https://github.com/OJP98/eleusis-angular/tree/master/server) folder.
  * Run `npm install` to install the server dependencies.
  * Run `node index.js`. This will make your server constantly listen on <ws://localhost:8080>.

3. Enter the *Server URL* details on the input and proceed to connect to the server.

4. If none of your friends ha
