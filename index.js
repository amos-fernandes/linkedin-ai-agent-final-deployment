const express = require('express');
const session = require('express-session');
const LinkedInService = require('./services/linkedinService');
const linkedinConfig = require('./config/linkedin');
const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(express.static('public'));
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

// LinkedIn OAuth routes
app.get('/auth/linkedin', (req, res) => {
  res.redirect(linkedinConfig.getAuthUrl());
});

app.get('/auth/linkedin/callback', async (req, res) => {
  try {
    const { code } = req.query;
    const tokenResponse = await linkedinConfig.getAccessToken(code);
    req.session.accessToken = tokenResponse.access_token;
    res.redirect('/');
  } catch (error) {
    console.error('LinkedIn auth error:', error);
    res.status(500).send('Authentication failed');
  }
});

// API routes
app.get('/api/profile', async (req, res) => {
  try {
    const linkedinService = new LinkedInService(req.session.accessToken);
    const profile = await linkedinService.getProfile();
    res.json(profile);
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).send('Failed to fetch profile');
  }
});

app.post('/api/share', async (req, res) => {
  try {
    const linkedinService = new LinkedInService(req.session.accessToken);
    const result = await linkedinService.sharePost(req.body.content);
    res.json(result);
  } catch (error) {
    console.error('Share post error:', error);
    res.status(500).send('Failed to share post');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`LinkedIn AI Agent running on port ${port}`);
});