const mysql = require("mysql");

const dbConnection = mysql.createPool({
    connectionLimit: 100, 
    host: "localhost",
    user: "root",
    password: "Mintic#1",
    database: "WhitesnakeDB",
    debug: false
});

//export this router to use in our index.js
module.exports = dbConnection;