const express = require("express");
const app = express();
// import {authcontroller} from './controllers/authController';
const registerRoutes = require("../routes/register");

const port = 3000;

app.get("/", (req, res) => {
  // run the coomand "npm run dev" start backend using the nodemon
  res.send("This is BallotGo Backend!");
});

// Routes
app.use("/api", registerRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
