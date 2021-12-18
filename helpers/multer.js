//importar cloudinary Multer-storage-cloudinary multer
//muy importante
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
//confi credentials!!!
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_KEY,
    api_secret:process.env.CLOUDINARY_SECRET,
    //secure:true
})
//config storage

const storage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder:"subastaSep",
        allowedFormats:["jpg","png","jpeg"]
    }
})


module.exports = multer({storage})