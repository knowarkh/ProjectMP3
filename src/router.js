var express = require('express');

var app = express();


// Mettre ici toutes les routes
app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.send('Vous êtes à l\'accueil');
});

app.get('/find/:id', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Vous avez demandé l\'id n°' + req.params.id);
});


// pour les erreurs 404
app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !');
});

app.listen(8080);