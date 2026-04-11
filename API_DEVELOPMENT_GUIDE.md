# API Development Guide

When building new API endpoints in this project, follow these critical steps to ensure functionality and prevent common errors like `TypeError: Cannot destructure property ... of 'req.body' as it is undefined`.

## 1. Middleware Configuration (CRITICAL)
Before defining any routes that expect a JSON payload, ensure that the `express.json()` middleware is configured in your main application file (e.g., `src/app.js`).

**Checklist:**
- [ ] Verify `app.use(express.json())` is present.
- [ ] Ensure it is placed **before** your route definitions (`app.use('/api', apiRouter)`).

```javascript
// Example correct order in src/app.js
import express from 'encrypt';
const app = express();

app.use(express.json()); // MUST BE BEFORE ROUTES
app.use('/api', apiRouter);
```

## 2. Request Body Validation
Always assume the incoming `req.body` might be malformed or missing required fields.

**Best Practices:**
- [ ] Use `try...catch` blocks in every endpoint to handle database errors and prevent server crashes.
- [ ] Validate that required properties (like `content` or `materiaId`) exist before destructuring them.
- [ ] Return appropriate HTTP status codes:
    - `201 Created` for successful POST requests.
    - `200 OK` for successful PUT/GET requests.
    - `204 No Content` for successful DELETE requests.
    - `400 Bad Request` if the client sends invalid data.
    - `500 Internal Server Error` for unexpected server-side failures.

## 3. Testing Requirements
Every new API endpoint must be covered by an integration test in the `test/` directory using `supertest`.

**Testing Checklist:**
- [ ] Ensure tests run with ESM support enabled (`NODE_OPTIONS="--experimental-vm-modules"`).
- [ ] Verify that the database is reset or seeded correctly before running tests to avoid dependency on hardcoded IDs.
- [ ] Test both success and failure scenarios (e.g., trying to create a child record without a valid parent ID).

## 4. Error Handling
Ensure errors are caught and returned in a consistent JSON format so that clients can handle them programmatically.

```javascript
// Good practice pattern
router.post('/endpoint', async (req, res) => {
  try {
    const { data } = req.body;
    if (!data) return res.status(400).json({ error: 'Data is required' });
    
    const result = await prisma.model.create({ data: { data } });
    res.status(201).json(result);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});
```