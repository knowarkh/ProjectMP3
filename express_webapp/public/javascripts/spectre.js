function createWaveForm(dotsList) {
    let spectre = document.getElementsByClassName("waveform")[0];
    let svgns = "http://www.w3.org/2000/svg";

    let primarySVG = document.createElementNS(svgns, "svg");
    let reflectSVG = document.createElementNS(svgns, "svg");

    let width_primaryWave = spectre.clientWidth;
    let height_primaryWave = Math.round(spectre.clientHeight);

    let width_reflectWave = width_primaryWave;
    let height_reflectWave = Math.round(spectre.clientHeight / 3);

    //JSON data
    let data = dotsList;

    let minSizeBar = 3;
    let nbBars = dotsList.length;

    let x_bar = 0;
    let y_bar = 0;
    let width_bar = 2.5;
    let height_bar = 0;

    /**Find the size and the number of bars show in the soundwave */

    /** Size
     * @Deprecated*/

    let possibleWidthBar = width_reflectWave / nbBars;

    // while(possibleWidthBar <= minSizeBar){
    //   nbBars--;
    //   possibleWidthBar = width_reflectWave/nbBars
    // }

    //width_bar = possibleWidthBar;

    /** Number of bar */

    let numberOfBarToRemove = 0;

    while((nbBars - numberOfBarToRemove) * width_bar > width_primaryWave ){
        numberOfBarToRemove++;
    }

    data = getAvgDotList(data, numberOfBarToRemove);
    nbBars -= numberOfBarToRemove;



    primarySVG.setAttribute("xmlns", svgns);
    //Set the rigth size of the primary waveform

    primarySVG.setAttribute("width", width_primaryWave);
    primarySVG.setAttribute("height", height_primaryWave);

    //Create and add every string of the primary waveform

    for (let i = 0; i < nbBars; i++) {
        let newRect = document.createElementNS(svgns, "rect");
        //  height_bar = getRandomInt(height_primaryWave);
        height_bar = getCorrectHeight("primary", data[i]);


        y_bar = height_primaryWave - height_bar;
        newRect.setAttributeNS(null, "x", x_bar);
        newRect.setAttributeNS(null, "y", y_bar);
        newRect.setAttributeNS(null, "width", "" + width_bar);
        newRect.setAttributeNS(null, "height", "" + height_bar);
        newRect.setAttributeNS(null, "rx", "0");
        newRect.setAttributeNS(null, "style", "fill:#333333; stroke:#CCCCCC; stroke-width:0.5");
        x_bar += width_bar;
        primarySVG.appendChild(newRect);
    }
    spectre.appendChild(primarySVG);

    //Reflect part
    x_bar = 0;
    y_bar = 0;

    reflectSVG.setAttribute("xmlns", svgns);
    //Set the rigth size of the reflect waveform

    reflectSVG.setAttribute("width", width_reflectWave);
    reflectSVG.setAttribute("height", height_reflectWave);

    //Create and add every string of the reflect waveform

    for (let i = 0; i < nbBars; i++) {
        let newRect = document.createElementNS(svgns, "rect");
        //height_bar = getRandomInt(height_reflectWave * 2 / 3);
        height_bar = getCorrectHeight("reflect", data[i]);

        //y_bar = height_reflectWave - height_bar;
        newRect.setAttributeNS(null, "x", x_bar);
        newRect.setAttributeNS(null, "y", y_bar);
        newRect.setAttributeNS(null, "width", "" + width_bar);
        newRect.setAttributeNS(null, "height", "" + height_bar);
        newRect.setAttributeNS(null, "rx", "0");
        newRect.setAttributeNS(null, "style", "fill:#888888; stroke:#CCCCCC; stroke-width:0.5");
        x_bar += width_bar;
        reflectSVG.appendChild(newRect);
    }
    spectre.appendChild(reflectSVG);


    function getCorrectHeight(type, value) {
        if (value > height_primaryWave){
            //let ratio = 1 /(value / height_primaryWave);


            value = value * ratio * 0.8;
        }
        if (type === "primary") {
            return value;
        } else if (type === "reflect") {
            return value / 3;
        } else {
            return null;
        }
    }


    function getAvgDotList(dotList, numberOfDotsRemove){
        let res = JSON.parse(JSON.stringify(dotList));
        function transformAvgDotList(dotList, numberOfDotsRemove, begin = 0, end = dotList.length-1) {
            if (numberOfDotsRemove === 1) {
                let val1 = (dotList[end - 1] == null)?dotList[end] : dotList[end - 1]*0.9;
                let val2 = (dotList[end] == null)? dotList[end - 1] : dotList[end]*0.9;
                let avgValue = (val1 + val2) / 2 ;
                dotList[end] = null;
                dotList[end - 1] = avgValue;
            }
            else if(numberOfDotsRemove >= 2) {
                if (numberOfDotsRemove % 2 === 0) {
                    transformAvgDotList(dotList, numberOfDotsRemove / 2, begin, Math.floor(begin/2) + Math.floor(end / 2));
                    transformAvgDotList(dotList, numberOfDotsRemove / 2, Math.floor(begin/2) + Math.ceil(end / 2), end);
                } else {
                    transformAvgDotList(dotList, Math.floor(numberOfDotsRemove / 2), begin, Math.floor(begin/2) + Math.floor(end / 2));
                    transformAvgDotList(dotList, Math.ceil(numberOfDotsRemove / 2), Math.floor(begin/2) + Math.ceil(end / 2), end);
                }
            }
        }
        transformAvgDotList(res, numberOfDotsRemove);
        while(res.indexOf(null) !== -1){
            res.splice(res.indexOf(null),1 );
        }

        return res;
    }
}
