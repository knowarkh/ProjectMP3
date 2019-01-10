// Data Base Connection
var mongoose = require('mongoose');
var options = {
    server: {socketOptions: {keepAlive: 300000, connectTimeoutMS: 30000}},
    replset: {socketOptions: {keepAlive: 300000, connectTimeoutMS: 30000}}
};
var urlmongo = "mongodb://localhost:27017/player";
mongoose.connect(urlmongo, options);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erreur lors de la connexion'));
db.once('open', function () {
    // console.log("Connexion à la base OK");
});

var musicSchema = mongoose.Schema({
    id: {type: Number, required: true},
    titre: {type: String, required: true},
    album: String,
    artiste: String,
    cheminMP3: {type: String, required: true},
    cover: String,
    annee: Number,
    duree: {type: Number, required: true},
    genre: [String],
    listePoint: [Number],
    nbEcoute: Number,
    nbLike: Number,
    nbPartage: Number,
    nbComment: Number
});

var Musique = mongoose.model('Music', musicSchema);

module.exports.Musique = Musique;
