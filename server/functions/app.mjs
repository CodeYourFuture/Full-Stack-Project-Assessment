// Netlify wrapper for express.js

// This will convert your express.JS application into a serverless lambda that is compatible by AWS Lambda and Netlify Functions.
// Note that this has a large performance impact as your entire express system needs to load up for every single request.
// Also each request runs in isolation so you are unable to share or cache values in your codebase.
// For example the database connection will be recreated at every call

import express from "express";
import serverless from "serverless-http";
import apiRouter from "../api.js";

const app = express();

app.use(express.json());
app.use("/api/", apiRouter);

export const handler = serverless(app);
