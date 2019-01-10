/**
 * Create a waveform with the given array
 * @param {array} dotsList array of INT position to make the waveform
 * @param {int} percentilePlayed - percentile of the current music, if exist. Used to find the position of the bar which match with the position of the music on the spectrum
 */
function createWaveForm(dotsList, percentilePlayed = 0) {
    let spectre = document.querySelector(".audioplayer .waveform");

    /** Reset the content of the waveform */

    spectre.innerHTML = "";

    let svgns = "http://www.w3.org/2000/svg";

    let primarySVG = document.createElementNS(svgns, "svg");
    let reflectSVG = document.createElementNS(svgns, "svg");
    let SVGRules = document.createElementNS(svgns, "svg");

    let primaryWaveWidth = spectre.clientWidth;
    let primaryWaveHeight = Math.round(spectre.clientHeight * 2 / 3);

    let reflectWaveWidth = primaryWaveWidth;
    let reflectWaveHeight = Math.round(spectre.clientHeight / 3);

    let className = "bar";

    //JSON data
    let data = dotsList;
    let maxSizeBar = Math.max.apply(null, dotsList);

    let nbBars = dotsList.length;
    let x_bar = 0;
    let y_bar = 0;

    let barWidth = 4;
    let barHeight = 0;

    /** Define this fucking css rules */

    let defBlock = document.createElementNS(svgns, "defs");

    /** Top part */

    //Define one time the linearGradient object then clone it
    let gradientBarUp = document.createElementNS(svgns, "linearGradient");

    gradientBarUp.setAttribute("id", "waveformStyleBarUp");
    gradientBarUp.setAttribute("x1", "0");
    gradientBarUp.setAttribute("y1", "0");
    gradientBarUp.setAttribute("x2", "0");
    gradientBarUp.setAttribute("y2", "100%");
    gradientBarUp.innerHTML = "<stop offset='0%' stop-color='#F0F0F0' />\n" +"<stop offset='100%' stop-color='#646464' />\n";
    defBlock.appendChild(gradientBarUp);

    let gradientBarUpPlayed = gradientBarUp.cloneNode();
    gradientBarUpPlayed.setAttribute("id", "waveformStyleBarUpPlayed");
    gradientBarUpPlayed.innerHTML = "<stop offset='0%' stop-color='#F0F0F0' />\n" + "<stop offset='100%' stop-color='#f95800' />\n";
    defBlock.appendChild(gradientBarUpPlayed);
        
    let gradientBarUpHoverBack = gradientBarUp.cloneNode();
    gradientBarUpHoverBack.setAttribute("id", "waveformStyleBarUpHoverBack");
    gradientBarUpHoverBack.innerHTML = "<stop offset='0%' stop-color='#F0F0F0' />\n" + "<stop offset='100%' stop-color='#c33900' />\n";
    defBlock.appendChild(gradientBarUpHoverBack);

    let gradientBarUpHoverFront = gradientBarUp.cloneNode();
    gradientBarUpHoverFront.setAttribute("id", "waveformStyleBarUpHoverFront");
    gradientBarUpHoverFront.innerHTML = "<stop offset='0%' stop-color='#F0F0F0' />\n" + "<stop offset='100%' stop-color='#993600' />\n";
    defBlock.appendChild(gradientBarUpHoverFront);

    /** Bottom part */

    let gradientBarDown = gradientBarUp.cloneNode();
    gradientBarDown.setAttribute("id", "waveformStyleBarDown");
    gradientBarDown.innerHTML = "<stop offset='0%' stop-color='#676767' stop-opacity = 0.68 />\n" + "<stop offset='100%' stop-color='#F0F0F0' stop-opacity = 1/>\n";
    defBlock.appendChild(gradientBarDown);

    let gradientBarDownPlayed = gradientBarDown.cloneNode();
    gradientBarDownPlayed.setAttribute("id", "waveformStyleBarDownPlayed");
    gradientBarDownPlayed.innerHTML = "<stop offset='0%' stop-color='#FF5B00' stop-opacity = 0.68 />\n" + "<stop offset='100%' stop-color='#F0F0F0' stop-opacity = 1/>\n";
    defBlock.appendChild(gradientBarDownPlayed);

    let gradientBarDownHoverBack = gradientBarDown.cloneNode();
    gradientBarDownHoverBack.setAttribute("id", "waveformStyleBarDownHoverBack");
    gradientBarDownHoverBack.innerHTML = "<stop offset='0%' stop-color='#C33400' stop-opacity = 0.68 />\n" + "<stop offset='100%' stop-color='#F0F0F0' stop-opacity = 1/>\n";
    defBlock.appendChild(gradientBarDownHoverBack);

    let gradientBarDownHoverFront = gradientBarDown.cloneNode();
    gradientBarDownHoverFront.setAttribute("id", "waveformStyleBarDownHoverFront");
    gradientBarDownHoverFront.innerHTML = "<stop offset='0%' stop-color='#993300' stop-opacity = 0.68 />\n" + "<stop offset='100%' stop-color='#F0F0F0' stop-opacity = 1/>\n";
    defBlock.appendChild(gradientBarDownHoverFront);

    //Add the def block - MUST BE BEFORE the other svg to be used AND in a svg
    SVGRules.appendChild(defBlock);

    SVGRules.setAttribute("width",0);
    SVGRules.setAttribute("height",0);


    spectre.appendChild(SVGRules);


    /**Find the size and the number of bars show in the soundwave */

    /** Size
     * @Deprecated
     */

    let possibleWidthBar = reflectWaveWidth / nbBars;

    // while(possibleWidthBar <= minSizeBar){
    //   nbBars--;
    //   possibleWidthBar = reflectWaveWidth/nbBars
    // }

    //barWidth = possibleWidthBar;

    /** Number of bar */

    let numberOfBarToRemove = 0;

    while ((nbBars - numberOfBarToRemove) * barWidth > primaryWaveWidth) {
        numberOfBarToRemove++;
    }

    data = getAvgDotList(data, numberOfBarToRemove);
    nbBars -= numberOfBarToRemove;

    //Position which represent the current position of the music
    let barPlayedPosition = Math.ceil(nbBars * percentilePlayed);

    /**
     * Create the waveform
     */

    primarySVG.setAttribute("xmlns", svgns);

    //Set the rigth size of the primary waveform
    primarySVG.setAttribute("width", primaryWaveWidth);
    primarySVG.setAttribute("height", primaryWaveHeight);
    //primarySVG.setAttribute("viewBox","0 0 " + primaryWaveWidth + " " + primaryWaveHeight);
    primarySVG.classList.add("test");


    reflectSVG.setAttribute("xmlns", svgns);

    //Set the rigth size of the reflect waveform
    reflectSVG.setAttribute("width", reflectWaveWidth);
    reflectSVG.setAttribute("height", reflectWaveHeight);
    //reflectSVG.setAttribute("viewBox","0 0 " + reflectWaveWidth + " " + reflectWaveHeight);
    reflectSVG.classList.add("test");

    for (let i = 0; i < nbBars; i++) {
        /** Create and add every bar of the primary waveform*/
        let primaryRect = document.createElementNS(svgns, "rect");
        barHeight = getCorrectHeight("primary", data[i]);

        y_bar = primaryWaveHeight - barHeight;

        primaryRect.classList.add(className + "-up");
        primaryRect.setAttributeNS(null, "data_position", i);

        primaryRect.setAttributeNS(null, "x", x_bar);
        primaryRect.setAttributeNS(null, "y", y_bar);
        primaryRect.setAttributeNS(null, "width", "" + barWidth);
        primaryRect.setAttributeNS(null, "height", "" + barHeight);
        primaryRect.setAttributeNS(null, "rx", "0");
        primarySVG.appendChild(primaryRect);


        /** Create and add every bar of the reflect waveform */

        let reflectRect = document.createElementNS(svgns, "rect");
        barHeight = getCorrectHeight("reflect", data[i]);

        reflectRect.classList.add(className + "-down");

        reflectRect.setAttributeNS(null, "data_position", i);
        reflectRect.setAttributeNS(null, "x", x_bar);
        reflectRect.setAttributeNS(null, "y", 0);
        reflectRect.setAttributeNS(null, "width", "" + barWidth);
        reflectRect.setAttributeNS(null, "height", "" + barHeight);
        reflectRect.setAttributeNS(null, "rx", "0");

        reflectSVG.appendChild(reflectRect);

        /** Common part */

        //Add the width of a bar to the next position of the bar
        x_bar += barWidth;

        //check if this position have been played or not, and add the "played-flash" class
        if (i <= barPlayedPosition) {
            primaryRect.classList.add("played-flash");
            reflectRect.classList.add("played-flash");
        }

    }


    //Add to the div the primary waveform
    spectre.appendChild(primarySVG);
    //Add to the div the reflect waveform
    spectre.appendChild(reflectSVG);



    /**
     * Get the height of a bar after a resize proportionally to the waveform's div
     * @param type - primary or reflect, define which algorithm will be used
     * @param value - the height of the bar, wanted to be resize
     * @returns the transformed value or null if the type ins't both "primary" or "reflect"
     */
    function getCorrectHeight(type, value) {
        value = (value * spectre.clientHeight) / maxSizeBar;
        if (type === "primary") {
            return value * 2 / 3;
        } else if (type === "reflect") {
            return value / 3;
        } else {
            return null;
        }
    }

    /**
     * Do a recursive deep course, which do a average and remove of a number of point given
     * @param dotList - array of int, which represent the waveform
     * @param numberOfDotsRemove - Number of dot wanted to be removed
     * @returns a new array of int with the average value and the good number of dots
     */
    function getAvgDotList(dotList, numberOfDotsRemove) {
        //Do a clone of the dotList given, to not edit it
        let res = JSON.parse(JSON.stringify(dotList));

        /**
         * The recursive part of the function, will do the deep course and edit the dots
         * @param dotList - array of dot given earlier
         * @param numberOfDotsRemove - number of dots given earlier
         * @param begin - start of the section which be used
         * @param end - end od the section which be used
         */
        function transformAvgDotList(dotList, numberOfDotsRemove, begin = 0, end = dotList.length - 1) {
            //Part which do the work
            if (numberOfDotsRemove === 1) {
                if (end - begin % 2 === 0) {
                    let val1 = (dotList[end - 1] == null) ? dotList[end] : dotList[end - 1] * 0.9;
                    let val2 = (dotList[end] == null) ? dotList[end - 1] : dotList[end] * 0.9;
                    let avgValue = (val1 + val2) / 2;
                    dotList[end] = null; //Instead of removing the value, put a null, this will not edit the dotList in action and prevent some bugs
                    dotList[end - 1] = avgValue;
                } else {
                    let val1 = (dotList[begin + 1] == null) ? dotList[begin] : dotList[begin + 1] * 0.9;
                    let val2 = (dotList[begin] == null) ? dotList[begin + 1] : dotList[begin] * 0.9;
                    let avgValue = (val1 + val2) / 2;
                    dotList[begin] = null; //Instead of removing the value, put a null, this will not edit the dotList in action and prevent some bugs
                    dotList[begin + 1] = avgValue;
                }
            }
            //Call part
            else if (numberOfDotsRemove >= 2) {
                if (numberOfDotsRemove % 2 === 0) {
                    //Math.floor and Math.ceil is used to do a great division of the array
                    transformAvgDotList(dotList, numberOfDotsRemove / 2, begin, Math.floor(begin / 2) + Math.floor(end / 2));
                    transformAvgDotList(dotList, numberOfDotsRemove / 2, Math.floor(begin / 2) + Math.ceil(end / 2), end);
                } else {
                    transformAvgDotList(dotList, Math.floor(numberOfDotsRemove / 2), begin, Math.floor(begin / 2) + Math.floor(end / 2));
                    transformAvgDotList(dotList, Math.ceil(numberOfDotsRemove / 2), Math.floor(begin / 2) + Math.ceil(end / 2), end);
                }
            }
        }

        transformAvgDotList(res, numberOfDotsRemove);

        //Remove all null value
        while (res.indexOf(null) !== -1) {
            res.splice(res.indexOf(null), 1);
        }

        return res;
    }
}
