var express = require('express');
var router = express.Router();
var Playlist = require('../bin/db-connection').database.Playlist;
var Music = require('../bin/db-connection').database.Musique;
var path = require('path');


// ========== GET ==========

// Find by id
router.get('/find/id/:id', function(req, res){
    Playlist.findOne({id: req.params.id}, function(err,playlist){
        if(err){
            res.send(err);
        }
        let result = {};
        let listIdMusicToSearch = playlist.listIdMusic;
        let numberOfQueryFinished = 0;

        for(let i = 0; i < listIdMusicToSearch.length; i++){
            Music.findOne({id:listIdMusicToSearch[i]},function(err,music){
                result[listIdMusicToSearch[i]] = music;

                //Use a counter to know if all query is finished
                numberOfQueryFinished++;

                if(numberOfQueryFinished === listIdMusicToSearch.length){
                    res.json(result);
                }
            });

        }
    });
});

//Find by name
router.get('/find/name/:name', function(req,res){
    let name = new RegExp(req.params.name);
    Playlist.find({name: {$regex : name}}, function(err, playlists){
        if(err)
            res.send(err);
        res.json(playlists);
    });
});

// ========== POST ==========

// Add a playlist
router.post('/add', function(req,res){
    var playlist = new Playlist();

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

//Add a music to a playlist
router.put('/maj/add/:id', function(req,res){
    Music.findOne({id : req.body.id}, function(err, music){

        Playlist.update({id : req.params.id},{$addToSet: {listIdMusic : music.id}}, function(err, status){
            res.json(status);
        });
    });

});

// Remove a music to a playlist
router.put('/maj/remove/:id', function(req,res){
    Music.findOne({id : req.body.id}, function(err, music){

        Playlist.update({id : req.params.id},{$pull: { listIdMusic: music.id}}, function(err, status){
            res.json(status);
        });
    });

});

// ========== DELETE ==========

// Remove a playlist
router.delete('/remove/:id', function(req, res) {
    Playlist.remove({id: req.params.id}, function(err, music){
        if (err){
            res.send(err);
        }
        res.json({message:"Playlist supprimée"});
    });
});


module.exports = router;
