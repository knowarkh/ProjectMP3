function createWaveForm(dotsList) {
    let spectre = document.getElementsByClassName("waveform")[0];
    let svgns = "http://www.w3.org/2000/svg";

    let primarySVG = document.createElementNS(svgns, "svg");
    let reflectSVG = document.createElementNS(svgns, "svg");

    let width_primaryWave = spectre.clientWidth;
    let height_primaryWave = Math.round(spectre.clientHeight * 2/3);

    let width_reflectWave = width_primaryWave;
    let height_reflectWave = Math.round(spectre.clientHeight/3);

    //JSON data
    let data = dotsList;

    let minSizeBar = 2;
    let nbBars = data.length;

    let x_bar = 0;
    let y_bar = 0;
    let width_bar;
    let height_bar = 0;

    let possibleWidthBar = width_reflectWave/nbBars;

    while(possibleWidthBar <= minSizeBar){
      nbBars--;
      possibleWidthBar = width_reflectWave/nbBars
    }

    width_bar = possibleWidthBar;


    primarySVG.setAttribute("xmlns", svgns);
    //Set the rigth size of the primary waveform

    primarySVG.setAttribute("width", width_primaryWave);
    primarySVG.setAttribute("height", height_primaryWave);

    //Create and add every string of the primary waveform

    for (var i = 0; i<nbBars; i++){
        var newRect = document.createElementNS(svgns, "rect");
      //  height_bar = getRandomInt(height_primaryWave);
        height_bar = getCorrectHeight("primary",data[i]);


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

    //Reflect part
    x_bar = 0;
    y_bar = 0;

    reflectSVG.setAttribute("xmlns", svgns);
    //Set the rigth size of the reflect waveform

    reflectSVG.setAttribute("width", width_reflectWave);
    reflectSVG.setAttribute("height", height_reflectWave);

    //Create and add every string of the reflect waveform

    for (var i = 0; i<nbBars; i++){
        var newRect = document.createElementNS(svgns, "rect");
        //height_bar = getRandomInt(height_reflectWave * 2 / 3);
        height_bar = getCorrectHeight("reflect",data[i]);

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

function getCorrectHeight(type, value){
  if(value > 50)
    value = value * 0.8;
  if(type == "primary"){
    return value * 2 / 3;
  }else if(type == "reflect"){
    return value / 3;
  }else{
    return null;
  }
}
