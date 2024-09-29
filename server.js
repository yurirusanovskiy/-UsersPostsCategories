const express = require("express");
const dbRoutes = require("./routes/dbRoutes");
const userRoutes = require("./routes/userRoutes");
const { connectDB, disconnectDB } = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
require('dotenv').config();

const app = express();
connectDB();
app.use(express.json());

app.use("/db", dbRoutes);
app.use("/auth", userRoutes);

const PORT = process.env.PORT || 3000;

// Starting server
const server = app.listen(PORT, (err) => {
    (!err) ? console.log(`Listening on port ${PORT}`) : console.error(err);
});

// Handling application shutdown
const shutdown = async () => {
    console.log('Shutting down server...');
    await disconnectDB();
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
};

// Listening for process termination events
process.on('SIGINT', shutdown);  // Ctrl+C
process.on('SIGTERM', shutdown); // to stop via system commands
