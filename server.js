require('dotenv').config(); 
const express = require('express');
const app = express();
const axios = require('axios');
const PORT = process.env.PORT || 8080;
const API_KEY = process.env.API_KEY; // Replace with your Pixabay API key



app.use(express.json());
app.use(express.static('public', { 'extensions': ['html', 'htm', 'css', 'js'] }));


app.get('/', (req, res) => { 
  res.sendFile('./public/index.html', {root: __dirname});
}); 

app.get('/getImages', async (req, res) => {
  try {
    const query = encodeURIComponent(req.query.q);
    const pixabayURL = `https://pixabay.com/api/?key=${API_KEY}&q=${query}`;

    const { data } = await axios.get(pixabayURL);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
