const express = require("express");
const dotenv = require('dotenv');
const { default: mongoose } = require("mongoose");
const routes = require('./src/routes')
const cors = require('cors');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
dotenv.config()

const app = express()


var corsOptions = {
     origin: ['http://localhost:3000', 'https://ecommerce-frontend-phi-ten.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    // allowedHeaders: ['Content-Type', 'Authorization'],
    allowedHeaders: ['Content-Type', 'Authorization','token'],

}
app.use(cors(corsOptions));
const port = process.env.PORT || 3001

// app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use(bodyParser.json());

app.use(cookieParser());

routes(app);


mongoose.connect(`${process.env.MONGO_DB}`)
    .then(()=>{
        console.log('Connect db success!')
    })
    .catch((err)=>{
        console.log(err)
    })

app.listen(port, ()=>{
    console.log('server is running in port: ', + port)
})
