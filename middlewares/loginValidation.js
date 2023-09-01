function validation(req, res, next) {
    const { id, name, email } = req.body; 
    
  
    if (!id || !name || !email) {
      return res.status(400).json({ message: 'Please enter the values to all the fields' });  
    }
  
    if (id === '' || name === '' || email === '') {  
      return res.status(400).json({ message: 'Empty fields founded' });
    }
    
   
    next();
  }
  
  module.exports = validation;
  