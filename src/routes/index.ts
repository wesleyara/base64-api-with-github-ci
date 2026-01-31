import { Router } from "express";

import { Base64Service } from "../services/Base64.service.js";

export const router = Router();

const base64Service = new Base64Service();

router.post("/encode", (req, res) => {
  if (typeof req.body?.data !== "string") {
    return res.status(400).json({ error: "Invalid input data" });
  }
  const encodedData = base64Service.encode(req.body.data);
  res.json({ encodedData });
});

router.post("/decode", (req, res) => {
  if (typeof req.body?.encodedData !== "string") {
    return res.status(400).json({ error: "Invalid input data" });
  }
  try {
    const decodedData = base64Service.decode(req.body.encodedData);
    res.json({ decodedData });
  } catch (error) {
    console.error("Decoding error:", error);
    res.status(400).json({ error: "Decoding failed" });
  }
});
