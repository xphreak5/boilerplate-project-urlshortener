require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bp = require("body-parser")
const axios = require('axios');

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bp.urlencoded({ extended: true }));

let urls = [
  
]

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post("/api/shorturl", async (req, res) => {
  let value = req.body.url
  try {
    const data = await axios.get(value)

    if (data.status === 200) {
      urls.push({
        original_url: value,
        short_url: urls.length
      })
      res.json(urls[urls.length - 1])
    }
  }
  
  catch (err) {res.json({ error: 'invalid url' })}
})

app.get("/api/shorturl/:id", (req, res) => {
  const id = req.params.id
  urls.forEach(url => {
    if (url.short_url == id) {
      console.log(url.original_url)
      res.redirect(url.original_url)
    }
  })
})


app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
