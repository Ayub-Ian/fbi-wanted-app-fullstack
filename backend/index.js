const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const wantedRoutes = require("./src/routes/wanted.route");
const warmUpFbiCache = require("./src/utils/warmUpCache");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const PORT = 3030;

app.use(cors());

app.use(morgan("combined"));
app.use(express.json());
app.use("/api", wantedRoutes);

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
});
