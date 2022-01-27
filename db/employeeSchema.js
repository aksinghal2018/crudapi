const mongoose = require('mongoose')
const employeeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    department:{
        type:String,
        required:true,
        unique:true
    },
    salary:{
        type:Number,
        required:true,
        unique:true
    },
    city:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})
module.exports=mongoose.model("employee",employeeSchema)