//jshint esversion: 6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { read } = require("fs");

const app = express();
 
 app.use(express.static("public"));
 app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function(req, res) {  
  res.sendFile(__dirname + "/signup.html"); 

});

 
 
 app.post("/", function (req, res){
const firstName = req.body.fName;
const lastName = req.body.lName;
const email = req.body.email;
console.log(firstName, lastName, email);

const data = {
    members: [
        {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }
    ]
};

var jsonData = JSON.stringify(data);
const url = "https://us20.api.mailchimp.com/3.0/lists/a5b2f59b0f"

const options = {
    method: "POST",
    auth: "yannelly1:af145501e7cc92f705efa030c688136f-us20"

}
const request = https.request(url, options, function(response) {

    if(response.statusCode === 200){
        res.sendFile(__dirname + "/success.html"); 
    } else {
        res.sendFile(__dirname + "/failure.html"); 
    }

    response.on("data", function(data){    
console.log(JSON.parse(data));
})
})

request.write(jsonData);
request.end();
 });
 
 
app.post("/failure", function(req, res){
    res.redirect("/")
})


app.listen(process.env.PORT ||3000, function() {
console.log("Server is running on port 3000."); 

 
 

}) 

// API KEY
// af145501e7cc92f705efa030c688136f-us20

// list ID
// a5b2f59b0f