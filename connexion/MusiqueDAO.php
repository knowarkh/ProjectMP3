<?php
namespace connexion\DAO
{
include ("../metier/Musique.php");
   use metier;

    class MusiqueDAO extends \DAO
    {

        function __construct()
        {
            parent::__construct("id_music", "music");
        }
		
		//TODO CRUD
		public function create($objet){
			
			$collection = \connexion\Connexion::getInstance();
			$insertOneResult = $collection->insertOne([
			'titre' => $object->getTitre(),
			'annee' => $object->getAnnee() ,
			'duree' => $object->getDuree(),
			'nbEcoute' => $object->getNbEcoute(),
			'nbLike' => $object->getNbLike(),
			'nbPoint' => $object->getNbPoint(),
			'nbPartage' => $object->getNbPartage(),
			'cheminMp3' => $object->getCheminMp3(),
			'cover' => $object->getCover(),
			'album' => $object->getAlbum(),
			'artiste' => $object->getArtiste(),
			'genre' => $object->getGenre(),
]);
			
	    }
	}
    }
)
			
		}
		
	}
}
?>