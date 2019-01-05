/**
 * Class used to control the playlist and the music
 */
class Playlist {
  constructor(){
    this.musicList = [];
    this.currentPosition = 0;
    this.currentMusic = null;
  }
}

/**
 * Put the new position of the current music in the playlist
 * @param {int} newPosition - The new position of the current music
 */
Playlist.prototype.setCurrentPosition = function(newPosition){
  if(newPosition < this.musicList.length && newPosition >= 0){
    this.currentPosition = newPosition;
    this.currentMusic = this.musicList[newPosition];
  }
};

/**
 * Get the current position of the playlist
 * @returns {Music} - the current position of the playlist
 */
Playlist.prototype.getCurrentPosition = function(){
  return this.currentPosition;
};

/**
 * Get the current Music
 * @returns {Music} - the current Music
 */
Playlist.prototype.getCurrentMusic = function(){
  return this.currentMusic;
};

/**
 * Get a Music with a position to the playlist
 * @param position - int - Position into the playlist
 * @returns {Music} - Music object
 */
Playlist.prototype.getMusic = function(position){
  if(this.musicList[position] != null){
    return this.musicList[position];
  }else{
    return null;
  }
};

/**
 * Add a Music to the playlist
 * @param  music - {Music} object
 */
Playlist.prototype.addMusic = function(music){
  if(this.currentMusic == null)
    this.currentMusic = music;
  this.musicList.push(music);
};

/**
 * Remove a music with the Music given
 * @param music - Music to remove
 * @returns {boolean} - true if success, else otherwise
 */
Playlist.prototype.removeMusicByMusic = function(music){
  if(this.musicList.includes(music) && music !== this.currentMusic){
    if(this.musicList.indexOf(music) < this.currentPosition)
      this.currentPosition--;
    this.musicList.splice(this.musicList.indexOf(music),1);
    return true;
  }else{return false;}
};

/**
 * Remove a music with the position into the playlist
 * @param position - position to remove
 * @returns {boolean} - true if success, else otherwise
 */
Playlist.prototype.removeMusicByPosition = function(position){
  if(this.musicList[position] != null && this.musicList[position] !== this.currentMusic){
    if(position < this.currentPosition)
      this.currentPosition--;
    this.musicList.splice(position,1);
    return true;
  }else{return false;}
};

/**
 * Change if possible the current position for currentPosition + 1
 */
Playlist.prototype.next = function(){
  if(this.currentPosition < this.musicList.length -1){
    this.currentPosition++;
  }else{
      this.currentPosition = 0;
  }
    this.currentMusic = this.musicList[this.currentPosition];
};

/**
 * Change if possible the current position for currentPosition - 1
 */
Playlist.prototype.previous = function(){
  if(this.currentPosition > 0){
    this.currentPosition--;
    this.currentMusic = this.musicList[this.currentPosition];
  }
};