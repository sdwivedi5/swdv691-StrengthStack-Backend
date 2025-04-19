const express = require('express');
 const router = express.Router();
 const workoutController = require('../controllers/workoutController');
 

 router.get('/', workoutController.getAllWorkouts);
 router.get('/:userId', workoutController.getWorkoutById);
 router.post('/', workoutController.createWorkout);
 router.put('/:id', workoutController.updateWorkout);
 router.delete('/:id', workoutController.deleteWorkout);
 

 module.exports = router;
