import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import { supabase } from "./config/db";
import { indexRouter } from "./routes";
dotenv.config();

const app = express();
const port = process.env.PORT || 3030;

app.use(express.json());
app.use(cors());

app.use(morgan(":method :url :status :res[content-length] - :response-time ms"));

app.get("/test", async (req, res) => {
    res.status(200).json({ message: "Server Connected" });
});

app.use("/api", indexRouter);

app.listen(port, async () => {
    try {
        await supabase;
        console.log(`Server is running on port ${port}`);
    } catch (error) {
        console.log(`Error while starting the error: ${error}`);
    }
});