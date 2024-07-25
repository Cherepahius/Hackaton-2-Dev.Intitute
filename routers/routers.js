const {
    getAllUsers,
    getOneUser,
    createUser,
    LoginUser,
    getOneComment,
    createNewComment,
    } = require("../controllers/controllers.js");
  
    const express = require("express");
    
    const router = express.Router();
  
    
    router.get("/", getAllUsers);
    router.get("/:id", getOneUser);
    router.post("/register", createUser);
    router.post("/login", LoginUser);
    router.get("/messages/:id", getOneComment);
    router.post("/messages/create", createNewComment);

    
    module.exports = {
      router,
    };