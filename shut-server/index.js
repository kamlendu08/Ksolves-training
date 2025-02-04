const http = require('http');
const knex = require('knex');
const {development} = require('./knexfile')
const port = 4001;

const db = knex(development)

const server = http.createServer((req,res) => {
  res.end("this is the end")
})

server.listen(port,() => {
  console.log("server connected successfully")
})

const closeknex = async() => {
  try{
    await knex.destroy();
    console.log("knex connection closed")
  }catch(e) {console.log("some error : ",e)}
}

const gracefullyShut = () => {
  console.log("gracefully shutting down!!");
  server.close(async (err) => {
    if(err){
      console.error("error : ",err);
      process.exit(0);
    }

    await closeknex();
    console.log("server and db connection closed.")
    process.exit(0);
  });

}

process.on('SIGINT', gracefullyShut);
process.on('SIGTERM', gracefullyShut);
