import mongoose from "mongoose";

// export const dbConnection=()=>{
//     mongoose.connect('mongodb://127.0.0.1:27017/e-commerce').then(()=>{
//         console.log('connected successful')
//     }).catch((err)=>{
//         console.log('failed')
//     })
// }

// export default dbConnection


const connectDb=async()=>{
    mongoose.connection.on('connected',()=>{
        console.log('connected successfully')
    })

    await mongoose.connect(`${process.env.MONGOOSE_URL}/e-commerce`)
}

export default connectDb


