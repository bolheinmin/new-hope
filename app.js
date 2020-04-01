  
const express = require('express');

const app = express();

app.use(express.static('./dist/new-hope'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/new-hope/'}),
);

app.listen(process.env.PORT || 8080);