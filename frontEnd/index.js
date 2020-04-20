const express = require("express");
const morgan = require("morgan");
const path = require("path");

// Create the Express app.
const app = express();

// Set the pug view engine.
app.use(morgan('dev'));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
    res.render('homepage');
});

// Define a port and start listening for connections.
const port = 4000;

app.listen(port, () => console.log(`Listening on port ${port}...`));