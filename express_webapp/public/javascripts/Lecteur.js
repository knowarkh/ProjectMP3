/**
 * Class will do every music based actions
 */
class Lecteur {
    //let soundManager;

    constructor() {//TODO ajouter json de musique, on créer une première musique pour instanciation
        this.currentTime = 0;
        this.volume = 50;
        this.repeatMode = false;
        this.playlist = new Playlist();
        this.currentUser = undefined;
        this.sound = null;
        //TODO soundManager gestion

        this.setListener();
    }

    /** Private functions */

    /**
     * Will draw the waveform at this position
     */
    drawSpectrum() {
        createWaveForm(this.playlist.getCurrentMusic().listPoints);
    }

    /**
     * Will draw current time of the current music each second
     */
    drawMusicTime() {
        if (this.sound != null)
            document.getElementsByClassName("en-cours")[0].innerHTML = miliSecondsToReadableTime(this.sound.position);

    }

    /**
     * Draw all information about the music, called when the music is loaded
     */
    drawMusicData() {
        let currentMusic = this.playlist.getCurrentMusic();
        if (currentMusic != null) {
            document.getElementsByClassName("visuel")[0].style.background = "url(../images/" + currentMusic.coverPath + ")";
            document.getElementsByClassName("artiste")[0].innerHTML = currentMusic.artistName;
            document.getElementsByClassName("titre")[0].innerHTML = currentMusic.title;
            document.getElementsByClassName("total")[0].innerHTML = secondsToReadableTime(currentMusic.duration);
            document.getElementsByClassName("nb-lectures")[0].innerHTML = currentMusic.numberView;
            document.getElementsByClassName("nb-commentaires")[0].innerHTML = currentMusic.numberComment;
            document.getElementsByClassName("like")[0].innerHTML = currentMusic.numberLike;
        }

    }

    /**
     * Call functions of "first" draw when a new music is loaded
     */
    repaint() {
        this.drawSpectrum();
        this.drawMusicData();
    }

    /**
     * Set all listeners of each actions
     */
    setListener() {
        document.getElementsByClassName("prev")[0].addEventListener("click", function () {
            this.playlist.previous();
            this.sound.stop();
            this.sound.unload();
            this.sound = null;
            this.play_pause();
        }.bind(this));
        document.getElementsByClassName("next")[0].addEventListener("click", function () {
            this.playlist.next();
            this.sound.stop();
            this.sound.unload();
            this.sound = null;
            this.play_pause();
        }.bind(this));
        document.getElementsByClassName("play-pause")[0].addEventListener("click", this.play_pause.bind(this));

        document.getElementsByClassName("volume")[0].addEventListener("click", this.showVolume.bind(this));

        document.getElementsByClassName("like")[0].addEventListener("click", this.like.bind(this));

        document.getElementsByClassName("share")[0].addEventListener("click", this.share.bind(this));

        window.addEventListener("resize", this.drawSpectrum.bind(this));
    }
}

/**
 * Set the new volume
 * @param {int} newVolume
 */
Lecteur.prototype.setVolume = function (newVolume) {
    this.volume = newVolume;
};

/**
 *  Use to set on play or on pause state the current music, if no current music is null, create it and launch it if
 *  possible
 */
Lecteur.prototype.play_pause = function () {
    let currentMusic = this.playlist.getCurrentMusic();

    //If not undefined
    if (currentMusic != null) {
        let playButton = document.getElementsByClassName("play-pause")[0];

        //If don't have any current sound in play
        if (this.sound == null) {
            //Create a new Sound
            this.sound = soundManager.createSound({
                id: currentMusic['title'] + "-" + currentMusic['artistName'], // Id arbitraire : piste0, piste1, etc.
                url: currentMusic['musicPath'],
                whileplaying: this.drawMusicTime.bind(this)
            });
            this.sound.play();
            playButton.classList.remove("play");
            playButton.classList.add("pause");
        }
        //If a Sound is already set
        else {
            //If it loaded and played or paused
            if (this.sound.playState) {
                if (this.sound.paused) {
                    this.sound.resume();
                    playButton.classList.remove("play");
                    playButton.classList.add("pause");
                }//If it's played
                else {
                    this.sound.pause();
                    playButton.classList.remove("pause");
                    playButton.classList.add("play");
                }
            }
        }


    } else {
        console.error("No music into the playlist !");
    }

};

/**
 * Will add a like to the database and add 1 to the number of like show
 */
Lecteur.prototype.like = function () {
    //TODO faire une vraie réponse
    requestPost("/fasma/addLike", {id: this.playlist.getCurrentMusic().id}, console.log);
    this.drawMusicData();
};

/**
 * Will add a comment to the database, the current screen and add 1 for the number of comments
 */
Lecteur.prototype.addComment = function () {
    //TODO faire une vraie réponse
    requestPost("/fasma/addLikeComment", {
        id: this.playlist.getCurrentMusic().id,
        comment: "test comment"
    }, console.log);
    this.drawMusicData();
};

/**
 * Will create and give a embed version of the player
 */
Lecteur.prototype.share = function () {

};

/**
 * Will show the pop-up volume and allow to set the new volume
 */
Lecteur.prototype.showVolume = function () {

};

/**
 * Set the new position of the music and change the CSS of the waveform's bars
 * @param newPosition {int} the position of the cursor when it's click
 */
Lecteur.prototype.goTo = function (newPosition) {
    this.currentTime = newPosition;
    this.playlist.getCurrentMusic().setPosition(newPosition);
};

/**
 * Add a music and if this is the first, draw information about this music
 * @param {Music} music
 */
Lecteur.prototype.addMusic = function (music) {
    let firstMusic = this.playlist.getCurrentMusic() == null;

    this.playlist.addMusic(music);
    if (firstMusic) {
        this.repaint();
    }
};


