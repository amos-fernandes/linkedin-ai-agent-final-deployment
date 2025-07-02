const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

// Serve static files
app.use(express.static('public'));

// API routes
app.get('/api/status', (req, res) => {
  res.json({ status: 'OK', version: '1.0.0' });
});

// Start the server
app.listen(port, () => {
  console.log(`LinkedIn AI Agent running on port ${port}`);
});