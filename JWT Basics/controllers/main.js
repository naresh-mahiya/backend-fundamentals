const { CustomAPIError } = require('../errors/custom-error')
const jwt = require('jsonwebtoken')

const login = async (req, res, next) => {
    const { username, password } = req.body;
    console.log(username, password)
    if (!username || !password)
        return next(new CustomAPIError('please provide email and password', 400))


    const id = new Date().getDate();//for id
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: '30d' })//payload,secret,options


    res.status(200).json({ msg: 'user created', token })
}

const dashboard = async (req, res, next) => {
    // console.log(req.headers)
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer')) { return next(new CustomAPIError('No token provided', 401)) }

    const token = authHeader.split(' ')[1];

    //verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)//returns the payload if verified
        const luckyNumber = Math.floor(Math.random() * 100)
        res.status(200).json({ msg: `Hello,${decoded.username}`, secret: `Here is your authorized data,your lucky no. is ${luckyNumber}` })

    } catch (error) {
        next( new CustomAPIError('not authorised to use this route', 401))
    }


}
module.exports = { login, dashboard }