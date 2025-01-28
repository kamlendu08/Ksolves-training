const express = require('express');
const router = express.Router();
const authToken = require('../middleware');
const db = require('../db');


router.post('/createBlog', authToken, (req, res) => {
  const email = req.body.email;
  const title = req.body.title;
  const content = req.body.content;
  console.log(title);
  console.log(content);

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
    db.raw(`SELECT * FROM blogs LEFT JOIN users ON blogs.user_id = users.id`).then((data) => {
      res.json({ res: data.rows })
    }
    )
  } catch (e) {
    throw e;
  }
})


module.exports = router;
