const express = require('express');
const router = express.Router();

const validUser = {
  username: 'admin',
  password: 'secret'
};

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Missing username or password' });
  }

  if (username === validUser.username && password === validUser.password) {
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

module.exports = router;