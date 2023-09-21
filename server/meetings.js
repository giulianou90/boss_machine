const express = require('express');
const meetingsRouter = express.Router();
module.exports = meetingsRouter;
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

  //get an array of all meetings:
meetingsRouter.get('/', (req,res,next)=>{
    res.send(getAllFromDatabase('meetings'));
}); 

//create a new meeting and save it to the database:
meetingsRouter.post('/', (req,res,next)=>{
    const newMeeting= createMeeting();
    addToDatabase('meetings',newMeeting)
    res.send('New meeting created!');
});

//delete all meetings
meetingsRouter.delete('/', (req,res,next)=>{
    deleteAllFromDatabase('meetings');
    res.status(204).send();
})

