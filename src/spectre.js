function createWaveForm() {
    var spectre = document.getElementById("spectre");
    var svgns = "http://www.w3.org/2000/svg";
    var newSVG = document.createElementNS(svgns, "svg");
    newSVG.setAttribute("xmlns", svgns);
    newSVG.setAttribute("width", "1400");
    newSVG.setAttribute("height", "800");

    let x = 0;
    let y = 0;
    let width = 3;
    let height = 0;


    for (var i = 0; i<400; i++){
        var newRect = document.createElementNS(svgns, "rect");
        height = getRandomInt(200);
        newRect.setAttributeNS(null, "x", x);
        newRect.setAttributeNS(null, "y", y);
        newRect.setAttributeNS(null, "width", ""+width);
        newRect.setAttributeNS(null, "height", ""+height);
        newRect.setAttributeNS(null, "rx", "5");
        newRect.setAttributeNS(null, "style", "fill:#1d9fcc; stroke:#cc7c29");
        x+=width;
        newSVG.appendChild(newRect);
    }
    spectre.appendChild(newSVG);

}

function getRandomInt(max) {
    return Math.floor(Math.random()*Math.floor(max))+1;
}

createWaveForm();