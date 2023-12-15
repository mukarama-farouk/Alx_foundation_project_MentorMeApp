const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const session = require('express-session');
const cors = require('cors');
const path = require('path');



const { connectDb } = require("./utils/database");

const userRoute = require("./routes/userRoute");

connectDb();

const app = express();

app.use(cors());
app.use(bodyParser.json());


app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
  }));

app.get("/", (req, res) => {
    res.send("WELCOME TO MENTORME APP");
});

app.use(express.static(path.join(__dirname, '../frontend')));

app.use(express.json());
app.use("/api/users", userRoute);



const port = process.env.PORT || 7000;


app.listen(port, () => console.log("server listening on port : " + port));
