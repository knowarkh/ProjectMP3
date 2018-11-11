var express = require('express');
var router = express.Router();

/* GET music listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

// GET
router.get('/find/', function(req,res){
	res.json({message : "Liste toutes les musiques", methode : req.method});
})

//POST
router.post('/add/', function(req,res){
    res.json({message : "Ajoute une nouvelle musiques à la liste", methode : req.method});
})

//PUT
router.put('/maj/', function(req,res){
    res.json({message : "Mise à jour des informations d'une musiques dans la liste", methode : req.method});
})

//DELETE
router.delete('/del/', function(req,res){
    res.json({message : "Suppression d'une musiques dans la liste", methode : req.method});
});

module.exports = router;
