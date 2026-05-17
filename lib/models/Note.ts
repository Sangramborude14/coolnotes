
const mongoose = require("mongoose")

const NoteSchema = new mongoose.Schema({
    username: {type: String,required: true,unique: false},
    noteId: {type:String,required: true,unique: true},
    heading:{type:String,required: true,unique: false},
    content: {type:String,required: false,unique: false},
    private: {type:Boolean,required: true,unique:false},
    studyTime: {type: Number,default:0,required:false}

})

export const Note = mongoose.models.Note || mongoose.model("Note",NoteSchema,"DevNotes")