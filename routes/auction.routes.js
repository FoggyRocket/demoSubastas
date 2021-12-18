const router = require("express").Router();
const Auction = require("../models/Auction.model") //el modelo que voy a utilizar
const Upload = require("../helpers/multer")//mi asistente para subir imagenes
/* GET form creat auction  */
router.get("/create", (req, res, next) => {
  res.render("auction/auctionform");
});

/* POST form creat auction  */
router.post("/create",Upload.array("images"), (req, res, next) => {
    // const {
    //     _id:_author 
    // } = req.session.user

    const _author = req.session.user._id
    //_author = 23456789h8656d45csd57
    const {lat,lng, address,...auction}= req.body

    const images = req.files.map(file=> file.path)
        //["https://dylan.com/fotosexy.png",...]

    Auction.create( {
        _author,
        images,
        ...auction,
        location:{ address,coords:[lng,lat]}
    })
    .then(auction=> res.redirect("/profile") )
    .catch(error=>next(error))
});
  




/**
 * GET FORM UPDATE AUCTION by ID
 *  tenemos que usar params!!!!
 * redcuerda ":key" de esta manera u.u no lo olvides pls!!!
 */

 router.get("/update/:id",(req,res,next)=>{
    //destructuramos 
    const {id} = req.params
    const {user} = req.session
    //para que se vea mas hermoso 
    Auction.findOne({_id:id,_author:user._id}) //solo el que creo esta subasta pueda verla y actualizarla 
    .then(auction=>res.render("auction/auctionform",{auction}))
    .catch(error=>next(error))

 })
/* post form update auction  
    estaa ruta va a usar :id(params) 
    de donde viene del req.params!!!!!
*/

router.post("/update/:id",Upload.array("images"),  (req, res, next) => {
    //en esta linea estamos sacando el valor id del req.params
    // recuerda estamos destructurando
    const {id} = req.params
    //aplicamos lo mimso que el create estaos reasignando o cambiando 
    //el nombre a la variable en este caso del body a auction va?
    const { body: auction } = req;
    //en esta linea vamos a validar si las el usuario esta mandando
    //imagenes para acutalizar el campo
    if(req.files){
        const images = req.files.map(file=> file.path)
        auction = {...auction,images};
        // te estaras preguntando porque  estamos modificando dentro del if???
        // la respuesta es la siguiente si podemos el images = undefined
        // nos borrar las imagenes anteriores aunque el usuario agregue nuevas
    }
   
    //qque utlizaremos para modificar???? exacto el findByIdAndUpdate!! :D 
    // recuerda lleva 3 params este metodo de mongoose
    // 1.- el _id 
    // 2.- los nuevos valores {perro:"nova"}
    // 3.- es opcional pero si lo necesitas {new:true} recuerdas para que es? 
        // es para que esta promesa te regrese el valor actualizado 
    Auction.findByIdAndUpdate(id,{...auction},{new:true})
    .then(acution=>res.redirect("/profile"))
    .catch(error=>next(error)) //aqui ya lo deje por flojera xD pero puedes agregar los mensajes de 
                              //errores para que se vean del lado del cliente

  });
  
//Borramos la subasta????? pues si 

//recuerda para eliminar solo debes mandar el id que necesitas y ya!!
// si tienes dudas busca a tu profesor mas cercano
router.get("/delete/:id", (req, res, next) => {
    const {id} = req.params
    Auction.findByIdAndDelete(id)
    .then(()=>res.redirect("/profile"))//por qué este then no responde con paramatros???? porque estamos eliminando entonces no necesita 
                                      //responder nada solo saber que la promesa fue completada
    .catch(error=>next(error))
});
module.exports = router;
