const express = require('express');
const router = express.Router();
let items = [];

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  username === 'ankita' && password === 'qa123'
    ? res.json({ token: 'mock-token' })
    : res.status(401).json({ error: 'Invalid credentials' });
});

router.get('/items', (req, res) => {
  if (items.length === 0) {
    return res.status(204).send(); // or 200 with `{ message: 'No items found' }`
  }
  res.json(items);
});

router.post('/items', (req, res) => {
  const { name, price, category } = req.body;

  // Validate `name` is a non-empty string
  if (typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({ error: 'Item name is required and must be a non-empty string' });
  }

  const item = {
    id: Date.now(),
    name,
    price,
    category
  };

  items.push(item);
  res.status(201).json(item);
});

router.put('/items/:id', (req, res) => {
  const { id } = req.params;
  const { name, price, category } = req.body;

  // Validate `name` if provided
  if (typeof name === 'string' && name.trim().length === 0) {
    return res.status(400).json({ error: 'Item name must not be an empty string' });
  }

  const index = items.findIndex(item => item.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }

  // Update only provided fields
  if (name !== undefined) items[index].name = name;
  if (price !== undefined) items[index].price = price;
  if (category !== undefined) items[index].category = category;

  res.status(200).json(items[index]);
});

router.delete('/items/:id', (req, res) => {
  const index = items.findIndex(i => i.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Not found' });
  const deleted = items.splice(index, 1);
  res.status(200).json({
  message: 'Item deleted successfully',
  deletedId: req.params.id
});

});

module.exports = router;