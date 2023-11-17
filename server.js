const express = require("express");
const dotenv = require("dotenv");
const eventsRouter = require("./routers/eventsRouter");
const errorsFormatter = require("./middlewares/errorsFormatter");
const routeNotFound = require("./middlewares/routeNotFound");

dotenv.config();

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to My Events");
});

app.use("/events", eventsRouter);

app.use(errorsFormatter);
app.use(routeNotFound);

app.listen(process.env.PORT || 3001, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
