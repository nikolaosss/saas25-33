const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(express.json()); // για να διαβάζει JSON σώματα

// 🔐 LOGIN (προωθεί σε user-management)
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

// 🚪 LOGOUT (χρειάζεται token και το προωθεί)
app.post('/logout', async (req, res) => {
  try {
    const response = await axios.post(
      'http://user-management:3001/api/logout',
      {}, // Δεν έχει body
      {
        headers: {
          'Authorization': req.headers.authorization, // προώθηση token
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

// ✅ Start the gateway
app.listen(PORT, () => {
  console.log(`API Gateway listening on port ${PORT}`);
});
