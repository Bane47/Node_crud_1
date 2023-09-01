
const express = require('express');
const jwt = require('jsonwebtoken'); 
const router = express.Router();

const { readData } = require('../utils/dataUtils'); 


router.post('/login', (req, res) => {
  const { name } = req.body;          
  const users = readData();

  const user = users.find(user => user.name === name);  

  if (!user) {
    return res.status(401).json({ message: 'User not found' });
  }

  //here we are assigning a token for the user to gain access

  const token = jwt.sign({ name: user.name }, process.env.ACCESS_TOKEN); 

  res.json({ message: 'This is your token', token });
});

const validateToken = (req, res, next) => {          
    const token = req.header('Authorization');
  
    if (!token) {
      return res.status(401).json({ message: 'Login token not found' });
    }
  
    const formattedToken = token.split('Bearer ')[1];  
  
    try {
      const decoded = jwt.verify(formattedToken, process.env.ACCESS_TOKEN); 
      req.decodedUser = decoded; 
      next();
    } catch (error) {
      res.status(401).json({ message: 'Invalid token.' }); 
    }
  };
  
  router.get('/user', validateToken, (req, res) => { 
    const userData = readData();
    const requestedUser = userData.find(user => user.name === req.decodedUser.name);
  
    if (!requestedUser) {
      return res.status(404).json({ message: 'Requested user not found.' });
    }
  
    res.json(requestedUser);
  });
  

module.exports = router;
