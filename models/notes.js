const mongoose=require('mongoose');

mongoose.connect("mongodb://localhost:27017/notesdb");

const noteSchema=mongoose.Schema({
    title:String,
    content:String
});

module.exports=mongoose.model("note",noteSchema);