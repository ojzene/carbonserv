# carbonserv

Carbon Assessment - Tracking Package

A logistics company has contracted you to build a service that will be used to track packages. Possible package statuses are PICKED_UP, IN_TRANSIT, WAREHOUSE, DELIVERED. It’s possible for a package to be IN_TRANSIT, and WAREHOUSE multiple times but it’s not possible to be PICKED_UP and DELIVERED more than once.

Build a service to cater this requirement as started by the logistics company. You are free to decide what endpoints your service will have and how they will work.

<strong> Brief Summary about Application </strong>

This application is a node based (Typescript, Express, MongoDB) API Service to create a package and track the services based on the requirement above, testing using mocha and chai

<strong> Application Structure </strong>

Following the M(V)C Architecture, the View (Frontend) is not present for the sake of the requirement, 
The controller and model application structure are stated below with other necessary files (utils folder containing the constants.ts file)

- dist
- src
  - controllers
    - package.ts
    - track.ts
  - models
    - packages.ts
    - track.ts
  - routes
    - packages.ts
    - track.ts
  - test
    - track.ts
  - utils
    - constants.ts
  - index.ts
- package.json

<strong> Running Application locally / Application Dependencies </strong>

You can easily clone this repo/codebase to your local machine

On your terminal, Navigate to your root folder, Kindly run to ensure installation of all dependencies in the package.json:

<code> npm install </code>

Once you are done with installing the dependencies / update, You can easily run the application 

<code> npm start </code> or <code> npm run dev </code>

as seen in the package.json script command:

    "scripts": {

      "test": "mocha -r ts-node/register -r tsconfig-paths/register 'src/test/*.ts' --timeout 10000",

      "start": "tsc -p tsconfig.json && nodemon dist/index.js",

      "dev": "tsc -w & nodemon dist/index.js"
    },

To test the Application

Mocha and Chai were used for this purpose of the application, to test some cases. 

This is can be achieved by navigating to the terminal and run 

<code> npm test </code>

<strong> Running Application Remotely </strong>

This application is currently hosted on Heroku server for this assessment purpose

<a href="https://carbonserv.herokuapp.com/" target="_blank"> https://carbonserv.herokuapp.com/ </a>

The necessary endpoints for this application is already attached to this repository as a postman collection, named "PackageTracking.postman_collection" and can be downloaded, can also be accessed via <a href="https://www.getpostman.com/collections/8d42a17d20747dba38fb" target="_blank"> https://www.getpostman.com/collections/8d42a17d20747dba38fb </a>


Thanks :)











 

