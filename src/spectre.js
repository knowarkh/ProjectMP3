function createWaveForm() {
    let spectre = document.getElementsByClassName("waveform")[0];
    let svgns = "http://www.w3.org/2000/svg";

    let primarySVG = document.createElementNS(svgns, "svg");
    let reflectSVG = document.createElementNS(svgns, "svg");

    let width_primaryWave = spectre.clientWidth;
    let height_primaryWave = Math.round(spectre.clientHeight * 2/3);

    let width_reflectWave = width_primaryWave;
    let height_reflectWave = Math.round(spectre.clientHeight/3);

    let x_bar = 0;
    let y_bar = 0;
    let width_bar = width_reflectWave / 400;
    let height_bar = 0;

    primarySVG.setAttribute("xmlns", svgns);
    //Set the rigth size of the primary waveform

    primarySVG.setAttribute("width", width_primaryWave);
    primarySVG.setAttribute("height", height_primaryWave);

    //Create and add every string of the primary waveform

    for (var i = 0; i<400; i++){
        var newRect = document.createElementNS(svgns, "rect");
        height_bar = getRandomInt(height_primaryWave);
        y_bar = height_primaryWave - height_bar;
        newRect.setAttributeNS(null, "x", x_bar);
        newRect.setAttributeNS(null, "y", y_bar );
        newRect.setAttributeNS(null, "width", ""+ width_bar);
        newRect.setAttributeNS(null, "height", ""+ height_bar);
        newRect.setAttributeNS(null, "rx", "0");
        newRect.setAttributeNS(null, "style", "fill:#333333; stroke:#CCCCCC; stroke-width:0.5");
        x_bar+=width_bar;
        primarySVG.appendChild(newRect);
    }
    spectre.appendChild(primarySVG);

    x_bar = 0;
    y_bar = 0;

    reflectSVG.setAttribute("xmlns", svgns);
    //Set the rigth size of the reflect waveform

    reflectSVG.setAttribute("width", width_reflectWave);
    reflectSVG.setAttribute("height", height_reflectWave);

    //Create and add every string of the reflect waveform

    for (var i = 0; i<400; i++){
        var newRect = document.createElementNS(svgns, "rect");
        height_bar = getRandomInt(height_reflectWave * 2 / 3);
        //y_bar = height_reflectWave - height_bar;
        newRect.setAttributeNS(null, "x", x_bar);
        newRect.setAttributeNS(null, "y", y_bar );
        newRect.setAttributeNS(null, "width", ""+ width_bar);
        newRect.setAttributeNS(null, "height", ""+ height_bar);
        newRect.setAttributeNS(null, "rx", "0");
        newRect.setAttributeNS(null, "style", "fill:#888888; stroke:#CCCCCC; stroke-width:0.5");
        x_bar+=width_bar;
        reflectSVG.appendChild(newRect);
    }
    spectre.appendChild(reflectSVG);


}

function getRandomInt(max) {
    return Math.floor(Math.random()*Math.floor(max))+1;
}

createWaveForm();
