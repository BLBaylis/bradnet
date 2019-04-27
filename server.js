require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');
const image = require('./controllers/image');
const register = require('./controllers/register');
const signin = require('./controllers/signin');

const database = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  }
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => res.send("Welcome to Bradnet"));
app.post('/signin', signin.handleSignin(database, bcrypt));
app.post('/register', register.handleRegister(database, bcrypt));
app.post('/image', image.handleImage(database));
app.post('/imageurl', image.handleApiCall);

let port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`app running on ${port}`);
})