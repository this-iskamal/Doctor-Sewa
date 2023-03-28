const mongoose = require('mongoose')

const verifieddoctorSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    emial:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true,
    },
    age:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    speciality:{
        type:String,
        required:true,
    },
    experience:{
        type:String,
        required:true,
    },
    profilePhoto:{
        type:String,
        required:true
    },
    certificates:{
        type:[String],
        required:true
    },
    condition:{
        type:String,
        required:true,
    }
})

const VerifieddoctorSchema = new mongoose.model('VerifieddoctorSchema',verifieddoctorSchema)

module.exports = VerifieddoctorSchema;