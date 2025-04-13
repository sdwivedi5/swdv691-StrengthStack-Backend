const {
  Client
 } = require('pg');
 const client = new Client({
 user: 'strengthstack_app',
  host: 'database-1-instance-1.cxqgw6yi0upa.us-east-2.rds.amazonaws.com',
  database: 'postgres',
  password: 'Renuka2711',
  port: 5432,});
 client.connect();



 const workoutController = {
  getAllWorkouts: async (req, res) => {
  try {
  const result = await client.query(
  'SELECT workoutid, userid, date, exerciseid, sets, reps, weight, rir, rpe FROM strengthstack_schema.workouts'
  );
  res.json(result.rows);
  } catch (err) {
  console.error('Error getting all workouts:', err);
  return res.status(500).json({
  error: 'Server error'
  });
  }
  },


  getWorkoutById: async (req, res) => {
  const {
  id
  } = req.params;
  try {
  const result = await client.query(
  'SELECT workoutid, userid, date, exerciseid, sets, reps, weight, rir, rpe FROM strengthstack_schema.workouts WHERE workoutid = $1',
  [id]
  );
  if (result.rows.length === 0) {
  return res.status(404).json({
  message: 'Workout not found'
  });
  }
  res.json(result.rows[0]);
  } catch (err) {
  console.error('Error getting workout by ID:', err);
  return res.status(500).json({
  error: 'Server error'
  });
  }
  },


createWorkout: async (req, res) => {
  const { userid, date, exerciseid, sets, reps, weight, rir, rpe } = req.body;
  try {
   await client.query('BEGIN'); // Start a transaction

   // 1. Create the Workout
   const workoutResult = await client.query(
    'INSERT INTO strengthstack_schema.workouts (userid, date, exerciseid, sets, reps, weight, rir, rpe) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING workoutid, userid, date, exerciseid, sets, reps, weight, rir, rpe',
    [userid, date, exerciseid, sets, reps, weight, rir, rpe]
   );
   const newWorkout = workoutResult.rows[0];

   // 2. Create a Progress Record
   //  *** Adapt this logic to your specific progress tracking needs ***
   const estimatedOneRepMax = weight * (1 + reps/30); // Simple estimation - replace with your method
   await client.query(
    'INSERT INTO strengthstack_schema.progress (userid, workoutid, date, reps, weight, estimatedonerepmax) VALUES ($1, $2, $3, $4, $5, $6)',
    [userid, newWorkout.workoutid, date, reps, weight, estimatedOneRepMax]
   );

   await client.query('COMMIT'); // Commit the transaction
   res.status(201).json(newWorkout); // Send back the new workout
  } catch (err) {
   await client.query('ROLLBACK'); // Rollback on error
   console.error('Error creating workout and progress:', err);
   return res.status(500).json({ error: 'Server error' });
  }
 },


  updateWorkout: async (req, res) => {
  const {
  id
  } = req.params;
  const {
  userid,
  date,
  exerciseid,
  sets,
  reps,
  weight,
  rir,
  rpe
  } = req.body;
  try {
  const result = await client.query(
  'UPDATE strengthstack_schema.workouts SET userid = $1, date = $2, exerciseid = $3, sets = $4, reps = $5, weight = $6, rir = $7, rpe = $8 WHERE workoutid = $9 RETURNING workoutid, userid, date, exerciseid, sets, reps, weight, rir, rpe',
  [userid, date, exerciseid, sets, reps, weight, rir, rpe, id]
  );
  if (result.rows.length === 0) {
  return res.status(404).json({
  message: 'Workout not found'
  });
  }
  res.json(result.rows[0]);
  } catch (err) {
  console.error('Error updating workout:', err);
  return res.status(500).json({
  error: 'Server error'
  });
  }
  },


  deleteWorkout: async (req, res) => {
  const {
  id
  } = req.params;
  try {
  const result = await client.query(
  'DELETE FROM strengthstack_schema.workouts WHERE workoutid = $1 RETURNING workoutid',
  [id]
  );
  if (result.rows.length === 0) {
  return res.status(404).json({
  message: 'Workout not found'
  });
  }
  res.json({
  message: 'Workout deleted'
  });
  } catch (err) {
  console.error('Error deleting workout:', err);
  return res.status(500).json({
  error: 'Server error'
  });
  }
  }
 };


 module.exports = workoutController;
