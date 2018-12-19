<?php 
namespace connexion\DAO;

abstract class DAO{
	
	include ("Connexion.php");
    //include ("../metier/Metier.php");

    abstract class DAO
    {

        abstract function create($objet);

        abstract function read($key);

        abstract function update($objet);

        abstract function delete($key);

        protected $key;

        protected $table;

        function __construct($key, $table)
        {
            $this->key = $key;
            $this->table = $table;
        }
	
}