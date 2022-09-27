# Code 401 Lab - XX

## PROJECT NAME

### Author: Robert Shepley
<!-- Replace URL's and add more necessary links -->
- [Tests Report](URL)
- [Assignment Pull Request](URL)
- [Heroku Prod Deployment](URL)

### Setup

#### Running the application locally

- Clone the repository to your local machine, then run the following commands in your terminal -

  ```bash
    npm install
    touch .env
  ```

- Add the following lines to the newly created `.env` file.

  ```text
  PORT=<port number>
  ```

- Run the following command -

  ```bash
    npm start
  ```

- Congratulations! You should now be able to access the application in your browser by navigating to https://localhost:PORT, with PORT being the port number that you specified in the .env.

#### Endpoints

- Endpoint: `/`
  - Response: `The server works!`

- Endpoint: `/bad`
  - Returns JSON Object
  
```json
  {
    "error": 500,
    "route": "/bad",
    "query": {},
    "message": "Bad endpoint"
  }
```

### Tests

- Unit Tests: `npm run test`
- Lint Tests: `npm run lint`

### UML

(Created with [diagrams](https://app.diagrams.net/))

![UML Image](URL)