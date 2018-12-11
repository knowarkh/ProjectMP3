var express = require('express');
var router = express.Router();
var database = require('../bin/db-connection');
var path = require('path');

/* GET music listing. */
router.get('/', function(req, res, next) {
    res.render('player');
    // res.sendFile(path.join( '/home/zmondy/Bureau/Devoirs/S2IMa/ProjectMP3/express_webapp/views/player.html'));
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

// Find by titre

router.get('/find/titre/:title', function(req,res){
	database.Musique.find({titre: req.params.title}, function(err, music) {
        if (err) {
            res.send(err);
        }
        res.json(music);
    });
})

// Find by artiste

router.get('/find/artiste/:artiste', function(req,res){
	database.Musique.find({artiste: req.params.artiste}, function(err, music) {
        if (err) {
            res.send(err);
        }
        res.json(music);
    });
})

// Find by album

router.get('/find/album/:album', function(req,res){
	database.Musique.find({album: req.params.album}, function(err, music) {
        if (err) {
            res.send(err);
        }
        res.json(music);
    });
})

// Find by genre

router.get('/find/genre/:genre', function(req,res){
	database.Musique.find({genre: req.params.genre}, function(err, music) {
        if (err) {
            res.send(err);
        }
        res.json(music);
    });
})

// Find by annee

router.get('/find/annee/:annee', function(req,res){
	database.Musique.find({annee: req.params.annee}, function(err, music) {
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
    music.genre = req.body.genre;
    music.listePoint = req.body.listePoint;
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
        music.genre = req.body.genre;
        music.listePoint = req.body.listePoint;
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

// addLike(int id) +1

router.put('/maj/like/:id', function(req, res) {
    // Find --> like
    database.Musique.findById(req.params.id, function(err, music) {
        if (err) {
            res.send(err);
        }

        let cookies = music.nbLike + 1
        music.nbLike = cookies;

        music.save(function(err) {
            if(err) {
                res.send(err);
            }
            res.json({message : 'MAJ réussite'});
        });
    });
})

// addNumbeOfShare(int id)

router.put('/maj/share/:id', function(req, res) {
    database.Musique.findById(req.params.id, function(err, music) {
        if (err) {
            res.send(err);
        }

        music.nbPartage = req.body.nbPartage;

        music.save(function(err) {
            if(err) {
                res.send(err);
            }
            res.json({message : 'MAJ réussite'});
        });
    });
})

// addComment(int id)

// router.put('/maj/like/:id', function(req, res) {
//     database.Musique.findById(req.params.id, function(err, music) {
//         if (err) {
//             res.send(err);
//         }
//         music.nbLike = req.body.nbLike;
//
//         music.save(function(err) {
//             if(err) {
//                 res.send(err);
//             }
//             res.json({message : 'MAJ réussite'});
//         });
//     });
// })


// ========== DELETE ==========

router.delete('/remove/:id', function(req, res) {
    database.Musique.remove({_id: req.params.id}, function(err, music){
        if (err){
            res.send(err);
        }
        res.json({message:"Musique supprimée"});
    });
})



module.exports = router;
