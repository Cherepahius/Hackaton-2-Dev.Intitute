const {
    getAllUsers,
    getOneUser,
    createUser,
    LoginUser,
    } = require("../controllers/controllers.js");
  
    const express = require("express");
    
    const router = express.Router();
  
    
    router.get("/", getAllUsers);
    router.get("/:id", getOneUser);
    router.post("/register", createUser);
    router.post("/login", LoginUser);
    
    module.exports = {
      router,
    };