//importinh the packages
const express = require("express");
const path = require("path");
const router = express.Router();
const validation = require("../middlewares/loginValidation.js"); 
const { readData, writeData } = require("../utils/dataUtils.js");
const authRoutes = require("./authentication.js");
const errorhandle = require("../errorhandling.js"); 


router.get("/", (req, res) => {
  try {
    const data = readData();
    res.json(data);         
  } catch (error) {
    res.status(500).json({ message: errorhandle.createInternalServerError("There is an error").message });
  }
});


router.post("/", validation, (req, res) => {
  try { 
    const data = readData();
    const newItem = req.body;                
    data.push(newItem);
    writeData(data);
    res.status(201).json({ message: "Successfully added" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error",code:500 });
  }
});

router.put("/:id", (req, res) => {
  try {
    const data = readData();
    const id = parseInt(req.params.id);   
    const updatedItem = req.body;
    const indexToUpdate = data.findIndex((item) => item.id === id);    
    data[indexToUpdate] = updatedItem;
    writeData(data);
    res.json({ message: "Update successful" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error",code:500 });
  }
});

router.delete("/:id", (req, res) => {
  try {
    const data = readData();
    const id = parseInt(req.params.id); 
    const indexToDelete = data.findIndex((item) => item.id === id);
    data.splice(indexToDelete, 1)[0]; 
    writeData(data);
    res.json({ message: "Deleted successfully" });  
  } catch (error) {
    res.status(500).json({ message: "Internal server error",code:500 });
  }
});

router.use("/auth", authRoutes); 

module.exports = router;
