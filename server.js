const express = require('express');
const { Pool } = require('pg');
const db = require('./modules/db.js')
const server = express();
const PORT = process.env.PORT || 8080;
server.set('port', PORT);

const tasklist = require("./modules/tasklist.js");
const users = require("./modules/users.js")

/*
const authUtils = require('./modules/auth_utils.js')

let hash = authUtils.createHash('kongolav');
console.log(hash);

let token = authUtils.createToken('testuser', 1);
console.log(token);

let payload = authUtils.verifyToken(token);
console.log(payload);
*/

// MIDDLEWARE ----------------------------
server.use(express.static("public"));
server.use(express.json());

server.use(tasklist);
server.use(users);

//General error handling --------------------------------
server.use(function (err, req, res, next) {

    console.log(err);
    res.status(500).json({
        error:'Noe gikk galt på serveren!',
        descr: err
    }).end();
});

// start server ------------------------------------------
server.listen(server.get('port'), function () {
    console.log('server running', server.get('port'));
});


