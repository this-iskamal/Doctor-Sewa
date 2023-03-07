const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config();
require('./db/conn');
const LogindataSchema = require('./models/LogindataSchema')

const saltrounds = 10;
const PORT =process.env.PORT||8000;
const app = express();
app.use(bodyparser.json());
app.unsubscribe(bodyparser.urlencoded({extended:true}));
app.use(cors());


app.post('/register',async (req,res)=>{
    try{
        const existuser = await LogindataSchema.findOne({email:req.body.email})
        if(existuser){
            res.status(200).send({message:'user already exist',success:false})
        }
        if(!existuser){
            const hashpwd = await bcrypt.hash(req.body.password,saltrounds);
            const newuser = new LogindataSchema({
                username:req.body.username,
                email:req.body.email,
                password:hashpwd,
                gender:req.body.gender,
                phone:req.body.phone,
                youare:req.body.youare,
            })
            await newuser.save();
            res.status(200).send({message:'signup success',success:true}) 
        }
        
    }
    catch(err){
        console.log(err)
        res.status(200).send({message:'signup error',success:false})
    }
})

app.post('/login',async (req,res)=>{
    try{
        const user = await LogindataSchema.findOne({email:req.body.email});
        if(!user){
            res.status(200).send({message:'user not found' ,success:false })
        }
        const ispasswordmatch = await bcrypt.compare(req.body.password,user.password);
        if(!ispasswordmatch){
            res.status(200).send({message:"password dont match",success:false})
        }
        else if(user && ispasswordmatch){
            res.status(200).send({message:'login success',success:true , role:user.youare})
        }
    }
    catch(err){
        console.log(err)
    }
})

app.listen(PORT , ()=>{
    console.log(`Server started on port  ${PORT}`)
})
