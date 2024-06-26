# Currency Exchange API

A Node.js RESTful API for fetching currency exchange rates using the CurrencyFreaks API. This project implements caching, rate limiting, Dockerization

## Features

- Fetches latest exchange rates from CurrencyFreaks API.
- Caching to reduce API calls.
- Rate limiting to prevent abuse.
- Dockerized for easy deployment.


## Requirements

- Node.js (v16 or later)
- Docker (optional)
- Docker Compose (optional)
- A CurrencyFreaks API key

## Setup

### Using Node.js



1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/currency-exchange-api.git
   cd currency-exchange-api

   

# Currency Exchange API Server

This Node.js application serves as a currency exchange API server using the CurrencyFreaks API.

## Setup

1. **Install Dependencies:**
   ```
   npm install
   ```

2. **API Key Configuration:**
   - Obtain an API key from CurrencyFreaks.
   - Add your API key to the environment variables or directly in the application where required.

3. **Start Server:**
   ```
   node server.js
   ```
   The server will run at http://localhost:3000 by default.

## API Endpoints

### Fetch Exchange Rates

Fetches the exchange rate between two currencies.

- **URL:** `/exchange-rates`
- **Method:** GET
- **Query Parameters:**
  - `from` (required): The base currency code (e.g., USD)
  - `to` (required): The target currency code (e.g., EUR)
- **Response:**
  ```json
  {
    "date": "2024-03-21 13:26:00+00",
    "from": "USD",
    "to": "EUR",
    "rate": "0.9279",
    "source": "CurrencyFreaks API"
  }
  ```

### Example Request
Make a GET request using Postman or similar tools:
```
GET http://localhost:3000/exchange-rates?from=USD&to=EUR
```

### Expected Responses

- **200 OK:** Successful exchange rate retrieval.
- **400 Bad Request:** Missing required query parameters.
- **404 Not Found:** Exchange rate not found.
- **500 Internal Server Error:** Server or API error.

## Error Handling

- **400 Bad Request:** If the `from` or `to` parameters are missing.
- **404 Not Found:** If the requested exchange rate is not available.
- **500 Internal Server Error:** For any server or API-related issues.


