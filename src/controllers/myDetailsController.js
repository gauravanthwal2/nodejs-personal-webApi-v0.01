const MyDetail = require("../models/myDetailsModel");
const cloudinary = require("../config/cloudinary");

// setting my Details
async function setMyDetails(req, res, next) {
  try {
    let myImage;
    if (req.files) {
      let file = req.files.myImage;
      myImage = await cloudinary.uploader.upload(file.tempFilePath);

      const newDetails = new MyDetail({
        name: req.body.name,
        myEmail: req.body.myEmail,
        myGithubUrl: req.body.myGithubUrl,
        myFacebookUrl: req.body.myFacebookUrl,
        myInstagramUrl: req.body.myInstagramUrl,
        myTwitterUrl: req.body.myTwitterUrl,
        myLinkedinUrl: req.body.myLinkedinUrl,
        myImageUrl: myImage.secure_url,
        myImageId: myImage.public_id,
      });

      newDetails.save((err, result) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        return res.status(201).json({ msg: "data saved.", data: result });
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
}

// getting myDetails
async function getMyDetails(req, res, next) {
    try {
        const mydetails = await MyDetail.find();
        return res.status(200).json({data: mydetails});
    } catch (err) {
      console.error(err.message);
      res.status(500).json({error: err.message});
    }
  }


// delete my Details
async function deleteMyDetails(req, res, next) {
    try {
        const id = req.params.id;
        await MyDetail.findByIdAndDelete(id);
        return res.status(200).json({msg: 'deleted successfully.'})
    } catch (err) {
      console.error(err.message);
      res.status(500).json({error: err.message});
    }
  }

// update my Details -> TODO
// async function updateMyDetails(req, res, next) {
//   try {
//   } catch (err) {
//     console.error(err.message);
//   }
// }

module.exports = { setMyDetails, getMyDetails, deleteMyDetails };
