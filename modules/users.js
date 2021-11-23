router.post("/users/login", async function(req, res, next){

    credstring = req.headers.authorization;
    let cred = decodeCred(credstring);

    res.status(200).send('POST users/login').end();
});