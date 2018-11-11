var express = require('express');
var router = express.Router();
var database = require('../bin/db-connection');

/* GET music listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

// GET
/*router.get('/find/', function(req,res){
	res.json({
        message : "Liste toutes les musiques avec paramètres :",
        artist : req.query.artist,
        nbRes : req.query.maxresult,
        methode : req.method
    });
})

router.get('/find/:id', function(req,res){
	res.json({message : "Musique avec l\'id n°" + req.params.id});
})*/

router.get('/find', function(req,res){
	database.Musique.find(function(err, music){
        if (err){
            res.send(err);
        }
        res.json(music);
    });
})

router.get('/find/:id', function(req,res){
	database.Musique.findById(req.params.id, function(err, music) {
        if (err) {
            res.send(err);
        }
        res.json(music);
    });
})

//POST
/*router.post('/add', function(req,res){
	res.json({
        message : "Ajout d'une nouvelle musique",
        titre : req.body.titre,
        artiste : req.body.artist
    });
})*/

router.post('/add', function(req,res){
    var music = new database.Musique();

    music.titre = req.body.titre;
    music.annee = req.body.annee;
    music.duree = req.body.duree;
    music.nbEcoute = req.body.nbEcoute;
    music.nbLike = req.body.nbLike;
    music.listePoints = req.body.listePoints;
    music.nbPartage = req.body.nbPartage;
    music.album.titreA = req.body.albumA;
    music.artiste.nom = req.body.nom;

    music.save(function(err){
        if(err) {
            res.send(err);
        }
        res.send({message : 'Ajout de la musique réussite !'})
    })
})

//PUT
router.put('/maj/', function(req,res){
    res.json({message : "Mise à jour des informations d'une musique dans la liste", methode : req.method});
})

router.put('/maj/:id', function(req,res){
	res.json({message : "Mise à jour de la musique avec l\'id n°" + req.params.id});
})

//DELETE
router.delete('/del/', function(req,res){
    res.json({message : "Suppression d'une musique dans la liste", methode : req.method});
});

router.delete('/del/:id', function(req,res){
	res.json({message : "Suppression de la musique avec l\'id n°" + req.params.id});
})

module.exports = router;