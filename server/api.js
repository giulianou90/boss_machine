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
    const salary = Number(req.query.salary)
    if(!isNaN(salary) && req.query.title && req.query.salary && req.query.weaknesses){
        const newObject = {'id':'', 'name':req.query.name, 'title': req.query.title,
                          'weaknesses': req.query.weaknesses,'salary': req.query.salary};
        res.status(201).send(addToDatabase('minions', newObject));
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
        res.status(404).send()
    }
});

//update a single minion by id:
apiRouter.put('/minions/:minionId', (req,res,next)=>{
    const checkSalary = req.query.salary
    if (isNaN(checkSalary)){
        res.status(400).send('Salary must be a number!')
    }else{
    const newObject = {'id':req.params.minionId, 'name':req.query.name, 'title': req.query.title,
    'weaknesses': req.query.weaknesses,'salary': req.query.salary};
    const update = updateInstanceInDatabase('minions',newObject);
    if(update){  
        res.send(update)
    }else{
        res.status(404).send()
    }}
})
    
//delete a single minion by id:
apiRouter.delete('/minions/:minionId', (req,res,next)=>{
    const id = req.params.minionId;
    const deleteItem = deleteFromDatabasebyId('minions',id);
    if(deleteItem){
        res.status(204).send();
    }else{
        res.status(404).send('Could not delete the specified item!');
    }
})




