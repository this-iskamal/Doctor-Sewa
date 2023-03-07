const mongoose = require('mongoose');
const url = process.env.DATABASEa;

mongoose.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log(`Database connected successfully`)
})
