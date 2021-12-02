const express = require('express');
const db = require('./db.js');
const authUtils = require('./auth_utils.js');
const { createHash } = require('./auth_utils.js');
const router = express.Router();
const protect = require('./auth.js')

router.post('/users/login', async function(req, res, next){

    let credentials = req.headers.authorization;
    let cred = authUtils.decodeCred(credentials);

    if(cred.username == '' || cred.password == ''){
        res.status(401).json({error: 'ingen brukernavn, eller passord'}).end();
        return;
    }

    try {
        let data = await db.getUser(cred.username);

        if(data.rows.length > 0){

            let userid = data.rows[0].id;
            let username = data.rows[0].username;
            let hash = data.rows[0].password;
            let salt = data.rows[0].salt;

            let passwordVeryfied = authUtils.verifyPassword(cred.password, hash, salt);

            if(!passwordVeryfied){
                res.status(403).json({error:'Feil passord'}).end();
                return;
            }

            let tok = authUtils.createToken(username, userid)
            
            res.status(200).json({
                msg: 'Du blir nå logget inn',
                token: tok
            }).end();
            return;

        } else{ res.status(403).json({error:'brukeren finnes ikke'}).end()}
    } catch (error) {
        console.log(error)
    }
})



router.post("/users", async function(req, res, next){

    let credString = req.headers.authorization; 
    let cred = authUtils.decodeCred(credString);


    //HER ER EN FEIL MED credString
    // cannot read property 'replace' of undefined (auth_utils linje 12)


    if (cred.username == "" || cred.password == "") {
        res.status(401).json({error: "ingen brukernavn, eller passord"}).end();
        return;
    }

    let hash = authUtils.createHash(cred.password);

    try {
        let data = await db.createUser(cred.username, hash.value, hash.salt);

        if (data.rows.length > 0) {
            res.status(200).json({msg: "Brukeren ble opprettet"}).end();
        }

        else {
            throw "Brukeren kunne ikke opprettes"
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


router.get('/user', protect, async function(req, res, next){

    let username = res.locals.username;

    try{
        let data = await db.getUser(username);
        res.status(200).send(data.rows).end();
    }catch(err){
        next(err);
    }
})



router.delete('/users', async function(req, res, next){

    let updata = req.body;
    //let userid = res.locals.userid;
    //let username = res.locals.username;
    console.log(updata.id)

 
    try{
        let data = await db.deleteUser(updata.id);
 
        if(data.rows.length>0){
            res.status(200).json({msg: 'Brukeren ble slettet'}).end();
 
        }else{
            throw 'Brukeren ble ikke slettet'
        }
    } catch(err){
         next(err)
    }
 })

 router.put("/users/changePassword", async function(req, res, next){
     let credentialString = req.headers.authorization;
     let credentials = authUtils.decodeCred(credentialString);
     console.log(credentials);

     let hash = authUtils.createHash(credentials.password);

     try {
         let data = await db.changePassword(hash.value, hash.salt, credentials.username);
         if (data.rows.length > 0) {
             res  
                .status(200)
                .json({msg:"Passordet ble endret!"})
                .end();
         }else{
             throw "Passordet kunne ikke bli oppdatert";
         }
     } catch (err) {
         next(err);
     }
 });


module.exports = router;