const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
const morgan = require('morgan')

app.use(morgan('tiny'));
//app.use('/public',express.static('public')); WHY THIS DOES NOT WORK?
app.use('/public', express.static('public'));
app.get('/', (req, res, next) => { 
  res.sendFile('index.html', { root: __dirname });
});

module.exports = app;

/* Do not change the following line! It is required for testing and allowing
*  the frontend application to interact as planned with the api server
*/
const PORT = process.env.PORT || 4001;


// Add middleware for handling CORS requests from index.html
app.use(cors());

// Add middware for parsing request bodies here:
app.use(bodyParser.json());

// Mount your existing apiRouter below at the '/api' path.
const apiRouter = require('./server/api');
app.use('/api', apiRouter);

//Mounting ideas, meetings and work routers to divide the API in smaller blocks
const ideasRouter = require ('./server/ideas');
app.use('/api/ideas', ideasRouter);

const meetingsRouter = require ('./server/meetings');
app.use('/api/meetings', meetingsRouter);

const workRouter = require ('./server/work');
app.use('/api/minions', workRouter);


// This conditional is here for testing purposes:
if (!module.parent) { 
  // Add your code to start the server listening at PORT below:
  app.listen(PORT, ()=>{console.log(`Listening on port ${PORT}`)})
}
