const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');
const { authMiddleware } = require('../middleware/authMiddleware');
const { authorizeRole } = require('../middleware/roleMiddleware');
const upload = require('../middleware/upload');

router.post(
  '/grades/upload',
  authMiddleware,
  authorizeRole(['professor']),
  upload.single('file'), // <--- το file πεδίο στο Postman
  controller.uploadGrades
);

module.exports = router;
