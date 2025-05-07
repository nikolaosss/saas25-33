const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

// Route προς το user-management-service
app.use('/users', async (req, res) => {
  try {
    const response = await axios({
      method: req.method,
      url: `http://user-management:3001/api/users`, // <-- εσωτερικό docker network
      data: req.body,
      headers: req.headers,
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const message = error.response?.data || error.message;
    res.status(status).json({ error: message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
