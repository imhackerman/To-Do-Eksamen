const express = require('express');
const db = require('./db.js');
const authUtils = require('./auth_utils.js');
const router = express.Router();


router.post("/users/login", async function(req, res, next){

    credstring = req.headers.authorization;
    let cred = decodeCred(credstring);

    res.status(200).send('POST users/login').end();
});


router.get('/users', async function(req, res, next){
    res.status(200).send('GET /users').end();
})


router.post('/users', async function(req, res, next){
    res.status(200).send('POST users').end();
})

router.delete('/users', async function(req, res, next){
    res.status(200).send('DELETE /users').end();
})


module.exports = router;