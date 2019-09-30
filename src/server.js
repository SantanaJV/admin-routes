const app = require("./app");
const mongoose = require("mongoose");

mongoose.connect(
  process.env.ADMIN_DB_HOST,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  },
  err => {
    if (err) throw err;

    console.log("Connected to Database");
  }
);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Express server listening on port ${process.env.PORT || 3000}`);
});
