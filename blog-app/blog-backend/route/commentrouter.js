
const express = require('express');
const router = express.Router();
const authToken = require('../middleware');
const db = require('../db');


router.post('/createcomment', authToken, (req, res) => {
  const blog_id = req.body.blog_id;
  const user_id = req.body.user_id;
  const parent_comment_id = req.body.parent_comment_id;
  const content = req.body.content;
  const pid = parent_comment_id === "" ? null : parent_comment_id;

  try {

    db.raw(`INSERT INTO comments (blog_id,user_id,parent_comment_id,content) VALUES (?,?,?,?)`, [blog_id, user_id, pid, content]).then((data) => {
      res.json({ res: data.rows });

    })
  } catch (e) { throw e }
})

router.delete('/deletecomment', authToken, (req, res) => {
  const id = req.body.id;
  try {

    db.raw(`DELETE FROM  comments WHERE id = ?`, id).then((data) => {
      res.json({ res: data.rows });

    })
  } catch (e) { throw e }

})
router.get('/getcomments', authToken, (req, res) => {
  const { blog_id } = req.query;

  try {
    if (!blog_id) {
      return res.status(400).json({ error: "Missing blog_id parameter" })
    }

    db.raw(`SELECT comments.id, comments.content, comments.parent_comment_id,  comments.created_at, users.username FROM comments LEFT JOIN users ON comments.user_id = users.id WHERE comments.blog_id = ? ORDER BY comments.created_at ASC`, [blog_id]).then((data) => {
      res.json({ res: data.rows });

    })
  } catch (e) { console.log(e) }

})
module.exports = router;
