const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Use environment variables for sensitive data
const TELEGRAM_BOT_TOKEN = process.env['TELEGRAM_BOT_TOKEN'];
const TELEGRAM_CHAT_ID = process.env['TELEGRAM_CHAT_ID'];

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

app.post('/send-message', async (req, res) => {
  const message = req.body.message || 'Someone clicked Yes!';

  console.log('Received message to send:', message);

  try {
    const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const response = await axios.post(telegramApiUrl, {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
    });

    console.log('Telegram API response:', response.data);
    res.status(200).send('Message sent');
  } catch (error) {
    if (error.response) {
      console.error('Telegram API Error:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
    res.status(500).send('Error sending message');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});