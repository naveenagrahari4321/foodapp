var express = require("express");
var app = express();
var home = require("./routes/home");
var home = require("./routes/restaurant");
const route = require("./routes/userroute");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use('/',home);
app.use('/api/restaurant',home);
app.use(route) //for customers route 
var port = process.env.HTTP_PORT || 5000;
app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
});
