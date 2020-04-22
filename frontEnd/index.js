const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");

// Create the Express app.
const app = express();

// Set up middleware
app.use(morgan('dev'));
app.use(cors({ origin: "https://localhost:8080" }));
app.use(express.static(path.join(__dirname, "public")));

// Set the pug view engine.
app.set("view engine", "pug");

app.get('/', (req, res) => {
    res.render('homepage');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.get('/login', (req, res) => {
    res.render('login')
});
// Define a port and start listening for connections.
const port = 4000;

app.listen(port, () => console.log(`Listening on port ${port}...`));  