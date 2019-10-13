import app from "./app";
import initializeUsers from "./db/users"
import initializeProjects from "./db/projects"

import { isloggedIn, authenticateUser, logout } from "./auth.js";
import path from 'path'
import verifyToken from "./db/verfiy"
//import jwt from 'jsonwebtoken'



const start = async () => {

  const controller3 = await initializeUsers();

  const controller4 = await initializeProjects();





  //USERS VIEW

  app.get("/api/userslist", async (req, res) => {

    const users_accounts = await controller3.getUsers()
    res.json({
      data: users_accounts
    })
  });

  app.post('/api/adduser', async (req, res, next) => {

    try {
      const { name, email, password, date, type, about_me, experience, adress } = req.body

      const user = await controller3.addUser({ name, email, password, date, type, about_me, experience, adress })
      res.send({ NewUser: user, status: true })
    } catch (err) {
      next(err)
    }

  })
  app.post('/api/users/delete/:id', async (req, res, next) => {

    try {
      const { id } = req.params;
      const result = await controller3.deleteUsers(id);
      res.json({ success: true, result });
      console.log()
    } catch (err) {
      next(err);
    }
  });


  app.post('/api/users/update/:id', async (req, res, next) => {

    try {
      const { id } = req.params;
      const { name, email, password, date, type, about_me, experience, adress } = req.body;
      const result = await controller3.updateUsers(id, {
        name, email, password, date, type, about_me, experience, adress

      });
      res.json({ success: true, result });
      return (result);
    } catch (err) {
      next(err);
    }
  });
  ////////////////projects

  app.post('/projects/create', async (req, res, next) => {
    try {
      const { users_id, title } = req.body;
      const result = await controller4.createproject({ users_id, title });
      res.json({ done: true, result });
    } catch (err) {
      next(err);
    }
  });

  app.get("/projects/list", async (req, res) => {

    const projects = await controller4.getProjects()
    res.json({
      data: projects
    })
  });

  app.post('projects/delete/:id', async (req, res, next) => {

    try {
      const { id } = req.params;
      const result = await controller4.deleteProjects(id);
      res.json({ success: true, result });
      console.log()
    } catch (err) {
      next(err);
    }
  });

  


  







  app.post('/api/login', async (req, res) => {
    console.log("here")
    const user = {
      first_name: req.body.first_name,
      password: req.body.password
    }
    console.log(user)
    const check = await controller3.findUser(user);
    console.log(check)

    if (check) {
      jwt.sign({ user }, 'secretkey', { expiresIn: '3000s' }, (err, token) => {

        res.json({
          token,
          user
        });
      });
    }
    else
      res.json({
        success: false
      });
  });

  /**
   * Route that returns a list of contacts
   * @module contacts/list
   * @param {Express.Request} req - request
   * @param {Express.Response} res - response 
   * @return {json} rows - array of contacts
   */

  app.post('/api/posts', verifyToken, (req, res) => {
    console.log(req.token);
    //const text = req.body.text
    // console.log(token);
    jwt.verify(req.token, 'secretkey', (err, authData) => {
      if (err) {
        res.json({
          message: "not verified",
          err
        })
        //res.sendStatus(403);

      } else {
        //const result = await controller3.addUser(text)

        res.json({
          message: "verified",
          authData
        });
      }
    })
  });



  app.listen(5001
    , () => {
    console.log("server listening on port 8080");
  });
};
start();
//export default app;
module.exports = app;