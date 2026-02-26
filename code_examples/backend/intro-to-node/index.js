// Pull in the express package to use
const express = require("express"); 

// Initialise the express app    
const app = express();      

// Define a port for this app to run on
const port = 3000;      

// A simple route to check it works!
app.get("/", (req, res) => {        
    res.send("Hello World!");
})

// Make sure the app can be accessed
app.listen(port, () => {        
    console.log("App is listening on port: " + port);
})