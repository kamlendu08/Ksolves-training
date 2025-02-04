const express = require("express");
const cors = require('cors');
const app = express();

const userRouter = require('./route/userrouter');
const blogRouter = require('./route/blogrouter');
const commentRouter = require('./route/commentrouter');
const schedule = require('node-schedule');
const deletePending = require('./controllers/jobScheduleController')
app.use(cors());
app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/blog', blogRouter);
app.use('/api/comment', commentRouter);

schedule.scheduleJob('0 * * * *', () => {
  deletePending();
})

app.listen(3000, () => { console.log("server connected") });
