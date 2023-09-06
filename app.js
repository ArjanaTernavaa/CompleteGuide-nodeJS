const path = require('path');

const express = require("express");
const bodyParser = require("body-parser");

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");


const app = express(); //alot of logic is in the app, it handles routes dmth mujna me bo pass the create server 

app.use(bodyParser.urlencoded({ extended: false })); //me parse the body qe vjen nga ni request
app.use(express.static(path.join(__dirname,'public'))) //i bon register static folders edhe requests masnej i dergon ktu

app.use('/admin',adminData.routes);
app.use(shopRoutes);

app.use((req,res,next)=>{
    res.status(404).sendFile(path.join(__dirname,"views/pageNotFound.html"));
})

app.listen(3000);
 