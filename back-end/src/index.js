import app from "./app";
import initializeUsers from "./db/users"
import initializeProjects from "./db/projects"
import initializeProfileImg from "./db/profile_img"

import { isloggedIn, authenticateUser, logout } from "./auth.js";
import multer from 'multer'

import path from 'path'
import verifyToken from "./db/verfiy"
//import jwt from 'jsonwebtoken'


const multerStorage = multer.diskStorage({
  destination: path.join(__dirname, '../public/images'),
  filename: (req,file, cb)=>{
    const {originalname} = file;
    const date =Date.now()
    const filename = `${date}-${originalname}`;
    cb(null, filename)
  }

})

const upload = multer({storage: multerStorage})




const start = async () => {
  const controller1 = await initializeProfileImg();
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
      const { name, email, password, aboutme, experience, date, address } = req.body

      const user = await controller3.addUser({ name, email, password, aboutme, experience, date, address })
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
      const { name, email, password, aboutme, experience, date, address } = req.body;
      const result = await controller3.updateUsers(id, {
        name, email, password, aboutme, experience, date, address

      });
      res.json({ success: true, result });
      return (result);
    } catch (err) {
      next(err);
    }
  });
  ////////////////projects

  app.post('/api/projects/create', async (req, res, next) => {
    try {
      const { user_id, title, date } = req.body;
      console.log("hello", user_id, title, date)
      const result = await controller4.createproject({ user_id, title, date });
      res.json({ done: true, result });
    } catch (err) {
      next(err);
    }
  });

  app.get("/api/projects/list", async (req, res) => {

    const projects = await controller4.getProjects()
    res.json({
      data: projects
    })
  });

  app.post('/api/projects/delete/:id', async (req, res, next) => {
    console.log("here")
    try {
      const { id } = req.params;
      const result = await controller4.deleteProjects(id);
      res.json({ success: true, result });
      console.log()
    } catch (err) {
      next(err);
    }
  });


  app.post('/api/projects/update/:id', async (req, res, next) => {

    try {
      const { id } = req.params;
      const { title} = req.body;
      const result = await controller4.updateProjects(id, {
        title

      });
      res.json({ success: true, result });
      return (result);
    } catch (err) {
      next(err);
    }
  });


  
//////////////// PROFILE IMAGE

app.post('/api/profileimg/create',  upload.single('image'), async (req, res, next) => {
  try {
   // console.log(req.body)
    const { user_id} = req.body;
    const title = req.file && req.file.filename
    console.log("title",title)
    const result = await controller1.createProfileImg({
     title, user_id
    });
    res.json({success: true, result});
  } catch (err) {
    next(err);
  }
});


app.get('/api/profileimg/get/:id', async (req, res, next) => {
  try {
    const {id} = req.params;
    const result = await controller1.getprofileimg(id);
    res.json({success: true, result});
  } catch (err) {
    next(err);
  }
});

app.post('/api/profileimg/update',  upload.single('image'), async (req, res, next) => {
  try {
   // console.log(req.body)
    const { user_id} = req.body;
    const title = req.file && req.file.filename
    console.log("title",title)
    const result = await controller1.updateProfileImg({
     title, user_id
    });
    res.json({success: true, result});
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