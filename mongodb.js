const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb://127.0.0.1:27017/db_latihan";

const db = new MongoClient(uri);

(async () => {
  try {
    db.connect();
  } catch (error) {
    console.log(error);
  }
})();

module.exports = db;

// MongoClient.connect("mongodb://localhost:27017/db_latihan", (err, client) => {
//   if (err) throw err;

//   const db = client.db("db_latihan");

//   db.collection("users")
//     .find()
//     .toArray((err, result) => {
//       if (err) throw err;

//       console.log(result);
//     });
// });
