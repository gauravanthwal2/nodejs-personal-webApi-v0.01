const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isResponsive: {
        type: Boolean,
        required: true
    },
    githubRepo: {
        type: String
    },
    url: {
        type: String
    },
    imageUrl: {
        type: String
    },
    imageSecureUrl: {
        type: String
    },
    imageId: {
        type: String
    },
})

module.exports =  mongoose.model('Project', projectSchema);