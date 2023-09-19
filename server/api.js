const express = require('express');
const apiRouter = express.Router();
module.exports = apiRouter;
const morgan = require('morgan');
const {
    createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase,
  } = require('./db');

//get an array of all minions:
  apiRouter.get('/minions', (req,res,next)=>{
    res.send(getAllFromDatabase('minions'));
}); 

//create a new minion and save it to the database:
apiRouter.post('/minions', (req,res,next)=>{
    if(req.query.name && req.query.title && req.query.salary && req.query.weaknesses){
        const newObject = {'id':'', 'name':req.query.name, 'title': req.query.title,
                          'weaknesses': req.query.weaknesses,'salary': req.query.salary};
        res.send(addToDatabase('minions', newObject));
    }else{
        res.status(400).send()
    }
});

// get a single minion by id:
apiRouter.get('/minions/:minionId', (req,res,next)=>{
    const id = req.params.minionId;
    const getById = getFromDatabaseById('minions',id);
    if(getById){
        res.send(getById)
    }else{
        res.status(400).send()
    }
});
    





