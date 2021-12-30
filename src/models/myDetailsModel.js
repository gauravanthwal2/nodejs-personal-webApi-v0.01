const mongoose = require("mongoose");

const myDetailSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  myEmail: {
    type: String,
  },
  myGithubUrl: {
    type: String,
  },
  myFacebookUrl: {
    type: String,
  },
  myInstagramUrl: {
    type: String,
  },
  myTwitterUrl: {
    type: String,
  },
  myLinkedinUrl: {
    type: String,
  },
  myImageUrl:{
      type: String
  },
  myImageId: {
    type: String
  }
});

module.exports = mongoose.model('MyDetail', myDetailSchema);