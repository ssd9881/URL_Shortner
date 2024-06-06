# URL_Shortner

### URL Shortener

A simple and efficient URL Shortener service using Node.js, Express, and MongoDB.

#### Features:
- **Generate Short URLs**: Create short and unique URLs that redirect to specified long URLs.
- **Track Analytics**: Monitor the number of clicks and view detailed visit history.

#### Requirements:
- Node.js
- MongoDB

#### Installation:

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/url-shortener.git
    cd url-shortener
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Set up your MongoDB connection in `connect.js`:
    ```javascript
    const mongoose = require('mongoose');

    async function connectMongoDB(url) {
        return mongoose.connect(url);
    }

    module.exports = {
        connectMongoDB
    };
    ```

4. Start the server:
    ```sh
    npm start
    ```

#### Usage:

- **Generate Short URL**:
    - Endpoint: `POST /url`
    - Request Body:
        ```json
        {
            "URL": "https://example.com"
        }
        ```
    - Response:
        ```json
        {
            "id": "shortID"
        }
        ```

- **Get Analytics**:
    - Endpoint: `GET /url/analytics/:shortID`
    - Response:
        ```json
        {
            "totalClicks": 42,
            "analytics": [
                {"timestamp": 1675909073000},
                {"timestamp": 1675910073000}
            ]
        }
        ```

#### Project Structure:

- **connect.js**: MongoDB connection configuration.
- **index.js**: Main server file.
- **models/url.js**: Mongoose schema and model for URLs.
- **routes/url.js**: Express routes for generating short URLs and fetching analytics.
- **controllers/url.js**: Logic for handling URL creation and analytics retrieval.

#### Example:

**Generating a Short URL**:
```sh
curl -X POST -H "Content-Type: application/json" -d '{"URL":"https://example.com"}' http://localhost:8100/url
```

**Fetching Analytics**:
```sh
curl http://localhost:8100/url/analytics/shortID
```

#### Dependencies:

- **express**: Web framework for Node.js.
- **mongoose**: MongoDB object modeling tool.
- **shortid**: Library for generating short unique IDs.
- **nanoid**: Another library for generating unique IDs.
- **nodemon**: Utility for automatically restarting the server during development.

#### package.json:
```json
{
  "name": "url-shortner",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon index.js"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.19.2",
    "mongoose": "^8.4.1",
    "nanoid": "^5.0.7",
    "nodemon": "^3.1.3",
    "shortid": "^2.2.16"
  }
}
```

With this setup, you have a fully functional URL Shortener service that can generate short URLs and track click analytics. Feel free to contribute and improve the project!
