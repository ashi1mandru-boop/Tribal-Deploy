import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { Server } from "http"; // Ensure Server type is available for the server variable

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware for logging API responses
app.use((req, res, next) => {
    const start = Date.now();
    const path = req.path;
    let capturedJsonResponse: Record<string, any> | undefined = undefined;

    const originalResJson = res.json;
    // IMPORTANT: Use 'this' in apply for res.json to maintain context
    res.json = function (bodyJson, ...args) {
        capturedJsonResponse = bodyJson;
        return originalResJson.apply(this, [bodyJson, ...args]);
    };

    res.on("finish", () => {
        const duration = Date.now() - start;
        if (path.startsWith("/api")) {
            let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
            if (capturedJsonResponse) {
                // Shorten JSON string for cleaner logs
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

(async () => {
    // We assume registerRoutes(app) returns the standard http.Server instance
    const server: Server = await registerRoutes(app); 

    // **LOGIC FIX 1: Corrected Error Handler (Prevents Server Crash)**
    // The error handler must not re-throw the error after sending the response.
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
        const status = err.status || err.statusCode || 500;
        const message = err.message || "Internal Server Error";
        
        console.error("SERVER ERROR:", err); // Log the error stack

        res.status(status).json({ message });
        // REMOVED: throw err;
    });

    // importantly only setup vite in development and after
    // setting up all the other routes so the catch-all route
    // doesn't interfere with the other routes
    if (app.get("env") === "development") {
        await setupVite(app, server);
    } else {
        serveStatic(app);
    }

    // ALWAYS serve the app on the port specified in the environment variable PORT
    const port = parseInt(process.env.PORT || '5000', 10);
    
    // **LOGIC FIX 2: Corrected Server Listen Call (Resolves ENOTSUP Error)**
    // Explicitly bind to '127.0.0.1' (localhost) to bypass environment restrictions.
    server.listen(port, '127.0.0.1', () => {
        log(`serving on http://127.0.0.1:${port}`);
    });
})();