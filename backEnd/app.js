const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { ValidationError } = require("sequelize");
const indexRouter = require("./routes/index");
const userRouter = require('./routes/users')
const shelterRouter = require('./routes/shelterUsers');
const petsRouter = require('./routes/pets');
const adoptionRequestsRouter = require('./routes/adoptionRequests');
const statesRouter = require('./routes/states');
const preferredPetsRouter = require('./routes/preferredPets')
const breedsRouter = require('./routes/breeds');

const { environment } = require("./config");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors({ origin: "http://localhost:4000" }));

app.use("/", indexRouter);
app.use('/users', userRouter)
app.use('/shelters', shelterRouter);
app.use('/pets', petsRouter);
app.use('/adoptionRequests', adoptionRequestsRouter);
app.use('/states', statesRouter);
app.use('/breeds', breedsRouter);
app.use('/preferredPets', preferredPetsRouter);

// Catch unhandled requests and forward to error handler.
app.use((req, res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.errors = ["The requested resource couldn't be found."];
  err.status = 404;
  next(err);
});

// Error handlers. (must have all four arguments to communicate to Express that
// this is an error-handling middleware function)

// Process sequelize errors
app.use((err, req, res, next) => {
  // check if error is a Sequelize error:
  if (err instanceof ValidationError) {
    err.errors = err.errors.map((e) => e.message);
    err.title = "Sequelize Error";
  }
  next(err);
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500);
  const isProduction = environment === "production";
  res.json({
    title: err.title || "Server Error",
    errors: err.errors,
    stack: isProduction ? null : err.stack,
  });
});

module.exports = app;
