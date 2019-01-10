/**
 * Class will do every music based actions
 */
class Player {
    //let soundManager;

    constructor() {
        this.currentTime = 0;
        this.volume = 50;
        this.repeatMode = false;
        this.playlist = new Playlist();
        this.currentUser = undefined;
        this.sound = null;

        this.setListener();
    }

    /** Private functions */

    /**
     * Will colorize to the current point of playing
     */
    colorWaveToCurrentPos() {
        let hasBeenHoverBack = false;
        let waveform = document.querySelectorAll(".audioplayer .waveform .sprectrumContainer");
        let barPosition = Math.ceil(this.sound.position / this.sound.duration * waveform[0].childElementCount);

        let bar_up;
        let bar_bottom;

        for (let position = 0; position <= barPosition; position++) {
            bar_up = waveform[0].children[position];
            bar_bottom = waveform[1].children[position];

            //Check if the new position get the "hover-front" class, remove it
            if (bar_up.classList.contains("hover-front") || bar_bottom.classList.contains("hover-front")) {
                bar_up.classList.remove("hover-front");
                bar_bottom.classList.remove("hover-front");
            }

            bar_up.classList.add("played");
            bar_bottom.classList.add("played");

            //Check if a "hover-back" class is set
            if (bar_up.classList.contains("hover-back") || bar_bottom.classList.contains("hover-back"))
                hasBeenHoverBack = true;

            //If one of the bar get the "hover-back" class, add it to all next bars
            if (hasBeenHoverBack)
                if (!bar_up.classList.contains("hover-back") && !bar_bottom.classList.contains("hover-back")) {
                    bar_bottom.classList.add("hover-back");
                    bar_up.classList.add("hover-back");
                }
        }
    }


    /**
     * Will colorize to the current point of playing of the hovered point
     * @param pos {int} number of the bar hovered
     */
    colorWaveToHoverPos(pos) {
        let waveform = document.querySelectorAll(".audioplayer .waveform .sprectrumContainer");
        let barPosition;
        if (this.sound == null) {
            barPosition = 0;
        } else {
            barPosition = Math.ceil(this.sound.position / this.sound.duration * waveform[0].childElementCount);
        }
       if (barPosition <= pos) {
            for (let position = barPosition + 1; position <= pos; position++) {
                waveform[0].children[position].classList.add("hover-front");
                waveform[1].children[position].classList.add("hover-front");
            }
        } else { //TODO trouver la raison de ce bug >.<
            for (let position = pos; position <= barPosition; position++) {
                waveform[0].children[position].classList.add("hover-back");
                waveform[1].children[position].classList.add("hover-back");
            }
        }

    }

    /**
     * Will remove the class "played" of all bars of the waveform
     */
    clearColorWave() {
        for (let elem of document.querySelectorAll(".audioplayer .bar-up ,.audioplayer .bar-down")) {
            elem.classList.remove("played");
            elem.classList.remove("hover-front");
            elem.classList.remove("hover-back");
        }
    }

    clearColorHoverWave() {
        for (let elem of document.querySelectorAll(".audioplayer .bar-up.hover-front, .audioplayer .bar-up.hover-back , .audioplayer .bar-down.hover-front, .audioplayer .bar-down.hover-back")) {
            elem.classList.remove("hover-front");
            elem.classList.remove("hover-back");
        }
    }

    /**
     * Will draw the waveform at this position
     */
    drawSpectrum() {
        this.clearColorWave();

        if(this.sound != null){
            let barPositionPercentil = this.sound.position / this.sound.duration;

            createWaveForm(this.playlist.getCurrentMusic().listPoints, barPositionPercentil);
        }else{
            createWaveForm(this.playlist.getCurrentMusic().listPoints);
        }

        for (let elem of document.querySelectorAll(".audioplayer .bar-up , .audioplayer .bar-down")) {
            elem.addEventListener("click", function (target) {
                this.clearColorWave();
                this.goTo(Number(target.target.attributes.data_position.value));
            }.bind(this));
            elem.addEventListener("mouseover", function (target) {
                this.colorWaveToHoverPos(Number(target.target.attributes.data_position.value));
            }.bind(this));
            elem.addEventListener("mouseout", this.clearColorHoverWave.bind(this));
        }
    }

    /**
     * Will draw current time of the current music each second
     */
    drawMusicTime() {
        if (this.sound != null) {
            document.querySelector(".audioplayer .en-cours").innerHTML = miliSecondsToReadableTime(this.sound.position);

            this.colorWaveToCurrentPos();
        }
    }

    /**
     * Draw all information about the music, called when the music is loaded
     */
    drawMusicData() {
        let currentMusic = this.playlist.getCurrentMusic();
        if (currentMusic != null) {
            document.querySelector(".audioplayer .visuel").style.background = "url(" + currentMusic.coverPath + ")";
            document.querySelector(".audioplayer .artiste").innerHTML = currentMusic.artistName;
            document.querySelector(".audioplayer .titre").innerHTML = currentMusic.title;
            document.querySelector(".audioplayer .total").innerHTML = secondsToReadableTime(currentMusic.duration);
            document.querySelector(".audioplayer .nb-lectures").innerHTML = currentMusic.numberView;
            document.querySelector(".audioplayer .nb-commentaires").innerHTML = currentMusic.numberComment;
            document.querySelector(".audioplayer .like").innerHTML = currentMusic.numberLike;
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
        document.querySelector(".audioplayer .prev").addEventListener("click", function () {
            this.playlist.previous();

            if (this.sound != null) {
                this.sound.stop();
                this.sound.unload();
                this.sound = null;
            }

            this.repaint();
            this.play_pause();
        }.bind(this));
        document.querySelector(".audioplayer .next").addEventListener("click", this.next.bind(this));

        document.querySelector(".audioplayer .play-pause").addEventListener("click", this.play_pause.bind(this));

        document.querySelector(".audioplayer .like").addEventListener("click", this.like.bind(this));

        document.querySelector(".audioplayer .share").addEventListener("click", this.share.bind(this));

        document.querySelector(".audioplayer .controls .volume .volume_button").addEventListener("click", this.mute.bind(this));

        document.querySelector(".audioplayer .controls .volume").addEventListener("mouseover", this.volumeMouseOver.bind(this));

        document.querySelector(".audioplayer .controls .volume").addEventListener("mouseout", this.volumeMouseOut.bind(this));

        document.querySelector(".audioplayer .controls .volume input[type=range].volume-input-range").addEventListener("input", this.targetVolume.bind(this));

        window.addEventListener("resize", this.drawSpectrum.bind(this));
    }
}

/**
 * Set the new volume
 * @param {int} newVolume
 */
Player.prototype.setVolume = function (newVolume) {
    this.volume = newVolume;
    if (this.sound !== null) {
        this.sound.setVolume(newVolume);
    }
};

/**
 *  Use to set on play or on pause state the current music, if no current music is null, create it and launch it if
 *  possible
 */
Player.prototype.play_pause = function () {
    let currentMusic = this.playlist.getCurrentMusic();

    //If not undefined
    if (currentMusic != null) {
        let playButton = document.querySelector(".audioplayer .play-pause");

        //If don't have any current sound in play
        if (this.sound == null) {
            //Reset the waveform color in case of a new music
            this.clearColorWave();

            //Create a new Sound
            this.sound = soundManager.createSound({
                id: currentMusic['title'] + "-" + currentMusic['artistName'], // Id arbitraire : piste0, piste1, etc.
                url: currentMusic['musicPath'],
                whileplaying: this.drawMusicTime.bind(this),
                volume: this.volume,
                onfinish: this.next.bind(this)
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
Player.prototype.like = function () {
    //TODO faire une vraie réponse
    Connexion.addLike(this.playlist.getCurrentMusic().id, console.log);

    let likeNumber = document.querySelector(".audioplayer .like");
    likeNumber.innerHTML = Number(likeNumber.innerHTML) + 1;
};

/**
 * Will add a comment to the database, the current screen and add 1 for the number of comments
 */
Player.prototype.addComment = function () {
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
Player.prototype.share = function () {


};

/**
 * Will show the pop-up volume
 */
Player.prototype.volumeMouseOver = function () {
    document.querySelector(".audioplayer .controls .volume").classList.add('is-active');
};

/**
 * Will hide the pop-up volume
 */
Player.prototype.volumeMouseOut = function () {
    document.querySelector(".audioplayer .controls .volume").classList.remove('is-active');
};

/**
 * Will hide the pop-up volume
 * @param e event
 */
Player.prototype.targetVolume = function (e) {
    var min = e.target.min,
        max = e.target.max,
        val = e.target.value;

    e.target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';
};

/**
 * Set the new position of the music and change the CSS of the waveform's bars
 * @param newPosition {int} the position of the cursor when it's click
 */
Player.prototype.goTo = function (newPosition) {
    if (this.sound != null) {
        let pourcentil = (newPosition / document.querySelector(".audioplayer .waveform .sprectrumContainer").childElementCount);
        let newTime = pourcentil * this.sound.duration;
        this.currentTime = newTime / 1000;
        this.sound.setPosition(newTime);
        this.clearColorWave();
        this.colorWaveToCurrentPos();
    }
};

/**
 * Add a music and if this is the first, draw information about this music
 * @param {Music} music
 */
Player.prototype.addMusic = function (music) {
    let firstMusic = this.playlist.getCurrentMusic() == null;

    this.playlist.addMusic(music);
    if (firstMusic) {
        let currentMusic = this.playlist.getCurrentMusic();
        this.sound = soundManager.createSound({
            id: currentMusic['title'] + "-" + currentMusic['artistName'], // Id arbitraire : piste0, piste1, etc.
            url: currentMusic['musicPath'],
            whileplaying: this.drawMusicTime.bind(this),
            volume: this.volume,
            onfinish: this.next.bind(this)
        });
        this.sound.play();
        this.sound.pause();
        this.repaint();
    }
};

/**
 * Toggle the sound or not
 */
Player.prototype.mute = function () {
    let volume = document.querySelector(".audioplayer .controls .volume .volume_button");

    if (volume.classList.contains('volume-on')) {
        volume.classList.remove('volume-on');
        volume.classList.add('volume-off');
        if (this.sound !== null)
            this.sound.setVolume(0);
    }
    else {
        volume.classList.remove('volume-off');
        volume.classList.add('volume-on');
        if (this.sound !== null)
            this.sound.setVolume(this.volume);
    }
};

/**
 * Override the Playlist to add the SoundManager's functions
 */
Player.prototype.next = function () {
    this.playlist.next();
    if (this.sound != null) {
        this.sound.stop();
        this.sound.unload();
        this.sound = null;
    }

    this.play_pause();

    this.repaint();
};
