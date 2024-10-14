const express = require('express');
const app = express();

const port = 3000;

app.get('/', (req, res) => {
    // run the coomand "npm run dev" start backend using the nodemon
  res.send('This is BallotGo Backend!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
