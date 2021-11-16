const express = require('express');
const server = express();
const PORT = process.env.PORT || 8080;
server.set('port', PORT);

server.listen(server.get('port'), function () {
    console.log('server running', server.get('port'));
})
