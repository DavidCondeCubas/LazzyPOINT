/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";

//importamos framework EXPRESS y llamamos a la aplicacion
const path = require("path");
const express = require ("express");

const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const app = express();

let multer = require("multer");
let multerFactory = multer({ dest: path.join(__dirname,"/public/uploads") });

//VARIABLE BBDD
var bd = require("./routes/bbdd.js");
var bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.set ("views", path.join( __dirname , "views"));  //Creamos subcarpeta justo debajo de donde el archivo actual

const ficherosEstaticos = path.join(__dirname,"public");
app.use(express.static(ficherosEstaticos));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressValidator());

const session = require("express-session");
const mysqlSession = require("express-mysql-session");
const MySQLStore = mysqlSession(session);
// const sessionStore = new MySQLStore({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "lazzypoint"
// });
const sessionStore = new MySQLStore({
    host: "sql7.freemysqlhosting.net",
    user: "sql7336353",
    password: "RRA7LkAdcf",
    database: "sql7336353"
});

const middlewareSession = session({
    saveUninitialized: false,
    secret: "foobar34",
    resave: false,
    store: sessionStore
});
app.use(middlewareSession);

app.get("/logout",function(req,res){
    req.session.usuario = undefined;
    res.redirect("/");
  })
app.get("/", function(req, res) {   
   // res.render("index");
    if(req.session.usuario === undefined ){ 
        res.render("index", {origen:"noLogeado", datos: "usuDesc",datosBD:[],error: ''});
    }
    else{
        let usuario = { 
            usuario:  req.session.usuario.usuario
        }
        res.render("homepage", {origen:"logeado", datos: usuario});
    }
    res.end(); 
});

app.get("/menu", function(req, res) {
    res.render("homepage");
});

app.post("/registro", function(req, res) {

    var nuevoUsuario = { 
        nick: req.body.nick,
        email: req.body.email,
        password: req.body.pwd,
        rol: req.body.rol
    }

    bd.existNick(nuevoUsuario, function(err, results) {
        if (err !== null) {
            res.render("index", {origen:"noLogeado", datos: "usuDesc",datosBD:[], error: "Problemas con la conexion, contacte con el soporte tecnico."});
        }
        if (results !== false) {
            res.render("index", {origen:"noLogeado", datos: "usuDesc",datosBD:[], error: "El nick ya existe en el sistema"});
        }
        else{
            bd.existEmail(nuevoUsuario, function(err, results) {
                if (err !== null) {
                    res.render("index", {origen:"noLogeado", datos: "usuDesc",datosBD:[], error: "Problemas con la conexion, contacte con el soporte tecnico."});
                }
                if (results !== false) {
                    res.render("index", {origen:"noLogeado", datos: "usuDesc",datosBD:[], error: "El email ya existe en el sistema"});
                }
                else{
                    bd.insertarUsuario(nuevoUsuario, function(err, results) {
                        if (err !== null) {
                            res.render("index", {origen:"noLogeado", datos: "usuDesc",datosBD:[], error: "Problemas con la conexion, contacte con el soporte tecnico."});
                        }
                        if (results !== false) {
                            res.status(200);
                            var datosBD = []; 
                            let usuario = { 
                                usuario: nuevoUsuario.nick
                            }
                            req.session.usuario= usuario;
                            req.session.datosBD= datosBD;
                            res.render("homepage",{origen:"logeado", datos: usuario});
                            res.end();
                        }
                        else{
                            res.render("index", {origen:"noLogeado", datos: "usuDesc",datosBD:[], error: "Hubo problemas al insertar en base datos"});
                        }
                    })
                }
            });  
        }
    }); 

});

app.post("/menu", function(req, res) {
    var usuario ={usuario: req.body.nick}
    // res.render("homepage");
    
    bd.isUserCorrect(req.body, function(err, results) {
        if (err !== null) res.render("error", {mensaje: "error conexión",error: "Intentalo nuevamente"});  
            //res.render("error", { message: "Problema BBDD",error: err });        
        if (results !== false) {
            res.status(200);
            var datosBD = JSON.parse(JSON.stringify(results)); 
            let usuario = { 
                usuario:  results[0].NICK
            }
            req.session.usuario= usuario;
            req.session.datosBD= datosBD;
            res.render("homepage",{origen:"logeado", datos: usuario});
            res.end(); 
        }
        else
            res.render("index", {origen:"noLogeado", datos: "usuDesc",datosBD:[],error: "Intentalo nuevamente, credenciales no encontradas."});  
        });
});

app.post("/modifyUser", function(req, res) {   
    var datosBD= { 
        EMAIL:req.body.email,
        NAME:req.body.rol,
        NICK: req.body.nick,
        PASSWORD:req.body.pwd, 
    }; 
    bd.checkUser(req.body, function(err, results) {
        if (err !== null) res.render("error", {mensaje: "error conexión",error: "Intentalo nuevamente"});  
            //res.render("error", { message: "Problema BBDD",error: err });        
        if (results == false || req.session.usuario.usuario == req.body.nick) { // no existe usuario con este correo o nick 
            var data={
                username: req.session.usuario.usuario,
                email: req.body.email,
                nick: req.body.nick,
                pwd: req.body.pwd
            }
            bd.updateUser(data, function(err, results) {
                if (err !== null) res.render("error", {mensaje: "error conexión",error: "Intentalo nuevamente"});  
                    //res.render("error", { message: "Problema BBDD",error: err });        
                if (results !== false) {
                    res.status(200);  
                    let usuario = { 
                        usuario: data.nick
                    }
                    req.session.usuario= usuario; 
                    datosBD.nick = data.nick;
                    
                    res.render("modifyprofile",{datos: datosBD,error: "",respuesta: "Datos actualizados correctamente."});
                    res.end(); 
                }
                else
                    res.render("modifyprofile",{datos: datosBD,error: "Problemas con la inserción contacte con el soporte.",respuesta: ""});
                }); 
        }
        else // existe usuario con email o correo igual 
            res.render("modifyprofile",{datos: datosBD,error: "Este nick ya esta en uso.",respuesta: ""});
        });
});


app.get("/presentaciones", function(req, res) { //solo test
    res.render("presentation");
});

app.get("/galeriaImagenes", function(req, res) { //solo test
    res.render("galeria");
});

app.get("/contacto", function(req, res) { //solo test
    res.render("contacto");
});

app.get("/modifyProfile", function(req, res) { //solo test
    var usuario = req.session.usuario;
    // res.render("homepage"); 
    bd.getUserData(usuario, function(err, results) {
        if (err !== null) res.render("error", {mensaje: "error conexión",error: "Intentalo nuevamente"});  
            //res.render("error", { message: "Problema BBDD",error: err });        
        if (results !== false) {
            res.status(200);
            var datosBD = JSON.parse(JSON.stringify(results));  
            
            res.render("modifyprofile",{datos: datosBD[0],error: "",respuesta: ""});
            
            //res.render("modifyProfile"); 
            res.end(); 
        }
        else
            res.render("index", {origen:"noLogeado", datos: "usuDesc",datosBD:[],error: "Intentalo nuevamente, credenciales no encontradas."});  
        });
});

const port = process.env.PORT || 3000;

app.listen(port, (err)=>{
    if(err){
        console.log("Problemas al arrancar el servidor:", err);
    }
});

module.exports = app;