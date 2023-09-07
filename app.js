const path = require('path');

const express = require("express");
const bodyParser = require("body-parser");
const expressHbs = require('express-handlebars');

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");


const app = express(); //alot of logic is in the app, it handles routes dmth mujna me bo pass the create server 

app.engine('.hbs', expressHbs.engine({layoutsDir: 'views/layouts/', defaultLayout: 'main', extname: 'hbs'})); //register a engine that is not registered like handlebars
app.set('view engine', 'hbs'); //match the name with the line above
app.set('views','views'); //by default views jane located n views

app.use(bodyParser.urlencoded({ extended: false })); //me parse the body qe vjen nga ni request
app.use(express.static(path.join(__dirname,'public'))) //i bon register static folders edhe requests masnej i dergon ktu

app.use('/admin',adminData.routes);
app.use(shopRoutes);

app.use((req,res,next)=>{
    res.status(404).render('404',{docTitle:"Page not found"});
})

app.listen(3000);
 