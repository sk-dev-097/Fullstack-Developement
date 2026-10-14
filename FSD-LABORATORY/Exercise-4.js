/**
 * Web Technology Laboratory - Experiment 04
 * Node.js Web Application Handling GET & POST Requests
 */

// Import required modules
const express = require('express');
const path = require('path');

// Initialize express application
const app = express();
const PORT = process.env.PORT || 3000;

// =========================================================================
// MIDDLEWARE CONFIGURATION
// =========================================================================

// Built-in middleware to parse incoming URL-encoded form data (e.g., HTML forms)
app.use(express.urlencoded({ extended: true }));

// Built-in middleware to parse incoming JSON payloads (e.g., API requests)
app.use(express.json());

// Serve static files from 'public' directory if available
app.use(express.static(path.join(__dirname, 'public')));

// Mock Database / In-Memory Storage
const registeredUsers = [
    { id: 1, name: "Alice Smith", email: "alice@example.com", role: "Student" },
    { id: 2, name: "Bob Jones", email: "bob@example.com", role: "Instructor" }
];

// =========================================================================
// 1. GET REQUEST HANDLERS
// =========================================================================

/**
 * @route   GET /
 * @desc    Serves home status page
 */
app.get('/', (req, res) => {
    res.status(200).send(`
        <html>
            <head><title>Node.js GET & POST Server</title></head>
            <body style="font-family: Arial, sans-serif; padding: 20px;">
                <h1>Node.js GET & POST Server running!</h1>
                <p>Use endpoints: <code>/api/search</code> (GET) or <code>/api/register</code> (POST)</p>
            </body>
        </html>
    `);
});

/**
 * @route   GET /api/search
 * @desc    Handles GET request with Query Parameters
 * @example /api/search?keyword=node&category=web
 */
app.get('/api/search', (req, res) => {
    console.log('[GET REQUEST RECEIVED] Headers:', req.headers['user-agent']);
    console.log('[GET QUERY PARAMS]:', req.query);

    // Destructure query parameters with fallback values
    const { keyword = '', category = 'all' } = req.query;

    if (!keyword) {
        return res.status(400).json({
            status: "error",
            message: "Missing required query parameter 'keyword'",
            timestamp: new Date().toISOString()
        });
    }

    // Process query logic
    res.status(200).json({
        status: "success",
        method: "GET",
        receivedQuery: { keyword, category },
        resultsCount: 2,
        data: [
            { id: 101, title: `Result for '${keyword}' in ${category}`, relevance: "High" },
            { id: 102, title: `Secondary Result for '${keyword}'`, relevance: "Medium" }
        ],
        timestamp: new Date().toISOString()
    });
});

/**
 * @route   GET /api/users
 * @desc    Returns list of all registered users
 */
app.get('/api/users', (req, res) => {
    res.status(200).json({
        status: "success",
        method: "GET",
        total: registeredUsers.length,
        users: registeredUsers
    });
});

// =========================================================================
// 2. POST REQUEST HANDLERS
// =========================================================================

/**
 * @route   POST /api/register
 * @desc    Handles POST request with JSON or Form Body payload
 */
app.post('/api/register', (req, res) => {
    console.log('[POST REQUEST RECEIVED] Content-Type:', req.headers['content-type']);
    console.log('[POST REQUEST BODY]:', req.body);

    const { name, email, role } = req.body;

    // Validation
    if (!name || !email) {
        return res.status(400).json({
            status: "fail",
            message: "Validation Error: 'name' and 'email' fields are required.",
            receivedBody: req.body
        });
    }

    // Create new record
    const newUser = {
        id: registeredUsers.length + 1,
        name: name.trim(),
        email: email.trim(),
        role: role || "Student",
        createdAt: new Date().toISOString()
    };

    registeredUsers.push(newUser);

    // Return 201 Created Response
    res.status(201).json({
        status: "success",
        method: "POST",
        message: "User registered successfully!",
        data: newUser
    });
});

// =========================================================================
// 404 HANDLER & SERVER STARTUP
// =========================================================================
app.use((req, res) => {
    res.status(404).json({ error: "Endpoint Route Not Found" });
});

app.listen(PORT, () => {
    console.log(`===================================================`);
    console.log(`Server actively running on http://localhost:${PORT}`);
    console.log(`Ready for GET and POST HTTP requests...`);
    console.log(`===================================================`);
});