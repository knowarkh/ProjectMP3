class Lecteur {
    //let soundManager;

    constructor() {//TODO ajouter json de musique, on créer une première musique pour instanciation
        this.currentTime = 0;
        this.volume = 50;
        this.repeatMode = false;
        this.playlist = new Playlist();
        this.currentUser = undefined;
        //TODO soundManager gestion

        this.setListener();
    }

    //private
    drawSpectrum() {
        createWaveForm(this.playlist.getCurrentMusic().listPoints);
    }

    drawMusicTime() {

    }

    drawMusicData() {
        let currentMusic = this.playlist.getCurrentMusic();
        if (currentMusic != null) {
            document.getElementsByClassName("visuel")[0].style.background = "url(../images/" + currentMusic.coverPath + ")";
            document.getElementsByClassName("artiste")[0].innerHTML = currentMusic.artistName;
            document.getElementsByClassName("titre")[0].innerHTML = currentMusic.title;
            document.getElementsByClassName("total")[0].innerHTML = currentMusic.duration;
            document.getElementsByClassName("nb-lectures")[0].innerHTML = currentMusic.numberView;
            document.getElementsByClassName("nb-commentaires")[0].innerHTML = currentMusic.numberComment;
            document.getElementsByClassName("like")[0].innerHTML = currentMusic.numberLike;
        }

    }

    repaint() {
        this.drawSpectrum();
        this.drawMusicData();
    }


    setListener() {
        document.getElementsByClassName("prev")[0].addEventListener("click", function () {
            this.playlist.previous();
            this.sound = null;
        }.bind(this));
        document.getElementsByClassName("next")[0].addEventListener("click", function () {
            this.playlist.next();
            this.sound = null;
        }.bind(this));
        document.getElementsByClassName("play-pause")[0].addEventListener("click", this.play_pause.bind(this));

        document.getElementsByClassName("volume")[0].addEventListener("click", this.showVolume.bind(this));

        document.getElementsByClassName("like")[0].addEventListener("click", this.like.bind(this));

        document.getElementsByClassName("share")[0].addEventListener("click", this.share.bind(this));
    }
}

Lecteur.prototype.setVolume = function (newVolume) {
    this.volume = newVolume;
};

Lecteur.prototype.play_pause = function () {
    let currentMusic = this.playlist.getCurrentMusic();

    if (currentMusic != null) {
        let playButton = document.getElementsByClassName("play-pause")[0];
        if (this.sound == null) {
            this.sound = soundManager.createSound({
                id: currentMusic['title'] + "-" + currentMusic['artistName'], // Id arbitraire : piste0, piste1, etc.
                url: currentMusic['musicPath']
            });
            this.sound.play();
            playButton.classList.remove("play");
            playButton.classList.add("pause");
            return null;
        }
        if ( this.sound.playState) {
            //If it loaded and played or paused
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

    } else {
        console.error("No music into the playlist !");
    }

};

Lecteur.prototype.like = function () {
    //TODO faire une vraie réponse
    requestPost("/fasma/addLike", {id: this.playlist.getCurrentMusic().id}, console.log);
    this.drawMusicData();
};

Lecteur.prototype.addComment = function () {
    //TODO faire une vraie réponse
    requestPost("/fasma/addLikeComment", {
        id: this.playlist.getCurrentMusic().id,
        comment: "test comment"
    }, console.log);
    this.drawMusicData();
};

Lecteur.prototype.share = function () {

};

Lecteur.prototype.showVolume = function () {

};

Lecteur.prototype.goTo = function (newPosition) {
    this.currentTime = newPosition;
    this.playlist.getCurrentMusic().setPosition(newPosition);
};

Lecteur.prototype.addMusic = function (musicJson) {
    let firstMusic = this.playlist.getCurrentMusic() == null;

    this.playlist.addMusic(musicJson);
    if (firstMusic) {
        this.repaint();
    }
};


