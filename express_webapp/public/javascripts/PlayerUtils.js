function PlayerUtils() {
}

/**
 * The function pads a string to a new length
 * @param string
 * @param pad
 * @param length
 * @returns {string}
 */
PlayerUtils.prototype.str_pad_left = function (string, pad, length) {
    return (new Array(length + 1).join(pad) + string).slice(-length);
};

/**
 * Transform the duration of a number in seconds to a readable text
 * @param duree {int} - number of seconds
 * @returns {string} - Text version of the time
 */
PlayerUtils.prototype.secondsToReadableTime = function (duree) {
    let minutes = Math.floor(duree / 60);
    let seconds = duree - minutes * 60;
    return minutes + ":" + this.str_pad_left(seconds, '0', 2);
};

/**
 * Transform the duration of a number in milliseconds to a readable text
 * @param duree {int} - number of milliseconds
 * @returns {string} - Text version of the time
 */
PlayerUtils.prototype.milliSecondsToReadableTime = function (duree) {
    return this.secondsToReadableTime(Math.ceil(duree / 1000));
};

/**
 * Function use to get a value of a element put in the url
 * @param name {string} - name of the wanted value
 * @param url {string} - value of the url
 * @returns {string} - the current value or a empty string
 */
PlayerUtils.prototype.getParameterByName = function (name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return '';
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

/**
 * Add a cookie value
 * @param cname {string} - Name of the cookie
 * @param cvalue {string} - Value to put into the cookie
 * @param exdays {int} - Number of day before the cookie dies
 */
PlayerUtils.prototype.setCookie = function (cname, cvalue, exdays) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};

/**
 * Allow to get a cookie value
 * @param cname {string} - name of the wanted cookie
 * @returns {string} - value of the wanted cookie
 */
PlayerUtils.prototype.getCookie = function (cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};

/**
 * Used to know which css is used and does a different job
 * @returns {boolean} if the current screen if smaller or not and so be a mobile version
 */
PlayerUtils.prototype.detectCompactSize = function () {
    return window.innerWidth <= 600 && window.innerHeight <= 600;
};


/**
 * Used to know if the current device is a mobile or a tablet
 * @returns {boolean}
 */
PlayerUtils.prototype.mobileAndTabletCheck = function () {
    var check = false;
    (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};

/**
 * Create and return a event, depending if the browser was IE or another
 * @param eventName {String} - wanted event
 * @returns {AnimationEvent | AnimationPlaybackEvent | AudioProcessingEvent | BeforeUnloadEvent | ClipboardEvent | CloseEvent | CompositionEvent | CustomEvent | DeviceLightEvent | DeviceMotionEvent | DeviceOrientationEvent | DragEvent | ErrorEvent | Event | FocusEvent | FocusNavigationEvent | GamepadEvent | HashChangeEvent | IDBVersionChangeEvent | KeyboardEvent | ListeningStateChangedEvent | MSGestureEvent | MSMediaKeyMessageEvent | MSMediaKeyNeededEvent | MSPointerEvent | MediaEncryptedEvent | MediaKeyMessageEvent | MediaQueryListEvent | MediaStreamErrorEvent | MediaStreamEvent | MediaStreamTrackEvent | MessageEvent | MouseEvent | MutationEvent | OfflineAudioCompletionEvent | OverflowEvent | PageTransitionEvent | PaymentRequestUpdateEvent | PermissionRequestedEvent | PointerEvent | PopStateEvent | ProgressEvent | PromiseRejectionEvent | RTCDTMFToneChangeEvent | RTCDataChannelEvent | RTCDtlsTransportStateChangedEvent | RTCErrorEvent | RTCIceCandidatePairChangedEvent | RTCIceGathererEvent | RTCIceTransportStateChangedEvent | RTCPeerConnectionIceErrorEvent | RTCPeerConnectionIceEvent | RTCSsrcConflictEvent | RTCStatsEvent | RTCTrackEvent | SVGZoomEvent | SecurityPolicyViolationEvent | ServiceWorkerMessageEvent | SpeechRecognitionError | SpeechRecognitionEvent | SpeechSynthesisErrorEvent | SpeechSynthesisEvent | StorageEvent | TextEvent | TouchEvent | TrackEvent | TransitionEvent | UIEvent | VRDisplayEvent | WebGLContextEvent | WheelEvent | Event}
 */
PlayerUtils.prototype.createNewEvent = function (eventName) {
    var event;
    if (typeof(Event) === 'function') {
        event = new Event(eventName);
    } else {
        event = document.createEvent('Event');
        event.initEvent(eventName, true, true);
    }
    return event;
};

/**
 * Create a new event and apply it on a given target
 * @param eventName {String} - wanted event
 * @param target {Node} - target
 */
PlayerUtils.prototype.createNewEventAndUseOnATarget = function (eventName, target) {
    target.dispatchEvent(this.createNewEvent(eventName));
};

/**
 * Create a new event and apply it on given targets
 * @param eventName {String} - wanted event
 * @param targets {NodeList} - targets
 */
PlayerUtils.prototype.createNewEventAndUseOnTargets = function (eventName, targets) {
    let evt = this.createNewEvent(eventName);
    for (var i = 0; i < targets.length; i++) {
        targets[i].dispatchEvent(evt);
    }
};

/**
 * Add a class to the given target
 * @param target {Node} - object will be get the class
 * @param classToAdd {String} - class wanted to be added
 */
PlayerUtils.prototype.addClass = function (target, classToAdd) {

    var cssClass = target.classList;

    if (cssClass != null && !cssClass.contains(classToAdd)) {
        target.classList.add(classToAdd);
    } else {
        if (!this.hasClass(target, classToAdd)) {
            var oldClass = target.getAttribute("class");

            if (oldClass != null && oldClass != "") {
                target.setAttribute("class", oldClass.toString() + " " + classToAdd);
            } else {
                target.setAttribute("class", classToAdd);
            }
        }

    }

};

/**
 * Remove a class to the given target
 * @param target {Node} - object will be lose the class
 * @param classToRemove {String} - class wanted to be removed
 */
PlayerUtils.prototype.removeClass = function (target, classToRemove) {

    var cssClass = target.classList;

    if (this.hasClass(target, classToRemove)) {

        if (cssClass != null) {
            target.classList.remove(classToRemove);
        } else {

            if (target.getAttribute("class") != null) {
                var classlist = target.getAttribute("class").split(" ");
                classlist.splice(classlist.indexOf(classToRemove));

                var newClassList = "";
                for (var i = 0; i < classlist.length; i++) {
                    if (i !== classlist.length - 1)
                        newClassList += classlist[i] + " ";
                    else
                        newClassList += classlist[i];
                }
                target.setAttribute("class", newClassList);
                var l = target.getAttribute("class").split(" ");


            }

        }
    }
};

/**
 * Return if the target get a given class
 * @param target {Node} - object will be check
 * @param classToCheck {String} - class wanted to be checked
 * @returns {boolean} - true if contains, false otherwise
 */
PlayerUtils.prototype.hasClass = function (target, classToCheck) {

    var cssClass = target.classList;

    if (cssClass != null) {
        return target.classList.contains(classToCheck);
    } else {

        if (target.getAttribute("class") != null) {

            var classlist = target.getAttribute("class").split(" ");
            return classlist.indexOf(classToCheck) !== -1;

        }
    }

};

/**
 * Escape special html characters of a given string
 * @param unsafe {String} - String wanted to be safe
 * @returns {String} - safe String
 */
PlayerUtils.prototype.escapeHtml = function (unsafe) {
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };

    return unsafe.replace(/[&<>"']/g, function (m) {
        return map[m];
    });
};

var PlayerUtils = new PlayerUtils();

