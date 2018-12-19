<?php
namespace metier\musique
{


    class Musique
    {
		private $idpPiste;
		private $titre;
        private $annee;
		private $duree;
		private $nbEcoute;
		private $nbLike;
		private $nbPoint=[];
		private $nbPartage;
		private $cheminMp3;
		private $cover;
		private $album;
		private $artiste;
		private $genre=[];
		
		public function __construct($idPiste, $titre, $annee, $duree, $nbEcoute, $nbLike, $nbPoint, $nbPartage, $cheminMp3, $cover, $album, $artiste, $genre)
        {
            $this->idPiste=$idPiste;
			$this->titre = $titre;
            $this->annee = $annee;
			$this->duree = $duree;
			$this->nbEcoute = $nbEcoute;
			$this->nbLike = $nbLike;
			$this->nbPoint = $nbPoint;
			$this->nbPartage = $nbPartage;
			$this->cheminMp3 = $cheminMp3;
			$this->cover = $cover;
			$this->album = $album;
			$this->artiste = $artiste;
			$this->genre = $genre;
			
        }
		//TODO constr +attribut + getter & setter + to_string()
		
		/* static function underscore($string){
		$rep=preg_replace('/[A-Z]/','_$0', $string);
		$rep=strtolower($rep);
		$rep=trim($rep,$rep{0});
		return $rep;
	} */
		
		public function __call($nomProc, $paramAtt){
		$rep="";
		$test=substr($nomProc, 0,3);
		$var=substr($nomProc, 3);
		if($test=='set'){
		
		$this->values[$var]=$paramAtt[0];
		
		}elseif($test=='get'){
				
			return $this->values[$var];
			
		}
		else{
			echo('erreur');
		
		}
	}
	
	public function __toString()
        {
            $rep = "<div class=\"Musique\">$this->idpPiste $this->titre $this->annee $this->duree  $this->nbEcoute $this->nbLike $this->nbPoint $this->nbPartage $this->cheminMp3 $this->cover $this->album $this->artiste $this->genre</div>";
            return $rep;
        }
	
	
	}
}