const express = require('express');
const db = require('./db.js');
const authUtils = require('./auth_utils.js');
const router = express.Router();


router.post("/users/login", async function(req, res, next){

    credstring = req.headers.authorization;
    let cred = decodeCred(credstring);

    res.status(200).send('POST users/login').end();
});


router.post("/users", async function(req, res, next){

    let credString = req.headers.authorization;
    let cred = authUtils.decodeCred(credString);


    //HER ER EN FEIL MED credString
    // cannot read property 'replace' of undefined (auth_utils linje 12)


    if (cred.username == "" || cred.password == "") {
        res.status(401).json({error: "no username or password"}).end();
        return;
    }

    let hash = authUtils.createHash(cred.password);

    try {
        let data = await db.createUser(cred.username, hash.value, hash.salt);

        if (data.rows.length > 0) {
            res.status(200).json({msg: "the user was created succefully"}).end();
        }

        else {
            throw "the user couldnt be created"
        }
    }

    catch(err) {
        next(err);
    }

  });


router.get('/users', async function(req, res, next){

    try{
        let data = await db.getAllUsers();
        res.status(200).send(data.rows).end();
    } catch(err){
        next(err)
    }
 
})



router.delete('/users', async function(req, res, next){
    res.status(200).send('DELETE /users').end();
})


module.exports = router;