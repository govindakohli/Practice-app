import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import route from "./routes/userRoute.js";
import cookieParser from "cookie-parser";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware configuration
app.use(cors({
    origin: process.env.FRONTEND_URL, // Allow requests from frontend origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow cookies and credentials to be sent
    allowedHeaders: ["Content-Type", "Authorization"],
}));

// Set PORT and MONGOURL from environment variables
const PORT = process.env.PORT || 7000;
const URL = process.env.MONGOURL 

// Database connection
mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
    console.log("DB connected Successfully");

    // Start the server
    app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`);
    });
}).catch((err) => {
    console.log(`Error connecting to DB: ${err}`);
});

// Routes
app.use("/api", route);
