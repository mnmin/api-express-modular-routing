const express = require("express");
const app = express();
const port = 3030;

const cors = require("cors");
const morgan = require("morgan");
const { users } = require("./data")

// SETUP MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// REQUIRE ROUTERS

const usersRouter = require("./src/routers/users");

// ADD ROUTERS TO APP

app.use("/users", usersRouter)


/* START SERVER */
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
