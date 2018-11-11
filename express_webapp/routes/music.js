var express = require('express');
var router = express.Router();

/* GET music listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

// GET
router.get('/find/', function(req,res){
	res.json({
        message : "Liste toutes les musiques avec paramètres :",
        artist : req.query.artist,
        nbRes : req.query.maxresult,
        methode : req.method
    });
})

router.get('/find/:id', function(req,res){
	res.json({message : "Musique avec l\'id n°" + req.params.id});
})

//POST
router.post('/add', function(req,res){
	res.json({
        message : "Ajout d'une nouvelle musique",
        titre : req.body.titre,
        artiste : req.body.artist
    });
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
