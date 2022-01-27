const express=require('express')
const PORT=8899
const app=express()

app.use(express.json());
app.use(express.urlencoded({extended:false}));
const employeeRoutes=require('./Routes/employeeRoutes')
const connectDB = require('./Connection/connectDB')
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
app.use(cookieParser())
app.use(cookieSession({
    name: 'session',                              // name of the cookie
    secret: 'MAKE_THIS_SECRET_SECURE',            // key to encode session
    maxAge: 24 * 60 * 60 * 1000,                  // cookie's lifespan
    sameSite: 'lax',                              // controls when cookies are sent
    path: '/',                                    // explicitly set this for security purposes
    secure: process.env.NODE_ENV === 'production',// cookie only sent on HTTPS
    httpOnly: true                                // cookie is not available to JavaScript (client)
  }));
connectDB()
app.set("view engine","ejs")
app.use('/api/',employeeRoutes)


app.listen(PORT,(err)=>{
    if(err) throw err
    console.log(`Work on Port ${PORT}`)
})