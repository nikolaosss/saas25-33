const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(express.json()); 
const fs = require('fs');
const cors = require('cors');
app.use(cors());

app.post('/login', async (req, res) => {
  try {
    const response = await axios.post(
      'http://user-management:3001/api/login',
      req.body,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Gateway error (login):', error.message);
    const status = error.response?.status || 500;
    const message = error.response?.data || 'Service error';
    res.status(status).send(message);
  }
});

app.post('/logout', async (req, res) => {
  try {
    const response = await axios.post(
      'http://user-management:3001/api/logout',
      {}, 
      {
        headers: {
          'Authorization': req.headers.authorization, 
        }
      }
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Gateway error (logout):', error.message);
    const status = error.response?.status || 500;
    const message = error.response?.data || 'Service error';
    res.status(status).send(message);
  }
});

app.post('/change-password', async (req, res) => {
  try {
    const response = await axios.post(
      'http://user-management:3001/api/change-password',
      req.body,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': req.headers.authorization 
        }
      }
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Gateway error (change-password):', error.message);
    const status = error.response?.status || 500;
    const message = error.response?.data || 'Service error';
    res.status(status).send(message);
  }
});

const path = require('path');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); 
const FormData = require('form-data');

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const filePath = path.resolve(req.file.path);
    const formData = new FormData();
    formData.append('file', fs.createReadStream(filePath));

    const response = await axios.post(
      'http://initial-grades-handling:3005/api/grades/upload',
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          Authorization: req.headers.authorization
        }
      }
    );

    res.status(response.status).json(response.data);
    fs.unlinkSync(filePath);
  } catch (err) {
    console.error('Gateway error (upload):', err.message);
    const status = err.response?.status || 500;
    res.status(status).send(err.response?.data || 'Upload error');
  }
});

app.post('/review-replies', async (req, res) => {
  try {
    const response = await axios.post(
      'http://review-reply:3018/api/review-replies',
      req.body,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: req.headers.authorization
        }
      }
    );

    res.status(response.status).json(response.data);
  } catch (err) {
    console.error('Gateway error (POST review-replies):', err.message);
    const status = err.response?.status || 500;
    const message = err.response?.data || 'Service error';
    res.status(status).send(message);
  }
});


app.post('/review-requests', async (req, res) => {
  try {
    const response = await axios.post(
      'http://review-request:3017/api/review-requests',
      req.body,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: req.headers.authorization
        }
      }
    );

    res.status(response.status).json(response.data);
  } catch (err) {
    console.error('Gateway error (POST review-requests):', err.message);
    const status = err.response?.status || 500;
    const message = err.response?.data || 'Service error';
    res.status(status).send(message);
  }
});


app.get('/grades', async (req, res) => {
  try {
    const response = await axios.get(
      'http://initial-grades-access:3006/api/grades/access',
      {
        headers: {
          Authorization: req.headers.authorization,
        }
      }
    );

    res.status(response.status).json(response.data);
  } catch (err) {
    console.error('Gateway error (grades):', err.message);
    const status = err.response?.status || 500;
    const message = err.response?.data || 'Service error';
    res.status(status).send(message);
  }
});

app.get('/review-requests', async (req, res) => {
  try {
    const response = await axios.get(
      'http://review-request:3017/api/review-requests',
      {
        headers: {
          Authorization: req.headers.authorization
        }
      }
    );

    res.status(response.status).json(response.data);
  } catch (err) {
    console.error('Gateway error (GET review-requests):', err.message);
    const status = err.response?.status || 500;
    const message = err.response?.data || 'Service error';
    res.status(status).send(message);
  }
});

app.get('/statistics', async (req, res) => {
  try {
    const { courseId } = req.query;

    if (!courseId) {
      return res.status(400).json({ error: 'Missing courseId' });
    }

    const response = await axios.get(
      `http://statistics:3006/api/statistics?courseId=${courseId}`,
      {
        headers: {
          Authorization: req.headers.authorization,
        },
      }
    );

    res.status(response.status).json(response.data);
  } catch (err) {
    console.error('Gateway error (GET statistics):', err.message);
    const status = err.response?.status || 500;
    const message = err.response?.data || 'Service error';
    res.status(status).send(message);
  }
});





app.listen(PORT, () => {
  console.log(`API Gateway listening on port ${PORT}`);
});
