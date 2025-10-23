const express = require('express');
const axios = require('axios');
const app = express();

app.get('/admin', async (req, res) => {
  try {
    const response = await axios.get('https://attenjdancce-app.onrender.com/admin.html');
    res.send(response.data);
  } catch (error) {
    res.status(500).send('Error fetching admin page: ' + error.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
