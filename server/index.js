import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import cors from "cors"
import route from "./routes/userRoute.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors())
dotenv.config()

const PORT = process.env.PORT || 7000
const URL = process.env.MONGOURL

mongoose.connect(URL).then(()=>{
    console.log("DB connected Successfully")

    app.listen(PORT , ()=>{
        console.log(`server is running on port: ${PORT}`)
    })
}).catch((err)=>{
    console.log(`getting error while connecting ${err}`)
})

app.use("/api" , route)