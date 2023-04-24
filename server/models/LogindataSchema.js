const mongoose = require('mongoose')

const loginSchema = new mongoose.Schema({
    username:{
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
    district:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    youare:{
        type:String,
       required:true
    },
    otp:{
        type:String,
        default:"",
    }
})

const LogindataSchema = new mongoose.model('LogindataSchema',loginSchema)

module.exports = LogindataSchema;