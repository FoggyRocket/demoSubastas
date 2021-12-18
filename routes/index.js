const router = require("express").Router();
const Auction = require("../models/Auction.model")
const {isLoggedOut,isLoggedIn} = require("../utils/auth")
/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

//ahora usaremos este apartado para  crear las rutas del home y 
// SI SANTIAGO aqui va a estar la del PROFILE xD por fin


//en esta ruta  vamos a listar todas las Auction eso quiere decir queeeeee!!
// hay que importar el modelo!!
router.get("/home",isLoggedIn, (req, res, next) => {
  //por que solicito o saco al user del req.session
  // para tener su info esto quiere decir que la pagina HOME debe estar validad 
  // para tener une session abierta
   const {user} = req.session


   //voy a listar todas mis subastas(auction) como se haria??? 
   //exacto con el .find() <== recuerda que cuando no lleva parametros nos va a traer TODO LO QUE ENCUENTRE

   Auction.find()//<== a esto me refiero "se me olvidaba popular xD"
   .populate({
     path:"_lider",
     populate:{
       path:"_author"
     }
   })
   .then(auctions=> {//auctions <== tiene una s por que?, por que?!!! porque es una lista [ {...},{...},{...},... ]
    console.log("auction",auctions)
    res.render("home",{user,auctions})
   })
   .catch(error=>next(error))
});


//el esperado por SANTIAGO ahahahahahaha

router.get("/profile",isLoggedIn, (req, res, next) => {

  //ya tengo los valores de mi usario guardado en alguna parte donde creen? 
  // exacto en el req.session entonces lo unico que voy a realizar es un destructuracion
  const {user} = req.session
  //aaaaaaah pero me falta algo mas necesito saber en que subastas creo  el usuario
  // entonces tengo que hacer una busqueda o un filtro?
  //ambos!
  Auction.find({_author:user._id})//ahora si te fijas el find ya lleva paramaretros porque estamos especificando que es lo que quiero exactamente 
  .then(auctions =>{
    console.log("auction",auctions)

    res.render("profile",{user,auctions});
  })
  .catch(error=>next(error))

});

module.exports = router;
