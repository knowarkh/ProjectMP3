let volume_button = document.querySelector(".audioplayer .controls .volume .volume_button");
let volume_span = document.querySelector(".audioplayer .controls .volume");

volume_button.addEventListener("click", mute);
volume_button.addEventListener("mouseover", volumeMouseOver);
volume_button.addEventListener("mouseout", volumeMouseOut);


function mute(){
    if(volume_button.classList.contains('volume-on')) {
        volume_button.classList.remove('volume-on');
        volume_button.classList.add('volume-off');
    }
    else {
        volume_button.classList.remove('volume-off');
        volume_button.classList.add('volume-on');
    }
}

function volumeMouseOver(){
    volume_span.classList.add('is-active');
}

function volumeMouseOut(){
    volume_span.classList.remove('is-active');
}
