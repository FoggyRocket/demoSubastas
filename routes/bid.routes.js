const router = require("express").Router();
const Bid = require("../models/Bid.model")// recuerda importamos el modelo que vayamos a utilizar
const Auction = require("../models/Auction.model") // tambien utilizaremos esto
/* POST bid create */
//vamos a relizar nuestro pulls espero se diga a si jajajaja
//como voy a utlizar mas de 2 promesas aninadas o nested? 
// hare esto de forma async 
router.post("/:id", async (req, res, next) => {
    try{
        //comenzamos destructurando
        const {id} = req.params
        //sacamos al user de donde???? exacto del req.session.user
        const {user} = req.session 
        //Nos traemos el bid del req.body
        const {bid} = req.body
        //primero buscamos la Auction para poder utilizarla que tendriamos que hacer????
        // un findById
        const auction = await Auction.findById(id).populate("_lider","bid") //estamos populando para saber quien va ganando en esta subasta

        //haremos un if con el bid para saber si es la primera PUJA(era la palabra que buscaba) ?¿ como se hace un if(...){} <--- asi
        // o ya tiene otras
        if(bid > auction.inital_price || bid > auction._lider.bid){
                                    //estamos mandando todo el body
            const bid = await Bid.create({...req.body,_author:user._id,_auction:id})
            //vamos a actulizar el Auction por si un usuario hace una oferta (igual podemos usar esta palabra)
            // mas elevada
            //recuerda vamos a actualizar van 3 paramaetros 
             const newAuction = await Auction.findByIdAndUpdate(id,{_lider : bid._id },{new:true})
            //esto seri a todo lo que haremos para el bid
             res.redirect("/home")
        }
    }catch(error){
        next(error)
    }



});

module.exports = router;
