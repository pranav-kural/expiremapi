# Dispatchers Pattern

Dispatcher-Handlers Pattern

- _Route_ -> dispatches "REQUEST" action
  - _dispatcher_ -> passes the request action to appropriate _REQUEST HANDLER_
    - _Request Handler_ -> performs **auth** & dispatches "DATA" action
      - _dispatcher_ -> passes the initiate action to _DATA HANDLER_
        - _Data Handler_ -> performs **data validation** & dispatches "COMMIT" action
          - _dispatcher_ -> passes the commit action to _COMMIT HANDLER_
            - _Commit Handler_ -> performs the **commit operation** & passes the response to the provided _response handler_
