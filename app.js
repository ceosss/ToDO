// Created By Swaraj
// LIVE: http://bit.ly/33rm24z
var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");


// mongoose.connect("mongodb://localhost/todo",{useNewUrlParser:true});
mongoose.connect("mongodb+srv://sswarajsamant:bs1999rs@students-s3blg.mongodb.net/todoDB",{useNewUrlParser:true});
app.use(bodyParser.urlencoded({extended:true}));


var todoSchema = new mongoose.Schema({
    id: Number,
    name: String,
    start: Number,
    end: Number
});

var todo = mongoose.model("todo",todoSchema);

// todo.create({
//     id: 1,
//     name: "Swaraj",
//     start: 10,
//     end: 12
// },function(err,added){
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log(added);
//     }
// })

// var list = [
//     {
//         id: 1,
//         name: "Swaraj",
//         start: 10,
//         end: 12
//     }
// ];


///////////////////////
//GET ROUTES
///////////////////////

app.get("/",function(req,res){
    todo.find({},function(err,todos){
        if(err){
            console.log(err);
        }
        else{
            res.render("home.ejs",{todo:todos});
        }
    });
    
});
 
app.get("/del/:id",function(req,res){
    var id = req.params.id;
    todo.findByIdAndDelete(id,function(err,todos){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/");
        }
    })
    });

///////////////////////
//POST ROUTES
///////////////////////

app.post("/",function(req,res){
var item = req.body.item,
    start = req.body.from,
    end = req.body.to,
    id = req.body.id;
// list.push({id:id,name:item,start:from,end:to});
todo.create({
    id:id,
    name:item,
    start:start,
    end:end
},function(err,added){
    if(err){
        console.log(err);
    }
    else{
        console.log("added: "+added);
    }
})
console.log("all: "+todo);
res.redirect("/");
});



// app.listen(3000,function(){
//     console.log("Server Started");
// });



app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
