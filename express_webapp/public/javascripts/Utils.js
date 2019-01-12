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

/**
 * Function use to get a value of a element put in the url
 * @param name {string} - name of the wanted value
 * @param url {string} - value of the url
 * @returns {*} - the current value or a empty string
 */
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

/**
 * Add a cookie value
 * @param cname
 * @param cvalue
 * @param exdays
 */
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

/**
 * Allow to get a cookie value
 * @param cname
 * @returns {string}
 */
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}