const express = require('express');

// import the necessary modules
const sequelize = require('./config/db');

const app = express();

const port = 3000;

app.get('/', (req, res) => {
    // run the coomand "npm run dev" start backend using the nodemon
  res.send('This is BallotGo Backend!');
});

sequelize.sync().then(() => {
  console.log('Database connected and models synchronized');
}).catch(err => console.error('Error connecting to the database:', err));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
