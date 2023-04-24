const mongoose = require('mongoose');
const urla = process.env.DATABASEa;
const urlb = process.env.DATABASEb  ;


mongoose.connect(urlb,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log(`Database connected successfully`)
})
