const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const fetch = require("node-fetch");
const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next)

// Create the Express app.
const app = express();

// Set up middleware
app.use(morgan('dev'));
app.use(cors({ origin: "http://localhost:8080" }));
app.use(express.static(path.join(__dirname, "public")));

// Set the pug view engine.
app.set("view engine", "pug");

app.get('/', (req, res) => {
    res.render('homepage');
});

app.get('/register', async (req, res) => {
    let response = await fetch("http://localhost:8080/states");
    const { states } = await response.json()
    res.render('register', { states });
});

app.get('/login', (req, res) => {
    res.render('login')
});

// //Only Adopter can fill out the preferred pet
app.get('/create-preferred-pet', async (req, res) => {
    let response = await fetch("http://localhost:8080/breeds");
    const { breeds } = await response.json();
    res.render('create-pref-pet', { breeds })
});

app.get('/edit-pet/:id', async (req, res) => {
    let response = await fetch("http://localhost:8080/breeds");
    const { breeds } = await response.json();
    res.render('edit-pet', { breeds })
})

app.get("/user-profile", async (req, res) => {
    res.render('user-profile');
});

app.get("/shelter-profile", async (req, res) => {
    res.render('shelter-profile');
});

app.get("/pets/:id", async (req, res) => {
    res.render('pet-information')
})

app.get('/adoptionRequests', (req, res) => {
    res.render('adoption-request');
});

app.get("/logout", function (req, res) {
    res.render('logout');
});

// Define a port and start listening for connections.
const port = 4000;

app.listen(port, () => console.log(`Listening on port ${port}...`));
