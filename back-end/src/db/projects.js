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

  const GetProjectByUserId = async id => {
    try {
      let stmt = `SELECT * from projects where projects.user_id = ${id}`;

      const rows = await db.all(stmt);
      const newRows = await Promise.all(rows.map( async row=>{
        let stmt2 = `SELECT images_project.title as image_name from images_project where images_project.project_id=${row.project_id}`;
        const images = await db.all(stmt2);
        row.images = images;
      }));
      console.log(newRows)
      const user_id = rows;
      if (!user_id) {
        throw new Error(` user with user_id = ${id} doesnt exist`);
      } else return user_id;
    } catch (err) {
      throw new Error(`could not get  the user with id = ${id}` + err.message);
    };
  };


  const getNewestProjects = async() =>{
    try{
      let stmt = 'select projects.project_id, projects.title, projects.date, users.user_id, users.name, images_project.title as image  from projects join users join images_project where projects.user_id = users.user_id and images_project.project_id =projects.project_id  group by projects.project_id order by (projects.date) desc limit 4;';
      const rows = await db.all(stmt);
      return rows;
    }
    catch(err){
      console.log(err);
      throw new Error('couldnt retrieve list')
    }
  }


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
    updateProjects, 
    getNewestProjects,
    GetProjectByUserId


  };
  return controller4;
};
export default initializeProjects;