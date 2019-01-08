let volume_button = document.querySelector(".audioplayer .controls .volume .volume_button");
let volume_span = document.querySelector(".audioplayer .controls .volume");
let volume_input = document.querySelector('input[type=range].volume-input-range');
let volume_slider = document.querySelector('audioplayer .controls .volume .volume_slider');

volume_button.addEventListener("click", mute);
volume_input.addEventListener('input', targetVolume);

volume_span.addEventListener("mouseover", volumeMouseOver);
volume_span.addEventListener("mouseout", volumeMouseOut);

// volume_slider.addEventListener("mouseover", volumeMouseOver);
// volume_slider.addEventListener("mouseout", volumeMouseOut);

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


function targetVolume(e){
  var min = e.target.min,
      max = e.target.max,
      val = e.target.value;

  e.target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';
}
