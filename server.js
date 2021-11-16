const express = require('express');
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

server.post("/", function(req, res, next) {
    res.status(200).send("Hello from POST").end();
});

server.delete("/", function(req, res, next) {
    res.status(200).send("Hello from DELETE").end()
})


server.listen(server.get('port'), function () {
    console.log('server running', server.get('port'));
});


