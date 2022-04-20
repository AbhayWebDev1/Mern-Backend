const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/studentregisterdb",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(()=>{
    console.log("Connection successful");
}).catch((e)=>{
    console.log("no Connection");
})

/*var d=mongoose.connection;
d.on('error',console.error.bind(console,'connection error:'));
d.once('open',function(){
    console.log("We are Connected Bro");
});*/
 