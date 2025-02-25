const { user } = require("pg/lib/defaults.js");
const { db } = require("../config/db.js")
const bcrypt = require('bcrypt');
const saltRounds = 10;


const _getAllUsers = () => {
    return db("users").select("id", "username", "password").orderBy("id");
  }
  
  const _getOneUser = (user_id) => {
    return db("users")
    .select("id", "username", "password",)
    .where({ id: user_id });
  }
  
  const _createUser = async (userinfo) => {
    const trx = await db.transaction();
    const { username, password} = userinfo
    const hashPassword =  await bcrypt.hash(password+"", saltRounds)

    try {
      console.log(userinfo)
      const [user] = await trx("users").insert(
                  { username: username, password: hashPassword},
                  ["username", "password"]
      );
      await trx.commit()

      return user

    } catch (error) {
      await trx.rollback()
      throw error
    }

  }

  const _getUserByName = async (username) => {
    try {
      
      const user = await db("users")
      .select("users.id", "users.username", "users.password")
      .where("users.username", username)
      .first()
      return user
    } catch (error) {
      console.log(error)
      throw error
    }
  }


  const _createNewComment = async (inspiration) => {
    return db("phrases").insert({inspiration},["id","inspiration"])
  }

  const _getOneComment = (user_id) => {
    return db("phrases")
    .select("id", "inspiration")
    .where({ id: user_id });
  }

  
  const _getAllComments = () => {
    return db("phrases").select("id", "inspiration").orderBy("id");
  }

  module.exports = {
    _getAllUsers,
    _getOneUser,
    _createUser,
    _getUserByName,
    _createNewComment,
    _getOneComment,
    _getAllComments,
  };