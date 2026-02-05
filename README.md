## Mock EnergyGrid API & Client

This repository contains a mock API server and a Node.js client built to safely consume it under strict constraints.

---

## 📁 Project Structure
```
    mock-api/       → Express-based mock server
    mock-client/    → Node.js (TypeScript) client
```
## 🔌 mock-api

A mock EnergyGrid API built with Express that simulates real-world constraints:
Constraints enforced

- Rate limit: 1 request per second (strict)
- Batch size: Max 10 solar inverters per request
- Security: MD5-based request signature validation
- Errors: Returns 401 for invalid signature, 429 for rate limit violation

<b>Starts the server : </b>
```
    cd mock-api
    npm install
    npm start
```
<b>Server runs on: </b> http://localhost:3000

---

## 🤖 mock-client

A Node.js TypeScript client that consumes the mock API without triggering any 401 or 429 errors.

<b>What the client does</b>
- Generates 500 dummy solar inverter IDs
- Splits them into batches of 10
- Sends requests sequentially (1 req/sec)
- Signs each request correctly
- Aggregates all responses into a single report

<b> Design highlights</b>
- Custom in-memory queue/worker
- No parallel requests
- No retries needed (rate & timing fully controlled)

<b> Output : </b> 
- Aggregated results are stored in: ```report.json```

<b> cd mock-client</b>
```
  npm install
  npm run build
  npm start
```
