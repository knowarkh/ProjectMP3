/**
 * This file contains all routes related to the administration page.
 */

var mm = require('music-metadata');
var express = require('express');
var router = express.Router();
var shell = require('shelljs');
var Music = require('../bin/db-connection').database.Musique;

var pathMP3 = 'public/musics/';
var pathCover = 'public/images/';


/**
 * Displaying home page of the administration page
 */
router.get('/', function (req, res) {
    res.render('admin_home');
});


/**
 * Displaying a form to add music
 */
router.get('/add', function (req, res) {
    res.render('admin_add');
});


/**
 * Add music
 */
// POST form add track
router.post('/', function (req, res) {

    if (Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    // SECU - Checking mimetype
    var mimeTypeMp3 = req.files.foo.mimetype;
    var mimeTypeJpg = req.files.cover.mimetype;
    if (mimeTypeMp3 !== "audio/mpeg" && mimeTypeJpg !== "image/jpeg") {
        return res.status(400).send('Veuillez mettre un fichier .mp3 et un fichier .jpg');
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
    sampleFile.mv(pathMP3 + musicFileName, function (err) {
        if (err) {
            return res.status(500).send(err);
        }
        //---get the Cover image---
        coverFile.mv(pathCover + coverFilename, function (err) {
            if (err)
                return res.status(500).send(err);

            //---get metadata of the MP3 file---
            mm.parseFile(pathMP3 + musicFileName, {native: true})
                .then(metadata => {

                    //---processing python script---
                    if (shell.exec('python ./bin/audio.py ' + pathMP3 + musicFileName).code !== 0) {
                        shell.echo('Error: script py failed !');
                        shell.exit(1);
                    }
                    let dotList = shell.exec('cat musique.json');

                    //---creation of database object---
                    var piste = new Music();

                    Music.findOne({}, {"id": true, "_id": false}, function (err, idMusicMax) {

                            piste.id = idMusicMax.id + 1;
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
                            piste.save(function (err) {
                                if (err) {
                                    res.send(err);
                                }
                                res.render('admin_redirection', {title: 'Express'});
                            });

                            // Deleting temporary files for by the python script.
                            shell.rm("musique.json");
                            shell.rm("musique.txt");

                        }
                    ).sort({"id": -1}).limit(1);

                })
                .catch(err => {
                    console.error(err.message);
                });
        });
    });
});


/**
 * Retrieving music list
 */
router.get('/list', function (req, res) {
    Music.find(function (err, music) {
        res.render('admin_list', {data: music});
    }).sort({"id": 1});
});


/**
 * Retrieving music by its ID
 */
router.get('/:id', function (req, res) {
    Music.find({id: req.params.id}, function (err, music) {
        res.render('admin_modif', {data: music});
    });
});

/**
 * Edit music
 */
router.post('/put/:id', function (req, res) {
    Music.update({id: req.params.id}, req.body, function (err) {
        if (err) {
            res.send(err);
        }
        res.redirect('/admin/list');
    });
});


/**
 * Remove music
 */
router.post('/del/:id', function (req, res) {
    Music.remove({id: req.params.id}, function (err) {
        if (err) {
            res.send(err);
        }
        res.redirect('/admin/list');
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
    var res = capitalizeFirstLetter(string);
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
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}


/**
 * Allows to replace the special characters of a string
 * @param text - string - the text to be formatted
 * @returns string - the reformatted string
 */
function escapeHtml(text) {
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };

    return text.replace(/[&<>"']/g, function (m) {
        return map[m];
    });
}

module.exports = router;
