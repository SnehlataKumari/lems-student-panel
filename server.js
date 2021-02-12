const express = require('express');
const app = express();
const port = 5501;
const path = require('path');

const staticPath = path.join(__dirname, 'dist', 'lems-teacher');
const indexFile = path.join(staticPath, 'index.html');

app.use(express.static(staticPath));
app.get('*', (req, res) => res.sendFile(indexFile));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))