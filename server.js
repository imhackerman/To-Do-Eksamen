const express = require('express');
const { Pool } = require('pg');
const server = express();
const PORT = process.env.PORT || 8080;
server.set('port', PORT);

// MIDDLEWARE ----------------------------
server.use(express.static("public"));
server.use(express.json());

// ENDPOINTS --------------------
server.get("/", function(req, res, next) {
    res.status(200).send("Helo from GET").end();
});

server.post("/tasklist", async function(req, res, next) {
    
    let userid = 1; // Must be changed when we implement more users than 1.

    let sql = 'INSERT INTO tasklist (id, date, heading, blogtext, userid) VALUES(DEFAULT, DEFAULT, $1, $2, $3) returning *';
    let values = [updata.heading, updata.tasktext, userid];

    try {
        let result = await Pool.query(sql, values);

        if (result.rows.length > 0) {}
    }
});

server.delete("/", function(req, res, next) {
    res.status(200).send("Hello from DELETE").end()
})


server.listen(server.get('port'), function () {
    console.log('server running', server.get('port'));
});


