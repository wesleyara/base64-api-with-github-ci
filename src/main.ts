import express from "express";

import { router } from "./routes/index.js";

const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());

app.get("/api/v1", (req, res) => {
  res.send("Welcome to the Base64 API!");
});

app.use("/api/v1/base64", router);

app.listen(port, () => {
  console.log(`Base64 API server running at http://localhost:${port}`);
});
