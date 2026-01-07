import cookieParser from 'cookie-parser';
import express, { json } from 'express'
import http from 'http';
import './Connections/mysql.js';
import  './Connections/passport.js'
import passport from 'passport';
import router from './routes/routes.js';

const app=express();
app.use(express.urlencoded({extended:true}))
app.use(json());
app.use(cookieParser());
const server=http.createServer(app);
app.use(passport.initialize())
app.use("/auth",router);




server.listen(3000,()=>{
    console.log("server started on port 3000")
})

