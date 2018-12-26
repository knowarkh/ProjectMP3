
class Connexion{
    /**
     * Will process a get request to the URL and applied the callback at the end of the request
     * @param url {string} - target of the request
     * @param callback {function} - function which be used at the end of the request
     */
    static requestGet(url, callback){
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            //     if (this.readyState == 4 && this.status == 200) {

            if(this.readyState == 4 && this.status == 200){
                callback(this.responseText);
            }
        };

        xhttp.open("GET", url, true);
        xhttp.send();
    }

    /**
     * Will process a get request to the URL and applied the callback at the end of the request
     * @param url {string} - target of the request
     * @param values {JSON} - value as JSON format which be send to the server
     * @param callback {function} - function which be used at the end of the request
     */
    static requestPost(url, values, callback){
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                callback(this.responseText);
            }
        };

        xhttp.open("POST", url, true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(values);
    }

    /**
     * Return all the musics of the database
     * @param callback {function} - function which be called at the end of the request
     */
    static getAllMusics(callback){
        this.requestGet("http://localhost:3000/music/find",callback);
    }

    /**
     * Return the music which match with the given id
     * @param id {int} - id of the wanted music
     * @param callback {function} - function which be called at the end of the request
     */
    static getMusicById(id,callback){
        this.requestGet("http://localhost:3000/music/find/id/"+id, callback);
    };

    /**
     * Return the musics which match with the given title
     * @param title {String} - Title of the wanted musics
     * @param callback {function} - function which be called at the end of the request
     */
    static getMusicByTitle(title, callback){
        this.requestGet("http://localhost:3000/music/find/title/"+title, callback);
    }

    /**
     * Return the musics which match with the given artist's name
     * @param artistName {String} - Name of the wanted artist
     * @param callback {function} - function which be called at the end of the request
     */
    static getMusicByArtist(artistName, callback){
        this.requestGet("http://localhost:3000/music/find/artiste/"+artistName, callback);
    }

    /**
     * Return the musics which match with the given album's name
     * @param albumName {String} - Name of the wanted album
     * @param callback {function} - function which be called at the end of the request
     */
    static getMusicByAlbum(albumName, callback){
        this.requestGet("http://localhost:3000/music/find/album/"+albumName, callback);
    }

    /**
     * Return the musics which match with the given genre's name
     * @param genreName {String} - Name of the wanted genre
     * @param callback {function} - function which be called at the end of the request
     */
    static getMusicByGenre(genreName, callback){
        this.requestGet("http://localhost:3000/music/find/genre/"+genreName, callback);
    }

    /**
     * Return the musics which match with the given year
     * @param year {int} - Value of the wanted year
     * @param callback {function} - function which be called at the end of the request
     */
    static getMusicByYear(year, callback){
        this.requestGet("http://localhost:3000/music/find/annee/"+year, callback);
    }

    /**
     * Will add a like to the music with the given id and execute the callback
     * @param idMusic {int} - Id of the current targeted
     * @param callback {function} - function which be call after the request
     */
    static addLike(idMusic, callback){
        this.requestPost("http://localhost:3000/music/maj/like/"+idMusic, JSON.parse("{id: idMusic}"), callback);
    };

    /**
     * Will add 1 to the number of share of the music with the given id and execute the callback
     * @param idMusic {int} - Id of the current targeted
     * @param callback {function} - function which be call after the request
     */
    static addNumberOfShare(idMusic, callback){
        this.requestPost("http://localhost:3000/music/maj/share/"+idMusic, JSON.parse("{id: idMusic}"), callback);
    }
}
