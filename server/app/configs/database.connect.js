const mongoose=require("mongoose")
mongoose
  .connect("mongodb+srv://gultekin:gultekinn@cluster0.ez8varc.mongodb.net/",
{useNewUrlParser:true})
module.exports=connect