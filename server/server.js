const mongoose=require("mongoose")
const express=require("express")
const app=express()
const cors=require("cors")
const ringRoute=require("../server/app/routes/Ring.route")
// app.use('/api/users',userRoute)
const cookieParser=require("cookie-parser")
app.use(cookieParser())
app.use(express.json({limit:"20mb"}))
app.use(cors({credentials:true,origin:"http://localhost:3000"}))
mongoose.set("strictQuery", true);


const path=require('path')
const { log } = require("console")
const uploadPath=path.join(__dirname,'public')
app.use('/public',express.static(uploadPath))
app.use(cors({credentials:true,origin:'http://localhost:3000'}))

mongoose.connect("mongodb+srv://gultekin:gultekinn@cluster0.ez8varc.mongodb.net/").then(()=>{
  console.log("connected")
})
app.use('/rings',ringRoute)




app.listen(8085,()=>{
  console.log("server running")
})




















// const mongoose = require("mongoose");
// const express = require("express");
// const cors = require("cors");
// const app = express();
// app.use(cors());

// app.use(express.json());

// const PORT = 8085;

// mongoose
//   .connect("mongodb+srv://gultekin:gultekinn@cluster0.ez8varc.mongodb.net/")
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("Failed to connect to MongoDB:", err));

// // Schema tanımı
// const UsersSchema = mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   price: {
//     type: Number,
//     required: true,
//   },
//   category: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: [true, "string desc"],
//   },
// });

// const UserModel = mongoose.model("Users", UsersSchema);

// // get
// app.get("/", async (req, res) => {
//   const data = await UserModel.find();
//   res.send(data);
// });
// //post
// app.post("/", async (req, res) => {
//   const newModel = await new UserModel({
//     ...req.body,
//   });
//   newModel.save();
//   res.send(newModel);
// });

// //delete
// app.delete("/:id", async (req, res) => {
//   const { id } = req.params;
//   console.log("ID:", id);
//   const newUser = await UserModel.findByIdAndDelete(id);
//   res.send("delete");
// });

// // put (güncelleme)
// app.put("/:id", async (req, res) => {
//   const { id } = req.params;

//   try {
//     const target = await UserModel.findByIdAndUpdate(
//       id,
//       { ...req.body }, // Güncelleme için gönderilen veriler
//       { new: true } // Güncellenmiş veriyi döndürmek için
//     );

//     if (!target) {
//       return res.status(404).send({ error: "User not found" });
//     }

//     res.send(target);
//   } catch (error) {
//     res.status(500).send({ error: "Failed to update user" });
//   }
// });

// // Sunucuyu başlat
// app.listen(PORT, () => {
//   console.log(`App running on port ${PORT}`);
// });
