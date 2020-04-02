const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cors = require("cors");
const knex = require("knex");

const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "chisom05",
    database: "smart_brain"
  }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send(db.select("*").from("users"));
});

app.post("/signin", signin.handleSignin(db, bcrypt));

app.post("/register", register.handleRegister(db, bcrypt));

app.get("/profile/:id", profile.handleProfile(db));

app.put("/image", image.handleImage(db));

app.post("/imageurl", image.handleApiCall());

app.set( 'port', ( process.env.PORT || 3001 ));
app.listen(app.get( 'port' ), () => {
  console.log('app is running on port 3001 ' + app.get( 'port' ));
});
