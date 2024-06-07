const express=require('express');
const path=require('path');
const noteModel=require('./models/notes');

const app=express();

app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

app.get("/",function(req,res){
    res.render('index');
});

app.post("/create",async function(req,res){
    let {title, content}=req.body;
    let notes=await noteModel.create({
        title:title,
        content:content
    });
    res.redirect("/read");
})

app.get("/read",async function(req,res){
    let notes=await noteModel.find();
    res.render("read",{notes:notes});
})

app.get("/edit/:noteid",async function(req,res){
    let notes=await noteModel.findOne({_id:req.params.noteid});
    res.render("edit",{notes:notes});
})

app.post("/update/:noteid",async function(req,res){
    let {title, content}=req.body;
    let notes=await noteModel.findOneAndUpdate({_id:req.params.noteid},{title, content},{new:true});
    res.redirect("/read")
    
})

app.get("/deleted/:id",async function(req,res){
    let notes=await noteModel.findOneAndDelete({_id:req.params.id});
    res.redirect("/read");
})

app.listen(3000);