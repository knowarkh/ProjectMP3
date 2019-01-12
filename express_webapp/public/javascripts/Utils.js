/**
 * Transform the duration in a number of seconds to a readable text
 * @param duree {int} - number of seconds
 * @returns {string} - Text version of the time
 */
function secondsToReadableTime(duree){
    var minutes = Math.floor(duree / 60);
    var seconds = duree - minutes * 60;
    return minutes + ":" + str_pad_left(seconds,'0',2);
}

/**
 * Transform the duration in a number of milliseconds to a readable text
 * @param duree {int} - number of milliseconds
 * @returns {string} - Text version of the time
 */
function miliSecondsToReadableTime(duree){
  return secondsToReadableTime(Math.floor(duree/1000));
}

function str_pad_left(string,pad,length) {
    return (new Array(length+1).join(pad)+string).slice(-length);
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}