const mongoose = require('mongoose')

const technicalQuestionSchema = new mongoose.Schema({
    question:{
        type:String,
        required:[true,"question required"]
    },
    answer:{
        type:String,
        required:[true,"answer required"]
    },
    intention:{
        type:String,
        required:[true,"intention required"]
    }
},{_id:false})

const behavioralQuestionSchema = new mongoose.Schema({
    question:{
        type:String,
        required:[true,"question required"]
    },
    answer:{
        type:String,
        required:[true,"answer required"]
    },
    intention:{
        type:String,
        required:[true,"intention required"]
    }
},{_id:false})

const skillGapSchema = new mongoose.Schema({
    skill:{
        type:String,
        required:[true,"skills is required"]
    },
    severity:{
        type:String,
        enum: ["high", "medium", "low"],
        required:[true,"severity is required"]
    }
},{_id:false})

const preparationPlanSchema = new mongoose.Schema({
    day:{
        type:Number,
        required:[true,"day is required"]
    },
    focus:{
        type:String,
        required:[true,"focus is required"]
    },
    tasks:[{
        type:String,
        required:[true,"task is required"]
    }]
},{_id:false})

const interviewreportschema = new mongoose.Schema({
    title:{
        type:String
    },
    jobDescription:{
        type:String,
        required:[true,"job description is required"]
    },
    selfDescription:{
        type:String,
        required:[true,"self description is required"]
    },
    resume:{
        type:String,
        required:[true,"resume is required"]
    },
    matchScore:{
        type:Number,
        min:0,
        max:100
    },
    preparationPlan:[preparationPlanSchema],
    skillGaps:[skillGapSchema],
    behavioralQuestions:[behavioralQuestionSchema],
    technicalQuestions:[technicalQuestionSchema],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }
},
{
    timestamps:true
})

module.exports = mongoose.model('interviewReport',interviewreportschema)