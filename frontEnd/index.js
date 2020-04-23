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
app.use(cors({ origin: "https://localhost:8080" }));
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

// //Only shelter can create a pet
app.get('/createPet', async (req, res) => {
    let response = await fetch("http://localhost:8080/breeds");
    const { breeds } = await response.json();
    res.render('create-pet', { breeds });
})

// //Only Adopter can fill out the preferred pet
app.get('/createPreferredPet', async (req, res) => {
    let response = await fetch("http://localhost:8080/breeds");
    const { breeds } = await response.json();
    res.render('create-pref-pet', { breeds })
});

app.get("/users/:id", async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    let response = await fetch(`http://localhost:8080/users/${userId}`);
    const { user } = await response.json();
    res.render('user-profile', { user });
});

app.get("/shelters/:id", async (req, res) => {
    const shelterUserId = parseInt(req.params.id, 10);
    let response = await fetch(`http://localhost:8080/shelters/${shelterUserId}`);
    const { shelterUser } = await response.json();
    res.render('shelter-profile', { shelterUser });
});

app.get('/adoptionRequests', (req, res) => {
    res.render('adoption-request');
});

app.get("/logout", function (req, res) {
    res.render('logout');
});

// Define a port and start listening for connections.
const port = 4000;

app.listen(port, () => console.log(`Listening on port ${port}...`));
