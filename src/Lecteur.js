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

  let drawMusicData(){

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

    },
    like:function(){

      drawMusicData();
    },
    addComment:function(){

      drawMusicData();
    },
    share:function(){

    },
    showVolume:function(){

    },
    goTo:function(newPosition){

    }

  }
})();
