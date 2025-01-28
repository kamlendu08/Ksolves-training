const express = require('express');
const router = express.Router();
const db = require('../db');
const { z } = require('zod');
const jwt = require('jsonwebtoken');
const authToken = require('../middleware');
require('dotenv').config();

const User = z.object({
  username: z.string().min(3),
  email: z.string().email("enter valid email"),
  password: z.string().min(4)
})

router.get('/me', authToken, (req, res) => {
  const email = req.body.email;
  res.json({ res: "allowed", email: email });
})

router.post('/signup', (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const pass = req.body.pass;
  const u = {
    username: username,
    email: email,
    password: pass
  }

  const isvalid = User.safeParse(u);
  if (!isvalid.success) {
    res.status(401).json({ error: isvalid.error.errors });
  } else {
    // res.json({ res: "uesr is valid" })
    db.raw(`SELECT * FROM users where email = ?`, email).then(
      (data) => {
        // res.status(200).json({ res: data.rows })
        if (data.rows.length == 0) {
          db.raw(`INSERT INTO users 
                  (username, email, password)
                  VALUES 
                  (?,?,?)`, [username, email, pass]).then((data) => {
            if (data.rowCount == 1) {
              res.status(200).json({ res: "User created successfully." })
            } else {
              res.status(500).json({ status: "something went wrong" })
            }
          })
        } else {
          return res.status(201).json({ st: "user already exists", data: data.rows })
        }
      }
    )
  }
})

// console.log(process.env.JWT_SECRET);
// console.log("fsadkfj");
router.post('/signin', (req, res) => {

  const username = req.body.username;
  const email = req.body.email;
  const pass = req.body.pass;
  db.raw(`SELECT * FROM users where email = ?`, email).then((data) => {
    if (data.rows.length == 0) {
      res.status(400).json({ res: "user with this email doesn't exits" });
    }
    // res.json({ res: data.rows })
    else if (data.rows[0].password != pass) {
      res.json({ err: "incorrect password" })
    }
    else {
      const info = data.rows[0];
      const token = jwt.sign(email, process.env.JWT_SECRET);
      res.json({ token: token })
    }
  })
})

module.exports = router;
