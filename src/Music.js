class Music extends SMSound{

    constructor(jsonFile){
      super();
      let data = JSON.parse(jsonFile);

      this.url = data.cheminMP3;

      this.album = data.album;
      this.artistName = data.artiste;
      this.coverPath = data.cover;
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

Music.prototype.whileplaying = function(){
  let  act_sec = parseInt(this.position / 1000 % 60, 10); // Calcul du nb de secondes écoulées
  if (act_sec < 10) {
      act_sec = "0" + act_sec;
  } // (Ajout d'un 0 si <10)
  let act_min = parseInt(this.position / 1000 / 60, 10); // Calcul du nb de minutes écoulées
  let tot_sec = parseInt(this.duration / 1000 % 60, 10); // Calcul du nb de secondes total du son
  if (tot_sec < 10) {
      tot_sec = "0" + tot_sec;
  } // (Ajout d'un 0 si <10)
  let tot_min = parseInt(this.duration / 1000 / 60, 10); // Calcul du nb de minutes total du son
  document.getElementsByClass("en-cours")[0].innerHTML = act_min + ":" + act_sec;
  document.getElementsByClass("total")[0].innerHTML =  tot_min + ":" + tot_sec;
  //TODO volume
  //vol.title = "Volume : " + act_vol; // On ajuste aussi le title du volume
}

Music.prototype.onfinish = function(){
  this.unload();
  
}


Music.prototype.hasStype = function(style){
  return this.style.includes(style);
}

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

exports.Music = Music.prototype;
