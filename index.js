import  express  from "express";
import dotenv from 'dotenv'  
import AppRouters from './src/routes/index.js'
dotenv.config();

const PORT= process.env.PORT
const app=express();
 
app.use(express.json())
app.use('/',AppRouters)
app.listen(PORT, ()=>console.log(`app is listening with port ${PORT}`))