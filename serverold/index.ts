import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import mongoose from "mongoose"; // Import mongoose for MongoDB connection
import { Server } from "http"; 
import * as dotenv from 'dotenv'; // Import dotenv
//import * as dotenv from 'dotenv'; // 1. Import dotenv

import UserDatabase from './models/UserDatabase'; // <-- **ADD THIS IMPORT**
// Load environment variables from .env file
dotenv.config();
const API_BASE_PATH = "/api";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware for logging API responses
app.use((req, res, next) => {
    const start = Date.now();
    const path = req.path;
    let capturedJsonResponse: Record<string, any> | undefined = undefined;

    const originalResJson = res.json;
    res.json = function (bodyJson, ...args) {
        capturedJsonResponse = bodyJson;
        // Use 'this' to maintain context when applying original method
        return originalResJson.apply(this, [bodyJson, ...args]);
    };

    res.on("finish", () => {
        const duration = Date.now() - start;
        if (path.startsWith("/api")) {
            let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
            if (capturedJsonResponse) {
                let jsonString = JSON.stringify(capturedJsonResponse);
                if (jsonString.length > 200) {
                    jsonString = jsonString.slice(0, 197) + "...";
                }
                logLine += ` :: ${jsonString}`;
            }

            if (logLine.length > 80) {
                logLine = logLine.slice(0, 79) + "…";
            }

            log(logLine);
        }
    });

    next();
});

// Function to establish MongoDB connection
async function connectToMongo() {
    const MONGO_URI = process.env.MONGO_URI;
    if (!MONGO_URI) {
        console.error("FATAL ERROR: MONGO_URI is not defined in the environment variables.");
        // Depending on your requirements, you might exit the process here:
        // process.exit(1); 
        return;
    }

    try {
        await mongoose.connect(MONGO_URI);
        log("SUCCESS: Connected to MongoDB Atlas.");
    } catch (err) {
        console.error("ERROR: Could not connect to MongoDB.", err);
        // If connection fails, you might want to exit:
        // process.exit(1);
    }
}


// (async () => {
//     // 1. Establish the MongoDB connection first
//     await connectToMongo();

//     // 2. Set up routes and get the HTTP server instance
//     const server: Server = await registerRoutes(app); 

//     // Corrected Error Handler (Prevents Server Crash)
//     app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
//         const status = err.status || err.statusCode || 500;
//         const message = err.message || "Internal Server Error";
        
//         console.error("SERVER ERROR:", err); 

//         res.status(status).json({ message });
//     });

//     // importantly only setup vite in development and after...
//     if (app.get("env") === "development") {
//         await setupVite(app, server);
//     } else {
//         serveStatic(app);
//     }

//     // Corrected Server Listen Call (Resolves ENOTSUP Error)
//     const port = parseInt(process.env.PORT || '5000', 10);
    
//     // Explicitly bind to '127.0.0.1' (localhost)
//     server.listen(port, '127.0.0.1', () => {
//         log(`serving on http://127.0.0.1:${port}`);
//     });
// })();

// Modified (async () => { ... }) block in index.ts

(async () => {
    // 1. Establish the MongoDB connection first
    await connectToMongo();

    // 💡 NEW CHECK: Wait for Mongoose to connect
    if (mongoose.connection.readyState !== 1) {
        console.error("Server shut down: Database connection failed.");
        return; // Exit the async function, preventing server startup
    }
    
    // 2. Set up routes and get the HTTP server instance
    const server: Server = await registerRoutes(app); 

    // ... (rest of the code remains the same) ...

    const port = parseInt(process.env.PORT || '5000', 10);
    
    server.listen(port, '127.0.0.1', () => {
        log(`serving on http://127.0.0.1:${port}`);
    });
})();

app.get(`${API_BASE_PATH}/user-ids`, async (_req: Request, res: Response) => {
    // Check if Mongoose connection state is ready (optional, but good practice)
    if (mongoose.connection.readyState !== 1) {
        return res.status(503).send('Database connection is not ready.');
    }

    try {
        // 1. Use the Mongoose Model to query the collection ('user_databases')
        // We use .select('user_id -_id') to include 'user_id' and exclude '_id', 
        // which matches your original MongoDB projection logic.
        const userIdsObjects = await UserDatabase.find().select('user_id -_id');

        // 2. Map the array of Mongoose documents to an array of just the IDs
        // The result will be an array of strings: ["id1", "id2", ...]
        const userIds = userIdsObjects.map(doc => doc.user_id);
        
        // 3. Send the resulting array back to the client
        console.log("Successfully retrieved user IDs.");
        res.json(userIds);

    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).send('Server Error retrieving user IDs');
    }
})