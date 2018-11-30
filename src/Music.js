class Music {

    constructor(jsonFile){
        let data = JSON.parse(jsonFile);

        this.album = data.album;
        this.artistName = data.artiste;        
        this.coverPath = date.cover;
        this.duration = Number(data.duree);
        this.pathMP3 = data.cheminMP3;
        this.title = data.titre;
        this.listPoints = data.listePoint.map(function(e){return Number(e);});
        this.numberView = Number(data.nbEcoute);
        this.numberLike = Number(data.nbLike);
        this.numberShare = Number(data.nbPartage);
        this.style = data.genre;
        this.year = Number(data.annee);
    }

}
