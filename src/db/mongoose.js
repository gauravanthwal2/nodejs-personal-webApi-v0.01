const mongoose = require("mongoose");


const uri = `mongodb+srv://gaurav123:${process.env.DB_PASSWORD}@cluster0.naie4.mongodb.net/myPersonalProject?retryWrites=true&w=majority`;
mongoose
  .connect(uri)
  .then(() => console.log("db connected"))
  .catch((err) => console.error(err));
