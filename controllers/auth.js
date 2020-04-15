const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  // Fetch the form data from request body
  const { username, email, password } = req.body;
  // console.log(req.body);
  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, async function (err, hash) {
    // Create a user by User Schema
    const newUser = new User({
      username,
      email,
      password: hash,
    });

    try {
      await newUser.save();
      return res.status(200).send("User created !  Please Singin");
    } catch (err) {
      console.log(err.message);
    }
  });
};

exports.signin = async (req, res) => {
  // Fetch the form data from request body
  const { email, password } = req.body;

  User.find({ email }).exec((err, data) => {
    if (err || !data) {
      return res.status(400).send(`No user with this email exists.`);
    }

    bcrypt.compare(password, data[0].password, function (err, result) {
      if (err) return res.status(400).send(`Incorrect Password.`);
      //   Generate the token for authorization
      const token = jwt.sign({ data: data[0] }, process.env.token, {
        expiresIn: "1 d",
      });
      //   Set the token in cookie and username
      //   Send the result
      res.cookie("accessToken", token).cookie("username", data[0].username).status(200).json({ token, data: data[0] });
    });
  });
};

// exports.requiresSignin = 