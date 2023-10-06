const express = require('express');
const workRouter = express.Router();
module.exports = workRouter;
const morgan = require('morgan');
const {
    createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase, 
    createWork,
    isValidWork
  } = require('./db');

  //get an array of all work for the specified minion:
  workRouter.get('/:minionId/work', (req, res, next) => { //I found that if I dont split this path, req.params is not read
    const minionId = req.params.minionId;
    const workArray = getAllFromDatabase('work');
    const findWork = workArray.filter(work => work.minionId === minionId);
  
    if (findWork.length >= 0) {
      res.send(findWork);
    } else {
      res.status(404).send();
    }
  });