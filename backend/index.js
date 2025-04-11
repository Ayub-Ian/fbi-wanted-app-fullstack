const express = require("express");
const morgan = require("morgan");
const wantedRoutes = require("./src/routes/wanted.route");
const warmUpFbiCache = require("./src/utils/warmUpCache");

const app = express();
const PORT = 3000;

app.use(morgan("combined"));
app.use(express.json());
app.use("/api", wantedRoutes);

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await warmUpFbiCache();
});
