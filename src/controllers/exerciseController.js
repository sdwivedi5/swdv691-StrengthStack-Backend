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
 
 
 
 

 const exerciseController = {
  getAllExercises: async (req, res) => {
  try {
  const result = await client.query(
  'SELECT exerciseid, name, musclegroup FROM strengthstack_schema.exercises'
  );
  res.json(result.rows);
  } catch (err) {
  console.error('Error getting all exercises:', err);
  return res.status(500).json({
  error: 'Server error'
  });
  }
  },
 

  getExerciseById: async (req, res) => {
  const {
  id
  } = req.params;
  try {
  const result = await client.query(
  'SELECT exerciseid, name, musclegroup FROM strengthstack_schema.exercises WHERE exerciseid = $1',
  [id]
  );
  if (result.rows.length === 0) {
  return res.status(404).json({
  message: 'Exercise not found'
  });
  }
  res.json(result.rows[0]);
  } catch (err) {
  console.error('Error getting exercise by ID:', err);
  return res.status(500).json({
  error: 'Server error'
  });
  }
  },
 

  createExercise: async (req, res) => {
  const {
  name,
  musclegroup
  } = req.body;
  try {
  const result = await client.query(
  'INSERT INTO strengthstack_schema.exercises (name, musclegroup) VALUES ($1, $2) RETURNING exerciseid, name, musclegroup',
  [name, musclegroup]
  );
  res.status(201).json(result.rows[0]);
  } catch (err) {
  console.error('Error creating exercise:', err);
  return res.status(500).json({
  error: 'Server error'
  });
  }
  },
 

  updateExercise: async (req, res) => {
  const {
  id
  } = req.params;
  const {
  name,
  musclegroup
  } = req.body;
  try {
  const result = await client.query(
  'UPDATE strengthstack_schema.exercises SET name = $1, musclegroup = $2 WHERE exerciseid = $3 RETURNING exerciseid, name, musclegroup',
  [name, musclegroup, id]
  );
  if (result.rows.length === 0) {
  return res.status(404).json({
  message: 'Exercise not found'
  });
  }
  res.json(result.rows[0]);
  } catch (err) {
  console.error('Error updating exercise:', err);
  return res.status(500).json({
  error: 'Server error'
  });
  }
  },
 

  deleteExercise: async (req, res) => {
  const {
  id
  } = req.params;
  try {
  const result = await client.query(
  'DELETE FROM strengthstack_schema.exercises WHERE exerciseid = $1 RETURNING exerciseid',
  [id]
  );
  if (result.rows.length === 0) {
  return res.status(404).json({
  message: 'Exercise not found'
  });
  }
  res.json({
  message: 'Exercise deleted'
  });
  } catch (err) {
  console.error('Error deleting exercise:', err);
  return res.status(500).json({
  error: 'Server error'
  });
  }
  }
 };
 

 module.exports = exerciseController;
