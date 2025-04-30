require('dotenv').config();
const connectDB =require('./db/connectDB')
const Product=require('./models/product')
const jsonProducts=require('./products.json')


const start =async()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        await Product.deleteMany();//just deleteing if there is already something kachra
         await Product.create(jsonProducts);
         process.exit(0)
        console.log('success')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

start();