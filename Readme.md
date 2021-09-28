# RidyRide

Pick your starting point and destination you want to get to and off you go! REST Api to create and retrieve rides. 

### ADD A CONFIG FILE :<br />

In the root directory create new file:
- **.env:**<br />
  `PORT=8010`<br />
## Install

    npm i

### Run the app

    npm run dev

### Run the tests

    npm test


## Documentation

Documentation for this project is in form of swagger UI. Folder 'docs' holds configuration for swagger UI documentation. Folder 'rides' holds all the available CRUD operations on a given route. Each file in this folder represent one REST API endpoint. Once the application is started documentation can be viewed on http://localhost:8010/api-docs
## Load Testing

In order to run load tests on the app make sure you have artillery installed with 'npm i -g artillery'. Start the application and run 'npm run test:load' 
