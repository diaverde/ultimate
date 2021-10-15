const express = require('express');
const router = require('./router.js');

const app = express();

// for parsing application/xwww-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);
app.use(express.static('public'));
app.listen(3000);

console.log("Servidor iniciado");