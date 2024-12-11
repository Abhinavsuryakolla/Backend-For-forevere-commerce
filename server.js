import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import   dbConnection  from './config/mongodb.js';
import connectDb from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
// App config
const app = express();
const port = process.env.PORT || 5000;
connectDb()
connectCloudinary()


// middlewares
app.use(express.json())
app.use(cors())

// api endpoint
app.use('/api/user',userRouter)

// end points
app.get("/", (req, res) => {
  try {
    res.send("Hello World!");
  } catch (err) {
    console.error("Error in / route:", err.message);
    res.status(500).send({ message: "Internal Server Error" });
  }
});
 app.listen(port, () => console.log(`Example app listening on port ${port}!`));

