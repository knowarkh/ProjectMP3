<?php 
namespace connexion;


require  ('PDOMongo.php');

class Connexion extends PDOMongo{
	
	private static $connexion;

	public function __construct(){
		parent::__construct($host = 'ubsbase04:27017', $database = 'PRJSYNTH_2018_3PTLX1_C');
	//	$this->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
		//$this->setAttribute(\PDO::ATTR_DEFAULT_FETCH_MODE, \PDO::FETCH_ASSOC);
		//echo('db connect');
	}
	
	public static function getInstance(){
		if(!self::$connexion){
			self::$connexion=new Connexion();
		}	
		return self::$connexion;
	}

	public static function close(){
		self::$connexion=null;
	}
}
?>
