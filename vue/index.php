<?php
require '../connexion/Connexion.php';
$db=\connexion\Connexion::getInstance();
?>
<html>
<head>
<title>Index
</title>
</head>
<body>

Ajouter un MP3:
<form id="form1" name='form1' action="" method="post">

         <input type='hidden' name='id' id='id' value="" />

          <table> 

          <tr>

            <td>Fichier MP3:<input type='file' name='mp3' id='mp3' placeholder="Fichier mp3" /></td>
			<td>Couverture album:<input type='file' name='cover' id='cover' placeholder="cover" /></td>
			
			</tr>
           <tr>
			<td><input type='text' name='titre' id='titre' placeholder="titre" /></td>
			<td><input type='text' name='annee' id='annee' placeholder="annee" /></td>
			<td><input type='text' name='duree' id='duree' placeholder="duree" /></td>
			
		   </tr>
           <tr>
			<td><input type='text' name='cheminMp3' id='cheminMp3' placeholder="cheminMp3" /></td>
			<td><input type='text' name='idAlbum' id='idAlbum' placeholder="idAlbum" /></td>
			 <td><input type='text' name='titreAlbum' id='titreAlbum' placeholder="titreAlbum" /></td>
			</tr>
           <tr>
		   <td><input type='text' name='idArtiste' id='idArtiste' placeholder="idArtiste" /></td>
		   <td><input type='text' name='nomArtiste' id='nomArtiste' placeholder="nomArtiste" /></td>
		   <td><input type='text' name='idPlaylist' id='idPlaylist' placeholder="idPlaylist" /></td>
		   </tr>
           <tr>
		   <td><input type='text' name='nomPlaylist' id='nomPlaylist' placeholder="nomPlaylist" /></td>
		    <td><input type='text' name='idUtilisateur' id='idUtilisateur' placeholder="idUtilisateur" /></td>
			<td><input type='text' name='tokenUtilisateur' id='tokenUtilisateur' placeholder="tokenUtilisateur" /></td>
			</tr>
           <tr>
            <td><input type="text" name="genre" id="genre" list="genre" placeholder="genre musical"></td>
            <datalist id="genre">
                <option value="Rock & roll">
                <option value="Classique">
                <option value="Reggae">
                <option value="Hard Rock">
                <option value="Electro">
            </datalist>

		   </tr>
           <tr>
		   
			<td><input class='btn' type='submit' name='btn' id='btn' value="Add MP3" /></td>

           </tr>

        </table>

    </form>
<?php
if(isset($_POST['btn'])){
//var_dump($_POST['mp3']);
	if($_POST['mp3']==null){
		echo("validé");
		if(isset($_POST['titre'])){
			$titre=htmlspecialchars($_POST['titre']);
		}
		if(isset($_POST['annee'])){
			$annee=htmlspecialchars($_POST['annee']);
		}
		if(isset($_POST['duree'])){
			$duree=htmlspecialchars($_POST['duree']);
		}
		if(isset($_POST['cheminMp3'])){
			$cheminMp3=htmlspecialchars($_POST['cheminMp3']);
		}
		if(isset($_POST['idAlbum'])){
			$idAlbum=htmlspecialchars($_POST['idAlbum']);
		}
		if(isset($_POST['titreAlbum'])){
			$titreAlbum=htmlspecialchars($_POST['titreAlbum']);
		}
		if(isset($_POST['idArtiste'])){
			$idArtiste=htmlspecialchars($_POST['idArtiste']);
		}
		if(isset($_POST['nomArtiste'])){
			$nomArtiste=htmlspecialchars($_POST['nomArtiste']);
		}
		if(isset($_POST['idPlaylist'])){
			$idPlaylist=htmlspecialchars($_POST['idPlaylist']);
		}
		if(isset($_POST['nomPlaylist'])){
			$nomPlaylist=htmlspecialchars($_POST['nomPlaylist']);
		}
		if(isset($_POST['idUtilisateur'])){
			$idUtilisateur=htmlspecialchars($_POST['idUtilisateur']);
		}
		if(isset($_POST['tokenUtilisateur'])){
			$tokenUtilisateur=htmlspecialchars($_POST['tokenUtilisateur']);
		}
	}
	}else{
		echo("vous n'avez pas choisis de fichier MP3");
	}





?>
</body>
</html>
