const fs = require('fs');

function loginCheck(req, res, next) { 
  const mes = ` ${req.method} ${req.url}\n`;
  fs.appendFile('transactions.log', mes, err => {  
    if (err) {
      console.error('Error writing:', err);
    }
  });
  next();
}

module.exports = loginCheck; 
