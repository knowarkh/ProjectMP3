var express = require('express');
var router = express.Router();
var database = require('../bin/db-connection');
var path = require('path');

/* GET music listing. */
router.get('/', function(req, res, next) {
    res.render('player');
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
});

// Find by ID
router.get('/find/id/:id', function(req,res){
	database.Musique.find({id: req.params.id}, function(err, music) {
        if (err) {
            res.send(err);
        }
        res.json(music);
    });
});

// Find by titre

router.get('/find/titre/:title', function(req,res){
	database.Musique.find({titre: req.params.title}, function(err, music) {
        if (err) {
            res.send(err);
        }
        res.json(music);
    });
});

// Find by artiste

router.get('/find/artiste/:artiste', function(req,res){
	database.Musique.find({artiste: req.params.artiste}, function(err, music) {
        if (err) {
            res.send(err);
        }
        res.json(music);
    });
});

// Find by album

router.get('/find/album/:album', function(req,res){
	database.Musique.find({album: req.params.album}, function(err, music) {
        if (err) {
            res.send(err);
        }
        res.json(music);
    });
});

// Find by genre

router.get('/find/genre/:genre', function(req,res){
	database.Musique.find({genre: req.params.genre}, function(err, music) {
        if (err) {
            res.send(err);
        }
        res.json(music);
    });
});

// Find by annee

router.get('/find/annee/:annee', function(req,res){
	database.Musique.find({annee: req.params.annee}, function(err, music) {
        if (err) {
            res.send(err);
        }
        res.json(music);
    });
});

// ========== POST ==========
router.post('/add', function(req,res){
    var music = new database.Musique();

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
    //console.log(req.body);
    /*if (Object.keys(req.files).length == 0) {
        return res.status(400).send('No files were uploaded.');
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    //console.log(req.files);
    let sampleFile = req.files.foo;
    let coverFile = req.files.cover;

    // Use the mv() method to place the file on the server
    sampleFile.mv('public/musics/filename.mp3', function(err) {
        if (err)
            return res.status(500).send(err);
        coverFile.mv('public/images/cover.jpg', function(err) {
            if (err)
                return res.status(500).send(err);
            //res.send(' Music and Cover uploaded!');
            mm.parseFile('public/musics/filename.mp3', {native: true})
                .then( metadata => {
                    //console.log(util.inspect(metadata, { showHidden: false, depth: null }));
                    var piste = {
                        'titre' : req.body.titre,
                        'album' : req.body.album,
                        'artiste' : req.body.artiste,
                        'cheminMP3' : 'public/musics/filename.mp3',
                        'cover' : 'public/images/cover.jpg',
                        'annee' : req.body.annee,
                        'duree' : metadata.format.duration,
                        'genre' : req.body.genre,
                        'listePoint' : [0, 0, 3, 4, 9, 13, 16, 20, 21, 21, 21, 22, 21, 25, 26, 26, 26, 23, 17, 26, 29, 65, 97, 104, 101, 105, 104, 100, 100, 97, 111, 106, 107, 99, 101, 102, 104, 100, 113, 108, 103, 95, 107, 110, 108, 104, 102, 112, 103, 89, 96, 97, 97, 94, 112, 113, 102, 82, 102, 99, 104, 88, 103, 104, 96, 95, 106, 97, 98, 101, 98, 105, 98, 89, 100, 108, 111, 107, 95, 101, 102, 109, 108, 114, 82, 63, 109, 99, 85, 109, 109, 106, 95, 81, 84, 82, 77, 80, 95, 93, 95, 86, 92, 88, 89, 83, 100, 91, 103, 97, 105, 103, 108, 97, 86, 85, 81, 82, 90, 88, 99, 93, 86, 98, 86, 95, 87, 73, 110, 95, 110, 105, 110, 91, 105, 111, 98, 94, 102, 111, 104, 98, 106, 110, 109, 107, 108, 109, 110, 112, 111, 108, 95, 98, 105, 109, 107, 82, 95, 112, 102, 97, 104, 109, 103, 89, 103, 109, 101, 92, 93, 109, 100, 95, 102, 103, 110, 85, 105, 112, 105, 97, 110, 107, 113, 88, 109, 118, 107, 98, 111, 74, 79, 107, 114, 101, 109, 116, 111, 112, 111, 104, 115, 105, 111, 109, 105, 105, 106, 107, 107, 98, 110, 110, 106, 108, 107, 103, 108, 112, 111, 109, 111, 93, 110, 112, 108, 105, 98, 101, 103, 110, 107, 110, 112, 109, 77, 58, 61, 52, 44, 44, 43, 38, 52, 54, 53, 61, 46, 51, 66, 56, 55, 60, 56, 50, 51, 54, 39, 60, 50, 47, 43, 49, 39, 50, 52, 48, 58, 59, 61, 59, 49, 58, 48, 49, 36, 33, 25, 21, 22, 16, 16, 59, 114, 108, 112, 111, 110, 110, 111, 105, 109, 118, 116, 105, 108, 108, 112, 111, 106, 106, 109, 103, 108, 111, 113, 104, 104, 106, 108, 113, 110, 108, 106, 111, 108, 103, 108, 108, 110, 108, 110, 111, 103, 109, 100, 103, 102, 81, 89, 103, 99, 83, 94, 86, 90, 97, 97, 68, 73, 102, 94, 96, 100, 58, 89, 99, 105, 92, 94, 88, 99, 93, 101, 94, 92, 98, 93, 102, 86, 77, 100, 96, 93, 85, 80, 65, 67, 109, 105, 111, 90, 110, 95, 99, 89, 108, 107, 109, 98, 107, 100, 108, 107, 97, 98, 103, 83, 107, 103, 108, 92, 100, 103, 105, 103, 104, 110, 99],
                        'nbEcoute' : 0,
                        'nbLike' : 0,
                        'nbPartage' : 0
                    };
                    console.log(piste);
                })
                .catch( err => {
                    console.error(err.message);
                });
        });
    });*/


    /*if (shell.exec('python ./bin/audio.py public/musics/filename.mp3').code !== 0) {
        shell.echo('Error: script py failed !');
        shell.exit(1);
    }*/
});

// ========== PUT ==========

router.put('/maj/:id', function(req, res) {
    database.Musique.update({id: req.params.id}, req.body, function(err, music) {
        if (err) {
            res.send(err);
        }
        res.json({message : 'MAJ réussite'});
    });
});

// addLike

router.put('/maj/like/:id', function(req, res) {
    database.Musique.update({id: req.params.id}, req.body, function(err, music) {
        if (err) {
            res.send(err);
        }
        res.json({message : 'MAJ réussite'});
    });
});

// addViews

router.put('/maj/views/:id', function(req, res) {
    database.Musique.update({id: req.params.id}, req.body, function(err, music) {
        if (err) {
            res.send(err);
        }
        res.json({message : 'MAJ réussite'});
    });
});


// ========== DELETE ==========

router.delete('/remove/:id', function(req, res) {
    database.Musique.remove({_id: req.params.id}, function(err, music){
        if (err){
            res.send(err);
        }
        res.json({message:"Musique supprimée"});
    });
});



module.exports = router;
