var express = require("express");
var router = express.Router();
var models = require("../models");
const jwt = require('jsonwebtoken')
const app = express();
var express = require("express");
var router = express.Router();


router.get('/', (req, res) => {

    res.json({
        text: 'api works!'
    });
});


//Ruta que le permite al usuario logearse o autenticarse

router.post('/login', (req, res) => {
    const user = { id: 3 }; //Simular los datos post con un objeto
    const token = jwt.sign({ user }, 'key_user') //a partir de los datos, genera un token
    res.json({ token }); //respuesta
});

//generar una ruta protegiada, para que solo accedan las personas que genraron un token

router.get('/protected', ensureToken, (req, res) => {

    jwt.verify(req.token, 'key_user', (err, data) => { //verifica el token que viene de la peticion, una vez recibido, obtiene la clave privada.

        if (err) {

            res.sendStatus(403) //error de estado

           
        } else {
            res.json({
                text: 'Acceso autorizado',
                data
            });
        }
    });

});

//Se ejecuta middleware en protected, antes hacemos una funcion

function ensureToken(req, res, next) {
    const bearerHeader = req.headers['authorization']; //Comprobar por cabecera
    console.log(bearerHeader);

    if (typeof bearerHeader !== 'undefined') {
       const bearer = bearerHeader.split(" ");
       const bearerToken = bearer[1];
        req.token = bearerToken;;
        next();
    } else {
        res.sendStatus(403) //Si no se a registrado, envia un codgio de no permitido
    }
}



module.exports = router;