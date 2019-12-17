# testcafe-once-hook

 

This module provides TestCafe hooks executed once in a single browser even when you run tests in multiple browsers. This functionality is a workaround for the issue described in [#1345](https://github.com/DevExpress/testcafe/issues/1345).

 

The `testcafe-once-hook` module exports two functions:

 

- `oncePerFixture` runs in the first specified browser before and after all tests in a fixture. Unlike the `fixture.before` and `fixture.after` hooks designed for server-side operations, `oncePerFixture` allows you to execute test actions in the browser.
- `oncePerTest` runs in the first specified browser before and after each test in a fixture, while regular `beforeEach` and `afterEach` hooks run in every browser. 

 

--------------------

 

This use case example does the following:

 

1. Adds a record to a database with test actions (via the web interface);
2. Runs tests in different browsers;
3. Removes the record from the database with test actions (via the web interface).

 

## Description

 

This example uses [express](https://expressjs.com/) and [lowdb](https://github.com/typicode/lowdb).

 

* `/` - shows the list of records from the `JSON` file;
* `/add` - adds a new record to the `JSON` file and redirects to the main page;
* `/remove` - removes a record from the `JSON` file and redirects to the main page.

 

To start the project, execute the `npm start` command.

 

Go to the `tests` directory to see the examples.

 

## Run tests

 

Run the `npm test` command to start the project and run tests.
