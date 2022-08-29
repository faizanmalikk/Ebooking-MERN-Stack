const express = require('express')
const app = express();
const errorMiddleware = require('./backend/middleware/error')
const cookieaParser = require('cookie-parser')
const cors = require('cors')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const path = require('path')
const logger = require("morgan");


//config
if(process.env.NODE_ENV !== 'PRODUCTION'){

    require('dotenv').config({path : 'backend/config/config.env'})
}

app.use(logger("dev"));
app.use(bodyParser.json({limit: "50mb"}));
app.use(express.json())
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));



app.use(cookieaParser())

app.use(cors({
    credentials: true,
    origin: [process.env.APP_URL , process.env.ADMIN_URL] 
}))


app.use(fileUpload({useTempFiles:true}))

// import routes
const hotel = require('./backend/routes/hotelRoute')
const user = require('./backend/routes/userRoutes')
const room = require('./backend/routes/roomRoute')

app.use('/api' , hotel)
app.use('/api' , user)
app.use('/api' , room)


app.use(express.static(path.join(__dirname,'./frontend/build')))

app.get('*',(req,res)=>{
  res.sendFile(path.resolve(__dirname,'./frontend/build/index.html'))
})


// Middleware for errors
app.use(errorMiddleware)

module.exports = app