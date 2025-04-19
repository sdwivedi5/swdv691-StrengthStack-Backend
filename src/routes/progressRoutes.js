const express = require('express');
 const router = express.Router();
 const progressController = require('../controllers/progressController');
 

 router.get('/', progressController.getProgressByUser);
 

 module.exports = router;
