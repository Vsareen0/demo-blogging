// Declare Dependencies required
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
var cookieParser = require("cookie-parser");
app.use(cookieParser());

// Body Parser And Url encoded
app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));

// Routes   [ Blog posts , User ]
const userRoute = require("./src/routes/User.route");
const blogRoute = require("./src/routes/Blog.route");

app.use("/api", userRoute);
app.use("/api", blogRoute);

// Handle Deprecated Mongoose settings
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

// Establish Database Connection
mongoose
  .connect(process.env.MONGODB_URI, options)
  .then((db) => {
    console.log(`Connected to DB !`);

    // Make server listen on some port
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`The server is connected on port : ${PORT}`);
    });
  })
  .catch((dbErr) => {
    console.log(`Unable to connect to DB : ${dbErr.message}`);
    process.exit(1);
  });
