var express = require("express");
var app = express();
var home = require("./routes/home");
var home = require("./routes/restaurant");

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/',home);
app.use('/api/restaurant',home);

var port = process.env.HTTP_PORT || 5000;
app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
});
