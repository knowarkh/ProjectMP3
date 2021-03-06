/**
 * Class will do every music based actions
 */
function Player() {
    /**
     * Use to do all operations needed to use the player
     * @namespace private
     */
    let constructor = function () {
        this.currentTime = 0;
        this.volume = Number(document.querySelector(".audioplayer .controls .volume input[type=range].volume-input-range ").value);
        this.playlist = new Playlist();
        this.sound = null;


        //Check if some information is present into the url
        let idMusicToLoad = Connexion.getIdMusicParam();
        let idPlaylistToLoad = Connexion.getIdPlaylistParam();

        if (idPlaylistToLoad !== 0 && idMusicToLoad !== 0) {
            this.addPlaylist(idPlaylistToLoad, idMusicToLoad);
        } else if (idPlaylistToLoad !== 0) {
            this.addPlaylist(idPlaylistToLoad, -1); // -1 is same way to put nothing
        } else if (idMusicToLoad !== 0) {
            this.addMusicById(idMusicToLoad);
        }

        this.setListener();

        //Use to apply the right color to the background of the volume input
        PlayerUtils.createNewEventAndUseOnATarget("input", document.querySelector(".audioplayer .controls .volume input[type=range].volume-input-range"));


    }.bind(this);

    /**
     * Create a SoundManagerSound with the currentMusic in the playlist and reload the page
     * @namespace private
     */
    this.loadMusic = function () {
        if (this.sound !== null) {
            this.sound.stop();
            this.sound.unload();

        }

        let currentMusic = this.playlist.getCurrentMusic();

        if (soundManager.getSoundById(currentMusic.title + "-" + currentMusic.artistName) !== undefined) {
            this.sound = soundManager.getSoundById(currentMusic.title + "-" + currentMusic.artistName);
            this.sound.setVolume(this.volume);

        } else {
            this.sound = soundManager.createSound({
                id: currentMusic['title'] + "-" + currentMusic['artistName'], // Id arbitraire
                url: currentMusic['musicPath'],
                whileplaying: this.drawMusicTime.bind(this),
                volume: this.volume,
                onfinish: this.next.bind(this)
            });

        }

        if (this.sound.muted) {
            this.mute();
        }

        this.sound.play();
        this.sound.pause();
        this.repaint();
    }.bind(this);


    /** Private functions */

    /**
     * Will colorize the current point of playing
     * @namespace private
     */
    this.colorWaveToCurrentPos = function () {
        let hasBeenHoverBack = false;

        let waveform = document.querySelectorAll(".audioplayer .waveform .sprectrumContainer");
        let barPosition = Math.ceil(this.sound.position / this.sound.duration * waveform[0].childElementCount);

        let bar_up;
        let bar_bottom;

        for (let position = 0; position <= barPosition; position++) {
            bar_up = waveform[0].childNodes[position];
            bar_bottom = waveform[1].childNodes[position];

            //Check if the new position get the "hover-front" class, remove it
            if (PlayerUtils.hasClass(bar_up, "hover-front") || PlayerUtils.hasClass(bar_bottom, "hover-front")) {
                PlayerUtils.removeClass(bar_up, "hover-front");
                PlayerUtils.removeClass(bar_bottom, "hover-front");
            }

            PlayerUtils.addClass(bar_up, "played");
            PlayerUtils.addClass(bar_bottom, "played");


            //Check if a "hover-back" class is set
            if (PlayerUtils.hasClass(bar_up, "hover-back") || PlayerUtils.hasClass(bar_bottom, "hover-back"))
                hasBeenHoverBack = true;

            //If one of the bar get the "hover-back" class, add it to all next bars
            if (hasBeenHoverBack)
                if (!PlayerUtils.hasClass(bar_up, "hover-front") && !PlayerUtils.hasClass(bar_bottom, "hover-front")) {
                    PlayerUtils.addClass(bar_up, "hover-back");
                    PlayerUtils.addClass(bar_bottom, "hover-back");
                }
        }
    };


    /**
     * Will colorize the current point of playing of the hovered point
     * @namespace private
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
                PlayerUtils.addClass(waveformUp.childNodes[position], "hover-front");
                PlayerUtils.addClass(waveformDown.childNodes[position], "hover-front");

            }
        } else {
            for (let position = pos; position <= barPosition; position++) {
                PlayerUtils.addClass(waveformUp.childNodes[position], "hover-back");
                PlayerUtils.addClass(waveformDown.childNodes[position], "hover-back");
            }
        }

    };

    /**
     * Will remove the class "played" and "hover" of all bars of the waveform
     * @namespace private
     */
    this.clearColorWave = function () {
        let barsList = document.querySelectorAll(".audioplayer .bar-up ,.audioplayer .bar-down");
        if (barsList.length !== 0) {
            for (var index = 0; index < barsList.length; index++) {
                PlayerUtils.removeClass(barsList[index], "played");
                PlayerUtils.removeClass(barsList[index], "played-flash");
                PlayerUtils.removeClass(barsList[index], "hover-front");
                PlayerUtils.removeClass(barsList[index], "hover-back");
            }

        }

    };

    /**
     * Will remove the class "hover" of all bars of the waveform
     * @namespace private
     */
    this.clearColorHoverWave = function () {
        let barsList = document.querySelectorAll(".audioplayer .bar-up ,.audioplayer .bar-down");
        if (barsList.length !== 0) {
            for (var index = 0; index < barsList.length; index++) {

                PlayerUtils.removeClass(barsList[index], "hover-front");
                PlayerUtils.removeClass(barsList[index], "hover-back");
            }

        }
    };

    /**
     * Will remove the class "spectrumHoverTime" and clear the time
     * @namespace private
     */
    this.clearHoverTime = function () {
        let currentTime = document.querySelector(".audioplayer .en-cours");
        PlayerUtils.removeClass(currentTime, "spectrumHoverTime");
        currentTime.innerText = PlayerUtils.milliSecondsToReadableTime(this.sound.position);
    };


    /**
     * Show the current time of the music according to the hovered position of the spectrum and add class "spectrumHoverTime"
     * @namespace private
     * @param position
     */
    this.drawHoverTime = function (position) {
        let currentTime = document.querySelector(".audioplayer .en-cours");
        let nbBarSpectrum = document.querySelectorAll(".audioplayer .waveform .sprectrumContainer")[0].childElementCount - 1;

        if (!PlayerUtils.hasClass(currentTime, "spectrumHoverTime")) {
            let time = position / nbBarSpectrum * this.sound.duration;
            currentTime.innerText = PlayerUtils.milliSecondsToReadableTime(time);
            PlayerUtils.addClass(currentTime, "spectrumHoverTime");

        }
    };


    /**
     * Will draw the waveform at this position
     * @namespace private
     */
    this.drawSpectrum = function () {
        this.clearColorWave();

        if (this.sound != null) {
            let barPositionPercentile = this.sound.position / this.sound.duration;

            createWaveForm(this.playlist.getCurrentMusic().listPoints, barPositionPercentile);
        } else {
            createWaveForm(this.playlist.getCurrentMusic().listPoints);
        }

        //Add event to each bar of the spectrum
        var barsList = document.querySelectorAll(".audioplayer .bar-up , .audioplayer .bar-down");
        for (var index = 0; index < barsList.length; index++) {
            barsList[index].addEventListener("click", function (evt) {
                this.clearColorWave();
                if (evt.target.attributes.hasOwnProperty("data_position"))
                    this.goTo(Number(evt.target.attributes.data_position.value));
            }.bind(this));
            barsList[index].addEventListener("mouseover", function (evt) {
                if (evt.target.attributes.hasOwnProperty("data_position")) {
                    this.colorWaveToHoverPos(Number(evt.target.attributes.data_position.value));
                    this.drawHoverTime(Number(evt.target.attributes.data_position.value))
                }
            }.bind(this));
            barsList[index].addEventListener("mouseout", function () {
                this.clearColorHoverWave();
                this.clearHoverTime();
            }.bind(this));
        }

    };

    /**
     * Will draw current time of the current music each second
     * @namespace private
     */
    this.drawMusicTime = function () {
        if (this.sound != null) {

            let currentTime = document.querySelector(".audioplayer .en-cours");
            if (!PlayerUtils.hasClass(currentTime, "spectrumHoverTime"))
                currentTime.innerText = PlayerUtils.milliSecondsToReadableTime(this.sound.position);

            this.colorWaveToCurrentPos();
        }
    };

    /**
     * Draw all information about the music, called when the music is loaded
     * @namespace private
     */
    this.drawMusicData = function () {
        let currentMusic = this.playlist.getCurrentMusic();
        if (currentMusic != null) {
            //Add an escape double quote to allow name with quote 
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
     * @namespace private
     */
    this.repaint = function () {
        this.drawSpectrum();
        this.drawMusicData();
        this.checkCookies();
        this.playlist.repaintPlaylist();
    };

    /**
     * Set all listeners of each actions
     * @namespace private
     */
    this.setListener = function () {

        window.addEventListener("resize", this.drawSpectrum.bind(this));

        document.querySelector(".audioplayer .prev").addEventListener("click", this.previous.bind(this));
        document.querySelector(".audioplayer .next").addEventListener("click", this.next.bind(this));
        document.querySelector(".audioplayer .play-pause").addEventListener("click", this.play_pause.bind(this));
        document.querySelector(".audioplayer .like").addEventListener("click", this.like.bind(this));
        document.querySelector(".audioplayer .share").addEventListener("click", this.share.bind(this));
        document.querySelector(".audioplayer .controls .volume input[type=range].volume-input-range").addEventListener("input", this.targetVolume.bind(this));
        //Use for IE
        document.querySelector(".audioplayer .controls .volume input[type=range].volume-input-range").addEventListener("change", this.targetVolume.bind(this));

        //Applied a different listener in case of mobile version
        if (PlayerUtils.mobileAndTabletCheck() || PlayerUtils.detectCompactSize()) {
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
     * @namespace private
     * @param position
     */
    this.setPosition = function (position) {
        this.playlist.setCurrentPosition(position);
        this.loadMusic();
    };

    /**
     * Will show the pop-up volume
     * @namespace private
     */
    this.volumeMouseOver = function () {
        PlayerUtils.addClass(document.querySelector(".audioplayer .controls .volume"), "is-active");

    };

    /**
     * Will show the pop-up volume on compact/mobile version
     * @namespace private
     */
    this.volumeMouseOverCompact = function () {
        let volumeButton = document.querySelector(".audioplayer .controls .volume");

        if (!PlayerUtils.hasClass(volumeButton, "volume-timed")) {
            PlayerUtils.addClass(volumeButton, "is-active");

            //Little timeout to avoid a instant showing and hiding
            setTimeout(function () {
                PlayerUtils.addClass(volumeButton, "volume-timed");

            }, 200)
        }
    };

    /**
     * Will hide the pop-up volume
     * @namespace private
     */
    this.volumeMouseOut = function () {
        PlayerUtils.removeClass(document.querySelector(".audioplayer .controls .volume"), "is-active");
    };

    /**
     * Will hide the pop-up volume on compact/mobile version
     * @namespace private
     */
    this.volumeMouseOutCompact = function () {
        let volumeButton = document.querySelector(".audioplayer .controls .volume");

        if (PlayerUtils.hasClass(volumeButton, "volume-timed")) {
            PlayerUtils.removeClass(volumeButton, "is-active");
            //Use to avoid a trigger of the two events at the same time
            setTimeout(function () {
                PlayerUtils.removeClass(volumeButton, "volume-timed");
            }, 200)
        }
    };


    /**
     * Modify the value of the volume bar and the volume of the music
     * @namespace private
     * @param e {event}
     */
    this.targetVolume = function (e) {
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

    /**
     * Go check into the database if a music match with the id, add the music and if this is the first, draw information about this music
     * @namespace private
     * @param idMusic {int} - id of the wanted music
     */
    this.addMusicById = function (idMusic) {
        let firstMusic = this.playlist.getCurrentMusic() == null;

        Connexion.getMusicById(idMusic, function (music) {
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
     * @namespace private
     * @param music {Music} - JSON string which represent a Music Object to add
     */
    this.addMusicObject = function (music) {
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
     * @namespace private
     * @param idPlaylistToAdd {int} - id of the playlist into the database
     * @param currentMusicId {int} - if present set the current Music to this one
     */
    this.addPlaylist = function (idPlaylistToAdd, currentMusicId) {
        //Set a default parameter which work with IE11
        currentMusicId = currentMusicId || null;

        Connexion.getPlaylistById(idPlaylistToAdd, function (newPlaylist) {
            if (newPlaylist !== null && newPlaylist !== "[]") {
                this.playlist = new Playlist();
                newPlaylist = JSON.parse(newPlaylist);
                //Position = the given position of the music into the playlist ( {"1" : musicOne, "2" : musicTwo})
                for (let position in newPlaylist) {
                    if (newPlaylist.hasOwnProperty(position)) {

                        let music = new Music(newPlaylist[position]);
                        this.addMusicObject(music);

                        if (music.id === currentMusicId) {
                            this.setPosition(Number(position));
                        }
                    }
                }

                this.checkCookies();
            }

        }.bind(this));

    };

    /**
     * Check all the cookie and apply the correct modification to the player
     * @namespace private
     */
    this.checkCookies = function () {
        let currentMusic = this.playlist.getCurrentMusic();

        if (PlayerUtils.getCookie("song-" + currentMusic.id + "-alreadyLike") !== "") {
            PlayerUtils.addClass(document.querySelector(".audioplayer .like"), "ilikeit");


        } else {
            PlayerUtils.removeClass(document.querySelector(".audioplayer .like"), "ilikeit");
        }
    };

    constructor();

}

/**
 * Set the new volume
 * @namespace Player
 * @param {int} newVolume
 */
Player.prototype.setVolume = function (newVolume) {
    this.volume = newVolume;
    if (this.sound !== null) {
        this.sound.setVolume(newVolume);

        let volume = document.querySelector(".audioplayer .controls .volume .volume_button");
        if (newVolume === 0) {
            if (PlayerUtils.hasClass(volume, 'volume-on')) {
                PlayerUtils.removeClass(volume, "volume-on");
                PlayerUtils.addClass(volume, "volume-off");
            }
        } else {
            if (PlayerUtils.hasClass(volume, 'volume-off')) {
                PlayerUtils.removeClass(volume, 'volume-off');
                PlayerUtils.addClass(volume, "volume-on");
            }
        }
    }
};


/**
 * Toggle the sound or not
 * @namespace Player
 */
Player.prototype.mute = function () {
    let volume = document.querySelector(".audioplayer .controls .volume .volume_button");

    if (PlayerUtils.hasClass(volume, 'volume-on')) {
        PlayerUtils.removeClass(volume, "volume-on");
        PlayerUtils.addClass(volume, "volume-off");

        if (this.sound !== null)
            this.sound.mute();
    } else {
        PlayerUtils.removeClass(volume, "volume-off");
        PlayerUtils.addClass(volume, "volume-on");

        if (this.sound !== null)
            this.sound.unmute();
    }
};

/**
 * Return if the player add the mute button enabled
 * @namespace Player
 * @returns {boolean} - if the player if muted
 */
Player.prototype.playerIsMute = function () {
    let volume = document.querySelector(".audioplayer .controls .volume .volume_button");
    return PlayerUtils.hasClass(volume, 'volume-off');
};

/**
 * Will add a like to the database and add 1 to the number of like show
 * If a like button already been pressed, remove the like
 * @namespace Player
 */
Player.prototype.like = function () {
    let currentMusic = this.playlist.getCurrentMusic();

    if (PlayerUtils.getCookie("song-" + currentMusic.id + "-alreadyLike") === "") {
        Connexion.addLike(currentMusic.id, console.log);
        PlayerUtils.addClass(document.querySelector(".audioplayer .like"), "ilikeit");


        let likeNumber = document.querySelector(".audioplayer .like");
        likeNumber.innerText = Number(likeNumber.innerText) + 1;
        currentMusic.numberLike++;

        PlayerUtils.setCookie("song-" + currentMusic.id + "-alreadyLike", "true", 99);
    } else {
        Connexion.removeLike(currentMusic.id, console.log);
        PlayerUtils.removeClass(document.querySelector(".audioplayer .like"), "ilikeit");

        let likeNumber = document.querySelector(".audioplayer .like");
        likeNumber.innerText = Number(likeNumber.innerText) - 1;
        currentMusic.numberLike--;

        PlayerUtils.setCookie("song-" + currentMusic.id + "-alreadyLike", "", 99);
    }
};


/**
 * Will add a comment to the database, the current screen and add 1 for the number of comments
 * @namespace Player
 */
Player.prototype.addComment = function () {
    //TODO faire une vraie action
    Connexion.requestPost("/fasma/addLikeComment", {
        id: this.playlist.getCurrentMusic().id,
        comment: "test comment"
    }, console.log);
    this.drawMusicData();
};

/**
 * Will create and give an embed version of the player
 * @namespace Player
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
 * @namespace Player
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
        if (this.sound.paused)
            this.play_pause();

    }
};

/**
 *  Use to set on play or on pause state the current music, if no current music is null, create it and launch it if
 *  possible
 *  @namespace Player
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
            PlayerUtils.removeClass(playButton, "play");
            PlayerUtils.addClass(playButton, "pause");

        }
        //If a Sound is already set
        else {

            //If it loaded and played or paused
            if (this.sound.playState) {
                if (this.sound.paused) {
                    this.sound.resume();
                    PlayerUtils.removeClass(playButton, "play");
                    PlayerUtils.addClass(playButton, "pause");

                }//If it's played
                else {
                    this.sound.pause();
                    PlayerUtils.removeClass(playButton, "pause");
                    PlayerUtils.addClass(playButton, "play");
                }
            }
        }
        if (this.playerIsMute()) {
            this.sound.mute();
        } else {
            this.sound.unmute();
        }

        //Add 1 to the value of view if isn't done
        this.addView();

    } else {
        console.error("No music into the playlist !");
    }

};

/**
 * Override the Playlist function to add the SoundManager's functions
 * @namespace Player
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
 * @namespace Player
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
 * @namespace Player
 */
Player.prototype.addView = function () {
    let currentMusic = this.playlist.getCurrentMusic();

    if (PlayerUtils.getCookie("song-" + currentMusic.id + "-alreadyView") === "") {
        Connexion.addNumberOfView(currentMusic.id, console.log);

        currentMusic.numberView++;
        this.repaint();

        PlayerUtils.setCookie("song-" + currentMusic.id + "-alreadyView", "true", 1);
    }
};

var manager = new Player();
