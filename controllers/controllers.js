
const {
   _getAllUsers,
   _getOneUser,
   _createUser,
   _getUserByName,
   _createNewComment,
   _getOneComment,

} = require("../models/models.js");

const bcrypt = require("bcrypt")

const getAllUsers = (req, res) => {
    _getAllUsers()
    .then((result) => {
      res.json(result);
    })
    .catch((e) => {
      console.log(e)
      res.status(404).json({ message: "something went wrong!!!" });
    });
};

const getOneUser = (req, res) => {
  const { id } = req.params;
  _getOneUser(id)
    .then((result) => {
      res.json(result);
    })
    .catch((e) => {
      res.status(404).json({ message: "something went wrong!!!" });
    });
};


const createUser = async (req, res) => {
  const {username, password } = req.body;

  const user = { username, password } 
  try {
    const userInfo = await _createUser(user)
    res.status(201).json({ 
      message: "user registerd success",
      user: userInfo});
  } catch (error) {
    console.log(error.code) 
      if (error.code == 23505){
        res.status(200).json({ error: "email or user already in use" });
      } 
      res.status(500).json({ error: "internal server error" });
    }
  }


  const LoginUser = async (req, res) => {
    const{username, password} = req.body

    try {
      const user = await _getUserByName(username,)

      if(!user) {
        return res.status(404).json({ message: "user not found" });
      }

      const passwordMatch = await bcrypt.compare(password+"", user.password)
      if (!passwordMatch) {
        return res.status(401).json({ message: "authentaction failed check password" });
      }

      return res.json({
        message: "Login success",
        user: {
          userid: user.id, username: user.username
        }
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: "internal server error" });
    }
  }


  const getOneComment = (req, res) => {
    const { id } = req.params;
    _getOneComment(id)
      .then((result) => {
        res.json(result);
      })
      .catch((e) => {
        res.status(404).json({ message: "something went wrong!!!" });
      });
  };


  const createNewComment = async (req, res) => {
    const { inspiration } = req.body;
  
    const message = { inspiration } 
    try {
      const newMessage = await _createNewComment(message)
      res.status(201).json({ 
        message: "New message added",
        added: newMessage});
    } catch (error) {
        res.status(500).json({ error: "internal server error" });
      }
    }
module.exports = {
    getAllUsers,
    getOneUser,
    createUser,
    LoginUser,
    getOneComment,
    createNewComment,
};