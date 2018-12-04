// Chemin du dossier "swf"
soundManager.url = 'swf/';
// DebugMode désactivé
soundManager.debugMode = false;
// Attendre le chargement de la page pour charger soundManager
soundManager.waitForWindowLoad = true;

soundManager.onerror = function () { // En cas d'erreur
    alert("Fasma a rencontré une erreur.");
}

var playlist = []; // Tableau pour contenir la playlist
var current = 0; // Indice du son courant (dans playlist[]);
var act_vol = soundManager.defaultOptions.volume; // Variable pour le volume actuel, initialisée au volume par défaut de SoundManager
var loop = "none"; // Mode de répétition séléctionné

// Indicateurs booléens du clic sur Previous et Next
var next = false;
var prev = false;


soundManager.onload = function () { // On attend tout d'abord le chargement

    //spectre à faire
    var barre = document.getElementById("barre"); // On récupère la barre d'avancement,
    var chargement = document.getElementById("chargement"); // la barre de chargement,
    var cpt = document.getElementById("cpt"); // le compteur de secondes,
    //à modifier
    var vol = document.getElementById("volume"); // la barre de volume,
    var list = document.getElementById("playlist").getElementsByTagName("a"); // balises <a> de la playlist.

    for (var i = 0; i < list.length; i++) { // On parcourt la liste

        list[i].rel = i; // On renseigne un indice dans l'attribut rel de chaque <a>
        //à revoir
        var sp = document.createElement("span"); // On crée un élément span
        list[i].parentNode.insertBefore(sp, list[i]); // qu'on ajoute avant chaque <a> de la liste

        list[i].onclick = function () { // On crée une fonction onclick sur chaque lien :
            soundManager.stopAll(); // On stoppe tous les sons
            current = this.rel; // On met en "son courant" celui cliqué (grâce à l'indice du rel)
            lire_current(); // On appelle la fonction lire_current() pour lancer la lecture
            return false; // On renvoie faux pour empêcher les liens de rediriger (ils ne servent qu'aux sans-js)
        };
        (function (titre) {
            playlist[i] = soundManager.createSound( // On crée un son pour chaque lien de la playlist
                {
                    id: "piste" + i, // Id arbitraire : piste0, piste1, etc.
                    url: list[i].href, // L'url de chaque son est le href de chaque lien

                    whileplaying: function () { // Pendant la lecture :

                        /*var prop = null;
                        var data = '';
                        var id3 = document.getElementById("tagid3");
                        for (prop in this.id3) {
                            data += prop + ': ' + this.id3[prop] + ',';
                        }
                        id3.innerHTML = data;*/

                        act_sec = parseInt(this.position / 1000 % 60, 10); // Calcul du nb de secondes écoulées
                        if (act_sec < 10) {
                            act_sec = "0" + act_sec;
                        } // (Ajout d'un 0 si <10)
                        act_min = parseInt(this.position / 1000 / 60, 10); // Calcul du nb de minutes écoulées
                        tot_sec = parseInt(this.duration / 1000 % 60, 10); // Calcul du nb de secondes total du son
                        if (tot_sec < 10) {
                            tot_sec = "0" + tot_sec;
                        } // (Ajout d'un 0 si <10)
                        tot_min = parseInt(this.duration / 1000 / 60, 10); // Calcul du nb de minutes total du son
                        cpt.innerHTML = act_min + ":" + act_sec + " / " + tot_min + ":" + tot_sec; // On affiche ces valeurs dans le div "cpt"
                        vol.title = "Volume : " + act_vol; // On ajuste aussi le title du volume
                    },

                    onstop: function () { // Quand on fait "stop"
                        playlist[current].unload(); // On "décharge" le son, pour ne pas occuper trop de mémoire
                        titre.previousSibling.innerHTML = ""; // On enlève l'image du span
                    },

                    onfinish: function () { // A la fin d'un son
                        playlist[current].unload(); // On "décharge" le son, pour ne pas occuper trop de mémoire
                        titre.previousSibling.innerHTML = ""; // On enlève l'image du span

                        if (!prev && !next) { // Si la fin du son n'est pas due à un clic sur Previous ou Next, on regarde le mode de répétition choisi
                            if (loop == "one") { // Si "Répéter un titre"
                                lire_current(); // On (re)lance la lecture du son actuel
                            } else if (loop == "all") { // Si "Répéter la playlist"
                                bouton_next(); // On appelle bouton_next() (On passe au titre suivante)
                            } else { // Si "Ne pas répéter"
                                if (current < playlist.length - 1) { // Si on n'est pas encore à la fin de la playlist
                                    bouton_next(); // On passe au titre suivant
                                } else { // Sinon
                                    current = 0; // On réinitialise juste le titre courant.
                                }
                            }
                        }
                    },

                    //Ajouter un span pour nom artiste - titre
                    //id3 : métadonnées du mp3
                    onid3: function () { // A l'arrivée des Tags ID3
                        //soundManager._writeDebug('sound '+this.id+' ID3 data received');
                        var id3 = document.getElementById("tagid3");
                        var chaine_tag = ""; // On crée une chaîne vide
                        if (this.id3["artist"]) { // Et on y insère les différents tag en vérifiant leur existence au préalable.
                            chaine_tag += "Artiste : " + this.id3["artist"] + "<br />";
                        }
                        if (this.id3["album"]) {
                            chaine_tag += "Album : " + this.id3["album"] + "<br />";
                        }
                        if (this.id3["songname"]) {
                            chaine_tag += "Titre : " + this.id3["songname"];
                        }
                        id3.innerHTML = chaine_tag; // On insère finalement la chaîne dans la page
                    }
                });
        })(list[i]);
    }
}

function lire_current() { // Fonction de démarrage de la lecture
    soundManager.stopAll(); // On stoppe tous les sons

    playlist[current].setPosition(0); // On réinitialise la position du son courant
    playlist[current].setVolume(act_vol); // On applique le volume actuel
    playlist[current].play(); // On lance la lecture
    document.getElementById("play").innerHTML = "PAUSE"; // On change le title également.
}

function bouton_play() { // Appui sur le bouton "play"
    if (playlist[current].playState) { // On teste si un titre est en cours de lecture/pause. Si oui
        b_play = document.getElementById("play"); // On récupère le bouton "play"
        if (playlist[current].paused) { // S'il est en pause
            playlist[current].resume(); // On le relance
            b_play.innerHTML = "PAUSE"; // On change le title également
        } else { // S'il est en lecture
            playlist[current].pause(); // On le met en pause
            b_play.innerHTML = "PLAY"; // On change le title également
        }
    } else { // Si le son est stoppé
        lire_current(); // On démarre la lecture
    }
}

function bouton_stop() { // Appui sur le bouton "stop"
    playlist[current].stop(); // On stoppe le son courant
    document.getElementById("play").innerHTML = "PLAY"; // On change le title également
    document.getElementById("cpt").innerHTML = "0:00 / 0:00"; // On réinitialise le compteur de temps
}

function bouton_previous() { // Appui sur le bouton "précédent"
    prev = true; // active le booléen prev
    current--; // On recule d'un titre
    if (current < 0) {
        current = playlist.length - 1;
    } // Si on a trop reculé, on prend le dernier titre
    lire_current(); // On lance la lecture
    prev = false; // désactive le booléen
}

function bouton_next() { // Appui sur le bouton "suivant"
    next = true; // active le booléen next
    current++; // On avance d'un titre
    if (current >= playlist.length) {
        current = 0;
    } // Si on a trop avancé, on prend le premier titre
    lire_current(); // On lance la lecture
    next = false; // désactive le booléen
}

function bouton_loop() { // Appui sur le bouton "Répéter"
    var b_loop = document.getElementById("loop");
    if (loop == "one") { // Si il est sur "Répéter un titre"
        loop = "all"; // on passe à "Répéter la playlist"
        b_loop.innerHTML = "Ne pas répéter";
    } else if (loop == "all") { // S'il est sur "Répéter la playlist"
        loop = "none"; // On passe à "Ne pas répéter"
        b_loop.innerHTML = "Répéter le titre";
    } else { // Et enfin s'il est sur "Ne pas répéter"
        loop = "one"; // On passe à "Répéter un titre"
        b_loop.innerHTML = "Répéter la playlist";
    }
}

function bouton_toggleMute() { // Appui sur le bouton "Muet"
    var bouton_muet = document.getElementById("mute");
    if (bouton_muet.alt == "muet") { // S'il est en sonore
        soundManager.mute(); // On coupe le son
        bouton_muet.alt = "son"; // On change les attributs alt, title et src
        bouton_muet.innerHTML = "NO MUTE";
    } else { // S'il est en muet
        soundManager.unmute(); // On remet le son
        bouton_muet.alt = "muet"; // On change les attributs alt, title et src
        bouton_muet.innerHTML = "MUTE";
    }
}

function bouton_volume(aug) { // Appui sur les boutons du volume
    if (aug) { // Si appui sur "+"
        if (act_vol < 100) { // Si on peut encore augmenter
            act_vol++; // On augmente
            timer = setTimeout(bouton_volume, 50, true); // Et on relance la fonction
        }
    } else { // Si appui sur "-"
        if (act_vol > 0) { // Si on peut encore diminuer
            act_vol--; // On diminue
            timer = setTimeout(bouton_volume, 50, false); // Et on relance la fonction
        }
    }
    playlist[current].setVolume(act_vol); // On applique le volume au titre courant
    vol.title = "Volume : " + act_vol; // et son title
}


//Gestion des barres :
var v_clic = false; // Indicateur booléen du clic sur la barre de volume
var b_clic = false; // Indicateur booléen du clic sur la barre d'avancement
var v_x; // Variable de position absolue en x de la barre de volume
var b_x; // Variable de position absolue en x de la barre d'avancement

function clic(obj, event) { // Clic sur une des deux barres
    if (event.preventDefault) { // Code pour éviter que la souris embarque les images
        event.preventDefault();
    }
    event.returnValue = false;
    if (obj == "vol") { // Si on clique sur la barre de volume
        v_clic = true; // On active le booléen
        var vol = document.getElementById("volume"); // On récupère la barre de volume
        v_x = coord(vol); // On calcule sa position absolue en x
        act_vol = event.clientX - v_x; // Une simple soustraction donne le volume
        playlist[current].setVolume(act_vol); // On applique le volume au titre courant
        vol.title = "Volume : " + act_vol; // et son title
    } else { // Si on clique sur la barre d'avancement
        b_clic = true; // On active le booléen
        var barre = document.getElementById("barre"); // On récupère la barre d'avancement
        b_x = coord(barre); // On calcule sa position absolue en x
        playlist[current].setPosition(parseInt((event.clientX - b_x) / 420 * playlist[current].duration, 10)); // On change la position du titre en cours en fonction
    }
}

function move(obj, event) { // Cliquer-glisser sur une des deux barres
    if (obj == "vol" && v_clic) { // Si on est sur la barre de volume
        act_vol = event.clientX - v_x; // On calcul le volume choisi
        playlist[current].setVolume(act_vol); // On applique le volume au titre courant
        var vol = document.getElementById("volume"); // On récupère la barre de volume
        vol.title = "Volume : " + act_vol; // et son title
    } else if (obj == "barre" && b_clic) { // Si on est sur la barre d'avancement
        playlist[current].setPosition(parseInt((event.clientX - b_x) / 420 * playlist[current].duration, 10)); // On change la position du titre en cours en fonction
    }
}

function coord(element) { // Fonction pour calculer la position absolue en x d'un élement
    var eX = 0; // Initialisation de la valeur
    do {
        eX += element.offsetLeft; // On ajoute l'offsetLeft
        element = element.offsetParent; // On remonte à l'objet parent
    } while (element && element.style.position != 'absolute'); // Et on recommence
    return eX; // On renvoit la position absolue en x de l'élément
}

document.onmouseup = function () { // Quand on relâche le clic
    v_clic = false; // On désactive les deux indicateurs de clic
    b_clic = false;
}
