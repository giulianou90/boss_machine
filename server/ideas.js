const express = require('express');
const ideasRouter = express.Router();
module.exports = ideasRouter;
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
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

//get an array of all ideas:
ideasRouter.get('/',(req,res,next)=>{
    res.send(getAllFromDatabase('ideas'))
  });

//create a new idea and save it to the database:
ideasRouter.post('/', checkMillionDollarIdea, (req,res,next)=>{
    if(req.query.name && req.query.description && req.query.weeklyRevenue && req.query.numWeeks){
        const newObject = {'id':'', 'name':req.query.name, 'description': req.query.description,
                          'weeklyRevenue': req.query.weeklyRevenue,'numWeeks': req.query.numWeeks};
        res.send(addToDatabase('ideas', newObject));
    }else{
        res.status(400).send()
    }
});

// get a single idea by id:
ideasRouter.get('/:ideaId', (req,res,next)=>{
    const id = req.params.ideaId;
    const getById = getFromDatabaseById('ideas',id);
    if(getById){
        res.send(getById)
    }else{
        res.status(400).send()
    }
});

//update a single idea by id:
ideasRouter.put('/:ideaId', checkMillionDollarIdea, (req,res,next)=>{
    const newInstance = req.query;
    const update = updateInstanceInDatabase('ideas',newInstance);
    if(update){   
        res.send(update);
    }else{
        res.status(400).send()
    }
});

//delete a single idea by id:
ideasRouter.delete('/:ideaId', (req,res,next)=>{
    const id = req.params.ideaId;
    const deleteItem = deleteFromDatabasebyId('ideas',id);
    if(deleteItem){
        res.status(204).send();
    }else{
        res.status(404).send('Could not delete the specified item!');
    }
})
