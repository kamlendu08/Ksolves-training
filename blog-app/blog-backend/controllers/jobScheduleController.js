const db = require("../db")

const deletePending = () => {
  try {
    db.raw(`DELETE FROM blogs WHERE "isApproved" = false`).then((data) => {
      console.log(data);
    })
  } catch (e) { throw e }
}

module.exports = deletePending;
