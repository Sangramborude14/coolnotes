const mongoose = require('mongoose')

const StudyLogSchema = new mongoose.Schema(
    {
        username: {type: String,required: true},
        noteId: {type:String,required: true},
        noteHeading: {type: String,required: true},
        duration: {type: Number,required: true},
        createdAt: {type:Date,default: Date.now}
    }
);

export const StudyLog = mongoose.models.StudyLog || mongoose.model("StudyLog",StudyLogSchema,"StudyLogs");

