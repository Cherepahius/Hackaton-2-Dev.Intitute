const { user } = require("pg/lib/defaults.js");
const { db } = require("../config/db.js")
const bcrypt = require('bcrypt');
const saltRounds = 10;


const _getAllUsers = () => {
    return db("users").select("id", "user", "password").orderBy("id");
  }
  
  const _getOneUser = (book_id) => {
    return db("books")
    .select("id", "user", "password",)
    .where({ id: book_id });
  }
  
  const _createUser = async (userinfo) => {
    const { username, password} = userinfo
    const hashPassword =  await bcrypt.hash(password+"", saltRounds)

    try {
      const [user] = await trx("users").insert(
                  { username, hashPassword},
                  ["username", "id"]
      );
      await trx.commit()

      return user

    } catch (error) {
      await trx.rollback()
      throw error
    }

  }

  const _getUserByName = async (email, username) => {
    try {
      
      const user = await db("users")
      .select("users.id", "users.username", "users.password")
      .where("users.username", username)
      .first()
      return user
    } catch (error) {
      throw error
    }
  }


  module.exports = {
    _getAllUsers,
    _getOneUser,
    _createUser,
    _getUserByName,
  };