const mongoose=require('mongoose')


const connectDB=(uri)=>{
    return mongoose.connect(uri);
}

//it returns a promise...so we can use then cath etc

module.exports=connectDB;