const express = require('express');
const db = require('./db.js');
const router = express.Router();
const protect = require('./auth.js')


//lists--------------------------------------------------------------------

router.get('/lists', protect, async function(req, res, next){

    try{
        let data = await db.getAllTasklists();
        res.status(200).json(data.rows).end();
    }catch(err){
        next(err);
    }

})

router.get('/mylists', protect, async function(req, res, next){
    
    let userid = res.locals.userid;

    try{
        let data = await db.getMyLists(userid);
        res.status(200).json(data.rows).end();
    }catch(err){
        next(err);
    }

})

router.post("/lists", protect, async function(req, res, next){

    let updata = req.body;
    let userid = res.locals.userid;

    
    try{
        let data = await db.createTasklist(updata.title, userid);
        
        if (data.rows.length > 0){
            res.status(200).json({msg:'Listen ble opprettet'}).end();
        } else{
            throw 'Kunne ikke opprette listen'
        }
    }catch(err){
        next(err)
    }

})


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

//tasks-------------------------------------------------------------------------------

router.get("/task", async function(req, res, next) {

    try {
		let data = await db.getAllTasks();
		res.status(200).json(data.rows).end();
	} catch (err) {
		next(err);
	}
});

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


//lists/share/unshare-------------------------------------------------------------------------

router.put("/lists/share", async function(req, res, next) {
  
    
    let updata = req.body;

    let taskid = updata.taskid;
    let userid = updata.userid;

    try {
        let data = await db.shareList(taskid, userid);

        if (data.rows[0].shared > 0) {
            res.status(200).json({ msg: "Listen ble delt!"}).end();
        }else {
            throw "Listen ble ikke delt";
        }
    } catch (err) {
        next(err);
        }
    });

router.put('/lists/unshare', async function(req, res, next){
    let updata = req.body;

    try {
        let data = await db.stopSharing(updata.listid)
    
        if (data.rows.length > 0) {
          res.status(200).json({ msg: "Du har sluttet å dele denne listen" }).end();
        } else {
          throw "Listen er fortsatt delt";
        }
     } catch (err) {
        next(err);
      }


})


module.exports = router; 