const router = require('express').Router();
const {setMyDetails, getMyDetails, deleteMyDetails} = require('../controllers/myDetailsController');

// setting my Details
router.post('/myDetails', setMyDetails);

// getting my Details
router.get('/myDetails', getMyDetails);

// delete my Details
router.delete('/myDetails/:id', deleteMyDetails);

// updating my Details
// router.put('/myDetails', updateMyDetails);


module.exports = router;