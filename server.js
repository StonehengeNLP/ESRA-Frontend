const express = require('express');
// const bobyParser = require('body-parser');
const path = require('path');
const app = express()

console.log(path.join(__dirname, 'build'));
app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);