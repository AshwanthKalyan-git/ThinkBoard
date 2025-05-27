import express from 'express'
import router from './routes/notesRoutes.js';
import { connectionDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';
import dotenv from 'dotenv';
import cors from "cors";

dotenv.config();
const PORT = process.env.PORT||5001;

const app = express();



connectionDB();

app.use(cors({
    origin:"http://localhost:5173",

})
);

app.use(express.json()); // this is the middleware so that we can get the title,content in notesControllers else we would get an undefined random file. used in req.body
//Used to parse to JSON bodies

app.use(rateLimiter);



//middle ware is basically something that comes before sending the response to client from the server side. like  client send request, we send middle ware then response

app.use((req,res,next) => {
    console.log(`Middleware, from method : ${req.method} and URL : ${req.url}`);
    next();
});

app.use("/api/notes",router); 

app.listen(PORT,()=>{
    console.log("App started");
     //exit with failure, if exit(0) it means success
})

//mongodb+srv://ashwanthdocs727:fgfHQh08ojwtMqjk@cluster0.oxvmoys.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0