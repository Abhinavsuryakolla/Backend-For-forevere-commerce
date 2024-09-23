import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import   dbConnection  from './config/mongodb.js';
import connectDb from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';

// App config
const app = express();
const port = process.env.PORT || 5000;
connectDb()
connectCloudinary()


// middlewares
app.use(express.json())
app.use(cors())


// end points
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
