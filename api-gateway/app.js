const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

function proxyTo(targetUrl) {
  return async (req, res) => {
    try {
      const response = await axios({
        method: req.method,
        url: targetUrl,
        data: req.body,
        headers: req.headers,
      });
      res.status(response.status).json(response.data);
    } catch (error) {
      const status = error.response?.status || 500;
      const message = error.response?.data || error.message;
      res.status(status).json({ error: message });
    }
  };
}

// Route προς το user-management-service
app.post('/login', proxyTo('http://user-management:3001/api/login'));
app.post('/logout', proxyTo('http://user-management:3001/api/logout'));
app.get('/users', proxyTo('http://user-management:3001/api/users'));
app.get('/status', proxyTo('http://user-management:3001/api/status'));


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
