const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const wantedRoutes = require("./src/routes/wanted.route");

const app = express();
const PORT = 3030;

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  message: "Too many requests, please try again in a minute",
});

app.use(limiter);
app.use(cors());

app.use(morgan("combined"));
app.use(express.json());
app.use("/api", wantedRoutes);

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
});
