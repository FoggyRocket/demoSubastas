// session connect-mongo mongoose

const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");


module.exports  = (app) => {
    app.use(//app.use
        session({
        secret:process.env.SECRET,
        resave: true,
        saveUninitialized: false,
        cookie: {
          httpOnly: true,
          maxAge: 60000 // 60 * 1000 ms === 1 min
        },
        store : MongoStore.create({
            mongoUrl: process.env.MONGODB_URI || "mongodb://localhost/demosubastas"
        })
    })
    ) //end app.use
}