const express = require('express');
const router = express.Router();
const authToken = require('../middleware');
const db = require('../db');


router.post('/createBlog', authToken, (req, res) => {
  const email = req.body.email;
  const title = req.body.title;
  const content = req.body.content;

  db.raw(`SELECT id FROM users WHERE email = ?`, email).then((data) => {
    // res.json({ res: data.rows });
    db.raw(`INSERT INTO blogs
            (title, content, create_at, user_id)
            VALUES
            (?,?,?,?)`, [title, content, new Date(), data.rows[0].id]).then(
      (data) => {
        res.json({ res: data.rowCount })
      }
    )
  })

})

router.get('/bulk', authToken, (req, res) => {
  try {
    db.raw(`SELECT *, blogs.id as blog_id FROM blogs LEFT JOIN users ON blogs.user_id = users.id WHERE blogs."isApproved" = true`).then((data) => {
      res.json({ res: data.rows })
    }
    )
  } catch (e) {
    throw e;
  }
})

router.delete('/delete', (req, res) => {
  const cat = req.body.cat;
  console.log(cat);
  try {
    db.raw(`DELETE FROM blogs WHERE create_at = ?`, cat).then((data) => {
      res.json({ res: data.rows })
    })
  } catch (e) { }
})

router.post('/one', (req, res) => {
  const cat = req.body.cat;
  try {
    db.raw(`SELECT * FROM blogs WHERE create_at = ?`, cat).then((data) => {
      res.json({ res: data.rows })
    })
  } catch (e) {
    throw e;
  }
})

router.patch('/approve', (req, res) => {
  const cat = req.body.cat;
  console.log(cat);
  try {
    db.raw(`UPDATE blogs SET "isApproved" = true WHERE create_at = ?`, cat).then((data) => {
      res.json({ res: data.rows })
    })
  } catch (e) { }
})

router.get('/bulkpending', authToken, (req, res) => {
  // console.log("reaching")
  try {
    db.raw(`SELECT * , blogs.id as blog_id FROM blogs LEFT JOIN users ON blogs.user_id = users.id WHERE blogs."isApproved" = false`).then((data) => {
      res.json({ res: data.rows })
    }
    )
  } catch (e) {
    throw e;
  }
})


module.exports = router;
