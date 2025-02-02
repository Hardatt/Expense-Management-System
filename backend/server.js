const express =require('express')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')
const colors = require('colors')
const path = require('path')
const connectDb = require("./config/connectDb")
//config dot env file
dotenv.config();

//database call
connectDb();


//rest object
const app = express()

//middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({
    origin : ["https://expense-management-system-5v9q.vercel.app"],
    methods : ["POST","GET","PUT","DELETE"],
    credentials : true
}));

//routes
//user routes
app.use('/api/v1/users',require('./routes/userRoutes'))
//transaction routes
app.use('/api/v1/transactions',require('./routes/transactionRoutes'))

//static files
app.use(express.static(path.join(__dirname,'../frontend/build')));
app.use(express.static(path.join(__dirname,'../frontend/build')));

app.get('*',function(req,res) {
    res.sendFile(path.join(__dirname,'../frontend/build/index.html'));
})
//port
const PORT = process.env.PORT;

//listen server
app.listen(PORT,() =>{
    console.log(`Server running on port ${PORT}`)
});