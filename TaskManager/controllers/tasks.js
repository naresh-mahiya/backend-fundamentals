const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')
const {createCustomError} =require('../errors/custom-error')


const getAllTasks = asyncWrapper(
    async (req, res) => {
        const tasks = await Task.find({})
        // res.status(200).json({tasks})
        res.status(200).json({ status: 'success', data: { tasks, nbHits: tasks.length } })
    }
)


const createTask = asyncWrapper(async (req, res) => {

    const task = await Task.create(req.body);
    res.status(200).json({ task })
    // res.send('create task')
})

const getTask = asyncWrapper(async (req, res,next) => {

    const { id: taskID } = req.params;
    const task = await Task.findById(taskID)

    if (!task)
    {
         return next(createCustomError('No task found with this id ',404))
        
        // const error=new Error('No task found with this id')
        // error.status=404;
        // return next(error);
    }
    
    res.status(200).json({ task })

})

const deleteTask = asyncWrapper(async (req, res) => {

    const { id: taskID } = req.params;
    const task = await Task.findByIdAndDelete(taskID)
    if (!task)
        return next(createCustomError('No task found with this id',404))
        // return res.status(404).json({ msg: "Task not found with this id" })
    res.status(200).json({ task }) //in real life, i dont want my deleted task for anything


})

const updateTask = asyncWrapper(async (req, res) => {

    const { id: taskID } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
        new: true, runValidators: true
    })
    //new true otherwise it updates the doc in DB but returns the older one in response

    if (!task)
        return next(createCustomError('No task found with this id',404))
        // return res.status(404).json({ msg: "No task with this id found" })
    res.status(200).json({ task })

})


module.exports = {
    getAllTasks, createTask, getTask, updateTask, deleteTask
}