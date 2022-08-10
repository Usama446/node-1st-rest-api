const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');


const userRoute = require('./api/route/user')
const productRoute = require('./api/route/product')


//Connection with MongoDb Database
mongoose.connect('mongodb+srv://usama:123@project.cw1doe2.mongodb.net/?retryWrites=true&w=majority')
mongoose.connection.on('error',err=>{
    console.log("Connection Failed");
});
mongoose.connection.on('connected',connected=>{
    console.log("Connected with database...")
})

app.use(fileUpload({
    useTempFiles : true
}))
app.use(cors());

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
 
app.use('/user',userRoute);
app.use('/product',productRoute);


app.use((req,res,next)=>{
    res.status(200).json({
        message : 'app is running'
    })
});

app.use((req,res,next)=>{
    res.status(404).json({
        Error : 'url not found'
    })
});

// app.use((req,res,next)=>{
//     res.status(404).json({
//         error : 'Bad request'
//     })
// });


module.exports = app;