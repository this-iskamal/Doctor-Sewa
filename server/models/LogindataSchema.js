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
        type:String
        ,required:true
    },
    gender:{
        type:String
        ,required:true
    },
    phone:{
        type:String,
        unique:true
        ,required:true
    },
    youare:{
        type:String
        ,required:true
    }
})

const LogindataSchema = new mongoose.model('LogindataSchema',loginSchema)

module.exports = LogindataSchema;