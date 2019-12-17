# testcafe-once-hook

This is a workaround for the `beforeAll` feature described in `put-a-link-here`.

The main idea of the feature request is to add the capability to execute test actions via TestController (click, hover, typeText, etc) once per fixture before starting all tests.

Use case:
* we have a db;
* we want to add a single record into the db using the user interface and test actions;
* we want to run tests in different browsers;
* we want to remove a test record from the db using the user interface and test actions.


## Description
The example works by using https://expressjs.com/ and https://github.com/typicode/lowdb

- `/` - shows the list of records from the `JSON` file;
- `/add` - adds a new record to the `JSON` file and redirects to the main page;
- `/remove` - removes a record from the `JSON` file and redirects to the main page.

To start the project, execute the `npm start` command;

## Once helper
Use the `once` helper from the `utils/once.js` file in the `fixture.beforeEach` and `fixture.afterEach` hooks.
The `once` helper will execute its callback function only once per a browser for `fixture.before` and `fixture.after`. The first defined browser will be chosen.

Go to the `tests` directory to see the examples.

## Run tests
Run the `npm test` command to start the project and run tests.
