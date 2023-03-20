const express = require('express')
const path = require('path')

const app = express();

const CONFIG = {
    PORT: 9000,
    DEST: '/docs',
    INDEX: '/src/index.html',
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, CONFIG.INDEX))
});

app.use('/', express.static(path.join(__dirname, CONFIG.DEST)));

app.listen(CONFIG.PORT, () => {
  console.log(`App running on port ${CONFIG.PORT}`)
});
