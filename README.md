# ExpiRem API

ExpiRem - Expiry Reminder API

A simple yet powerful API to create intuitive and performant applications which users can use to manage expiration of products or items.

Currently in development.

- [ExpiRem API](#expirem-api)
  - [Development](#development)
    - [Endpoints / Routes Implementation Status](#endpoints--routes-implementation-status)
    - [Route Implementation Strategy & Pattern](#route-implementation-strategy--pattern)
      - [Strategy](#strategy)
      - [Controller-Data-Action-Response Pattern](#controller-data-action-response-pattern)
    - [Data Validation Strategy](#data-validation-strategy)
      - [Route Options](#route-options)
      - [Validation Handlers](#validation-handlers)
  - [Available Scripts](#available-scripts)
    - [`npm run dev`](#npm-run-dev)
    - [`npm start`](#npm-start)

## Development

### Endpoints / Routes Implementation Status

[Routes implementation status](https://doc.clickup.com/36731621/p/h/130yq5-562/e795746e6b4eac7)

### Route Implementation Strategy & Pattern

#### Strategy

Current implementation implements the RCM (Route Controller Modal) pattern to implement routes and endpoints.

Core Architecture:

**Route** describes the route endpoints, methods and routing options which include request or response validation & serialization.

**Controller** describes all possible actions that a route can initiate. This layer sits in between the modal (data) & the route (exposed endpoints).

**Modal** contains all the data, schema, methods related to them, and the utilities required to work with the data.

#### Controller-Data-Action-Response Pattern

A specific pattern has been implemented for handling code execution flow from the Controller to the Modal and handling the response back to the Router.

Controller makes the call to a specific **data handler** function, passing it the data needed, if any. The data _handler_, uses an appropriate **validation handler** to perform any required validation of data. On successful validation, it _dispatches_ an appropriate _action_ to the **action handler**. The action handler then carries out the execution of operation (likely on a database), and passes on the _response_ to the **response handler**.

This is essentially a one-way execution flow: `Controller -> Data Handler -> Action Handler -> Response Handler`

Purposes achieved by HDAR pattern:

- Modularization: Each layer handles a specific task, hence modularizing the code and reducing complexity in scaling & maintainence, and increasing the code quality and readability
- Abstraction: Controller, which calls the handler functions, need not know how handler implements them, and handler, which dispatches actions, need not worry about how they are executed down the line
- Efficiency: Handling multiple consecutive requests from the Controller is highly efficient since the flow of execution is one-way. Response is never returned to the controller, so it never travels back up the chain of execution. It is instead handled by the response handler provided by the controller when the request is initiated
- Correctness: Having well defined possible action types ensures code correctness and provides useful insights when programming
- Code Scalability: Implementing separate handler functions for each data type (example: users, items, etc.) enables the possiblity to scale code at a rapid pace, since adding new handlers or modifying existing ones does not require other handlers to be modified

### Data Validation Strategy

Data needs to be validated at multiple points throughout the applications architecture to ensure some level of abstraction and isolation, while not compromising on the performance.

#### Route Options

Route Options utilize ajv JSON schema validator built-into Fastify, to validate the defined schemas for various properties of the request or response object.

There is separate route options file for each high-level route (example: items, item, category, user), which contains all schema defintions for that route's endpoints.

Route options utilizes the defined app data schemas to validate for various objects, like validating the structure of an item object.

#### Validation Handlers

As an additional layer of validation, and to ensure high-level abstraction, data validation is also performed in the modal using defined validation handler methods, which use a custom Ajv validator and the defined app data schemas (which are also used by fastify-ajv during route level validation).

Validation code is abstracted into the validation handlers, and is executed only from the data handlers.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

To start the app in dev mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm start`

For production mode
