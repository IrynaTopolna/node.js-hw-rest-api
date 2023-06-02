const mongoose = require("mongoose");

const app = require("./app");

const { DB_HOST } = process.env;

// async function connectServer() {
//   await mongoose.connect(DB_HOST);
//   console.log("Database connection successful");
// }

// connectServer().catch((error) => {
//   console.log(error.message);
//   process.exit(1);
// });

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
