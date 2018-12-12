function createWaveForm() {
    let spectre = document.getElementsByClassName("waveform")[0];
    let svgns = "http://www.w3.org/2000/svg";
    let newSVG = document.createElementNS(svgns, "svg");

    let width_wave = spectre.clientWidth;
    let height_wave = spectre.clientHeight;

    let x_bar = 0;
    let y_bar = 0;
    let width_bar = 5;
    let height_bar = 0;

    newSVG.setAttribute("xmlns", svgns);
    //Set the rigth size of the waveform

    newSVG.setAttribute("width", width_wave);
    newSVG.setAttribute("height", height_wave);

    //Create and add every string of the waveform

    for (var i = 0; i<400; i++){
        var newRect = document.createElementNS(svgns, "rect");
        height_bar = getRandomInt(height_wave);
        y_bar = height_wave - height_bar;
        newRect.setAttributeNS(null, "x", x_bar);
        newRect.setAttributeNS(null, "y", y_bar );
        newRect.setAttributeNS(null, "width", ""+ width_bar);
        newRect.setAttributeNS(null, "height", ""+ height_bar);
        newRect.setAttributeNS(null, "rx", "5");
        newRect.setAttributeNS(null, "style", "fill:#1d9fcc; stroke:#cc7c29");
        x_bar+=width_bar;
        newSVG.appendChild(newRect);
    }
    spectre.appendChild(newSVG);

}

function getRandomInt(max) {
    return Math.floor(Math.random()*Math.floor(max))+1;
}

createWaveForm();
