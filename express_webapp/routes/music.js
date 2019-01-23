/**
 * This file contains all routes related to the player.
 */

var express = require('express');
var router = express.Router();
var Music = require('../bin/db-connection').database.Musique;

/* GET music listing. */
router.get('/', function(req, res, next) {
    res.render('player');
});

router.get('/embed', function(req, res, next) {
    res.render('embed');
});

// ========== GET ==========

//Find all
router.get('/findAll', function(req,res){
	Music.find(function(err, music){
        if (err){
            res.send(err);
        }
        res.json(music);
    });
});

// Find by ID
router.get('/find/id/:id', function(req,res){
	Music.find({id: req.params.id}, function(err, music) {
        if (err) {
            res.send(err);
        }
        res.json(music[0]);
    });
});

// Find by titre

router.get('/find/title/:title', function(req,res){
    let title = new RegExp(req.params.title);
	Music.find({titre: { $regex : title}}, function(err, music) {
        if (err) {
            res.send(err);
        }
        res.json(music);
    });
});

// Find by artiste

router.get('/find/artiste/:artiste', function(req,res){
	Music.find({artiste: req.params.artiste}, function(err, music) {
        if (err) {
            res.send(err);
        }
        res.json(music);
    });
});

// Find by album

router.get('/find/album/:album', function(req,res){
	Music.find({album: req.params.album}, function(err, music) {
        if (err) {
            res.send(err);
        }
        res.json(music);
    });
});

// Find by genre

router.get('/find/genre/:genre', function(req,res){
	Music.find({genre: req.params.genre}, function(err, music) {
        if (err) {
            res.send(err);
        }
        res.json(music);
    });
});

// Find by annee

router.get('/find/annee/:annee', function(req,res){
	Music.find({annee: req.params.annee}, function(err, music) {
        if (err) {
            res.send(err);
        }
        res.json(music);
    });
});



// ========== POST ==========

router.post('/add', function(req,res){
    var music = new Music();

    music.id = req.body.id;
    music.titre = req.body.titre;
    music.album = req.body.album;
    music.artiste = req.body.artiste;
    music.cheminMP3 = req.body.cheminMP3;
    music.cover = req.body.cover;
    music.annee = req.body.annee;
    music.duree = req.body.duree;
    music.genre = req.body.genre;
    music.listePoint = req.body.listePoint;
    music.nbEcoute = req.body.nbEcoute;
    music.nbLike = req.body.nbLike;
    music.nbPartage = req.body.nbPartage;
    music.nbComment = req.body.nbComment;

    music.save(function(err){
        if(err) {
            res.send(err);
        }
        res.send({message : 'Ajout de la musique réussit !'})
    })

});


// ========== PUT ==========


router.put('/maj/:id', function(req, res) {
    Music.update({id: req.params.id}, req.body, function(err, status) {
        if (err) {
            res.send(err);
        }
        res.json({message : 'MAJ réussite'});
    });
});

// addLike

router.put('/maj/like/:id', function(req, res) {
    Music.update({id: req.params.id}, {$inc:{nbLike : 1}}, function(err, status) {
        if (err) {
            res.send(err);
        }
        res.json(status);
    });

});

// removeLike

router.put('/maj/removeLike/:id', function(req, res) {
    Music.update({id: req.params.id}, {$inc:{nbLike : -1}}, function(err, status) {
        if (err) {
            res.send(err);
        }
        res.json(status);
    });

});

// addViews

router.put('/maj/views/:id', function(req, res) {
    Music.update({id: req.params.id}, {$inc:{nbEcoute : 1}}, function(err, status) {
        if (err) {
            res.send(err);
        }
        res.json(status);
    });
});

// removeViews

router.put('/maj/removeViews/:id', function(req, res) {
    Music.update({id: req.params.id}, {$inc:{nbEcoute : -1}}, function(err, status) {
        if (err) {
            res.send(err);
        }
        res.json(status);
    });
});

// ========== DELETE ==========

router.delete('/remove/:id', function(req, res) {
    Music.remove({id: req.params.id}, function(err, music){
        if (err){
            res.send(err);
        }
        res.json({message:"Musique supprimée"});
    });
});


module.exports = router;
