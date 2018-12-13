// var artiste = document.querySelector('.artiste');
// var titre = document.querySelector('.titre');

// var xhttp = new XMLHttpRequest();
// xhttp.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//        // Typical action to be performed when the document is ready:
//        res = JSON.parse( xhttp.responseText )[0];
//        console.log(res);
//
//
//         var artiste = document.querySelector('.artiste');
//         var titre = document.querySelector('.titre');
//         var like = document.querySelector('.like');
//         var nbLecture = document.querySelector('.nb-lectures');
//         var dureeMax = document.querySelector('.total');
//
//        artiste.innerHTML = res["artiste"];
//        titre.innerHTML = res["titre"];
//        like.innerHTML = res["nbLike"];
//        nbLecture.innerHTML = res["nbEcoute"];
//        dureeMax.innerHTML = calculeDuree(res["duree"]);
//     }
// };
// xhttp.open("GET", "http://localhost:3000/music/find", true);
// xhttp.send();
requestGet("http://localhost:3000/music/find",function(musics){
  res = JSON.parse( musics )[0];
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

  createWaveForm(res['listePoint']);
})
