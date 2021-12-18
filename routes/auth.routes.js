const router = require("express").Router();
const User = require("../models/User.model");
const bcryptjs = require("bcryptjs");

/* GET signup page */
router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});


/* POST signup page validate data */
router.post("/signup", async (req, res, next) => {
    //req.body = {username, email,password,profile_pic,...rest}
    try{
        const {username, email,password,...rest} = req.body;

        //validamos que no manden campos vacios
        if(!email || !password){
            res.render("auth/signup",{errorMessage:"No te hagas!! llena bien los campos (correo o contraseña)" })//estoy mandando un error  a la vista
            return
        }

        //hacemos una validacion del password
        const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        if(!regex.test(password)){
            res.render("auth/signup",{errorMessage:"Oye la contraseña debe contener almenos 1 minuscula, 1 mayuscla, un numero y debe tener minimo 6 caracteres" })//estoy mandando un error  a la vista
            return
        }

        const salt = await bcryptjs.genSaltSync(10)
        const passHash = await bcryptjs.hashSync(password,salt)
        const user = await User.create({username,email,password:passHash })
        // aqui vamos a pegar para que haga login despues del registro y meterlo automatico a la app
            //localhost:4000/login
        res.redirect("/login")
    }catch(error){
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(500).render("auth/signup", { errorMessage: error.message });
          } else if (error.code === 11000) {
            res.status(500).render("auth/signup", {
              errorMessage: "Ya fueron utilizados"
            });
          } else {
            next(error);
          }
    }
  });
  

  //LOGIN GET  forms Login

router.get("/login", (req, res, next) => {
  res.render("auth/login");
});

//Login POST 
router.post("/login", async (req, res, next) => {   
    try{
        const { email,password,...rest} = req.body;

        //validamos que no manden campos vacios
        if(!email || !password){
            res.render("auth/login",{errorMessage:"No te hagas!! llena bien los campos (correo o contraseña)" })//estoy mandando un error  a la vista
            return
        }

        const user = await User.findOne({email})
        if(!user){
            res.render("auth/login",{errorMessage:"El correo o la contraseña son erroneas " })//estoy mandando un error  a la vista
            return
        }
        
        if(bcryptjs.compareSync(password,user.password)){
            req.session.user = user // estamos guardo al usuario que se acaba de loggear
            res.redirect("/")
        }else{
            res.render("auth/login",{errorMessage:"El correo o la contraseña son erroneas " })//estoy mandando un error  a la vista
            return
        }

    }catch(error){
        next(error)
    }

});



router.get("/logout", (req, res, next) => {
    req.session.destroy();
    res.redirect("/login")
});






module.exports = router;
