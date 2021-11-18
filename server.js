const express = require('express');
const { Pool } = require('pg');
const db = require('./modules/db.js')
const server = express();
const PORT = process.env.PORT || 8080;
server.set('port', PORT);

// MIDDLEWARE ----------------------------
server.use(express.static("public"));
server.use(express.json());

// ENDPOINTS --------------------
server.get("/tasklist", async function(req, res, next) {
    try {
		let data = await db.getAllTasks();
		res.status(200).json(data.rows).end();
	} catch (err) {
		next(err);
	}
});

server.post("/tasklist", async function(req, res, next) {
    
    let updata = req.body;
    let userid = 1;

    try {
        let data = await db.createTask(userid, updata.tasktext);

        if (data.rows.length > 0) {
            res.status(200).json({msg: "the task was succesfully created"}).end();
        }
        else {
            throw "The task could not be created";
        }
    }
    catch(err) {
        res.status(500).json({error: err}).end();
    }
});

server.delete("/tasklist", async function(req, res, next) {
    // method for DELETING from database 
    let updata = req.body;
    
    try{
        let data = await db.deleteTask(updata.id);

        if(data.rows.length>0){
            res.status(200).json({msg: "the task was deleted"}).end();
        }
        else{
            throw "the task was not deleted";
        }
    }catch(err){
        next(err);
    }
    
})


server.listen(server.get('port'), function () {
    console.log('server running', server.get('port'));
});


