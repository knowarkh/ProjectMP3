var express = require('express');
var router = express.Router();
var database = require('../bin/db-connection');
var path = require('path');

/* GET music listing. */
router.get('/', function(req, res, next) {
    res.render('player');
});

router.get('/embed', function(req, res, next) {
    res.render('embed');
});

// ========== GET ==========

/**         Music        */
//Find all
router.get('/findAllMusic', function(req,res){
	database.database.Musique.find(function(err, music){
        if (err){
            res.send(err);
        }
        res.json(music);
    });
});

// Find by ID
router.get('/find/music/id/:id', function(req,res){
	database.database.Musique.find({id: req.params.id}, function(err, music) {
        if (err) {
            res.send(err);
        }
        res.json(music[0]);
    });
});

// Find by titre

router.get('/find/music/title/:title', function(req,res){
    let title = new RegExp(req.params.title);
	database.database.Musique.find({titre: { $regex : title}}, function(err, music) {
        if (err) {
            res.send(err);
        }
        res.json(music);
    });
});

// Find by artiste

router.get('/find/artiste/:artiste', function(req,res){
	database.database.Musique.find({artiste: req.params.artiste}, function(err, music) {
        if (err) {
            res.send(err);
        }
        res.json(music);
    });
});

// Find by album

router.get('/find/album/:album', function(req,res){
	database.database.Musique.find({album: req.params.album}, function(err, music) {
        if (err) {
            res.send(err);
        }
        res.json(music);
    });
});

// Find by genre

router.get('/find/genre/:genre', function(req,res){
	database.database.Musique.find({genre: req.params.genre}, function(err, music) {
        if (err) {
            res.send(err);
        }
        res.json(music);
    });
});

// Find by annee

router.get('/find/annee/:annee', function(req,res){
	database.database.Musique.find({annee: req.params.annee}, function(err, music) {
        if (err) {
            res.send(err);
        }
        res.json(music);
    });
});

/**         Playlist         */

router.get('/find/playlist/id/:id', function(req, res){
    database.database.Playlist.findOne({id: req.params.id}, function(err,playlist){
        if(err){
            res.send(err);
        }
        let result = [];
        let listIdMusicToSearch = playlist.listIdMusic;

        for(let i = 0; i < listIdMusicToSearch.length; i++){

            database.database.Musique.findOne({id:listIdMusicToSearch[i]},function(err,music){
                result.push(music);
                if(i === listIdMusicToSearch.length - 1){
                    res.json(result);
                }
            });
        }
    });
});

router.get('/find/playlist/name/:name', function(req,res){
    let name = new RegExp(req.params.name);
    database.database.Playlist.find({name: {$regex : name}}, function(err, playlists){
        if(err)
            res.send(err);
        res.json(playlists);
    });
});

// ========== POST ==========
/**         Music        */

router.post('/add', function(req,res){
    var music = new database.database.Musique();

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
        res.send({message : 'Ajout de la Musique réussit !'})
    });
});

/**         Playlist         */

router.post('/addPlaylist', function(req,res){
    var playlist = new database.database.Playlist();

    playlist.id = req.body.id;
    playlist.name = req.body.name;
    playlist.listIdMusic = req.body.listIdMusic;

    playlist.save(function(err){
        if(err) {
            res.send(err);
        }
        res.send({message : 'Ajout de la Playlist réussit !'})
    });
});
// ========== PUT ==========
/**         Music        */


router.put('/maj/music/:id', function(req, res) {
    database.database.Musique.update({id: req.params.id}, req.body, function(err, status) {
        if (err) {
            res.send(err);
        }
        res.json({message : 'MAJ réussite'});
    });
});

// addLike

router.put('/maj/music/like/:id', function(req, res) {
    database.database.Musique.update({id: req.params.id}, {$inc:{nbLike : 1}}, function(err, status) {
        if (err) {
            res.send(err);
        }
        res.json(status);
    });

});

// removeLike

router.put('/maj/music/removeLike/:id', function(req, res) {
    database.database.Musique.update({id: req.params.id}, {$inc:{nbLike : -1}}, function(err, status) {
        if (err) {
            res.send(err);
        }
        res.json(status);
    });

});

// addViews

router.put('/maj/music/views/:id', function(req, res) {
    database.database.Musique.update({id: req.params.id}, {$inc:{nbEcoute : 1}}, function(err, status) {
        if (err) {
            res.send(err);
        }
        res.json(status);
    });
});

// removeViews

router.put('/maj/music/removeViews/:id', function(req, res) {
    database.database.Musique.update({id: req.params.id}, {$inc:{nbEcoute : -1}}, function(err, status) {
        if (err) {
            res.send(err);
        }
        res.json(status);
    });
});

/**         Playlist         */

router.put('/maj/playlist/add/:id', function(req,res){
    database.database.Musique.findOne({id : req.body.id}, function(err, music){

        database.database.Playlist.update({id : req.params.id},{$addToSet: {listIdMusic : music.id}}, function(err, status){
            res.json(status);
        });
    });

});

router.put('/maj/playlist/remove/:id', function(req,res){
    database.database.Musique.findOne({id : req.body.id}, function(err, music){

        database.database.Playlist.update({id : req.params.id},{$pull: { listIdMusic: music.id}}, function(err, status){
            res.json(status);
        });
    });

});

// ========== DELETE ==========
/**         Music        */



router.delete('/remove/music/:id', function(req, res) {
    database.database.Musique.remove({id: req.params.id}, function(err, music){
        if (err){
            res.send(err);
        }
        res.json({message:"Musique supprimée"});
    });
});

/**         Playlist         */

router.delete('/remove/playlist/:id', function(req, res) {
    database.database.Playlist.remove({id: req.params.id}, function(err, music){
        if (err){
            res.send(err);
        }
        res.json({message:"Playlist supprimée"});
    });
});



module.exports = router;
