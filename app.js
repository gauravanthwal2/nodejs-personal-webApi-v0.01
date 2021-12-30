require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

const fileUpload = require('express-fileupload');

// configure cors
app.use(cors());

// db connection
require('./src/db/mongoose.js');

// allowing json response
app.use(express.json());

// configure file upload -> 50MB limit
app.use(fileUpload({
    useTempFiles: true,
    // limits: {fileSize: 50 * 1024 * 1024},
}))
// app.use(fileUpload({
//     useTempFiles: true,
//     limits: {fileSize: 50 * 1024 * 1024},
//     tempFileDir: '/temp/'
// }))


// api routes
app.use('/api', require('./src/routes/projectRoute'));
app.use('/api', require('./src/routes/myDetailsRoute'))


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>console.log('server is running at port', PORT));