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

// app.get('/', (req, res) => {
//     res.render('homepage');
// });

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

app.get("/logout", function (req, res) {
    localStorage.removeItem("PAWS_AND_CLAWS_ACCESS_TOKEN")
    localStorage.removeItem("PAWS_AND_CLAWS_CURRENT_USER_ID")
    res.redirect("/");
});



app.get('/adoptionRequests', (req, res) => {
    res.render('adoption-request');
})

// //Only shelter can create a pet
// app.get('/create-pet', (req, res) => {
//     res.render('create-pet');
// })

// //Only Adopter can fill out the preferred pet

// app.get('/preferredPet', (req, res) => {
//     res.render('create-pref-pet')
// })
// Define a port and start listening for connections.
const port = 4000;

app.listen(port, () => console.log(`Listening on port ${port}...`));  