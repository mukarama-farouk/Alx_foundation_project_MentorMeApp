const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const session = require('express-session');


const { connectDb } = require("./utils/database");
connectDb();

const app = express();


const port = process.env.PORT || 7000;


app.listen(port, () => console.log("server listening on port : " + port));
