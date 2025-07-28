const express = require('express');
const app = express();
const itemRoutes = require('./routes/items');

app.use(express.json());
app.use('/', itemRoutes);

app.listen(3000, () => console.log('Server running on http://localhost:3000'));