const {
  Client
 } = require('pg');
 const client = new Client({
  user: 'strengthstack_app',
  host: 'database-1-instance-1.cxqgw6yi0upa.us-east-2.rds.amazonaws.com',
  database: 'postgres',
  password: 'Renuka2711',
  port: 5432,
	 search_path: 'strengthstack_schema',
 });
 client.connect();
 

 const userController = {
  getAllUsers: async (req, res) => {
  try {
  const result = await client.query(
  'SELECT userid, username, email, traininglevel, goals FROM strengthstack_schema.users'
  );
  res.json(result.rows);
  } catch (err) {
  console.error('Error getting all users:', err);
  return res.status(500).json({
  error: 'Server error'
  });
  }
  },
 

  getUserById: async (req, res) => {
  const {
  id
  } = req.params;
  try {
  const result = await client.query(
  'SELECT userid, username, email, traininglevel, goals FROM strengthstack_schema.users WHERE userid = $1',
  [id]
  );
  if (result.rows.length === 0) {
  return res.status(404).json({
  message: 'User not found'
  });
  }
  res.json(result.rows[0]);
  } catch (err) {
  console.error('Error getting user by ID:', err);
  return res.status(500).json({
  error: 'Server error'
  });
  }
  },
 

  createUser: async (req, res) => {
  const {
  username,
  email,
  password, // TODO: Hash this!
  trainingLevel,
  goals
  } = req.body;
  try {
  const result = await client.query(
  'INSERT INTO strengthstack_schema.users (username, email, password, traininglevel, goals) VALUES ($1, $2, $3, $4, $5) RETURNING userid, username, email, traininglevel, goals',
  [username, email, password, trainingLevel, goals]
  );
  res.status(201).json(result.rows[0]);
  } catch (err) {
  console.error('Error creating user:', err);
  return res.status(500).json({
  error: 'Server error'
  });
  }
  },
 

  updateUser: async (req, res) => {
  const {
  id
  } = req.params;
  const {
  username,
  email,
  trainingLevel,
  goals
  } = req.body;
  try {
  const result = await client.query(
  'UPDATE strengthstack_schema.users SET username = $1, email = $2, traininglevel = $3, goals = $4 WHERE userid = $5 RETURNING userid, username, email, traininglevel, goals',
  [username, email, trainingLevel, goals, id]
  );
  if (result.rows.length === 0) {
  return res.status(404).json({
  message: 'User not found'
  });
  }
  res.json(result.rows[0]);
  } catch (err) {
  console.error('Error updating user:', err);
  return res.status(500).json({
  error: 'Server error'
  });
  }
  },
 

  deleteUser: async (req, res) => {
  const {
  id
  } = req.params;
  try {
  const result = await client.query(
  'DELETE FROM strengthstack_schema.users WHERE userid = $1 RETURNING userid',
  [id]
  );
  if (result.rows.length === 0) {
  return res.status(404).json({
  message: 'User not found'
  });
  }
  res.json({
  message: 'User deleted'
  });
  } catch (err) {
  console.error('Error deleting user:', err);
  return res.status(500).json({
  error: 'Server error'
  });
  }
  },
 

  authenticateUser: async (req, res) => {
  const {
  username,
  password
  } = req.body;
 

  // *** TEMPORARY TEST USER BYPASS (Remove in production!) ***
  if (username === 'testuser' && password === 'testpassword') {
  console.log('*** TEST USER LOGIN BYPASS ACTIVE! REMOVE IN PRODUCTION! ***');
  return res.json({
  userId: 9999,
  username: 'testuser',
  email: 'test@example.com',
  trainingLevel: 'intermediate',
  goals: 'strength'
  }); // Mock user data
  }
 

  try {
  const result = await client.query(
  'SELECT userid, username, email, traininglevel, goals FROM strengthstack_schema.users WHERE username = $1 AND password = $2', // TODO: Hash password in DB
  [username, password]
  );
 

  if (result.rows.length > 0) {
  return res.json(result.rows[0]);
  } else {
  return res.status(401).json({
  message: 'Invalid credentials'
  }); // 401 Unauthorized
  }
  } catch (err) {
  console.error('Authentication error:', err);
  return res.status(500).json({
  error: 'Server error'
  });
  }
  }
 };
 

 module.exports = userController;
