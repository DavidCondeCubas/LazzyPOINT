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
var pg = require('./routes/postgres.js');

var bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.set ("views", path.join( __dirname , "views"));  //Creamos subcarpeta justo debajo de donde el archivo actual

app.use(express.static('./public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressValidator());

const pgsql = require('pg');
const session = require('express-session');
const pgSession = require('express-pg-session')(session);
 
var pgPool = new pgsql.Pool({
    host: 'ec2-54-247-169-129.eu-west-1.compute.amazonaws.com',
    user: 'ihnahmzsswoqjn',
    database: 'deu6ptr3gt32eh',
    password: '9347ced241f579418d7dcff960d3747614f80ba9167c2fce97e251e05de67563',
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    },
    dialect: 'postgres',
    operatorAliases: false
});
 
app.use(session({
  store: new pgSession({
    pool : pgPool,                // Connection pool
    tableName : 'user_sessions'   // Use another table-name than the default "session" one
  }),
  secret: "foobar34",
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 1 month
}));



app.get("/logout",function(req,res){
    req.session.usuario = undefined;
    res.redirect("/");
  })
app.get("/", function(req, res) {   
    if(req.session.usuario === undefined ){ 
        res.render("index", {origen:"noLogeado", datos: "usuDesc",datosBD:[],error: ''});
    }
    else{
        res.render("homepage", {origen:"logeado", datos: req.session.usuario});
    }
    res.end();
});

app.get("/menu", function(req, res) {
    res.render("homepage");
});

app.post("/registro", function(req, res) {

    var nuevoUsuario = { 
        nick: req.body.nickr,
        email: req.body.email,
        password: req.body.pwdr,
        rol: req.body.rol
    }
    pg.existNick(nuevoUsuario, function(err, results) {
        if (err !== null) {
            res.render("index", {origen:"noLogeado", datos: "usuDesc",datosBD:[], error: "Problemas con la conexion, contacte con el soporte técnico."});
        }
        if (results.rowCount > 0) {
            res.render("index", {origen:"noLogeado", datos: "usuDesc",datosBD:[], error: "El nick ya existe en el sistema."});
        }
        else{
            pg.existEmail(nuevoUsuario, function(err, results) {
                if (err !== null) {
                    res.render("index", {origen:"noLogeado", datos: "usuDesc",datosBD:[], error: "Problemas con la conexion, contacte con el soporte técnico."});
                }
                if (results.rowCount > 0) {
                    res.render("index", {origen:"noLogeado", datos: "usuDesc",datosBD:[], error: "El email ya existe en el sistema."});
                }
                else{
                    pg.insertarUsuario(nuevoUsuario, function(err, results) {
                        if (err !== null) {
                            res.render("index", {origen:"noLogeado", datos: "usuDesc",datosBD:[], error: "Problemas con la conexion, contacte con el soporte técnico."});
                        }
                        if (results.rowCount > 0) {
                            res.status(200);
                            var datosBD = []; 
                            let usuario = { 
                                usuario: nuevoUsuario.nick
                            };
                            req.session.usuario = {
                                nick: nuevoUsuario.nick,
                                id: results.rows[0].id
                            };
                            req.session.datosBD= datosBD;
                            res.render("homepage",{origen:"logeado", datos: usuario});
                            res.end();
                        }
                        else {
                            console.error("Datos devueltos =>",results);
                            res.render("index", {origen:"noLogeado", datos: "usuDesc",datosBD:[], error: "Hubo problemas al insertar en base datos"});
                        }
                    })
                }
            });
        }
    });
});

app.post("/menu", function(req, res) {

    pg.isUserCorrect(req.body, function(err, results) {
        if (err !== null) {
            res.render("error", {mensaje: "error conexión",error: "Intentalo nuevamente"}); 
        }
        if (results.rowCount > 0) {
            res.status(200);
            const usuario = { 
                id: results.rows[0].id,
                nick:  results.rows[0].nick
            }
            req.session.usuario= usuario;
            req.session.datosBD= results;
            res.render("homepage",{origen:"logeado", datos: usuario});
            res.end(); 
        }
        else
            res.render("index", {origen:"noLogeado", datos: "usuDesc",datosBD:[],error: "Intentalo nuevamente, credenciales no encontradas."});  
    });
});

app.get("/modifyProfile", function(req, res) { //solo test
    var usuario = req.session.usuario;
    pg.getUserData(usuario, function(err, results) {
        if (err !== null) {
            res.render("error", {mensaje: "error conexión",error: "Intentalo nuevamente"});
        }   
        if (results !== false) {
            res.status(200);
            res.render("modifyprofile",{datos: results.rows[0],error: "",respuesta: ""});
            res.end(); 
        }
        else
            res.render("index", {origen:"noLogeado", datos: "usuDesc",datosBD:[],error: "Intentalo nuevamente, credenciales no encontradas."});  
    });
});
app.post("/bajaUser",function(req,res){
    var datosBaja ={ 
        id_user: req.session.usuario.id,
        id_type: 3
    }
    pg.sendBajaUsuario(datosBaja,function(err,results){
        if(err !==null){
            res.render("error",{mensaje:"error conexión",error:"Intentando nuevamente"});
        }
        else{

            res.render("modifyProfile",{datos:req.session.usuario,error: "",respuesta:"Petición Enviada Correctamente"});
            res.end();
        }
    })
});

app.post("/modifyUser", function(req, res) {   
    var nuevosDatosUsuario= { 
        email:req.body.email,
        nick: req.body.nick,
        password:req.body.pwd,
        name:req.body.name_rol,
        id: req.session.usuario.id
    };
    pg.checkUser(nuevosDatosUsuario, function(err, results) {
        if (err !== null) {
            res.render("error", {mensaje: "error conexión",error: "Intentalo nuevamente"});
        }
        if (results.rowCount === 0) { // no existe usuario con este correo o nick 
            var data={
                username: req.session.usuario.nick,
                email: req.body.email,
                nick: req.body.nick,
                pwd: req.body.pwd
            }
            pg.updateUser(data, function(err, results) {
                if (err !== null) {
                    res.render("error", {mensaje: "error conexión",error: "Intentalo nuevamente"});         
                }
                if (results !== false) {
                    res.status(200);  
                    req.session.usuario= { 
                        nick: req.body.nick,
                        id: req.session.usuario.id
                    };
                    res.render("modifyprofile",{datos: nuevosDatosUsuario,error: "",respuesta: "Datos actualizados correctamente."});
                    res.end(); 
                }
                else
                    res.render("modifyprofile",{datos: nuevosDatosUsuario, error: "Problemas con la inserción contacte con el soporte.",respuesta: ""});
                }); 
        }
        else {// existe usuario con email o correo igual
            const usuario = {
                id: req.session.usuario.id,
                nick: req.session.usuario.nick
            }
            pg.getUserData(usuario, function(err, results) {
                if (err !== null) {
                    res.render("error", {mensaje: "error conexión",error: "Intentalo nuevamente"});
                }   
                if (results !== false) {
                    res.status(200);
                    res.render("modifyprofile",{datos: results.rows[0],error: "Este nick o email ya está en uso.",respuesta: ""});
                    res.end(); 
                }
                else
                    res.render("index", {origen:"noLogeado", datos: "usuDesc",datosBD:[],error: "Intentalo nuevamente, credenciales no encontradas."});  
            });
        }
    });
});

app.get("/presentaciones", function(req, res) { //solo test
    res.render("presentation");
});

app.get("/galeriaImagenes", function(req, res) {  
    pg.getAllDataPhoto({}, function(err, results) {
        if (err !== null) {
            res.render("components/error", {mensaje: "Error al insertar foto",error: "Intentalo nuevamente"});
        }
        if (results !== false) {   
            var dataCleaned = {};
            var dataUsers =[];
            results.rows.forEach(element => {
                if(dataCleaned[element.nick] == undefined){ 
                    dataCleaned[element.nick] = [];
                    dataUsers.push(element.nick);
                }
                var dataInner ={
                    name: element.name,
                    descrip: element.descrip,
                    date: element.date_creation,
                    nick: element.nick,
                    id: element.id
                } 
                dataCleaned[element.nick].push(dataInner) 
            });
            res.status(200);
            let fotos = req.session.datosBD; 
            res.render("galeria",{dataPhoto: dataCleaned, dataUsernames: dataUsers}); 
            res.end(); 
        }
        else
        res.render("components/error", {mensaje: "Error al insertar foto",error: "Intentalo nuevamente"});    
    }); 
});

app.post("/Form_upload",multerFactory.single("file"), (req, res) => {
    let usuario = { 
        userID: req.session.usuario.id,
        descripcion: req.body.udescrip,
        ext: req.file.mimetype,
        fotoUsuarios: req.file.filename
    } 
    pg.insertarFoto(usuario, function(err, results) {
        if (err !== null) {
            res.render("components/error", {mensaje: "error conexión",error: "Intentalo nuevamente"});  
        }
        if (results !== false) {
            pg.getAllDataPhoto({}, function(err, results) {
                if (err !== null) res.render("components/error", {mensaje: "Error al insertar foto",error: "Intentalo nuevamente"});
                if (results !== false) {   
                    var dataCleaned = {};
                    var dataUsers =[];
                    results.rows.forEach(element => {
                        if(dataCleaned[element.nick] == undefined){ 
                            dataCleaned[element.nick] = [];
                            dataUsers.push(element.nick);
                        } 
                        var dataInner ={
                            name: element.name,
                            descrip: element.descrip,
                            date: element.date_creation,
                            nick: element.nick,
                            id: element.id
                        } 
                        dataCleaned[element.nick].push(dataInner) 
                    }); 
                    res.status(200);
                    res.render("galeria",{dataPhoto: dataCleaned, dataUsernames: dataUsers}); 
                    res.end(); 
                }
                else
                res.render("components/error", {mensaje: "Error al insertar foto",error: "Intentalo nuevamente"});    
            }); 
        }
        else {
            res.render("components/error", {mensaje: "Error al insertar foto",error: "Intentalo nuevamente"});  
        }
    });
});

app.get("/contacto", function(req, res) {
    res.render("contacto");
})

app.get("/resetpwd", function(req, res) {
    res.render("resetpwd", {error:"", mensaje:"", respuesta: 0});
});

app.post("/sendresetpwd", function(req, res) {
    var nickOrEmail = req.body.send;
    pg.existNickOrEmail(nickOrEmail, function(err, results) {
        if (err !== null) {
            res.render("error", {mensaje: "error conexión",error: "Intentalo nuevamente",respuesta:2});
        }
        if (results !== false) {
            if (results.rowCount > 0) {
                pg.sendRequestResetPwd(results.rows[0], function(err, results) {
                    if (err !== null) {
                        res.render("error", {mensaje: "Error conexión",error: "Intentalo nuevamente", respuesta:2});
                    }
                });
            }
            res.status(200);
            res.render("resetpwd", {mensaje: "Cuando el moderador lo apruebe recibirás un correo con el enlace para cambiar la contraseña.",error: "Enviado correctamente! ",respuesta: 1});
            res.end(); 
        }
    });
});


const port = process.env.PORT || 3000;

app.listen(port, (err)=>{
    if(err){
        console.log("Problemas al arrancar el servidor:", err);
    }
});

module.exports = app;
