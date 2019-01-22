/**
 * This file contains all routes related to the administration page.
 */

var mm = require('music-metadata');
var express = require('express');
var router = express.Router();
var shell = require('shelljs');
var database = require('../bin/db-connection').database;

var pathMP3 = 'public/musics/';
var pathCover = 'public/images/';


//---Render admin webpage---
router.get('/', function(req, res, next) {
    res.render('admin_add', { title: 'Express' });
});

// POST form add track
router.post('/', function(req, res, next) {

    if (Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    var sampleFile = req.files.foo;
    var coverFile = req.files.cover;
    var musicFileName = path(req.body.artiste, req.body.titre) + ".mp3";
    var coverFilename = path(req.body.artiste, req.body.titre) + ".jpg";


    // creation of folders in the right place to add music and cover
    shell.mkdir(pathMP3 + underscore(req.body.artiste));
    shell.mkdir(pathCover + underscore(req.body.artiste));


    //---get the MP3 file---
    //Use the mv() method to place the file on the server
    sampleFile.mv(pathMP3 + musicFileName, function(err) {
        if (err) {
            return res.status(500).send(err);
        }
        //---get the Cover image---
        coverFile.mv(pathCover + coverFilename, function(err) {
            if (err)
                return res.status(500).send(err);

            //---get metadata of the MP3 file---
            mm.parseFile(pathMP3 + musicFileName, {native: true})
                .then( metadata => {

                    //---processing python script---
                    if (shell.exec('python ./bin/audio.py ' + pathMP3 + musicFileName).code !== 0) {
                        shell.echo('Error: script py failed !');
                        shell.exit(1);
                    }
                    let dotList = shell.exec('cat musique.json');

                    //---creation of database object---
                    var piste = new database.Musique();

                    piste.id = 13;
                    piste.titre = req.body.titre;
                    piste.album = req.body.album;
                    piste.artiste = req.body.artiste;
                    piste.cheminMP3 = "/musics/" + musicFileName;
                    piste.cover = "/images/" + coverFilename;
                    piste.annee = req.body.annee;
                    piste.duree = Math.round(metadata.format.duration);
                    piste.genre = req.body.genre;
                    piste.listePoint = JSON.parse(dotList.stdout);
                    piste.nbEcoute = 0;
                    piste.nbLike = 0;
                    piste.nbPartage = 0;
                    piste.nbComment = 0;

                    //---save in mongoDB database---
                    piste.save(function(err){
                        if(err) {
                            res.send(err);
                        }
                        res.render('admin_redirection', { title: 'Express' });
                    });

                    // Deleting temporary files for by the python script.
                    shell.rm("musique.json");
                    shell.rm("musique.txt");

                    //---data layout---
                    /*var piste = {
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
                    };*/
                })
                .catch( err => {
                    console.error(err.message);
                });
        });
    });
});


/**
 * Concatenates the artist's name and the title of the music to form a path.
 * @param artiste - string - the name of the artist
 * @param titre - string - the title of the music
 * @returns string - the path
 */
function path(artiste, titre) {
    return underscore(artiste) + "/" + underscore(titre);
}

/**
 * Replaces spaces with underscores
 * @param string - string - the name of the artist
 * @returns string - the reformatted string
 */
function underscore(string) {
    var res =  capitalizeFirstLetter(string);
    return res.split(' ').join('_');
}

/**
 * Capitalizes each letter of each word
 * @param str - string - the title of the music
 * @returns string - the reformatted string
 */
function capitalizeFirstLetter(str) {
    return str.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

module.exports = router;
