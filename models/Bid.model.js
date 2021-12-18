const {Schema,model} =  require("mongoose");


const bidSchema = new Schema( {
    _author:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    _auction:{
        type:Schema.Types.ObjectId,
        ref:"Auction",
        required:true
    },
    bid:{
        type:Number,
        required:true
    }
} , {
    timestamps:true
} )

//exportamos el archivo module.exports

module.exports = model("Bid",bidSchema)