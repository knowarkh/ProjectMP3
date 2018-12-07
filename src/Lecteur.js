class Lecteur{
  let soundManager;

  constructor(){
    this.currentTime = 0;
    this.volume = 50;
    this.repeatMode = false;
    this.playlist = new Playlist();
    this.currentUser = undefined;
    //TODO soundManager gestion
  }
}

Lecteur.prototype = (function(){
  //private
  let drawSpectrum(){

  };

  let drawMusicTime(){

  };

  let drawMusicData(){
    let currentMusic = this.playlist.getCurrentMusic();
    if(currentMusic != null){
      document.getElementsByClass("visuel")[0].style.background = "url(http://localhost"+ currentMusic.pathMP3+")";
      document.getElementsByClass("artiste")[0].innerHTML = currentMusic.artistName;
      document.getElementsByClass("titre")[0].innerHTML = currentMusic.title;
      document.getElementsByClass("total")[0].innerHTML = currentMusic.duration;
      document.getElementsByClass("nb-lectures")[0].innerHTML = currentMusic.numberView;
      document.getElementsByClass("nb-commentaires")[0].innerHTML = currentMusic.numberComment;
      document.getElementsByClass("like")[0].innerHTML = currentMusic.numberLike;
      document.getElementsByClass("nb-commentaires")[0].innerHTML = currentMusic.numberComment;
      document.getElementsByClass("nb-commentaires")[0].innerHTML = currentMusic.numberComment;
    }

  };

  let repaint = function(){
    drawSpectrum();
    drawMusicData();
  };



//public
  return {
    constructor : Lecteur,
    setVolume:function(newVolume){
      this.volume = newVolume;
    },
    play_pause:function(){
      let currentMusic = this.playlist.getCurrentMusic();
      if(currentMusic != null){
        //If it loaded and played or paused
        if(currentMusic.playstate){
          let playButton = document.getElementsByClass("play-pause")[0];
          if(currentMusic.paused){
            currentMusic.resume();
            playButton.classList.remove("pause");
            playButton.classList.add("play");
          }//If it's played
          else{
            currentMusic.pause();
            playButton.classList.remove("play");
            playButton.classList.add("pause");
          }
        }

      }else{
        console.error("No music into the playlist !");
      }

    },
    like:function(){
      //TODO faire une vraie réponse
      requestPost("/fasma/addLike", {id : this.playlist.getCurrentMusic().id},console.log);
      drawMusicData();
    },
    addComment:function(){
      //TODO faire une vraie réponse
      requestPost("/fasma/addLikeComment", {
        id : this.playlist.getCurrentMusic().id,
        comment : "test comment"},console.log);
      drawMusicData();
    },
    share:function(){

    },
    showVolume:function(){

    },
    goTo:function(newPosition){
        this.currentTime = newPosition;
        this.playlist.getCurrentMusic().setPosition(newPosition);
    }
  }
})();
