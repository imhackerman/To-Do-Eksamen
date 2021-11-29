const express = require('express');
const { decodecred } = require('./auth_utils.js');
const db = require('./db.js');
const router = express.Router();
const protect = require('./auth.js')

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


router.get("/task", protect, async function(req, res, next) {

    console.log(res.locals.username);
    console.log(res.locals.userid);

    try {
		let data = await db.getAllTasks();
		res.status(200).json(data.rows).end();
	} catch (err) {
		next(err);
	}
});

router.post("/lists", protect, async function(req, res, next){

    let updata = req.body;
    let userid = res.locals.userid;

    
    try{
        let data = await db.createTasklist(updata.title, userid);

        if (data.rows.length > 0){
            res.status(200).json({msg: "Listen er opprettet"}).end();
        } else{
            throw 'Kunne ikke opprette listen'
        }
    }catch(err){
        next(err)
    }

})

router.post("/task", protect, async function(req, res, next) {
    
    let updata = req.body;
    let userid = res.locals.userid;


    try {
        let data = await db.createTask(userid, updata.tasktext, updata.listid);

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

router.delete("/task", protect, async function(req, res, next) {
    // method for DELETING from database 
    let updata = req.body;
    let userid = res.locals.userid;
    
    try{
        let data = await db.deleteTask(updata.id, userid);

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

router.delete("/tasklist", protect, async function(req, res, next){
    
    let updata = req.body;
    let userid = res.locals.userid;

    try{
        let data = await db.deleteList(updata.id, userid);

        if(data.rows.length>0){
            res.status(200).json({msg: "Listen er blitt slettet!"}).end();
        }else{
            throw "Listen ble ikke slettet"
        }
    }catch(err){
        next(err)
    }
})

router.post("/lists/share", async function(req, res, next) {
  
    let updata = req.body;
    let taskid = 98;

  try {
    let data = await db.shareList(98);

    if (data.rows.length > 0) {
      res.status(200).json({ msg: "Listen ble delt!" }).end();
    } else {
      throw "Listen ble ikke delt";
    }
 } catch (err) {
    next(err);
  }
});





module.exports = router; 