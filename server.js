const express = require('express');
const { Pool } = require('pg');
const db = require('./modules/db.js')
const server = express();
const PORT = process.env.PORT || 8080;
server.set('port', PORT);

const tasklist = require("./modules/tasklist.js");
const users = require("./modules/users.js")

// MIDDLEWARE ----------------------------
server.use(express.static("public"));
server.use(express.json());

server.use(tasklist);
server.use(users);

//General error handling --------------------------------
server.use(function (err, req, res, next) {

    res.status(500).json({
        error:'Noe gikk galt på serveren!',
        descr: err
    }).end();
});

// start server ------------------------------------------
server.listen(server.get('port'), function () {
    console.log('server running', server.get('port'));
});


