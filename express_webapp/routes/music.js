var express = require('express');
var router = express.Router();
var database = require('../bin/db-connection');

/* GET music listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

// ========== GET ==========
//Find all
router.get('/find', function(req,res){
	database.Musique.find(function(err, music){
        if (err){
            res.send(err);
        }
        res.json(music);
    });
})

// Find by ID
router.get('/find/id/:id', function(req,res){
	database.Musique.findById(req.params.id, function(err, music) {
        if (err) {
            res.send(err);
        }
        res.json(music);
    });
})

// Find by title

router.get('/find/titre/:title', function(req,res){
	database.Musique.find({titre: req.params.title}, function(err, music) {
        if (err) {
            res.send(err);
        }
        res.json(music);
    });
})

// ========== POST ==========
router.post('/add', function(req,res){
    var music = new database.Musique();

    music.titre = req.body.titre;
    music.album = req.body.album;
    music.artiste = req.body.artiste;
    music.cheminMP3 = req.body.cheminMP3;
    music.cover = req.body.cover;
    music.annee = req.body.annee;
    music.duree = req.body.duree;
    music.styles = req.body.styles;
    music.listePoints = req.body.listePoints;
    music.nbEcoute = req.body.nbEcoute;
    music.nbLike = req.body.nbLike;
    music.nbPartage = req.body.nbPartage;

    music.save(function(err){
        if(err) {
            res.send(err);
        }
        res.send({message : 'Ajout de la musique réussit !'})
    })
})

// ========== PUT ==========

router.put('/maj/:id', function(req, res) {
    database.Musique.findById(req.params.id, function(err, music) {
        if (err) {
            res.send(err);
        }

        music.titre = req.body.titre;
        music.album = req.body.album;
        music.artiste = req.body.artiste;
        music.cheminMP3 = req.body.cheminMP3;
        music.cover = req.body.cover;
        music.annee = req.body.annee;
        music.duree = req.body.duree;
        music.styles = req.body.styles;
        music.listePoints = req.body.listePoints;
        music.nbEcoute = req.body.nbEcoute;
        music.nbLike = req.body.nbLike;
        music.nbPartage = req.body.nbPartage;

        music.save(function(err) {
            if(err) {
                res.send(err);
            }
            res.json({message : 'MAJ réussite'});
        });
    });
})

router.delete('/remove/:id', function(req, res) {
    database.Musique.remove({_id: req.params.id}, function(err, music){
        if (err){
            res.send(err);
        }
        res.json({message:"Musique supprimée"});
    });
})

// ========== DELETE ==========


module.exports = router;
