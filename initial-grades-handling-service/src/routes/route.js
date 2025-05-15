const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');
const { authMiddleware } = require('../middleware/authMiddleware');
const { authorizeRole } = require('../middleware/roleMiddleware');
const upload = require('../utils/multer');

router.post(
  '/grades/upload',
  authMiddleware,
  authorizeRole(['professor']),
  upload.single('file'),
  controller.uploadGrades
);

module.exports = router;
