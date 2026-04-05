import "dotenv/config";
import cors from "cors";
import express from "express";
import ConnectDb from "./utils/db.js";
import authRouter from "./router/authrouter.js";
import planRouter from "./router/planrouter.js";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/plan", planRouter);

ConnectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Failed to connect DB:", err);
  });
