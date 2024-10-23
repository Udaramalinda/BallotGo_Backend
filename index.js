const express = require('express');
const bodyParser = require('body-parser');

// import the necessary modules
const sequelize = require('./config/db');

// import the routes
const userRoutes = require('./routes/user.routes');
const candidateRoutes = require('./routes/candidate.routes');

// import the models
const { User } = require('./models/user.model');
const { UserPassword } = require('./models/userPassword.model');
const { TempUser } = require('./models/tempUser.model');

module.exports = {
  User,
  UserPassword,
  TempUser,
};

const app = express();
app.use(bodyParser.json());

const port = 3000;

app.get('/', (req, res) => {
    // run the coomand "npm run dev" start backend using the nodemon
  res.send('This is BallotGo Backend!');
});

// use the routes
app.use('/api/user', userRoutes);
app.use('/api/candidate', candidateRoutes);

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

// sequelize.sync({ force: true }).then(() => {
//   console.log('Database connected and models synchronized');
// }).catch(err => console.error('Error connecting to the database:', err));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});