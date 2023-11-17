const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.json());

app.listen(process.env.PORT || 3001, () => {
  console.log(`Server running on http://locaclhost:${process.env.PORT}`);
});
