import mongosse from "mongoose";
import {env} from "node:process"

mongosse.connect(env.MONGODB_URI || "mongodb://127.0.0.1:27017/tset").then(()=>{
  console.log('mongodb connect')
}).catch(err => console.error(err))