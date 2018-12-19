var test = require('../../src/Music.js');

describe('Music.js', function() {
    it('should be invalid if style isn\'t in the music', function() {
      var test_music = JSON.stringify({
        "album" : "Origins",
        "artiste" : "Imagine Dragons",
        "cover" : "/src/cover.png",
        "duree" : "390",
        "cheminMP3" : "src/music/zero.mp3",
        "titre" : "Zero",
        "listePoint" : ["1","23","66",83,1,23,11,85,24,98],
        "nbEcoute" : "1232434",
        "nbLike" : "86342",
        "nbPartage" : "43526",
        "genre" : ["rock alternatif"],
        "annee" : "2015"
      });
        var m = new test.Music(test_music);

        expect(m.hasStype("rock alternatif")).to.be.true;

    });
});
