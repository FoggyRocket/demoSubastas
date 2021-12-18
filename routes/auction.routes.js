const router = require("express").Router();
const Auction = require("../models/Auction.model")
const Upload = require("../helpers/multer")
/* GET form creat auction  */
router.get("/create", (req, res, next) => {
  res.render("auction/auctionform");
});

/* POST form creat auction  */
router.post("/create", (req, res, next) => {
    


});
  
  

module.exports = router;
