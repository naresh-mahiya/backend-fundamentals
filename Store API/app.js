require('dotenv').config()
require('express-async-errors')//async errors




const express=require('express');
const app=express();
const notFoundMiddleware=require('./middleware/not-found')
const errorMiddleware=require('./middleware/error-handler')
const connectDB =require('./db/connectDB')
const productsRouter=require('./routes/products')
//midleware
app.use(express.json());


//routes
app.get('/',(req,res)=>{
    res.send('<h1>Store API</h1><a href="/api/v1/products">products</a>')
})

app.use('/api/v1/products',productsRouter)


//product routes


//end of the routes
app.use(notFoundMiddleware)
app.use(errorMiddleware)

//port
const port=process.env.PORT || 3000

const start=async()=>{
    try {
       await  connectDB(process.env.MONGO_URI).then(console.log("DataBase connected"));
        app.listen(port,()=>{
            console.log(`server is listening on ${port}`);
        })
    } catch (error) {
        console.log(error);
    }
}

start(); 