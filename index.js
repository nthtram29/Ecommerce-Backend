const express = require("express");
const dotenv = require('dotenv');
const { default: mongoose } = require("mongoose");
const routes = require('./src/routes')
const cors = require('cors');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
dotenv.config()

const app = express()
  // const corsOptions: CorsOptions = {
  //   origin: ['http://localhost:3000'],
  //   methods: ['GET', 'POST', 'PUT', 'DELETE'],
  //   allowedHeaders: ['Content-Type', 'Authorization'],
  // };

var corsOptions = {
     origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
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
