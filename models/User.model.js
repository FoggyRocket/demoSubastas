const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,//<- Forma tradicional
      required:[true,"Debes colocar "] //<-
    },
    password: {
      type:String,
      required:true
    },
    email:{
      type:String,
      required:true,
    },
    profile_pic:{
      type:String,
      default:"https://avatars.githubusercontent.com/u/29002976?v=4"
    }
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
