let volume = document.querySelector(".audioplayer .controls .volume");

volume.addEventListener("click", mute);
volume.addEventListener("mouseover", volumeMouseOver);
volume.addEventListener("mouseout", volumeMouseOut);


function mute(){
    if(volume.classList.contains('volume-on')) {
        volume.classList.remove('volume-on');
        volume.classList.add('volume-off');
    }
    else {
        volume.classList.remove('volume-off');
        volume.classList.add('volume-on');
    }
}

function volumeMouseOver(){
    volume.classList.add('is-active');
}

function volumeMouseOut(){
    volume.classList.remove('is-active');
}
