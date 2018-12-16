class Music{

    constructor(jsonFile){
      let data = JSON.parse(jsonFile);

      this.album = data.album;
      this.artistName = data.artiste;
      this.coverPath = data.cover;
      this.musicPath = data.cheminMP3;
      this.duration = Number(data.duree);
      this.title = data.titre;
      this.listPoints = data.listePoint.map(function(e){return Number(e);});
      this.numberView = Number(data.nbEcoute);
      this.numberLike = Number(data.nbLike);
      this.numberShare = Number(data.nbPartage);
      this.numberComment = Number(data.nbCommentaire);
      this.style = data.genre;
      this.year = Number(data.annee);
    }

}

Music.prototype.hasStype = function(style){
  return this.style.includes(style);
}

// var test_music = JSON.stringify({
//   "album" : "Origins",
//   "artiste" : "Imagine Dragons",
//   "cover" : "/src/cover.png",
//   "duree" : "390",
//   "cheminMP3" : "src/music/zero.mp3",
//   "titre" : "Zero",
//   "listePoint" : ["1","23","66",83,1,23,11,85,24,98],
//   "nbEcoute" : "1232434",
//   "nbLike" : "86342",
//   "nbPartage" : "43526",
//   "genre" : ["rock alternatif"],
//   "annee" : "2015"
// });

//exports.Music = Music.prototype;
