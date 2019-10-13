import sqlite from "sqlite";
import SQL from "sql-template-strings";


const initializeProjects = async () => {
  // const db = await sqlite.open("./belance.sqlite");


  const createproject = async (props) => {
    const { users_id ,title  } = props;
    console.log("CreateProjectWith",  users_id,title)
    if (!props || !users_id || !title  ) {
      throw new Error("you must fill all fields");
    }
    try {
      // const date = nowForSQLite();
     // console.log(`INSERT INTO users (first_name, last_name, email,phone_number password, address, postel_code, city ) Values ( ${name} , ${last_name} , ${email} , ${password} , ${phone_number} , ${adress} , ${postel_code} , ${city})`
     // )
      const result = await db.run(
        `INSERT INTO projects (users_id , title ) Values ( ${users_id} , '${title}')`
      );
      const id = result.stmt.lastID;
      return id;
    } catch (err) {
      console.log(err)
      throw new Error("cannot insert this teaxt");
    }
  };

  const getProjects = async props => {
    try {
      let stmt = SQL`SELECT * FROM users INNER JOIN projects ON users.users_id = projects.users_id`;
      const rows = await db.all(stmt);
      return rows;
    }
    catch (err) {
      console.log(err)
      throw new Error("could not retrieve list!")
    }
  };


  const deleteProjects = async (id)  => {
    try {
      const result = await db.run(
        SQL`Delete FROM projects where users_id = ${id}`
      );
      if (result.stmt.changes === 0) {
        throw new Error(`could not delete user with id = ${id} or wrong id`);
      }
      return true;
    } catch (err) {
      throw new Error("could not delete the user");
    }
  };


















































  const controller4 = {
    createproject,
    getProjects,
    deleteProjects
    

  };
  return controller4;
};
export default initializeProjects;