var mysql = require("mysql");
 
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "lazzypoint"
});

/**
     * Determina si un determinado usuario aparece en la BD con la contraseña
     * pasada como parámetro.
     * 
     * Es una operación asíncrona, de modo que se llamará a la función callback
     * pasando, por un lado, el objeto Error (si se produce, o null en caso contrario)
     * y, por otro lado, un booleano indicando el resultado de la operación
     * (true => el usuario existe, false => el usuario no existe o la contraseña es incorrecta)
     * En caso de error error, el segundo parámetro de la función callback será indefinido.
     * 
     * @param {type} datos
     * @returns {undefined} 
     */
    exports.isUserCorrect = function(datos, callback)
    {  
       pool.getConnection((err, connection) => {
             if (err) { callback(err); return; }
             connection.query("SELECT * FROM users LEFT JOIN fotosusuarios ON(users.email = fotosusuarios.email) WHERE users.email = ? and password = ?",
             [datos.user,datos.pass],
             (err, rows) => {
                 if (err) { callback(err); return; }
                 connection.release();
                 if (rows.length === 0) {
                     callback(null, false);
                 } else {
                     callback(null, rows);
                 }
             });
         });
    };

    
    exports.getDatos = function(email, callback)
    { 
        pool.getConnection((err, connection) => {
                if (err) { callback(err); return; }
                connection.query("SELECT * FROM users LEFT JOIN fotosusuarios ON(users.email = fotosusuarios.email) WHERE users.email = ?",
                [email],
                (err, rows) => {
                    if (err) { callback(err); return; }
                    connection.release();
                    if (rows.length === 0) {
                        callback(null, false);
                    } else {
                        callback(null, rows);
                    }
                });
            });
    };

    exports.insertarUsuario = function(datos, callback)
    {  
       pool.getConnection((err, connection) => {
             if (err) 
             { 
                 callback(err); return; 
             }      
             connection.query("INSERT INTO users(email, fechaNacimiento, nombreCompleto, password, sexo,foto) VALUES (?, ? , ?, ?, ?, ?)",
             [datos.email, datos.fecha, datos.nombCompl, datos.pass, datos.sexo, datos.foto],
            (err, result) => {
                 connection.release();
                 if (err) {
                    callback(null, false);
                 } else {
                    callback(null, true);
                 }
             });
         });
    };

    exports.updateUsuario = function(datos, callback)
    {  
       pool.getConnection((err, connection) => {
             if (err) 
             { 
                 callback(err); return; 
             }                 
             connection.query("UPDATE users SET password = ?,  fechaNacimiento = ?,  sexo = ?,  nombreCompleto = ?, foto = ? WHERE  email = ?",
             [datos.pass, datos.fecha, datos.sexo, datos.nombCompl, datos.foto, datos.email],
             (err, result) => {
                 connection.release();
                 if (err) {
                    callback(null, false);
                 } else {
                    callback(null, true);
                 }
             });
         });
    };

    exports.getAmigos = function(email, callback)
    { 
        pool.getConnection((err, connection) => {
                if (err) { callback(err); return; }
                connection.query("SELECT amigos.user2,amigos.estado,users.foto,users.nombreCompleto FROM amigos INNER JOIN users ON (amigos.user2 = users.email) WHERE user1 = ?",
                [email],
                (err, rows) => {
                    if (err){
                        callback(null, false);
                    } else {
                        callback(null, rows);
                    }
                });
            });
    };

    exports.getNoAmigos = function(email,cadena,callback)
    { 
        pool.getConnection((err, connection) => {
                if (err) { callback(err); return; }
                connection.query("SELECT DISTINCT * FROM (SELECT user2 FROM amigos WHERE user1= ?) a RIGHT JOIN (SELECT * FROM users) b ON (a.user2 = b.email ) WHERE a.user2 is null and b.email like '%"+cadena+"%' and b.email != ?",
                [email,email],
                (err, rows) => {
                    if (err) { callback(err); return; }
                    connection.release();
                    if (rows.length === 0) {
                        callback(null, false);
                    } else {
                        callback(null, rows);
                    }
                });
            });
    };

    exports.aceptarAmigo = function(email1,email2, callback)
    {
        pool.getConnection((err, connection) => {
            if (err) { callback(err); return; }
            connection.query("UPDATE amigos SET estado='SI' WHERE user1 = ? and user2 = ?",
            [email1,email2],
            (err, rows) => {
                connection.release();
                if (err) {
                    callback(null, false);
                } else {
                    callback(null, true);
                }
            });
        });
    };
    exports.insertarAmigo= function(email1,email2, callback)
    {
        pool.getConnection((err, connection) => {
            if (err) { callback(err); return; }
            connection.query("INSERT INTO amigos(user1,user2,estado) VALUES (?,?,?)",
            [email1,email2,"SI"],
            (err, rows) => {
                connection.release();
                if (err) {
                    callback(null, false);
                } else {
                    
                    callback(null, true);
                }
            });
        });
    };
    exports.insertarFoto= function(datos, callback)
    {
        pool.getConnection((err, connection) => {
            if (err) { callback(err); return; }
            connection.query("INSERT INTO fotosusuarios(email,descripcion,fotoUsuarios) VALUES (?,?,?)",
            [datos.email,datos.descripcion,datos.fotoUsuarios],
            (err, rows) => {
                connection.release();
                if (err) {
                    callback(null, false);
                } else {
                    callback(null, true);
                }
            });
        });
    };
    exports.rechazarAmigo = function(email1,email2, callback)
    {
        pool.getConnection((err, connection) => {
            if (err) { callback(err); return; }
            connection.query("DELETE FROM amigos WHERE user1 = ? and user2 = ?",
            [email1,email2],
            (err, rows) => {
                connection.release();
                if (err) {
                    callback(null, false);
                } else {
                   
                    callback(null, true);
                }
            });
        });
    };

    exports.agregarInvitacion = function(email1,email2, callback)
    {
        pool.getConnection((err, connection) => {
            if (err) { callback(err); return; }
            connection.query("INSERT INTO amigos(user1,user2,estado) VALUES (?,?,?)",
            [email2,email1,"NO"],
            (err, rows) => {
                connection.release();
                if (err) {
                    callback(null, false);
                } 
                else {   
                    callback(null, true);
                }
            });
        });
    };
    