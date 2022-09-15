# ExpiRem API

ExpiRem - Expiry Reminder API

A simple yet powerful API to create intuitive and performant applications which users can use to manage expiration of products or items.

Currently in development.

- [ExpiRem API](#expirem-api)
- [Development](#development)
  - [Endpoints / Routes Implementation Status](#endpoints--routes-implementation-status)
  - [Route Implementation Strategy & Pattern](#route-implementation-strategy--pattern)
    - [Implementation Strategy](#implementation-strategy)
    - [Dispatch-Action-Handler Pattern](#dispatch-action-handler-pattern)
    - [Request-Data-Commit-Response Pattern](#request-data-commit-response-pattern)
    - [Endpoint Implementation Workflow](#endpoint-implementation-workflow)
  - [Data Validation Strategy](#data-validation-strategy)
    - [Route Options](#route-options)
    - [Validation Handlers](#validation-handlers)
  - [Available Scripts](#available-scripts)
    - [`npm run dev`](#npm-run-dev)
    - [`npm start`](#npm-start)

# Development

## Endpoints / Routes Implementation Status

[Routes implementation status](https://doc.clickup.com/36731621/p/h/130yq5-562/e795746e6b4eac7)

## Route Implementation Strategy & Pattern

### Implementation Strategy

Current implementation implements the **RCM (Route Controller Modal)** pattern to implement routes and endpoints.

Core Architecture:

**Route** describes the route endpoints, methods and routing options which include request or response validation & serialization.

**Controller** describes all possible actions that a route can initiate. This layer sits in between the modal (data) & the route (exposed endpoints).

**Modal** contains all the data, schema, methods related to them, and the utilities required to work with the data.

### Dispatch-Action-Handler Pattern

Inspired from the code execution pattern commonly used with reducers like Redux, the Dispatch-Action-Handler (DAH) pattern has been implemented.

Handlers **dispatch** an **action** from one of the pre-defined _action types_, providing an optional _payload_ containing any data that needs to be passed on, and an optional callback function as the **next** or **response** method that the action execution should pass the response to, or make the call to, after operation execution is completed.

![DAH Pattern](https://i.ibb.co/4J3bGHL/A1-C3-A8-D3-F373-4-EC2-8-C11-E7-C070345-CC5.jpg)

### Request-Data-Commit-Response Pattern

A specific pattern has been implemented for handling code execution flow from the Request handler to the Modal and handling the response back to the Router.

Execution is initiated from a router. Router dispatches an action request which is handled by an appropriate **request handler**. The request handler than makes the call to a specific **data handler** function, passing it the data needed, if any. The data handler, uses an appropriate **validation handler** to perform any required validation of data. On successful validation, it dispatches an appropriate action to the **commit handler**. The commit handler then carries out the execution of operation (likely on a database), and passes on the response to the **response handler**.

This is essentially a one-way execution flow: `Router -> Request Handler -> Data Handler -> Commit Handler -> Response Handler`

How the RDCR pattern fits into RCM architecture:
Router: Router
Controller: Request Handlers
Modal: Data Handlers, Validation Handlers, Commit Handlers

RDCR pattern implemented using DAH pattern helps in achieving:

- **Modularization**: Each layer handles a specific task, hence modularizing the code and reducing complexity in scaling & maintainence, and increasing the code quality and readability
- **Abstraction**: Controller, which calls the handler functions, need not know how handler implements them, and handler, which dispatches actions, need not worry about how they are executed down the line
- **Efficiency**: Handling multiple consecutive requests from the Controller is highly efficient since the flow of execution is one-way. Response is never returned to the controller, so it never travels back up the chain of execution. It is instead handled by the response handler provided by the controller when the request is initiated
- **Debugging**: Having well defined possible action types ensures code correctness and provides useful insights when programming and debugging
- **Code Scalability**: Implementing separate handler functions for each data type (example: users, items, etc.) enables the possiblity to scale code at a rapid pace, since adding new handlers or modifying existing ones does not require other handlers to be modified

### Endpoint Implementation Workflow

Following is the workflow for implementing new endpoints:

1. Define **schema** for the data object and it's properties OR use an existing one `[/model/schema/properties]`
2. Define the **Action Types** for the actions that could be taken with that data `[/model/data/actions]`
3. Define the **action handlers** to handle dispatched actions to be performed on the data, i.e., execute the operation on the database and also handling and returning the response `[/model/handlers/{handler-for}/{handler-for}_action_handlers]`
4. Define the **validation handlers** required to perform any data validation before the actions are dispatched `[/model/handlers/{handler-for}/{handler-for}_validation_handlers]`
5. Define the **data handlers** which will handle the request from controller, initiate and handle data validation, and finally dispatch the appropriate action(s) `[/model/handlers/{handler-for}/{handler-for}_data_handlers]`
6. Define the **Controller** methods which will handle the request from router for specific endpoints, and make to call to appropriate data handler(s) `[/controller/{controller-for}]`
7. Define the route endpoint in the route file `[/routes/{route-for}_routes]`
8. Define the route endpoint's route options including schema defintion `[/routes/{route-for}_options]`
9. Perform testing without any data validation or serialization on routes end
10. Attach the route options to the route endpoint
11. Perform endpoint testing

## Data Validation Strategy

Data needs to be validated at multiple points throughout the applications architecture to ensure some level of abstraction and isolation, while not compromising on the performance.

### Route Options

Route Options utilize ajv JSON schema validator built-into Fastify, to validate the defined schemas for various properties of the request or response object.

There is separate route options file for each high-level route (example: items, item, category, user), which contains all schema defintions for that route's endpoints.

Route options utilizes the defined app data schemas to validate for various objects, like validating the structure of an item object.

### Validation Handlers

As an additional layer of validation, and to ensure high-level abstraction, data validation is also performed in the modal using defined validation handler methods, which use a custom Ajv validator and the defined app data schemas (which are also used by fastify-ajv during route level validation).

Validation code is abstracted into the validation handlers, and is executed only from the data handlers.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

To start the app in dev mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm start`

For production mode
