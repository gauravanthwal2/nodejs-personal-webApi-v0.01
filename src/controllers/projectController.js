const Project = require("../models/projectModel");
const cloudinary = require('../config/cloudinary');


// create a Projects
async function createProject(req, res, next) {
  try {
    const file = req.files.projectImg;
    const result = await cloudinary.uploader.upload(
      file.tempFilePath,
      (err, result) => {
        const newProject = new Project({
          title: req.body.title,
          description: req.body.description,
          isResponsive: req.body.isResponsive,
          githubRepo: req.body.githubRepo,
          url: req.body.url,
          imageUrl: result.url,
          imageSecureUrl: result.secure_url,
          imageId: result.public_id,
        });

        newProject.save((err, result) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          return res
            .status(201)
            .json({ msg: "project saved successfully!", data: result });
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    return res.status(400).json({ error: err.message });
  }
}

// get all Projects
async function getProjects(req, res, next) {
  try {
    const allProjects = await Project.find().limit(req.query.limit);
    return res.status(200).json(allProjects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

// update a Project
async function updateProject(req, res, next) {
  try {
    const projectId = req.params.id;
    const file = req.files.projectImg;

    const currentProject = await Project.find({_id: projectId}).select("imageId");
    await deleteImageFromCloudinary(currentProject[0].imageId);

    const result = await cloudinary.uploader.upload(file.tempFilePath)

    const updatedData = {
      title: req.body.title,
      description: req.body.description,
      isResponsive: req.body.isResponsive,
      githubRepo: req.body.githubRepo,
      url: req.body.url,
      imageUrl: result.url,
      imageSecureUrl: result.secure_url,
      imageId: result.public_id,
    };

    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    );

    return res
      .status(203)
      .json({ msg: "project updated successfully", data: updatedProject });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

// delete a project
async function deleteProject(req, res, next) {
  try {
    const projectId = req.params.id;
    const deleteProject = await Project.findByIdAndDelete(projectId);

    if (deleteProject.imageId) {
      await deleteImageFromCloudinary(deleteProject.imageId);
    }

    return res.json({ msg: "project deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}

async function deleteImageFromCloudinary(imgId) {
  try {
    await cloudinary.uploader.destroy(imgId);
    
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = { getProjects, createProject, deleteProject, updateProject };
