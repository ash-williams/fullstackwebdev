// Pull in the express package to use
const express = require("express"); 



// Initialise the express app    
const app = express();    

app.use(express.json());

// Define a port for this app to run on
const port = 3000;      

// A simple route to check it works!
app.get("/", (req, res) => {        
    res.send("Hello World!");
})

let users = [];
let next_id = 1;

app.post("/users", (req, res) => {
    let user = {
        user_id: next_id,
        user_name: req.body.name
    };

    users.push(user);
    next_id = next_id + 1;

    return res.status(201).send(user);
})

// Make sure the app can be accessed
app.listen(port, () => {        
    console.log("App is listening on port: " + port);
})