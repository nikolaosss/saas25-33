const express = require('express');
const router = express.Router();
const authController = require('../controllers/controller');

const { authMiddleware } = require('../authMiddleware');

router.post('/login', authController.login); 
router.post('/logout', authMiddleware, authController.logout); 

router.get('/users', (req, res) => {
    res.json([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' }
    ]);
  });

router.get('/status', (req, res) => {
    res.json({
      service: 'user-management',
      status: 'OK',
      timestamp: new Date().toISOString()
    });
  });
module.exports = router;