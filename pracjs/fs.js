const fs = require('fs');
fs.readFile('data.txt', 'utf-8', (err, data) => {
  if (err) throw err;
  console.log(data);

})

fs.writeFile('data.txt', 'this is new added line', 'utf-8', (err, data) => {
  if (err) throw err;
  console.log(data);
})

