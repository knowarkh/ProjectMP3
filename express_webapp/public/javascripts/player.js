


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
  let music = new Music(res);
  console.log(music);
  music.play();
})
