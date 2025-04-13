const express = require('express');
 const router = express.Router();
 const progressController = require('../controllers/progressController');
 

 router.get('/users/:userId/progress', progressController.getProgressByUser);
 

 module.exports = router;
