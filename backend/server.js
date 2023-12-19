const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const path = require('path');



const { connectDb } = require("./utils/database");

const userRoute = require("./routes/userRoute");
const mentorRoute = require("./routes/mentorRoute");

connectDb();

const app = express();

app.use(cors({ credentials: true, origin: 'http://127.0.0.1:5501' }));
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
app.use("/api/mentors", mentorRoute);



const port = process.env.PORT || 7000;


app.listen(port, () => console.log("server listening on port : " + port));
