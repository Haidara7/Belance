import sqlite from "sqlite";
import SQL from "sql-template-strings";

const initializeProfileImg = async () => {
    const db =  await sqlite.open("./belence1.sqlite");


    const createProfileImg = async (props) => {
        const {title , user_id} = props;
      try {
          if (!title || !user_id ) {
              throw new Error("you must provide all of the details")
            } 
          // const date = nowForSQLite();
          console.log("props",props)
          const stmt = `INSERT INTO images_profile (title , user_id) Values ("${title}", ${user_id})`
          console.log(stmt) ;
          const rows = await db.run(stmt);
          console.log("error", rows)
          const id = rows.stmt.lastID;
            return id;
      } catch (err) {
        throw new Error("cannot insert one of the values");
      }
    };

    const getprofileimg = async id => {
        try {
          let stmt = `SELECT * FROM images_profile where user_id = ${id}`;
    
          const rows = await db.all(stmt);
    
          const user_id = rows;
          if (!user_id) {
            throw new Error(` user with user_id = ${id} doesnt exist`);
          } else return user_id;
        } catch (err) {
          throw new Error(`could not get  the user with id = ${id}` + err.message);
        };
    };

    const updateProfileImg = async (props) => {
        const {title , user_id} = props;
          if (!user_id || !(user_id ||  !props)  ||  !props) {
          throw new Error("you must provide an id and/or one of the inputs");
        }
        try {
          const stmt = `UPDATE images_profile SET title=('${title}') where user_id = ${user_id}`;
            console.log(stmt)
          const result = await db.all(stmt);
          return (result);
        } catch (err) {
            throw new Error("Can't update the team member details" + err)
        }
    };














const controller1 = {
    createProfileImg,
    getprofileimg,
    updateProfileImg
   };
   return controller1;
 };
 
 export default initializeProfileImg;