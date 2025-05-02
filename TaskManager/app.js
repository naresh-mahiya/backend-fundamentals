const express = require('express')
const app = express();
const tasks = require('./routes/tasks')
require('dotenv').config();
const connectDB = require('./db/connect');
const notFound=require('./middleware/not-found')
const errorHandlerMiddleware=require('./middleware/error-handler')
const cors=require('cors')


//middleware
app.use(express.static('./public'))//It allows you to serve static files such as images, CSS files, JavaScript file etc
app.use(express.json());
app.use(cors());


//routes

app.get('/hello', (req, res) => {
    res.send('Task Manager App')
})

app.use('/api/v1/tasks', tasks)


//no route found
app.use(notFound);
app.use(errorHandlerMiddleware);




//start our app
const port = 3000;
const start = async () => {
    try {
        app.listen(port, console.log(`server is listening..on ${port}`))
        await connectDB(process.env.MONGO_URI).then(() => console.log("connected to DB "));
    } catch (error) {
        console.log(error);
    }
}

start();



