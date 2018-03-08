var express = require('express');
var app = express();




//landing page
app.get('/' , function(req , res){
    res.send("Landing Page");
});



//listening
app.listen(3000 , function(){
    console.log('App listening : Server online');
})