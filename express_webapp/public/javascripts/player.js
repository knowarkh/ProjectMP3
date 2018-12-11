// var artiste = document.querySelector('.artiste');
// var titre = document.querySelector('.titre');

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
       res = JSON.parse( xhttp.responseText )[0];
       console.log(res);


        var artiste = document.querySelector('.artiste');
        var titre = document.querySelector('.titre');
        var like = document.querySelector('.like');
        var nbLecture = document.querySelector('.nb-lectures');
        var dureeMax = document.querySelector('.total');

       artiste.innerHTML = res["artiste"];
       titre.innerHTML = res["titre"];
       like.innerHTML = res["nbLike"];
       nbLecture.innerHTML = res["nbEcoute"];
       dureeMax.innerHTML = calculeDuree(res["duree"]);
    }
};
xhttp.open("GET", "http://localhost:3000/music/find", true);
xhttp.send();


function calculeDuree(duree){
    var minutes = Math.floor(duree / 60);
    var seconds = duree - minutes * 60;
    return minutes + ":" + str_pad_left(seconds,'0',2);
}

function str_pad_left(string,pad,length) {
    return (new Array(length+1).join(pad)+string).slice(-length);
}
