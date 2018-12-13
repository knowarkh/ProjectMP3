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
    let data = deleteOdd(dotsList);

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

function getRandomInt(max) {
    return Math.floor(Math.random()*Math.floor(max))+1;
}
//
// function getData() {
//     let json = {"version":2,
//     "channels":1,
//     "sample_rate":48000,
//     "samples_per_pixel":48000,
//     "bits":8,
//     "length":451,
//     "data":[-6,6,-8,9,-9,7,-9,9,-5,5,-11,10,-12,11,-13,10,-8,8,-6,6,-12,11,-10,8,-13,11,-13,11,-9,8,-10,9,-8,9,-7,6,-5,6,-5,4,-6,5,-5,5,-6,5,-6,7,-5,6,-4,4,-5,4,-7,7,-6,8,-5,6,-5,5,-8,7,-8,9,-7,7,-5,5,-5,4,-5,5,-4,4,-2,2,-3,3,-4,3,-5,5,-6,7,-6,6,-7,7,-7,8,-11,11,-8,8,-5,4,-7,7,-7,8,-4,2,-1,2,-3,3,-10,11,-13,14,-8,8,-7,8,-3,3,-6,6,-5,5,-2,2,-4,4,-4,3,-2,1,0,0,0,0,-1,1,-2,2,-2,2,-2,1,-2,2,-6,5,-10,9,-8,8,-7,5,-7,7,-9,8,-9,8,-5,6,-4,3,-2,3,-5,5,-6,6,-7,8,-8,9,-7,7,-4,4,-3,3,-8,8,-8,10,-7,8,-5,7,-8,10,-9,9,-11,9,-5,4,-6,6,-8,7,-7,7,-7,7,-12,12,-15,15,-16,14,-19,19,-36,28,-26,24,-28,25,-24,26,-14,15,-21,18,-26,27,-25,29,-16,19,-29,23,-30,29,-19,21,-18,18,-18,19,-30,28,-20,20,-25,24,-28,26,-22,25,-25,25,-27,26,-17,15,-23,20,-27,28,-21,19,-15,13,-29,26,-25,26,-31,27,-16,19,-32,29,-35,31,-60,35,-37,40,-9,11,-11,11,-13,12,-10,11,-12,9,-8,8,-8,10,-11,13,-9,9,-7,6,-7,6,-8,7,-11,9,-13,14,-11,12,-12,13,-9,7,-5,7,-12,15,-10,11,-10,9,-9,8,-8,10,-8,10,-11,11,-9,7,-8,11,-9,9,-10,10,-12,10,-15,14,-22,24,-25,23,-19,22,-33,30,-28,29,-29,23,-18,21,-25,26,-30,33,-32,28,-23,23,-21,24,-33,32,-27,31,-30,30,-12,13,-21,20,-29,30,-22,25,-23,22,-25,23,-23,24,-26,31,-19,23,-25,20,-28,24,-22,24,-23,19,-11,13,-25,19,-23,25,-25,23,-11,12,-30,23,-35,35,-33,33,-33,33,-11,10,-10,10,-7,8,-11,11,-7,6,-11,9,-9,9,-10,9,-10,10,-14,13,-13,15,-8,9,-10,9,-8,9,-10,12,-11,10,-8,8,-3,4,-6,6,-9,8,-7,8,-9,9,-8,7,-6,7,-6,6,-8,9,-8,8,-10,12,-10,10,-8,8,-6,7,-10,8,-12,11,-9,9,-36,33,-29,26,-27,28,-22,24,-22,22,-30,35,-22,17,-15,18,-14,18,-21,23,-13,12,-13,11,-14,12,-11,12,-10,11,-10,11,-12,12,-25,21,-25,29,-27,22,-26,33,-24,24,-22,21,-18,22,-18,26,-13,16,-15,13,-16,19,-14,16,-17,17,-12,16,-24,17,-24,27,-17,15,-8,10,-13,12,-11,10,-12,10,-8,8,-14,13,-11,12,-12,13,-11,14,-13,16,-14,12,-14,12,-13,11,-20,20,-25,24,-29,26,-41,37,-38,42,-24,31,-33,37,-24,28,-8,8,-4,5,-6,7,-6,5,-4,6,-11,9,-13,16,-13,13,-12,11,-8,9,-13,14,-14,17,-11,14,-12,10,-6,8,-9,9,-10,13,-14,16,-18,20,-28,24,-26,25,-17,19,-15,15,-19,14,-13,12,-18,13,-10,8,-13,12,-15,14,-14,14,-13,13,-9,9,-14,16,-15,12,-17,17,-27,29,-31,31,-22,22,-28,33,-35,33,-31,28,-26,31,-22,21,-27,20,-26,29,-31,28,-21,21,-18,19,-30,25,-25,31,-23,24,-14,18,-25,23,-29,29,-22,22,-30,26,-30,26,-24,24,-29,27,-19,19,-20,19,-25,23,-30,31,-31,26,-17,18,-21,24,-22,22,-24,28,-15,17,-23,25,-39,40,-37,42,-40,42,-42,40,-52,61,-56,76,-49,48,-41,45,-47,50,-52,49,-60,53,-42,36,-6,9,-12,14,-15,15,-15,13,-11,12,-14,17,-20,19,-18,17,-12,16,-8,8,-9,9,-9,11,-17,15,-26,30,-33,37,-42,37,-45,39,-47,48,-53,60,-47,42,-38,39,-38,41,-46,49,-38,43,-54,41,-37,46,-45,36,-38,37,-31,34,-31,29,-37,35,-36,33,-29,30,-27,26,-44,39,-40,39,-33,37,-11,10,-22,19,-29,29,-46,44,-39,51,-55,66,-57,53,-55,57,-26,26,-44,54,-49,41,-39,45,-24,25,-35,34,-32,31,-33,31,-9,8,-13,17,-23,24,-40,29,-40,43,-51,49,-58,50,-63,59,-57,48,-51,55,-49,56,-44,46,-49,55,-75,65,-68,64,-72,75,-76,64,-3,3,0,0,0,0]};
//     return deleteOdd(json.data);
// }

function deleteOdd(data) {
    //console.log(data.length);
    let tableau = [];
    for (let i = 1; i < data.length - 1; i = i + 2) {
        //console.log(data[i]);
        tableau.push(data[i]);
    }
    return tableau;
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
