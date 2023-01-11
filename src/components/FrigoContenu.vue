<template>
    <!-- bouton pour activer aller/retour du personnage + ouverture/fermeture du frigo -->
    <input type="button" id="activationFrigo" @click="marcher" :value="state.visible ? 'Fermer' : 'Ouvrir'"/>

    <!-- images du personnage à l'aller -->
    <div v-if="state.apparait1"><img src="../assets/img/pas1_G.png" alt="pas 1 à gauche" id="image1"/></div> 
    <div v-if="state.apparait2"><img src="../assets/img/pas2_G.png" alt="pas 2 à gauche" id="image2"/></div>
    <div v-if="state.apparait3"><img src="../assets/img/pas4_G.png" alt="pas 3 à gauche" id="image3"/></div>

    <!-- images du personnage au retour -->
    <div v-if="state.apparait4"><img src="../assets/img/pas1_D.png" alt="pas 1 à droite" id="image4"/></div> 
    <div v-if="state.apparait5"><img src="../assets/img/pas2_D.png" alt="pas 2 à droite" id="image5"/></div>

    <!-- affichage du contenu du frigo si le frigo est ouvert -->
    <div v-if="state.visible">
        <div class="blocTitreContenu">
            <h1>Contenu du frigo</h1>
        </div>
            
        <div id="blocContenu">
            <div id="detailAliments">
                <div id="indicationRecherche"></div>
                <div v-for="aliment in listeAliments" :key=[aliment.id]> <!-- On parcourt la liste des aliments -->
                <!-- on appelle le composant FrigoAliment pour l'afficher sous forme de carte -->
                    <FrigoAliment :aliment="aliment" 
                    @ajoutQuantite="ajouterQuantite"
                    @suppressionQuantite="supprimerQuantite"
                    @suppressionAliment="supprimerAliment"
                    />
                </div>
            </div>
        </div>
    </div>

    <!-- affichage des blocs formulaires pour ajouter, rechercher, partager des aliments si le frigo est ouvert -->
    <div v-if="state.visible">
        <div class="blocAction" id="blocAjout">
            <FrigoAjout @ajoutAliment="remplirFrigo" />
        </div>

        <div class="blocAction" id="blocRecherche">
            <FrigoRecherche @rechercheAliment="rechercherAliment" />
        </div>

        <div class="blocAction"  id="blocPartage">
             <FrigoPartage :listeAliments="listeAliments" @partageAliment="partagerAliment"/>
        </div>
    </div>

</template>

<script setup>
    import FrigoAliment from "./FrigoAliment.vue";
    import FrigoAjout from "./FrigoAjout.vue"
    import FrigoRecherche from "./FrigoRecherche.vue"
    import FrigoPartage from "./FrigoPartage.vue"

    import { reactive, onMounted, ref } from 'vue'
    import Aliment from "../Aliment.js";

    const listeAliments = reactive([]);
    const state = reactive({ visible:false, apparait1: true , apparait2: false,  apparait3: false, apparait4: false,  apparait5: false,  apparait6: false})
    const url = "https://webmmi.iut-tlse3.fr/~pecatte/frigo/public/12/produits"

    //Banque de sons
    var fondSonore = new Audio("../src/sons/fond.mp3") //musique en attendant d'ouvrir le frigo
    fondSonore.volume = 0.1

    var sonAmbiance = new Audio("../src/sons/ambiance.mp3") //musique lorsque le frigo est ouvert
    sonAmbiance.volume = 0.05

    var sonOuverture = new Audio("../src/sons/ouverture.mp3") //bruitage à l'ouverture du frigo
    var sonFermeture = new Audio("../src/sons/fermeture.mp3") //bruitage à la fermeture du frigo

    var sonSuppression = new Audio("../src/sons/poubelle.mp3") //bruitage à la suppression d'un aliment
    sonSuppression.volume = 0.5

    var sonAlerte = new Audio("../src/sons/alerte.mp3") //bruitage lors d'une notification
    sonAlerte.volume = 0.2

    var sonClick = new Audio("../src/sons/clic.mp3") //bruitage à l'ajout d'un aliment
    sonClick.volume = 0.2

    var sonRecherche = new Audio("../src/sons/recherche.mp3") //bruitage à la recherche d'un aliment
    sonRecherche.volume = 0.2

    var sonPas = new Audio("../src/sons/pas.mp3") //bruitage à chaque pas du personnage
    sonPas.volume = 0.1

    //à l'ouverture de la page, on lance le fond sonore
    window.onload = fondSonore.play()
    
    //quand on crée un composant, on initialise le frigo par la fonction recupererContenuFrigo
    onMounted(()=>{ recupererContenuFrigo() })
    
    let delaisEntrePas = 700 ;

    //le personnage avance pour ouvrir le frigo
    function marcher(){

        if (state.visible == false){ //aller
            //1er et 2e pas
            setTimeout(pasAller1,delaisEntrePas)
            function pasAller1(){
                state.apparait1 = !state.apparait1 ; //on fait disparaitre la première image
                state.apparait2 = !state.apparait2 ; //on fait apparaitre la deuxième image
                sonPas.play()
                setTimeout(pasAller2, delaisEntrePas)
            }

            //3e pas
            function pasAller2(){
                state.apparait2 = !state.apparait2 ; //on fait disparaitre la deuxième image
                state.apparait3 = !state.apparait3 ; //on fait apparaitre la troisième image
                sonPas.play()
                setTimeout(actionPorte, delaisEntrePas)
            }
        } else{ //retour
            actionPorte() //fermeture de la porte et arrêt de la musique

            //1er pas
            setTimeout(pasRetour1,delaisEntrePas)
            function pasRetour1(){
                state.apparait3 = !state.apparait3 ;
                state.apparait4 = !state.apparait4 ;
                sonPas.play()
                setTimeout(pasRetour2, delaisEntrePas)
            }

            //2e pas
            function pasRetour2(){
                state.apparait4 = !state.apparait4 ;
                state.apparait5 = !state.apparait5 ;
                sonPas.play()
                setTimeout(pasRetour3, delaisEntrePas)
            }

            //3e pas
            function pasRetour3(){
                state.apparait5 = !state.apparait5 ;
                state.apparait1 = !state.apparait1 ;
                sonPas.play()
            }
        }
    }

    //à l'ouverture du frigo, on lance le bruitage, idem pour la fermeture
    function actionPorte(){
        state.visible = !state.visible ; //on affiche ou non le contenu frigo en fonction de state.visible
        
        if (state.visible == true){ //si on ouvre le frigo, on lance la musique d'ambiance
            sonOuverture.play()
            sonAmbiance.play()
            
        } else { //si on ferme le frigo, on met en pause la musique d'ambiance et on joue le fond sonore
            sonFermeture.play()
            sonAmbiance.pause()
            fondSonore.play()
        }
    }

    //fonction qui permet de récupérer le contenu du frigo à partir de l'API
    function recupererContenuFrigo(){
        const fetchOptions = { method: "GET" }; //on utilise l'opération GET car on veut récupérer la liste des aliments du frigo
        fetch(url, fetchOptions)
            .then((response) => { return response.json();})
            .then((dataJSON) => {
                listeAliments.splice(0, listeAliments.length) //on vide la liste avant de la reremplir
                dataJSON.forEach((aliment) => {
                    listeAliments.push(new Aliment(aliment.id, aliment.nom, aliment.qte))}) //on remplit la liste par les aliments
                })
            .catch((error) => console.log(error));
        console.log(listeAliments)
    }

    //fonction qui permet d'ajouter un aliment (nom + quantité) dans le frigo
    function remplirFrigo(nom, qte){
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const fetchOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({ nom : nom, qte : qte }),
        };

        fetch(url, fetchOptions)
            .then((response) => { recupererContenuFrigo();}) //on actualise le contenu du frigo
            .catch((error) => console.log(error));

        //vider les champs du formulaire
        document.getElementById('champNom').value=''
        document.getElementById('champQte').value=''

        sonClick.play()
    }

    //fonction qui incrémente la quantité
    function ajouterQuantite(id, nom, qte){
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const fetchOptions = {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify({id : id, nom : nom, qte : qte+1}),
        };

        fetch(url, fetchOptions)
            .then((response) => { 
                    if (champRechercheVide.value == true){ //si le champ de recherche est vide
                        recupererContenuFrigo(); //on actualise le contenu du frigo et on affiche son contenu en intégralité
                    } else {
                        rechercherAliment(document.getElementById('saisieRecherche').value) 
                        //on réaffiche la liste actualisée des aliments qui correspondent à la recherche
                    }
                    
                }) 
            .catch((error) => console.log(error));

        sonClick.play()
    }

    //fonction qui décrémente la quantité
    function supprimerQuantite(id, nom, qte){
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        console.log('qte depart', qte)

        if ((qte-1)==0){ // si la quantité est égale à 1, lorsqu'on décrémente on doit supprimer l'aliment
            const fetchOptions = {
            method: "DELETE",
            headers: myHeaders,
            };

            fetch(url+`/${id}`, fetchOptions)
                .then((response) => { recupererContenuFrigo();}) //on actualise le contenu du frigo
                .catch((error) => console.log(error));

            sonSuppression.play() //bruitage de suppression

        } else { // si la quantité est supérieure à 1, on décrémente seulement la quantité
            const fetchOptions = {
            method: "PUT",
            headers: myHeaders,
            body: JSON.stringify({id : id, nom : nom, qte : qte-1}),
            };

            fetch(url, fetchOptions)
                .then((response) => { recupererContenuFrigo();}) //on actualise le contenu du frigo
                .catch((error) => console.log(error));
            sonClick.play()
        }   
    }
    //fonction qui supprime un aliment quelle que soit sa quantité
    function supprimerAliment(id){
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const fetchOptions = {
        method: "DELETE",
        headers: myHeaders,
        };

        fetch(url+`/${id}`, fetchOptions)
            .then((response) => { recupererContenuFrigo();}) //on actualise le contenu du frigo
            .catch((error) => console.log(error));   
        
        sonSuppression.play() //bruitage de suppression
    }
    const champRechercheVide = ref(true) //booléen qui permet de savoir si le champde recherche est vide ou non
    //fonction qui recherche un aliment dans le frigo
    function rechercherAliment(saisie){
        
        const fetchOptions = { method: "GET" };
        fetch(`${url}?search=${saisie}`, fetchOptions)
            .then((response) => { return response.json();})
            .then((dataJSON) => {
                console.log(saisie)
                listeAliments.splice(0, listeAliments.length) //on vide la liste avant de la reremplir
                dataJSON.forEach((aliment) => {console.log("aliment :",aliment)
                listeAliments.push(new Aliment(aliment.id, aliment.nom, aliment.qte))})

                if (saisie==""){ //si la saisie est vide, on affiche tous les aliments sans message
                    document.getElementById("indicationRecherche").innerHTML=""
                    champRechercheVide.value = true;
                } else if (listeAliments.length == 0){ //si il n'y a aucun aliment, on affiche : "Aucun résultat"
                    document.getElementById("indicationRecherche").innerHTML = 'Aucun résultat.'   
                } else { //s'il y a des aliments pour une saisie, on affiche le message "Aliments contenant "${saisie}" dans leur nom" suivi des aliments correspondant
                    document.getElementById("indicationRecherche").innerHTML=`Aliments contenant "${saisie}" dans leur nom`
                    champRechercheVide.value = false;
                }

                })
            .catch((error) => console.log(error));
        
        sonRecherche.play()
    }

    //fonction qui permet d'envoyer un aliment (nom + quantité) à un destinataire
    function partagerAliment(destinataire, nomAliment, idAliment, qteAliment, qteEnvoyee){
        
        if (qteEnvoyee > qteAliment){ //on ne peut pas envoyer plus d'aliments que l'on en a dans le frigo
            sonAlerte.play()
            alert(`Vous n'avez pas suffisamment de ${nomAliment}s !` )
            
        } else { 

            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            
            /* 
                on supprime le nombre d'aliments qu'on veut envoyer par une requête DELETE 
                (j'ai essayé de boucler "qteEnvoyee" fois sur la méthode supprimerQuantite mais cela ne fonctionne pas bien)
                donc j'ai refait une requête sur l'API 
            */
            // si la quantité à envoyer est celle que l'on a dans le frigo, on supprime simplement l'aliment du frigo
            if ((qteAliment-qteEnvoyee)==0){ 
                const fetchOptions = {
                method: "DELETE",
                headers: myHeaders,
                };

                fetch(url+`/${idAliment}`, fetchOptions)
                    .then((response) => { recupererContenuFrigo();}) //on actualise le contenu du frigo
                    .catch((error) => console.log(error));

            } else { // si la quantité restante est supérieure à 1, on décrémente la quantité
                
                const fetchOptions = {
                method: "PUT",
                headers: myHeaders,
                body: JSON.stringify({id : idAliment, nom : nomAliment, qte : qteAliment-qteEnvoyee}),
                };

                fetch(url, fetchOptions)
                    .then((response) => { recupererContenuFrigo();}) //on actualise le contenu du frigo
                    .catch((error) => console.log(error));
            }   

            //on fait une requête POST sur un autre frigo de l'API
            const fetchOptions = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify({ nom : nomAliment, qte : qteEnvoyee }),
            };

            const urlDestination=`https://webmmi.iut-tlse3.fr/~pecatte/frigo/public/${destinataire}/produits` //url du destinataire

            fetch(urlDestination, fetchOptions)
                .then((response) => { recupererContenuFrigo();}) //on actualise le contenu du frigo
                .catch((error) => console.log(error));
            
            sonAlerte.play()
            alert(`${qteEnvoyee} ${nomAliment}(s) ont été envoyé(e)s !` )
             
        }
    }

</script>

<style>

#activationFrigo{
    border-radius: 50px;
    width: 10%;
    position : absolute;
    top: 3%;
    left: 8%;

    cursor: pointer;
}

#image1{
    position : absolute;
    left: 43%;
    top: 12%;
    height: 70%;
}

#image2{
    position : absolute;
    top: 12%;
    left: 26%;
    height: 70%;
}

#image3{
    position : absolute;
    top: 12%;
    left: 7%;
    height: 70%;
}

#image4{
    display: inline-block;
    position : absolute;
    left: 7%;
    top: 12%;
    height: 70%;
}

#image5{
    position : absolute;
    top: 12%;
    left: 26%;
    height: 70%;
}

.blocTitreContenu{
    background-color: rgba(27,32,42,0.7);
    position: absolute;
    top: 11%;
    left: 7%;
    height: 68%;
    max-height: 68%;
    width : 42%;

    overflow-y: scroll;
    border-radius: 15px;

    color: #ffff ;
}

.titreBloc{
    margin-bottom: 2%;
}

#blocContenu{
    background-color: rgba(27,32,42,0.7);
    position: absolute;
    top: 20%;
    left: 7%;
    height: 59%;
    max-height: 68%;
    width : 42%;

    overflow-y: scroll;
    border-radius: 15px;

    color: #ffff ;
}

.blocAction{
    background-color: rgba(27,32,42,0.7);
    position: absolute;
    
    width : 42%;
    border-radius: 15px;
    color: #ffff ;

    right: 7%;
}

#blocAjout{ 
    top: 11%;
    height: 20%;
}

#blocRecherche{
   top: 34%;
   height: 17%;
}

#blocPartage{
    top: 54%;
    height: 25%;
}

h1{
text-align: center;
font-size: 2em;
}

.bordure{
    border : 1px solid red;
}

#detailAliments{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

}

#indicationRecherche{
    width: 100%;
    text-align: center;
    margin-bottom: 2%;
}
</style>