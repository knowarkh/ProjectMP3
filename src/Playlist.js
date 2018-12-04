class Playlist {
  constructor(){
    this.musicList = [];
    this.currentPosition = 0;
    this.currentMusic = null;
  }
}

Playlist.prototype.setCurrentPosition = function(newPosition){
  if(newPosition < this.musicList.length && newPosition >= 0){
    this.currentPosition = newPosition;
    this.currentMusic = this.musicList[newPosition];
  }
}

Playlist.prototype.getCurrentPosition = function(){
  return this.currentPosition;
}

Playlist.prototype.getCurrentMusic = function(){
  return this.currentMusic;
}

Playlist.prototype.getMusic = function(position){
  if(this.musicList[position] != null){
    return this.musicList[position];
  }else{
    return null;
  }
}

Playlist.prototype.addMusic = function(music){
  if(this.currentMusic == null)
    this.currentMusic = music;
  this.musicList.push(music);
}

Playlist.prototype.removeMusicByMusic = function(music){
  if(this.musicList.includes(music) && music != this.currentMusic){
    if(this.musicList.indexOf(music) < this.currentPosition)
      this.currentPosition--;
    this.musicList.splice(this.musicList.indexOf(music),1);
    return true;
  }else{return false;}
}

Playlist.prototype.removeMusicByPosition = function(position){
  if(this.musicList[position] != null && this.musicList[position] != this.currentMusic){
    if(position < this.currentPosition)
      this.currentPosition--;
    this.musicList.splice(position,1);
    return true;
  }else{return false;}
}


Playlist.prototype.next = function(){
  if(this.currentPosition < this.musicList.length -1){
    this.currentPosition++;
    this.currentMusic = this.musicList[this.currentPosition];
  }
}

Playlist.prototype.previous = function(){
  if(this.currentPosition > 0){
    this.currentPosition--;
    this.currentMusic = this.musicList[this.currentPosition];
  }
}

var test_playlist1 = JSON.stringify({
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

var test_playlist2 = JSON.stringify({
  "album" : "One More Light",
  "artiste" : "Linkin Park",
  "cover" : "/src/cover.png",
  "duree" : "396",
  "cheminMP3" : "src/music/battle_symphony.mp3",
  "titre" : "Battle Symphony",
  "listePoint" : ["1","23","66",83,1,23,11,85,24,98],
  "nbEcoute" : "1232434",
  "nbLike" : "86342",
  "nbPartage" : "43526",
  "genre" : ["alternatif"],
  "annee" : "2017"
});

var m1 = new Music(test_playlist1);
var m2 = new Music(test_playlist2);
var play = new Playlist();
play.addMusic(m1);
play.addMusic(m2);
