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
const sessionStore = new MySQLStore({
    host: "localhost",
    user: "root",
    password: "",
    database: "lazzypoint"
});

const middlewareSession = session({
    saveUninitialized: false,
    secret: "foobar34",
    resave: false,
    store: sessionStore
});
app.use(middlewareSession);

app.get("/", function(req, res)
{   
    if(req.session.usuario === undefined){ 
        res.render("index", 
        {
            origen:"noLogeado", 
            datos: "usuDesc",
            datosBD:[]
        });
    }
    else{
        var datosTest ={
            foto: "https://cdn2.iconfinder.com/data/icons/ui-1/60/05-512.png",
            email: "yconde@ucm.es",
            nombCompl: "David Conde Cubas",
            fecha: "29/02/2020",
            sexo: "Masculino",
            puntos: 130
        };
 

        // res.render("index", {origen:"logeado", datos: req.session.usuario,datosBD: req.session.datosBD});
        res.render("index", {origen:"logeado", datos: datosTest,datosBD: req.session.datosBD});
    }
    // res.end(); 
});

app.post("/user_page.html",multerFactory.single("file"), (req, res) => {
    let usuario = {
        email: req.body.email,
        pass: req.body.pass,
        nombCompl: req.body.name,
        sexo: req.body.sexo,
        fecha: req.body.date,
        foto: req.file.filename,
        puntos: 0
    }
    req.checkBody("date","Formato de Fecha incorrecta").matches(/\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])*/i);

    req.getValidationResult().then(result => {
        // El método isEmpty() devuelve true si las comprobaciones
        // no han detectado ningún error
        if (result.isEmpty()) {
            bd.insertarUsuario(usuario, function(err, results) {
                if (err !== null) res.render("error", {mensaje: "error conexión",error: "Intentalo nuevamente"});  
                ;      
                if (results !== false) {
                    res.status(200);
                    req.session.usuario = usuario;
                    res.render("index",{origen:"logeado", datos: usuario,datosBD:[]}); 
                }
                else {
                    res.render("error", {mensaje: "Usuario ya existe",error: "Intentalo nuevamente"});  
                }
                    res.end();
            });
        } else {
            res.render("error", {mensaje: "Fecha no cumple Formato adecuado YYYY-MM-DD",error: "Intentalo nuevamente"});  
        }
    }); 
});

app.get("/newUser", function(req, res) {

    res.render("index", {origen:"newUser", datos: "",datosBD:[]});
});

app.get("/desconectar", function(req, res) {
    req.session.destroy();
    res.render("index", {origen:"noLogeado", datos: "usuDesc",datosBD:[]});
});

app.post("/index.html", function(req, res) {
    // bd.isUserCorrect(req.body, function(err, results) {
    // if (err !== null) res.render("error", {mensaje: "error conexión",error: "Intentalo nuevamente"});  
    //     //res.render("error", { message: "Problema BBDD",error: err });        
    // if (results !== false) {
    //     res.status(200);
    //     var datosBD = JSON.parse(JSON.stringify(results)); 
    //     let usuario = {
    //         email: req.body.user,
    //         nombCompl: results[0].nombreCompleto,
    //         sexo: results[0].sexo,
    //         fecha: results[0].fechaNacimiento,
    //         foto: results[0].foto,
    //         puntos: results[0].puntos
    //     }
    //     req.session.usuario= usuario;
    //     req.session.datosBD= datosBD;
    //     res.render("index",{origen:"logeado", datos: usuario,datosBD: datosBD});
    //     res.end(); 
    // }
    // else
    //     res.render("error", {mensaje: req.body.user+"NO EXISTE!",error: "Intentalo nuevamente"});  
    // });
    var datosTest ={
        foto: "https://cdn2.iconfinder.com/data/icons/ui-1/60/05-512.png",
        email: "yconde@ucm.es",
        nombCompl: "David Conde Cubas",
        fecha: "29/02/2020",
        sexo: "Masculino",
        puntos: 130
    }; 
    // res.render("index", {origen:"logeado", datos: req.session.usuario,datosBD: req.session.datosBD});
    res.render("index", {origen:"logeado", datos: datosTest,datosBD: req.session.datosBD});
});

app.post("/log", function(req, res) {
    var datosReq = req.body;
    console.log(datosReq);
    var datosTest ={
        nick: "admin",
        email: "yconde@ucm.es",
        nombCompl: "David Conde Cubas",
        idrol: 1
    }; 
});

app.get("/modifyUser", function(req, res) {
    res.render("index", {origen:"modifyUser", datos: req.session.usuario,datosBD: req.session.datosBD});
});

app.get("/uploadFoto", function(req, res) {
    res.render("uploadFoto", {origen:"", datos: req.session.usuario});
});

app.post("/Form_upload",multerFactory.single("file"), (req, res) => {
    let usuario = {
        email: req.session.usuario.email,
        descripcion: req.body.descripcion,
        fotoUsuarios: req.file.filename
    }
  
    bd.insertarFoto(usuario, function(err, results) {
        if (err !== null) res.render("error", {mensaje: "error conexión",error: "Intentalo nuevamente"});  
        if (results !== false) {
            res.status(200);
            let fotos = req.session.datosBD;            
            fotos.push(usuario);
            res.render("index",{origen:"logeado", datos: req.session.usuario,datosBD: fotos}); 
        }
        else {
            res.render("error", {mensaje: "Error al insertar foto",error: "Intentalo nuevamente"});  
        }
            res.end();
    });
    
});


app.get("/perfilAmigo/:id", function(req, res) {
    bd.getDatos(req.params.id, function(err, results) {
        if (err !== null) res.render("error", {mensaje: "error conexión",error: "Intentalo nuevamente"});  
            //res.render("error", { message: "Problema BBDD",error: err });        
        if (results !== false) {
            res.status(200);
            var datosBD = JSON.parse(JSON.stringify(results)); 
    
            let usuario = {
                email: results[0].email,
                nombCompl: results[0].nombreCompleto,
                sexo: results[0].sexo,
                fecha: results[0].fechaNacimiento,
                foto: results[0].foto,
                puntos: results[0].puntos
            }
            res.render("perfilAmigo",{origen:"logeado", datos: req.session.usuario ,datosAmigo: usuario,datosBD: datosBD});
            res.end(); 
        }
        else
            res.render("error", {mensaje: req.body.user,error: "Intentalo nuevamente"});  
    });
});

app.get("/friends", function(req, res) {
    bd.getAmigos(req.session.usuario.email, function(err, results) {
        if (err !== null) res.render("error", {mensaje: "error conexión",error: "Intentalo nuevamente"});  
        if (results !== false) {  
            var datosBD = JSON.parse(JSON.stringify(results));   
            res.render("friends",{origen:"logeado",datos: req.session.usuario, datosBD: datosBD});
            res.end(); 
        }
        else
            res.render("error", {mensaje: req.body.user,error: "Intentalo nuevamente"});  
        });
});

app.post("/aceptarAmigo", function(req, res) {
    bd.aceptarAmigo(req.session.usuario.email,req.body.ident, function(err, results) {
        if (err !== null) res.render("error", {mensaje: "error conexión",error: "Intentalo nuevamente"});  
        if (results !== true)
            res.render("error", {mensaje: "Aceptar Amigo", error: "Intentalo nuevamente"});
        else{
            bd.insertarAmigo(req.body.ident, req.session.usuario.email, function(err, results) {
                if (err !== null) res.render("error", {mensaje: "error conexión",error: "Intentalo nuevamente"});  
                if (results !== true){
                    res.render("error", {mensaje: "Insertar Amigo",error: "Intentalo nuevamente"});  
                    res.end(); 
                }
                else{
                    res.redirect("/friends");
                }
            });
        } 
    });
});
app.get("/agregarInvitacion/:id", function(req, res) {
    bd.agregarInvitacion(req.session.usuario.email,req.params.id, function(err, results) {
    if (err !== null) res.render("error", {mensaje: "error conexión",error: "Intentalo nuevamente"});  
    if (results !== false) {     
        res.redirect("/friends");
    }
    else{
        res.render("error", {mensaje: req.body.user,error: "Intentalo nuevamente"});
    }  
    });
});
app.post("/rechazarAmigo", function(req, res) {
    bd.rechazarAmigo(req.session.usuario.email,req.body.ident, function(err, results) {
        if (err !== null) res.render("error", {mensaje: "error conexión",error: "Intentalo nuevamente"});  
        if (results !== false) {
            res.redirect("/friends");
        }
        else
            res.render("error", {mensaje: req.body.user,error: "Intentalo nuevamente"});  
    });
});

app.post("/buscarNoAmigos", function(req, res) {
   
    bd.getNoAmigos(req.session.usuario.email,req.body.nombre, function(err, results) {
        if (err !== null) res.render("error", {mensaje: "error conexión",error: "Intentalo nuevamente"});  
        if (results !== false) {
            var datosBD = JSON.parse(JSON.stringify(results)); 
            res.render("searchNofriends",{origen:"logeado",datos: req.session.usuario, datosBD: datosBD,palabra: req.body.nombre});
            res.end(); 
        }
        else
            res.render("error", {mensaje:"Amigos no encontrados",error: "Busque nuevamente"});  
    });
});

app.post("/updateUser",multerFactory.single("file"), (req, res) => {
    let usuario = {
        email: req.session.usuario.email,
        pass: req.body.pass,
        nombCompl: req.body.name,
        sexo: req.body.sexo,
        fecha: req.body.date,
        puntos: req.session.usuario.puntos,
        foto: req.file.filename,
    }
    req.checkBody("date","Formato de Fecha incorrecta").matches(/\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])*/i);
    
        req.getValidationResult().then(result => {
            // El método isEmpty() devuelve true si las comprobaciones
            // no han detectado ningún error
            if (result.isEmpty()) {
                bd.updateUsuario(usuario, function(err, results) {
                if (err !== null) res.render("error", {mensaje: "error conexión",error: "Intentalo nuevamente"});  
                if (results !== false) {
                    res.status(200);
                    req.session.usuario = usuario;
                    res.render("index",{origen:"logeado", datos: usuario, datosBD:[]}); 
                }
                else {
                    res.render("error", {mensaje: "No se pudo actualizar usuario",error: "Intentalo nuevamente"});  
                }
                    res.end();
                });  
            } 
            else {
                    res.render("error", {mensaje: "Fecha no cumple Formato adecuado YYYY-MM-DD",error: "Intentalo nuevamente"});  
            }
        }); 
});


app.listen(3000, (err)=>{
    if(err){
        console.log("Problemas al arrancar el servidor:", err);
    }
});