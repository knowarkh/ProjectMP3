/**
 *
 */
function Music(jsonFile){

    /**
     * Constructor of the Music
     * @param jsonFile - a JSONFile will contains all information about a music. The file must come from a REST request to the database
     */
      let data = jsonFile;

      this.id = Number(data.id);
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
      this.numberComment = Number(data.nbComment);
      this.style = data.genre;
      this.year = Number(data.annee);


}

Music.prototype.hasStype = function(style){
  return this.style.includes(style);
};
