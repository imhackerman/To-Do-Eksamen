const express = require('express');
const db = require('./db.js');
const router = express.Router();

// endpoints ----------------------

router.get("/lists", async function(req, res, next){
    try {
        let data = await db.getAllTasklists();
        res.status(200).json(data.rows).end();
    }catch(err){
        next(err);
    }
});

router.get("/tasks/:id", async function(req, res, next){

    let id = req.params.id;

    try {
        let data = await db.getTasksFromList(id);
        res.status(200).send(data.rows).end();
    }catch(err){
        console.log(err)
    }
});


router.get("/tasklist", async function(req, res, next) {
    try {
		let data = await db.getAllTasks();
		res.status(200).json(data.rows).end();
	} catch (err) {
		next(err);
	}
});

router.post("/tasklist", async function(req, res, next) {
    
    let updata = req.body;
    let userid = 1;

    try {
        let data = await db.createTask(userid, updata.tasktext, updata.heading);

        if (data.rows.length > 0) {
            res.status(200).json({msg: "Gjøremålet er lagt til i to do listen!"}).end();
        }
        else {
            throw "Gjøremålet kunne ikke bli lagt til!";
        }
    }
    catch(err) {
        next(err);
    }
});

router.delete("/tasklist", async function(req, res, next) {
    // method for DELETING from database 
    let updata = req.body;
    
    try{
        let data = await db.deleteTask(updata.id);

        if(data.rows.length>0){
            res.status(200).json({msg: "Gjøremålet er blitt slettet!"}).end();
        }
        else{
            throw "Gjøremålet kunne ikke bli slettet!";
        }
    }
    catch(err) {
        next(err);
    }
    
});


router.post("/tasklist", async function(req, res, next){

});

module.exports = router; 