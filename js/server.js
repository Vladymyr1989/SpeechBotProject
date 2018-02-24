var express = require('express');
var app = express();
app.use('/public', express.static('public'));
app.use('/js', express.static('js'));
app.get ('/', function (req, res) {
   res.sendFile('/speechbox.html', {root : 'html'});
});
console.log('Server started');
app.listen(2000);
