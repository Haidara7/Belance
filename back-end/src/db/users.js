import sqlite from "sqlite";
import SQL from "sql-template-strings";


const initializeUsers = async () => {
  const db = await sqlite.open("./belence1.sqlite");

  

  const getUsers = async props => {
    try {
      let stmt = `SELECT * FROM users`;
      const rows = await db.all(stmt);
      return rows;
    }
    catch (err) {
      console.log(err)
      throw new Error("could not retrieve list!")
    }
  };


  const addUser = async (props) => {
    const { name, email, password, aboutme, experience, date, address  } = props;
    console.log("addUsersWithName",  name, email, password, aboutme, experience, date, address)
    if (!props || !name || !email || !password || !aboutme||!experience || !date||!address ) {
      throw new Error("you must fill all fields");
    }
    try {
      // const date = nowForSQLite();
     // console.log(`INSERT INTO users (first_name, last_name, email,phone_number password, address, postel_code, city ) Values ( ${name} , ${last_name} , ${email} , ${password} , ${phone_number} , ${adress} , ${postel_code} , ${city})`
     // )
      const result = await db.run(
        `INSERT INTO users (name, email, password, aboutme, experience, date, address ) Values ( '${name}' , '${email}' , '${password}' , '${aboutme}' ,'${experience}', '${date}','${address}')`
      );
      const id = result.stmt.lastID;
      return id;
    } catch (err) {
      console.log(err)
      throw new Error("cannot insert this teaxt");
    }
  };

  const deleteUsers = async (id)  => {
    try {
      const result = await db.run(
        SQL`Delete FROM users where user_id = ${id}`
      );
      if (result.stmt.changes === 0) {
        throw new Error(`could not delete user with id = ${id} or wrong id`);
      }
      return true;
    } catch (err) {
      throw new Error("could not delete the user");
    }
  };


  const updateUsers = async (id,  props) => {
    const {name, email, password, aboutme, experience, date, address } = props;
      try {
    if (!id ||  (!id || !props) || !props) {
      throw new Error("you must provide an id and/or one of the inputs");
    }
    
      const stmt = `UPDATE users SET name=("${name}"), email=("${email}"), password=("${password}"), date=("${date}"), aboutme=("${aboutme}"),experience=("${experience}") , address=("${address}") WHERE user_id=(${id})`;
      const result = await db.all(stmt);
      return (result);
    } catch (err) {
        throw new Error("Can't update user account")
    }
};

  const findUser = async props => {
    const { name, password } = props;
    try {
      const stmt = SQL`SELECT * FROM users WHERE name = ${name} AND password = ${password}`;
      const rows = await db.all(stmt);
      const user = rows[0]
      if (!user) {
        throw new Error('Incorrect username or password!')
      }
      else
        return user;

    }
    catch (err) {
      throw new Error('Could not perform operation!')
    }
  }





  /**
   * retrieves the contacts from the database
   * @function getContact
   * @param {number} id id to search by
   * @returns {array} contact found
   */





  const controller3 = {
    getUsers,
    findUser,
    addUser,
    deleteUsers,
    updateUsers

  };
  return controller3;
};
export default initializeUsers;