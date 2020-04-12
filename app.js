// Declare Dependencies required
const express = require('express');
const app = express();
const bodyParser = require('body-parser');


//  All Request
app.get("/", (req,res) => {
    res.send('Hello World');
});

// Routes   [ Blog posts , User ]



// Body Parser And Url encoded
app.use(
    bodyParser.json(),
    bodyParser.urlencoded({extended: true})
);


// Make server listen on some port
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {console.log(`The server is connected on port : ${PORT}`)});