const { Pool } = require('pg');

const pool = new Pool({
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


exports.isUserCorrect = function(datos, callback)
{
    pool.connect((err, connection) => {
        if (err) { callback(err); return; }
        connection.query("select * from users where (email=$1 or nick=$1) and password=$2",
        [datos.nickl,datos.pwdl],
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

exports.checkUser = function(datos, callback)
{  
   pool.connect((err, connection) => {
         if (err) { callback(err); return; }
         connection.query(`select * from users where (nick=$1 or email=$2) and id!=$3`,
         [datos.nick, datos.email, datos.id],
         (err, rows) => {
            if (err) { 
                callback(err); 
                return; 
            }
            connection.release();
            if (rows.length === 0) {
                callback(null, false);
            } else {
                callback(null, rows);
            }
         });
     });
};

exports.updateUser = function(datos, callback)
{  
   pool.connect((err, connection) => {
         if (err) { callback(err); return; }
         connection.query("update users set email=$1, nick=$2, password=$3 where nick=$4",
         [datos.email,datos.nick,datos.pwd,datos.username],
         (err, rows) => {
            if (err) {
                callback(err, null); 
                return;
            }
            connection.release();
            if (rows.length === 0) {
                callback(null, false);
            } else {
                callback(null, rows);
            }
         });
     });
};


exports.getUserData = function(datos, callback)
{  
   pool.connect((err, connection) => {
         if (err) { callback(err); return; }
         connection.query("select u.id, u.nick, u.email, u.password, u.id_rol, r.name from users u, roles r where u.id_rol=r.id and (email=$1 or nick=$1)",
         [datos.nick],
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

exports.getUserById = function(datos, callback)
{  
   pool.connect((err, connection) => {
         if (err) { callback(err); return; }
         connection.query("select u.id, u.nick, u.email, u.password, u.id_rol, r.name from users u, roles r where u.id_rol=r.id and u.id=$1",
         [datos.id],
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

exports.getAllDataPhoto = function(datos, callback)
{  
   pool.connect((err, connection) => {
         if (err) { callback(err); return; }
         connection.query("SELECT p.*,u.nick FROM photos p inner join users u ON (p.id_user = u.id) order by id_user,date_creation ASC",
         [],
         (err, rows) => {
            if (err) { 
                console.error("Error=>", err);
                callback(err); 
                return; 
            }
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
    pool.connect((err, connection) => {
            if (err) { callback(err); return; }
            connection.query("SELECT * FROM users LEFT JOIN fotosusuarios ON(users.email = fotosusuarios.email) WHERE users.email = $1",
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

exports.existNick = function(datos, callback)
{
    pool.connect((err, connection) => {
        if (err)
        {
            callback(err);
            return;
        }
        connection.query("select * from users where nick=$1",
        [datos.nick],
        (err, rows) => {
            if (err) {
                callback(err);
                return;
            }
            connection.release();
            if (rows.length === 0) {
                callback(null, false);
            }
            else {
                callback(null, rows);
            }
        });
    });
};

exports.existEmail = function(datos, callback)
{
    pool.connect((err, connection) => {
        if (err)
        {
            callback(err);
            return;
        }
        connection.query("select * from users where email=$1",
        [datos.email],
        (err, rows) => {
            if (err) {
                callback(err);
                return;
            }
            connection.release();
            if (rows.length === 0) {
                callback(null, false);
            }
            else {
                callback(null, rows);
            }
        });
    });
};

exports.existNickOrEmail = function(datos, callback)
{  
   pool.connect((err, connection) => {
         if (err) { callback(err); return; }
         connection.query(`select * from users where (nick=$1 or email=$1)`,
         [datos],
         (err, rows) => {
            if (err) { 
                callback(err); 
                return; 
            }
            connection.release();
            if (rows.length === 0) {
                callback(null, false);
            } else {
                callback(null, rows);
            }
         });
     });
};


exports.sendBajaUsuario = function(datos,callback)
{
    pool.connect((err,connection) => {
        if(err){
            callback(err);return;
        }
        connection.query("insert into moderator_request (date_creation, id_user, id_type) values(now(), $1, $2) returning id",
        [datos.id_user,datos.id_type], (err, result) => {
            connection.release();
            if(err){
                callback(null,-1);
            }
            else {
                callback(null,result);
            }
        });
    })
}

exports.insertarUsuario = function(datos, callback)
{  
   pool.connect((err, connection) => {
        if (err) 
        { 
            callback(err); return; 
        }      
        connection.query("insert into users (nick, email, password, state, id_rol) values ($1, $2, $3, 1, $4) returning id",
            [datos.nick, datos.email, datos.password, datos.rol],
            (err, result) => {
            connection.release();
            if (err) {
                callback(null, -1);
            } else {
                console.log(result);
                callback(null, result);
            }
         });
     });
};

exports.sendRequestResetPwd = function(datos, callback)
{  
   pool.connect((err, connection) => {
        if (err) 
        { 
            callback(err); return; 
        }
        connection.query("insert into moderator_request (date_creation, id_user, id_type) values (now(), $1, 1)",
            [datos.id],
            (err, result) => {
            connection.release();
            if (err) {
                console.error(err);
                callback(null, err);
            } else {
                console.log(result);
                callback(null, result);
            }
         });
     });
};

exports.updateUsuario = function(datos, callback)
{  
   pool.connect((err, connection) => {
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
    pool.connect((err, connection) => {
            if (err) { callback(err); return; }
            const queryString = "SELECT amigos.user2,amigos.estado,users.foto,users.nombreCompleto FROM amigos INNER JOIN users ON (amigos.user2 = users.email) WHERE user1=$1";
            connection.query(queryString,
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
    pool.connect((err, connection) => {
            if (err) { callback(err); return; }
            const firtsQueryPart = "SELECT DISTINCT * FROM (SELECT user2 FROM amigos WHERE user1= ?) a RIGHT JOIN (SELECT * FROM users) b ON (a.user2 = b.email ) WHERE a.user2 is null and b.email like '%"; 
            const queryString = firtsQueryPart+cadena+"%' and b.email != ?";
            connection.query(queryString,
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
    pool.connect((err, connection) => {
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
    pool.connect((err, connection) => {
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
    pool.connect((err, connection) => {
        if (err) { callback(err); return; }
        connection.query("INSERT INTO photos (name,format,date_creation,id_user,descrip) VALUES ($1,$2,now(),$3,$4)",
        [datos.fotoUsuarios,datos.ext,datos.userID,datos.descripcion],
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
    pool.connect((err, connection) => {
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
    pool.connect((err, connection) => {
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
