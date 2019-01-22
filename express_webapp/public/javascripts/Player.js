/**
 * Class will do every music based actions
 */
function Player() {
    //let soundManager;

    let constructor = function () {
        this.currentTime = 0;
        this.volume = Number(document.querySelector(".audioplayer .controls .volume input[type=range].volume-input-range ").value);
        this.repeatMode = false;
        this.playlist = new Playlist();
        this.currentUser = undefined;
        this.sound = null;


        //Check if some information is present into the url
        let idMusicToLoad = Connexion.getIdMusicParam();
        let idPlaylistToLoad = Connexion.getIdPlaylistParam();

        if(idPlaylistToLoad !== 0 && idMusicToLoad !== 0){
            this.addPlaylist(idPlaylistToLoad, idMusicToLoad);
        }else if(idPlaylistToLoad !== 0){
            this.addPlaylist(idPlaylistToLoad);
        }else if(idMusicToLoad !== 0){
            this.addMusicById(idMusicToLoad);
        }

        this.setListener();

        //Use to apply the right color to the background of the input
        let evt = new Event("input");
        document.querySelector(".audioplayer .controls .volume input[type=range].volume-input-range").dispatchEvent(evt);


    }.bind(this);

    /**
     * Create a SoundManagerSound with the currentMusic in the playlist and reload the page
     */
    this.loadMusic = function(){
        if(this.sound !== null){
            this.sound.stop();
            this.sound.unload();

        }

        let currentMusic = this.playlist.getCurrentMusic();
        
        if(soundManager.getSoundById(currentMusic.title+"-"+currentMusic.artistName) !== undefined){
            this.sound = soundManager.getSoundById(currentMusic.title+"-"+currentMusic.artistName);
            this.sound.setVolume(this.volume);

        }else{
            this.sound = soundManager.createSound({
                id: currentMusic['title'] + "-" + currentMusic['artistName'], // Id arbitraire : piste0, piste1, etc.
                url: currentMusic['musicPath'],
                whileplaying: this.drawMusicTime.bind(this),
                volume: this.volume,
                onfinish: this.next.bind(this)
            });

        }

        this.sound.play();
        this.sound.pause();
        this.repaint();
    }.bind(this);


    /** Private functions */

    /**
     * Will colorize the current point of playing
     */
    this.colorWaveToCurrentPos = function () {
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
    };


    /**
     * Will colorize the current point of playing of the hovered point
     * @param pos {int} number of the bar hovered
     */

    this.colorWaveToHoverPos = function (pos) {
        let waveform = document.querySelectorAll(".audioplayer .waveform .sprectrumContainer");
        let waveformUp = waveform[0];
        let waveformDown = waveform[1];
        let barPosition;
        if (this.sound == null) {
            barPosition = 0;
        } else {
            barPosition = Math.ceil(this.sound.position / this.sound.duration * waveform[0].childElementCount);
        }
        if (barPosition <= pos) {
            for (let position = barPosition + 1; position <= pos; position++) {
                waveformUp.children[position].classList.add("hover-front");
                waveformDown.children[position].classList.add("hover-front");
            }
        } else {
            for (let position = pos; position <= barPosition; position++) {
                waveformUp.children[position].classList.add("hover-back");
                waveformDown.children[position].classList.add("hover-back");
            }
        }

    };

    /**
     * Will remove the class "played" and "hover" of all bars of the waveform
     */
    this.clearColorWave = function () {
        for (let elem of document.querySelectorAll(".audioplayer .bar-up ,.audioplayer .bar-down")) {
            elem.classList.remove("played");
            elem.classList.remove("hover-front");
            elem.classList.remove("hover-back");
        }
    };

    /**
     * Will remove the class "hover" of all bars of the waveform
     */
    this.clearColorHoverWave = function () {
        for (let elem of document.querySelectorAll(".audioplayer .bar-up.hover-front, .audioplayer .bar-up.hover-back , .audioplayer .bar-down.hover-front, .audioplayer .bar-down.hover-back")) {
            elem.classList.remove("hover-front");
            elem.classList.remove("hover-back");
        }
    };

    /**
     * Will remove the class "spectrumHoverTime" and clear the time
     */
    this.clearHoverTime = function () {
        let currentTime = document.querySelector(".audioplayer .en-cours");
        currentTime.classList.remove("spectrumHoverTime");
        currentTime.innerText = PlayerUtils.milliSecondsToReadableTime(this.sound.position);
    };


    /**
     * Show the current time of the music according to the hovered position of the spectrum and add class "spectrumHoverTime"
     * @param position
     */
    this.drawHoverTime = function (position) {
        let currentTime = document.querySelector(".audioplayer .en-cours");
        let nbBarSpectrum = document.querySelectorAll(".audioplayer .waveform .sprectrumContainer")[0].childElementCount -1;

        if (!currentTime.classList.contains("spectrumHoverTime")) {
            let time = position / nbBarSpectrum * this.sound.duration;
            currentTime.innerText = PlayerUtils.milliSecondsToReadableTime(time);
            currentTime.classList.add("spectrumHoverTime");
        }
    };


    /**
     * Will draw the waveform at this position
     */
    this.drawSpectrum = function () {
        this.clearColorWave();

        if (this.sound != null) {
            let barPositionPercentile = this.sound.position / this.sound.duration;

            createWaveForm(this.playlist.getCurrentMusic().listPoints, barPositionPercentile);
        } else {
            createWaveForm(this.playlist.getCurrentMusic().listPoints);
        }

        for (let elem of document.querySelectorAll(".audioplayer .bar-up , .audioplayer .bar-down")) {
            elem.addEventListener("click", function (target) {
                this.clearColorWave();
                this.goTo(Number(target.target.attributes.data_position.value));
            }.bind(this));
            elem.addEventListener("mouseover", function (target) {
                this.colorWaveToHoverPos(Number(target.target.attributes.data_position.value));
                this.drawHoverTime(Number(target.target.attributes.data_position.value))
            }.bind(this));
            elem.addEventListener("mouseout", function () {
                this.clearColorHoverWave();
                this.clearHoverTime();
            }.bind(this));
        }
    };

    /**
     * Will draw current time of the current music each second
     */
    this.drawMusicTime = function () {
        if (this.sound != null) {

            let currentTime = document.querySelector(".audioplayer .en-cours");
            if (!currentTime.classList.contains("spectrumHoverTime"))
                currentTime.innerText = PlayerUtils.milliSecondsToReadableTime(this.sound.position);

            this.colorWaveToCurrentPos();
        }
    };

    /**
     * Draw all information about the music, called when the music is loaded
     */
    this.drawMusicData = function () {
        let currentMusic = this.playlist.getCurrentMusic();
        if (currentMusic != null) {
            document.querySelector(".audioplayer .visuel").style.background = "url(\"" + currentMusic.coverPath + "\")";
            document.querySelector(".audioplayer .artiste").innerText = currentMusic.artistName;
            document.querySelector(".audioplayer .titre").innerText = currentMusic.title;
            document.querySelector(".audioplayer .total").innerText = PlayerUtils.secondsToReadableTime(currentMusic.duration);
            document.querySelector(".audioplayer .nb-lectures").innerText = currentMusic.numberView;
            document.querySelector(".audioplayer .nb-commentaires").innerText = currentMusic.numberComment;
            document.querySelector(".audioplayer .like").innerText = currentMusic.numberLike;
        }
    };

    /**
     * Call functions of "first" draw when a new music is loaded
     */
    this.repaint = function () {
        this.drawSpectrum();
        this.drawMusicData();
        this.checkCookies();
        this.playlist.repaintPlaylist();
    };

    /**
     * Set all listeners of each actions
     */
    this.setListener = function () {

        window.addEventListener("resize", this.drawSpectrum.bind(this));

        document.querySelector(".audioplayer .prev").addEventListener("click", this.previous.bind(this));
        document.querySelector(".audioplayer .next").addEventListener("click", this.next.bind(this));
        document.querySelector(".audioplayer .play-pause").addEventListener("click", this.play_pause.bind(this));
        document.querySelector(".audioplayer .like").addEventListener("click", this.like.bind(this));
        document.querySelector(".audioplayer .share").addEventListener("click", this.share.bind(this));
        document.querySelector(".audioplayer .controls .volume input[type=range].volume-input-range").addEventListener("input", this.targetVolume.bind(this));

        //Applied a different listener in case of mobile version
        if (window.mobileAndTabletCheck() || PlayerUtils.detectCompactSize()) {
            document.querySelector(".audioplayer .controls .volume .volume_button").addEventListener("click", this.volumeMouseOverCompact.bind(this));
            document.querySelector(".audioplayer .controls .volume .volume_button").addEventListener("click", this.volumeMouseOutCompact.bind(this));
        } else {
            document.querySelector(".audioplayer .controls .volume .volume_button").addEventListener("click", this.mute.bind(this));
            document.querySelector(".audioplayer .controls .volume").addEventListener("mouseover", this.volumeMouseOver.bind(this));
            document.querySelector(".audioplayer .controls .volume").addEventListener("mouseout", this.volumeMouseOut.bind(this));
        }
    };

    /**
     * Set the position of the playlist to the given position and reload the right music
     * @param position
     */
    this.setPosition = function(position){
        this.playlist.setCurrentPosition(position);
        this.loadMusic();
    };

    /**
     * Will show the pop-up volume
     */
    this.volumeMouseOver = function () {
        document.querySelector(".audioplayer .controls .volume").classList.add('is-active');
    };

    /**
     * Will show the pop-up volume on compact/mobile version
     */
    this.volumeMouseOverCompact = function () {
        let volumeButton = document.querySelector(".audioplayer .controls .volume");

        if (!volumeButton.classList.contains("volume-timed")) {
            volumeButton.classList.add('is-active');

            //Little timeout to avoid a instant showing and hiding
            setTimeout(function () {
                volumeButton.classList.add('volume-timed');
            }, 200)
        }
    };

    /**
     * Will hide the pop-up volume
     */
    this.volumeMouseOut = function () {
        document.querySelector(".audioplayer .controls .volume").classList.remove('is-active');
    };

    /**
     * Will hide the pop-up volume on conpact/mobile version
     */
    this.volumeMouseOutCompact = function () {
        let volumeButton = document.querySelector(".audioplayer .controls .volume");

        if (volumeButton.classList.contains("volume-timed")) {
            volumeButton.classList.remove('is-active');

            //Little timeout to avoid a instant showing and hiding
            setTimeout(function () {
                volumeButton.classList.remove('volume-timed');
            }, 200)
        }
    };


    /**
     * Modify the value of the volume bar and the volume of the music
     * @param e {event}
     */
    this.targetVolume = function (e) { //TODO mettre le bon volume au chargement de la musique
        //The target should be the volume bar
        let min = e.target.min,
            max = e.target.max,
            val = e.target.value;

        let value = (val - min) * 100 / (max - min);
        e.target.style.backgroundSize = value + '% 100%';

        if (this.sound != null) {
            this.setVolume(value);
        }
    };

    /** Public functions */

    /**
     * Go check into the database if a music match with the id, add the music and if this is the first, draw information about this music
     * @param idMusic {int} - id of the wanted music
     */
    this.addMusicById = function (idMusic) {
        let firstMusic = this.playlist.getCurrentMusic() == null;

        Connexion.getMusicById(idMusic, function(music){
            music = new Music(JSON.parse(music));

            this.playlist.addMusic(music);
            if (firstMusic) {
                this.loadMusic();
            } else {
                //Other case, add the visibility of the "previous" and "next" buttons and put the "volume" button at the right place
                document.querySelector(".audioplayer .controls .prev").style.visibility = "visible";
                document.querySelector(".audioplayer .controls .next").style.visibility = "visible";
                document.querySelector(".audioplayer .controls .volume").style.marginLeft = "0px";
            }

            this.checkCookies();

        }.bind(this));
    };

    /**
     * Will add a Music object to the player and playlist
     * @param music {String} - JSON string which represent a Music Object to add
     */
    this.addMusicObject = function(music){
        let firstMusic = this.playlist.getCurrentMusic() === null;

        this.playlist.addMusic(music);
        if (firstMusic) {
            this.loadMusic();
        } else {
            //Other case, add the visibility of the "previous" and "next" buttons and put the "volume" button at the right place
            document.querySelector(".audioplayer .controls .prev").style.visibility = "visible";
            document.querySelector(".audioplayer .controls .next").style.visibility = "visible";
            document.querySelector(".audioplayer .controls .volume").style.marginLeft = "0px";
        }
    };


    /**
     * Go check into the database to get all music of the wanted playlist and erase the older playlist/music in play
     * @param idPlaylistToAdd {int} - id of the playlist into the database
     * @param currentMusicId {int} - if present set the current Music to this one
     */
    this.addPlaylist = function(idPlaylistToAdd, currentMusicId = null){

        Connexion.getPlaylistById(idPlaylistToAdd,function(newPlaylist){
            if(newPlaylist !== null && newPlaylist !== "[]"){
                this.playlist = new Playlist();
                newPlaylist = JSON.parse(newPlaylist);
                //Position = the given position of the
                for (let position in newPlaylist){
                    let music = new Music(newPlaylist[position]);
                    this.addMusicObject(music);

                    if(music.id === currentMusicId){
                        this.setPosition(Number(position));
                    }

                }

                this.checkCookies();
            }

        }.bind(this));

    };

    /**
     * Check all the cookie and apply the correct modification to the player
     */
    this.checkCookies = function(){
        let currentMusic = this.playlist.getCurrentMusic();

        if(PlayerUtils.getCookie("song-" + currentMusic.id + "-alreadyLike") !== ""){
            document.querySelector(".audioplayer .like").classList.add("ilikeit");
        }else{
            document.querySelector(".audioplayer .like").classList.remove("ilikeit");
        }
    };

    constructor();

}

/**
 * Set the new volume
 * @param {int} newVolume
 */
Player.prototype.setVolume = function (newVolume) {
    this.volume = newVolume;
    if (this.sound !== null) {
        this.sound.setVolume(newVolume);

        let volume = document.querySelector(".audioplayer .controls .volume .volume_button");
        if (newVolume === 0) {
            if (volume.classList.contains('volume-on')) {
                volume.classList.remove('volume-on');
                volume.classList.add('volume-off');
            }
        } else {
            if (volume.classList.contains('volume-off')) {
                volume.classList.remove('volume-off');
                volume.classList.add('volume-on');
            }
        }
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
    } else {
        volume.classList.remove('volume-off');
        volume.classList.add('volume-on');
        if (this.sound !== null)
            this.sound.setVolume(this.volume);
    }
};


/**
 * Will add a like to the database and add 1 to the number of like show
 * If a like button already been pressed, remove the like
 */
Player.prototype.like = function () {
    let currentMusic = this.playlist.getCurrentMusic();

    //TODO like - Check si déja liké.
    if (PlayerUtils.getCookie("song-" + currentMusic.id + "-alreadyLike") === "") {
        Connexion.addLike(currentMusic.id, console.log);
        document.querySelector(".audioplayer .like").classList.add("ilikeit");

        let likeNumber = document.querySelector(".audioplayer .like");
        likeNumber.innerText = Number(likeNumber.innerText) + 1;
        currentMusic.numberLike++;

        PlayerUtils.setCookie("song-" + currentMusic.id + "-alreadyLike", "true", 99);
    } else {
        Connexion.removeLike(currentMusic.id, console.log);
        document.querySelector(".audioplayer .like").classList.remove("ilikeit");

        let likeNumber = document.querySelector(".audioplayer .like");
        likeNumber.innerText = Number(likeNumber.innerText) - 1;
        currentMusic.numberLike--;

        PlayerUtils.setCookie("song-" + currentMusic.id + "-alreadyLike", "", 99);
    }
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
 * Will create and give an embed version of the player
 */
Player.prototype.share = function () {
    var modal = document.querySelector('.audioplayer .modal');
    var close = document.querySelector(".audioplayer .modal .close");
    var inputShare = document.querySelector(".audioplayer .modal .modal-body input[type=text].share-input-text");
    var btnCopy = document.querySelector(".audioplayer .modal .modal-footer");
    modal.style.display = "block";

    // Close the modal with the close button
    close.onclick = function () {
        modal.style.display = "none";
    };

    // Close the modal by clicking outside it
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

    // Copy the select
    btnCopy.onclick = function () {
        inputShare.select();
        document.execCommand("copy");
    };

    let currentMusic = this.playlist.getCurrentMusic();
    inputShare.value = ('<iframe src="http://localhost:3000/music?idMusic=' + currentMusic.id + '" width="50%" height="230" frameborder="no" scrolling="no"></iframe>');
};

/**
 * Set the new position of the music and change the CSS of the waveform's bars
 * @param newPosition {int} the position of the cursor when it's click
 */
Player.prototype.goTo = function (newPosition) {
    if (this.sound != null) {

        let percentile = (newPosition / document.querySelector(".audioplayer .waveform .sprectrumContainer").childElementCount);
        let newTime = percentile * this.sound.duration;
        this.currentTime = newTime / 1000;
        this.sound.setPosition(newTime);
        this.clearColorWave();
        this.colorWaveToCurrentPos();
        if(this.sound.paused)
            this.play_pause();
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
            this.loadMusic();

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
        //Add 1 to the value of view if isn't done
        this.addView();



    } else {
        console.error("No music into the playlist !");
    }

};

/**
 * Override the Playlist function to add the SoundManager's functions
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

/**
 * Override the Playlist function to add the SoundManager's functions
 */
Player.prototype.previous = function () {
    this.playlist.previous();

    if (this.sound != null) {
        this.sound.stop();
        this.sound.unload();
        this.sound = null;
    }

    this.repaint();
    this.play_pause();
};



/**
 * Will add 1 to the number of view of the music if the local cookie allows it
 */
Player.prototype.addView = function () {
    let currentMusic = this.playlist.getCurrentMusic();

    if (PlayerUtils.getCookie("song-" + currentMusic.id + "-alreadyView") === "") {
        Connexion.addNumberOfView(currentMusic.id, console.log);

        currentMusic.numberView++;
        this.repaint()

        PlayerUtils.setCookie("song-" + currentMusic.id + "-alreadyView", "true", 1);
    }
};

var manager = new Player();
