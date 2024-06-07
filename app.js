require("dotenv").config();
require("./config/db");

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

require("./models/User.model");

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CORS_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.options("*", cors(), (req, res) => {
  res.sendStatus(200);
});

// Log des variables d'environnement pour vérifier qu'elles sont définies
console.log(`CORS URL: ${process.env.CORS_URL}`);
console.log(`PORT: ${process.env.PORT}`);

app.get("/", (req, res) => {
  res.json({ message: "voici la réponse" });
});

app.use("/api", require("./routes/index.routes"));

app.listen(process.env.PORT, () => {
  console.log(`Running on : http://localhost:${process.env.PORT}`);
});
