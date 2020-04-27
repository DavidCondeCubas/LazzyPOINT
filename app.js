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
        res.render("index", {origen:"logeado", datos: req.session.usuario,datosBD: req.session.datosBD,error: ''});
    }
    res.end(); 
});

app.get("/menu", function(req, res) {
    res.render("homepage");
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

app.get("/presentaciones", function(req, res) { //solo test
    res.render("presentation");
});

app.get("/galeriaImagenes", function(req, res) { //solo test
    res.render("galeria");
});

app.get("/contacto", function(req, res) { //solo test
    res.render("contacto");
});


const port = process.env.PORT || 3000;

app.listen(port, (err)=>{
    if(err){
        console.log("Problemas al arrancar el servidor:", err);
    }
});

module.exports = app;