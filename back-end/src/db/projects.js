import sqlite from "sqlite";
import SQL from "sql-template-strings";


const initializeProjects = async () => {
  const db = await sqlite.open("./belence1.sqlite");


  const createproject = async (props) => {
    const { user_id, title, date } = props;
    console.log("CreateProjectWith", user_id, title, date)
    if (!props || !user_id || !title || !date) {
      throw new Error("you must fill all fields");
    }
    try {
      
      const result = await db.run(
        `INSERT INTO projects (user_id , title, date ) Values ( ${user_id} , '${title}', '${date}')`
      );
      const id = result.stmt.lastID;
      return id;
    } catch (err) {
      console.log(err)
      throw new Error("cannot insert this text");
    }
  };

  const getProjects = async props => {
    try {
      let stmt = SQL`SELECT * FROM users INNER JOIN projects ON users.user_id = projects.user_id`;
      const rows = await db.all(stmt);
      return rows;
    }
    catch (err) {
      console.log(err)
      throw new Error("could not retrieve list!")
    }
  };


  const deleteProjects = async (id) => {
    try {
      const result = await db.run(
        SQL`Delete FROM projects where project_id = ${id}`
      );
      if (result.stmt.changes === 0) {
        throw new Error(`could not delete project with id = ${id} or wrong id`);
      }
      return true;
    } catch (err) {
      throw new Error("could not delete the user");
    }
  };


  const updateProjects = async (id, props) => {
    const { title  } = props;
    try {
      if (!id || (!id || !props) || !props) {
        throw new Error("you must provide an id and/or one of the inputs");
      }

      const stmt = `UPDATE projects SET title=("${title}") WHERE project_id=(${id})`;
      const result = await db.all(stmt);
      return (result);
    } catch (err) {
      throw new Error("Can't update user account")
    }
  };

















































  const controller4 = {
    createproject,
    getProjects,
    deleteProjects,
    updateProjects


  };
  return controller4;
};
export default initializeProjects;