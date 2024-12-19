// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Initialize the Express app
const app = express();

// Middleware
app.use(bodyParser.json()); // Parse JSON requests
app.use(cors()); // Enable Cross-Origin Resource Sharing

// In-memory data storage (replace with a database in production)
const rsvpList = [];

// Routes
// Home Route
app.get("/", (req, res) => {
    res.send("Welcome to the Event RSVP System API!");
});

// Submit RSVP
app.post("/rsvp", (req, res) => {
    const { name, email, phone, guests, message, attendance } = req.body;

    // Validate request data
    if (!name || !email || !attendance) {
        return res.status(400).json({ error: "Name, email, and attendance are required." });
    }

    // Add RSVP to the list
    const newRSVP = { name, email, phone, guests, message, attendance, id: rsvpList.length + 1 };
    rsvpList.push(newRSVP);

    res.status(201).json({
        message: "RSVP submitted successfully!",
        rsvp: newRSVP,
    });
});

// Get All RSVPs
app.get("/rsvps", (req, res) => {
    res.json(rsvpList);
});

// Start the server
const PORT =  process.env.PORT || 5002;
app.listen(PORT, () => {
    console.log('Server is running on port http://localhost:5002');
});