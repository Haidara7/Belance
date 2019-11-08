import sqlite from "sqlite";
import SQL from "sql-template-strings";

const initializeProjectImg = async () => {
  const db = await sqlite.open("./belence1.sqlite");


  const createProjectImg = async (props) => {
    const { title, project_id } = props;
    try {
      if (!title || !project_id) {
        throw new Error("you must provide all of the details")
      }
      // const date = nowForSQLite();
      console.log("props", props)
      let rows1 = []
      let stmt = ''
      let rows = ''
      title.forEach(async element => {
        stmt = `INSERT INTO images_project (title , project_id) Values ("${element}", ${project_id})`
        rows = await db.run(stmt);
        rows1.push(rows)
      });

      return rows1;
    } catch (err) {
      console.log(err)
      throw new Error("cannot insert one of the values");
    }
  };

  const updateProjectImg = async (props) => {
    const {title , image_id} = props;
      if (!image_id || !(image_id ||  !props)  ||  !props) {
      throw new Error("you must provide an id and/or one of the inputs");
    }
    try {
      const stmt = `UPDATE images_project SET title=('${title}') where image_id = ${image_id}`;
        console.log(stmt)
      const result = await db.all(stmt);
      return (result);
    } catch (err) {
        throw new Error("Can't update the team member details" + err)
    }
};

  const getprojectimg = async id => {
    try {
      let stmt = `SELECT * FROM images_project where project_id = ${id}`;

      const rows = await db.all(stmt);

      const project_id = rows;
      if (!project_id) {
        throw new Error(` user with project_id = ${id} doesnt exist`);
      } else return project_id;
    } catch (err) {
      throw new Error(`could not get  the project with id = ${id}` + err.message);
    };
  };


  


  


  const deleteProjectImgAlbum = async (id) => {
    try {
      const result = await db.run(
        SQL`Delete FROM images_project where project_id = ${id}`
      );
      if (result.stmt.changes === 0) {
        throw new Error(`could not delete album with id = ${id} or wrong id`);
      }
      return true;
    } catch (err) {
      throw new Error("could not delete ");
    }
  };


  const deleteProjectImgById = async (id) => {
    try {
      const result = await db.run(
        SQL`Delete FROM images_project where image_id = ${id}`
      );
      if (result.stmt.changes === 0) {
        throw new Error(`could not delete image with id = ${id} or wrong id`);
      }
      return true;
    } catch (err) {
      throw new Error("could not delete ");
    }
  };












  const controller2 = {
    createProjectImg,
    getprojectimg,
    updateProjectImg,
    deleteProjectImgAlbum,
    deleteProjectImgById

  };
  return controller2;
};

export default initializeProjectImg;