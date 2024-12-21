require('dotenv').config();
const express=require("express");
const mongoose=require("mongoose"); 
const personRouter=require("./routes/personRoutes");
const cors = require('cors');
const server=express();


main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(process.env.BASE_URL);
  console.log("Mongo is connected");
  
}
server.use(cors());// it allows another localhost server to send request to this server.
server.use(express.json());
server.use("/",personRouter.router);





server.listen(8080,()=>{
  console.log("Server is running")});