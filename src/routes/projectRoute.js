const router = require('express').Router();
const Project = require('../models/projectModel');
const {getProjects, createProject, deleteProject, updateProject} = require('../controllers/projectController');

// get all Projects
router.get('/projects', getProjects);

// create a Project
router.post('/projects', createProject);

// update Project
router.put('/projects/:id', updateProject);

// delete Project
router.delete('/projects/:id', deleteProject);




module.exports = router;

