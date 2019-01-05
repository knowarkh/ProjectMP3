


function secondsToReadableTime(duree){
    var minutes = Math.floor(duree / 60);
    var seconds = duree - minutes * 60;
    return minutes + ":" + str_pad_left(seconds,'0',2);
}

function miliSecondsToReadableTime(duree){
  return secondsToReadableTime(Math.floor(duree/1000));
}

function str_pad_left(string,pad,length) {
    return (new Array(length+1).join(pad)+string).slice(-length);
}

