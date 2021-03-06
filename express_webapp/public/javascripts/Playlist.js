/**
 * Class used to control the playlist and the music
 */
function Playlist() {
    this.musicList = [];
    this.currentPosition = 0;
    this.currentMusic = null;

}

/**
 * Put the new position of the current music in the playlist
 * @param {int} newPosition - The new position of the current music
 */
Playlist.prototype.setCurrentPosition = function (newPosition) {
    if (newPosition < this.musicList.length && newPosition >= 0) {
        this.currentPosition = newPosition;
        this.currentMusic = this.musicList[newPosition];
    }
};

/**
 * Get the current position of the playlist
 * @returns {Music} - the current position of the playlist
 */
Playlist.prototype.getCurrentPosition = function () {
    return this.currentPosition;
};

/**
 * Get the current Music
 * @returns {Music} - the current Music
 */
Playlist.prototype.getCurrentMusic = function () {
    return this.currentMusic;
};

/**
 * Get a Music with its position in the playlist
 * @param position - int - Position into the playlist
 * @returns {Music} - Music object
 */
Playlist.prototype.getMusic = function (position) {
    if (this.musicList[position] != null) {
        return this.musicList[position];
    } else {
        return null;
    }
};

/**
 * Add a Music to the playlist
 * @param  music - {Music} object
 */
Playlist.prototype.addMusic = function (music) {
    if (this.currentMusic == null)
        this.currentMusic = music;
    this.musicList.push(music);
    this.generatePlaylistBlock();
};

/**
 * Remove a music with the Music given
 * @param music - Music to remove
 * @returns {boolean} - true if success, else otherwise
 */
Playlist.prototype.removeMusicByMusic = function (music) {
    if (this.musicList.includes(music) && music !== this.currentMusic) {
        if (this.musicList.indexOf(music) < this.currentPosition)
            this.currentPosition--;
        this.musicList.splice(this.musicList.indexOf(music), 1);
        return true;
    } else {
        return false;
    }
};

/**
 * Remove a music with its position into the playlist
 * @param position - position to remove
 * @returns {boolean} - true if success, else otherwise
 */
Playlist.prototype.removeMusicByPosition = function (position) {
    if (this.musicList[position] != null && this.musicList[position] !== this.currentMusic) {
        if (position < this.currentPosition)
            this.currentPosition--;
        this.musicList.splice(position, 1);
        return true;
    } else {
        return false;
    }
};

/**
 * Change if possible the current position for currentPosition + 1
 */
Playlist.prototype.next = function () {
    if (this.currentPosition < this.musicList.length - 1) {
        this.currentPosition++;
    } else {
        this.currentPosition = 0;
    }
    this.currentMusic = this.musicList[this.currentPosition];
};

/**
 * Change if possible the current position for currentPosition - 1
 */
Playlist.prototype.previous = function () {
    if (this.currentPosition > 0) {
        this.currentPosition--;
        this.currentMusic = this.musicList[this.currentPosition];
    }
};

/**
 * Will generate the block which contains the musics into the playlist
 * @param allMusic {boolean} - If more than 5 musics in the playlist, put "true" to show all, false by default
 */
Playlist.prototype.generatePlaylistBlock = function (allMusic) {

    //Set a default parameter which work with IE11
    allMusic = allMusic || false;

    if (this.musicList.length > 1) {
        let playlistBlock;
        if (document.querySelector(".audioplayer .playlist") !== null) {
            playlistBlock = document.querySelector(".audioplayer .playlist");
            playlistBlock.innerHTML = "";
        } else {
            playlistBlock = document.createElement("div");
            PlayerUtils.addClass(playlistBlock, "playlist");
        }

        let trackListBlock = document.createElement("div");
        trackListBlock.classList.add("tracklist");
        PlayerUtils.addClass(trackListBlock, "tracklist");


        let musicList = document.createElement("ol");
        musicList.classList.add("list");
        PlayerUtils.addClass(musicList, "list");

        //Check if the playlist contains 5 music and if it allow, drawn all musics data
        for (let index = 0; index < this.musicList.length && (index < 5 || allMusic); index++) {
            let musicBlock = document.createElement("li");
            PlayerUtils.addClass(musicBlock, "element");

            let coverBlock = document.createElement("img");
            PlayerUtils.addClass(coverBlock, "image");
            coverBlock.setAttribute("src", this.musicList[index].coverPath);

            let numberBlock = document.createElement("p");
            PlayerUtils.addClass(numberBlock, "numero");
            numberBlock.innerText = index + 1;

            let titleBlock = document.createElement("p");
            PlayerUtils.addClass(titleBlock, "titre");
            titleBlock.innerText = this.musicList[index].title;

            let artistBlock = document.createElement("p");
            PlayerUtils.addClass(artistBlock, "artiste");
            artistBlock.innerText = this.musicList[index].artistName;

            let statsBlock = document.createElement("p");
            PlayerUtils.addClass(statsBlock, "stats");
            statsBlock.innerText = PlayerUtils.secondsToReadableTime(this.musicList[index].duration);

            musicBlock.appendChild(coverBlock);
            musicBlock.appendChild(numberBlock);
            musicBlock.appendChild(titleBlock);
            musicBlock.appendChild(artistBlock);
            musicBlock.appendChild(statsBlock);
            musicBlock.addEventListener("click", function () {
                manager.setPosition(Number(numberBlock.innerText) - 1);//Use to get the good position (var outside effect problem, even with let)
                manager.play_pause();
            }.bind(this));

            musicList.appendChild(musicBlock);
        }
        //If more than 5 musics into the playlist add a button to show them all
        if (this.musicList.length > 5) {
            let moreBlock = document.createElement("a");
            PlayerUtils.addClass(moreBlock, "more");
            moreBlock.setAttribute("href", "");

            if (allMusic) {
                moreBlock.innerText = "Cacher " + (this.musicList.length - 5) + " titre(s)";

                moreBlock.addEventListener("click", function (e) {
                    e.preventDefault();
                    this.generatePlaylistBlock();
                }.bind(this));
            } else {
                moreBlock.innerText = "Afficher les " + this.musicList.length + " titres";

                moreBlock.addEventListener("click", function (e) {
                    e.preventDefault();
                    this.generatePlaylistBlock(true);
                }.bind(this));
            }

            musicList.appendChild(moreBlock);
        }


        playlistBlock.appendChild(trackListBlock);
        trackListBlock.appendChild(musicList);


        document.querySelector(".audioplayer").appendChild(playlistBlock);

    }

};

/**
 * Will redraw the number of views of each music into the playlist
 */
Playlist.prototype.repaintPlaylist = function () {
    let tracklist = document.querySelectorAll(".audioplayer .playlist .tracklist .list li .stats");

    for (let index = 0; index < tracklist.length; index++) {
        tracklist[index].innerText = this.musicList[index].numberView;
    }

};
