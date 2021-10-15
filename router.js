const express = require('express');
const path = require('path');
const dbConnection = require('./database.js')
const { body,validationResult } = require('express-validator');

const router = express.Router();

router.get('/', function(req, res){
   res.sendFile(path.join(path.join(__dirname, 'public'), 'index.html'));
});

router.post(
   '/form',
   body('name').not().isEmpty().trim().escape(),
   body('email').isEmail().normalizeEmail(),
   body('comments').trim().escape(),
   function(req, res){
   console.log("Headers: " + JSON.stringify(req.headers));
   console.log("Body: "+ JSON.stringify(req.body));
   // Extract the validation errors from a request.
   const errors = validationResult(req);

   if (!errors.isEmpty()) {
      console.log("Errores de validación: "+ errors);
      res.send("Errores de validación: "+ errors);
   } else {
       // Data from form is valid.
      const fan = {
         name: req.body.name,
         age: req.body.age,
         email: req.body.email,
         comments: req.body.comments
      }
      const conn = dbConnection;
      let myQuery = `INSERT INTO Fans(Name, Age, Email, Comments) VALUES (?,?,?,?)`;
      conn.query(myQuery, [fan.name, fan.age, fan.email, fan.comments], (err, rows) => {
         if (err) {
            console.log("Error de conexión: "+ err);
            res.send("Error de conexión");
         } else {
            res.sendFile(path.join(path.join(__dirname, 'public'), 'post_registro.html'));
         }
      });
      //conn.end();
   }
});

router.post('/login', function(req, res){
   const loginData = {
      adminName: req.body.user,
      adminPwd: req.body.password
   }
   console.log(loginData);
   const conn = dbConnection;
   const myQuery = "SELECT Username, Password FROM Admin WHERE Username=?;";
   conn.query(myQuery, loginData.adminName, (err, rows) => {
      if (err) {
         console.log("Error de conexión: "+ err);
         res.send("Error de conexión");
      } else {
         if (rows.length == 0) {
            //console.log("Sin resultados");
            res.send("Usuario no existe");
         } else {
            if (rows[0].Password == loginData.adminPwd) {
               res.send("Bienvenido");
            } else {
               res.send("Contraseña incorrecta");
            }
         }
      }
   });
});

router.get('/dbinfo', function(req, res){
   const conn = dbConnection;
   conn.query("SELECT * from Fans", (err, data) => {
      if (err) {
         console.log("Error de conexión: " + err);
         res.send(500);
         res.send("Error de conexión");
      } else {
         res.type('application/json');
         res.send(data);
      }
   });
   //conn.end();
});

//export this router to use in our index.js
module.exports = router;