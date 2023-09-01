require('dotenv').config()  
const express = require('express');
const bodyParser = require('body-parser');
const loginCheck = require('./middlewares/loginCheck.js');
const apiRoutes = require('./routes/DataApi.js');

const app = express(); 
const port = process.env.PORT || 4000;  

app.use(bodyParser.json()); 
app.use(loginCheck); 

app.use('/data', apiRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
