const express = require('express');
const router = express.Router();
const { getPopularPosts, getLatestPosts } = require('../services/analyticsService');

router.get('/', async (req, res) => {
  const { type } = req.query;
  try {
    if (type === 'popular') {
      const posts = await getPopularPosts();
      res.json(posts);
    } else if (type === 'latest') {
      const posts = await getLatestPosts();
      res.json(posts);
    } else {
      res.status(400).json({ error: 'Invalid type query param' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts.' });
  }
});

module.exports = router;