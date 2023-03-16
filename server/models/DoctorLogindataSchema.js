const mongoose = require('mongoose')

const loginSchema = new mongoose.Schema({
    name:{
        type:String
        ,required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    age:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    speciality:{
        type:String,
       required:true
    },
    experience:{
        type:String,
        required:true
    },
    profilePhoto:{
        type:String,
        required:true
    },
    certificates:{
        type:[String],
        required:true
    },
},{
    timestamps: true,
  }
)

const DoctorLogindataSchema = new mongoose.model('DoctorLogindataSchema',loginSchema)

module.exports = DoctorLogindataSchema;