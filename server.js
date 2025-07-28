const express = require('express');
const app = express();

//Apply middleware BEFORE routes
app.use(express.json());

//Mount routes AFTER middleware
const loginRoute = require('./routes/login'); // adjust path if needed
app.use('/', loginRoute);

const itemRoutes = require('./routes/items'); // assuming it's in /routes
app.use('/', itemRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});