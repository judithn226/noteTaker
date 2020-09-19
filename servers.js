//packages needed
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// data parsing
app.use(express.urlencoded({ extended:true
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public)")));

//routes will go here
app.get('api/users', function(req,res){
    var
})

//starting the server (listener)
app.listen(PORT, function(){
    console.log('Server started! At http://localhost:' + PORT)
});
