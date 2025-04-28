const express = require('express')
const app = express();
require('dotenv').config();

const notFound=require('./middleware/not-found')
const errorHandlerMiddleware=require('./middleware/error-handler')
const mainRouter=require('./routes/main')


//middleware
app.use(express.static('./public'))//It allows you to serve static files such as images, CSS files, JavaScript file etc
app.use(express.json());

//routes
app.use('/api/v1',mainRouter)



//no route found 
app.use(notFound);
app.use(errorHandlerMiddleware);




//start our app
const port = process.env.PORT || 3000;
const start = async () => {
    try {
        app.listen(port, console.log(`server is listening..on ${port}`))
    } catch (error) {
        console.log(error);
    }
}

start();



