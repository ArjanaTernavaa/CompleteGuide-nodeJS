const express = require("express");
const bodyParser = require("body-parser");

const app = express(); //alot of logic is in the app, it handles routes dmth mujna me bo pass the create server 

app.use(bodyParser.urlencoded({ extended: false })); //me parse the body qe vjen nga ni request

app.use('/add-product',(req,res,next)=>{
    console.log("in another middleware")
    res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add product</button></form>') //allows us to send a response
}); 

app.post('/product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/') 
})

app.use('/',(req,res,next)=>{
    console.log("in another middleware")
    res.send('<h1>Hello from express!</h1>') //allows us to send a response
}); 



app.listen(3000);
