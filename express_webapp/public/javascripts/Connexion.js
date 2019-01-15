function Connexion() {}

/**             Request constructor              */

/**
 * Will process a get request to the URL and applied the callback at the end of the request
 * @param url {string} - target of the request
 * @param callback {function} - function which be used at the end of the request
 */
Connexion.prototype.requestGet = function (url, callback) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        //     if (this.readyState == 4 && this.status == 200) {

        if (this.readyState == 4 && this.status == 200) {
            callback(this.responseText);
        }
    };
    //xhttp.setRequestHeader("Access-Control-Allow-Origin","");
    xhttp.open("GET", url, true);
    xhttp.send();
};

/**
 * Will process a get request to the URL and applied the callback at the end of the request
 * @param url {string} - target of the request
 * @param values {JSON} - value as JSON format which be send to the server
 * @param callback {function} - function which be used at the end of the request
 */
Connexion.prototype.requestPost = function (url, values, callback) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callback(this.responseText);
        }
    };

    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhttp.send(values);
};

/**
 * Will process a get request to the URL and applied the callback at the end of the request
 * @param url {string} - target of the request
 * @param values {JSON} - value as JSON format which be send to the server
 * @param callback {function} - function which be used at the end of the request
 */
Connexion.prototype.requestPut = function (url, values, callback) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callback(this.responseText);
        }
    };

    xhttp.open("PUT", url, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhttp.send(values);
};

/**             Request GET part                 */


/**
 * Return all the musics of the database
 * @param callback {function} - function which be called at the end of the request
 */
Connexion.prototype.getAllMusics = function (callback) {
    this.requestGet("http://localhost:3000/music/findAll", callback);
};

/**
 * Return the music which match with the given id
 * @param id {int} - id of the wanted music
 * @param callback {function} - function which be called at the end of the request
 */
Connexion.prototype.getMusicById = function (id, callback) {
    this.requestGet("http://localhost:3000/music/find/music/id/" + id, callback);
};

/**
 * Return the musics which match with the given title
 * @param title {String} - Title of the wanted musics
 * @param callback {function} - function which be called at the end of the request
 */
Connexion.prototype.getMusicByTitle = function (title, callback) {
    this.requestGet("http://localhost:3000/music/find/music/title/" + title, callback);
};

/**
 * Return the musics which match with the given artist's name
 * @param artistName {String} - Name of the wanted artist
 * @param callback {function} - function which be called at the end of the request
 */
Connexion.prototype.getMusicByArtist = function (artistName, callback) {
    this.requestGet("http://localhost:3000/music/find/music/artiste/" + artistName, callback);
};

/**
 * Return the musics which match with the given album's name
 * @param albumName {String} - Name of the wanted album
 * @param callback {function} - function which be called at the end of the request
 */
Connexion.prototype.getMusicByAlbum = function (albumName, callback) {
    this.requestGet("http://localhost:3000/music/find/music/album/" + albumName, callback);
};

/**
 * Return the musics which match with the given genre's name
 * @param genreName {String} - Name of the wanted genre
 * @param callback {function} - function which be called at the end of the request
 */
Connexion.prototype.getMusicByGenre = function (genreName, callback) {
    this.requestGet("http://localhost:3000/music/find/music/genre/" + genreName, callback);
};

/**
 * Return the musics which match with the given year
 * @param year {int} - Value of the wanted year
 * @param callback {function} - function which be called at the end of the request
 */
Connexion.prototype.getMusicByYear = function (year, callback) {
    this.requestGet("http://localhost:3000/music/find/music/annee/" + year, callback);
};

/**
 * Return the playlist which match with the given id
 * @param id {int} - Value of the id
 * @param callback {function} - function which be called at the end of the request
 */
Connexion.prototype.getPlaylistById = function(id, callback){
    this.requestGet("http://localhost:3000/music/find/playlist/id/" + id, callback);
};

/**
 * Return the playlist which match with the given name
 * @param name {string} - Value of the id
 * @param callback {function} - function which be called at the end of the request
 */
Connexion.prototype.getPlaylistByName = function(name, callback){
    this.requestGet("http://localhost:3000/music/find/playlist/name/" + name, callback);
};


/**             Request PUT part             */

/**
 * Will add a like to the music with the given id and execute the callback
 * @param idMusic {int} - Id of the current targeted
 * @param callback {function} - function which be call after the request
 */
Connexion.prototype.addLike = function (idMusic, callback) {
    this.requestPut("http://localhost:3000/music/maj/like/" + idMusic, null, callback);
};

/**
 * Will remove a like to the music with the given id and execute the callback
 * @param idMusic {int} - Id of the current targeted
 * @param callback {function} - function which be call after the request
 */
Connexion.prototype.removeLike = function (idMusic, callback) {
    this.requestPut("http://localhost:3000/music/maj/removeLike/" + idMusic, null, callback);
};

/**
 * Will add 1 to the number of addView of the music with the given id and execute the callback
 * @param idMusic {int} - Id of the current targeted
 * @param callback {function} - function which be call after the request
 */
Connexion.prototype.addNumberOfView = function (idMusic, callback) {
    this.requestPut("http://localhost:3000/music/maj/views/" + idMusic, null, callback);
};

/**
 * Will add 1 to the number of share of the music with the given id and execute the callback
 * @param idMusic {int} - Id of the current targeted
 * @param callback {function} - function which be call after the request
 */
Connexion.prototype.addNumberOfShare = function (idMusic, callback) {
    this.requestPut("http://localhost:3000/music/maj/share/" + idMusic, null, callback);
};

/**
 * Will add the given idMusic to the given playlist into the database
 * @param idPlaylist {int} - id of the wanted playlist
 * @param idMusic {int} - id of the music wanted to add
 * @param callback {function} - function which be call after the request
 */
Connexion.prototype.addMusicToPlaylist = function (idPlaylist, idMusic, callback){
    this.requestPut("http://localhost:3000/music/maj/playlist/add/" + idPlaylist, JSON.parse('{"idMusic" : '+idMusic+'}'), callback);

};

/**
 * Will remove the given idMusic to the given playlist into the database
 * @param idPlaylist {int} - id of the wanted playlist
 * @param idMusic {int} - id of the music wanted to add
 * @param callback {function} - function which be call after the request
 */
Connexion.prototype.removeMusicToPlaylist = function (idPlaylist, idMusic, callback){
    this.requestPut("http://localhost:3000/music/maj/playlist/remove/" + idPlaylist, JSON.parse('{"idMusic" : '+idMusic+'}'), callback);

};

/**         Common part          */

/**
 * Allow to get the id (if exist) of the music put in the url
 * @returns {number}
 */
Connexion.prototype.getIdMusicParam = function(){
    let param = Number(PlayerUtils.getParameterByName("idMusic", window.location));
    param = !isNaN(param)? param : null;
    return param;
};

var Connexion = new Connexion();