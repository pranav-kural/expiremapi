# Dispatch-Action-Handler Pattern

A code-execution and application state-management pattern inspired from the way reducers are implemented in Redux. Three main benefits: achieve a high level of loose coupling, more efficient development while enhancing code management, and finally, enables easier implementation of a code monitoring & logging system within the application (ex: API endpoints call log)

## Table of contents

- [Dispatch-Action-Handler Pattern](#dispatch-action-handler-pattern)
  - [Table of contents](#table-of-contents)
  - [Android](#android)
      - [Problem](#problem)
      - [Solution: _Dispatch-Action-Handler Pattern_](#solution-dispatch-action-handler-pattern)
      - [Dispatch Action Call Execution:](#dispatch-action-call-execution)
        - [Dispatch Action Response Handling:](#dispatch-action-response-handling)
  - [Web (REST API)](#web-rest-api)
    - [Dispatch-Action-Handler Pattern](#dispatch-action-handler-pattern-1)
    - [Request->Data->Commit->Response Cycle](#request-data-commit-response-cycle)

## Android

Below is an explanation of one of ways DAH can be implemented in an android application.

#### Problem

1. Classes handling modification of data has to implement a multitude of methods and operations, but a lot of these methods have similar precondition checks, and a lot of these don't have code of more than a single-line besides the precondition checks. This leads to a lot of repetitive code, and a larger and less manageable code file.
2. Handle disprepencies between local and remote data. We want to avoid a situation where remote data fails to update but local app data is updated, so user is unaware of unsaved and unprocessed changes, which could have huge consequences for the user.
3. Prevent tight coupling between a data handling class and a UI interface provider class.

#### Solution: _Dispatch-Action-Handler Pattern_

**Terminology:**

- Data handler: provider of methods which handling data modification both remotely and locally
- Data Actions or Action Handlers: provider of a databse product specific methods (example Firestore specific methods) to work with only remote data
- UI Activity - part of the user interface, also the origin and the end of a data modification cycle

A Data handler defines (publically accessible) list of database operations it performs (ex: public enum). It also has to define three methods: **dispatch** (for handling initial call for an action), **handleActionSuccess** (for handling success response of an operation from Action handler), and **handleActionFailure** (for handling failure response of an operation from Action handler).

Any UI component which needs to execute a data modification operation, calls the appropriate data handler's **dispatch** method, providing it first: **type of operation** (which it defines using list of allowed operations publically exposed by the data handler), second: **payload** (which is any data that it needs to provide as input for successful execution of the action), third: **this** (pass its own instance given that the UI screen making call already implements interface **StatefulView**, so it can be informed of success or failure).

**StatefulView** interface defined methods _dbOperationSuccessHandler_ & _dbOperationFailureHandler_ which every UI component making calls for data updates (especially remote data) needs to implement. Such a pattern of callbacks is required to integrate our application with Firebase's non-blocking asynchoronous code execution strategy.

**Actions handler** executes the database operation, and calls the **handleActionSuccess** of _data handler_ which made the call to the action (data handler is globally accessible, doesn't have to pass its instance down), passing it first: **type of operation** for which it is a success, and **payload** (which is any result of the operation). If there is a failure, it calls **handleActionFailure** instead with type of opertion which failed, and an error message.

**handleActionSuccess** method of the data handler implements the logic to solve our second problem, i.e., once data has been updated remotely, only then _handleActionSuccess_ gets called with appropriate operation type and payload (data), based on which then local data is updated. Hence, we prioritize the update of remote data (considering it to be the **single source of truth (SSOT)**)

Below images display execution cycle when using DAH pattern.

#### Dispatch Action Call Execution:

<img src="https://docs.google.com/drawings/d/e/2PACX-1vQLi-nnOXPIEWBanxijBuXaaJjW-TKR8-DiG6xtLyRztvnZyNbVe41pwLobkEO6SMuUlt-oVcit1RWm/pub?w=1440&amp;h=1080" alt="Dispatch Action Call Execution" width="500"/>

##### Dispatch Action Response Handling:

<img src="https://docs.google.com/drawings/d/e/2PACX-1vRpGCc2T-jvPLcs52VotdXkJwOT-ku7l0sT6xLC_hlJg7QUL-9xXpe8W1NiBTd1UcRl3AGTyxGFk3pQ/pub?w=1440&amp;h=1080" alt="Dispatch Action Response Handling" width="500">

## Web (REST API)

### Dispatch-Action-Handler Pattern

Inspired from the code execution pattern commonly used with reducers like Redux, the Dispatch-Action-Handler (DAH) pattern has been implemented.

Handlers **dispatch** an **action** from one of the pre-defined _action types_, providing an optional _payload_ containing any data that needs to be passed on, and an optional callback function as the **next** or **response** method that the action execution should pass the response to, or make the call to, after operation execution is completed.

![DAH Pattern](https://i.ibb.co/4J3bGHL/A1-C3-A8-D3-F373-4-EC2-8-C11-E7-C070345-CC5.jpg)

### Request->Data->Commit->Response Cycle

A specific pattern has been implemented for handling code execution flow from the Request handler to the Modal and handling the response back to the Router.

Execution is initiated from a router. Router dispatches an action request which is handled by an appropriate **request handler**. The request handler than makes the call to a specific **data handler** function, passing it the data needed, if any. The data handler, uses an appropriate **validation handler** to perform any required validation of data. On successful validation, it dispatches an appropriate action to the **commit handler**. The commit handler then carries out the execution of operation (likely on a database), and passes on the response to the **response handler**.

This is essentially a one-way execution flow: `Router -> Request Handler -> Data Handler -> Commit Handler -> Response Handler`

How the RDCR cycle fits into RCM architecture:
Router: Router
Controller: Request Handlers
Modal: Data Handlers, Validation Handlers, Commit Handlers

RDCR cycle implemented using **DAH** pattern helps in achieving:

- **Modularization**: Each layer handles a specific task, hence modularizing the code and reducing complexity in scaling & maintainence, and increasing the code quality and readability
- **Abstraction**: Controller, which calls the handler functions, need not know how handler implements them, and handler, which dispatches actions, need not worry about how they are executed down the line
- **Efficiency**: Handling multiple consecutive requests from the Controller is highly efficient since the flow of execution is one-way. Response is never returned to the controller, so it never travels back up the chain of execution. It is instead handled by the response handler provided by the controller when the request is initiated
- **Debugging**: Having well defined possible action types ensures code correctness and provides useful insights when programming and debugging
- **Code Scalability**: Implementing separate handler functions for each data type (example: users, items, etc.) enables the possiblity to scale code at a rapid pace, since adding new handlers or modifying existing ones does not require other handlers to be modified
