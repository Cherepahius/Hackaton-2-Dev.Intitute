const {
    getAllUsers,
    getOneUser,
    createUser,
    LoginUser,
    getAllComments,
    getOneComment,
    createNewComment,
    } = require("../controllers/controllers.js");
  
    const express = require("express");
    
    const router = express.Router();
  
    
    router.get("/messages", getAllComments,);
    router.get("/users", getAllUsers);
    router.get("/users/:id", getOneUser);
    router.post("/users/register", createUser);
    router.post("/users/login", LoginUser);
    router.get("/messages/:id", getOneComment);
    router.post("/messages/create", createNewComment);

    
    module.exports = {
      router,
    };