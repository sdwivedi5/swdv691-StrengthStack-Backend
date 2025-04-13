 
const { Client } = require('pg');
const client = new Client({ // Database Client within function
  user: 'strengthstack_app',
  host: 'database-1-instance-1.cxqgw6yi0upa.us-east-2.rds.amazonaws.com',
  database: 'postgres',
  password: 'Renuka2711',
  port: 5432,
  });
	  client.connect();

const progressController = {
 getProgressByUser: async (req, res) => {
  const { userId } = req.params;
  try {
   const result = await client.query(
    'SELECT date, reps, weight, estimatedonerepmax FROM strengthstack_schema.progress WHERE userid = $1 ORDER BY date',
    [userId]
   );
   res.json(result.rows);
  } catch (err) {
   console.error('Error fetching progress data:', err);
   return res.status(500).json({ error: 'Server error' });
  }
 },
 // ... other methods if needed ...
};

module.exports = progressController;
