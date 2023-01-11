<template>
  <h1 class="titreBloc">Partager un aliment</h1>
    <form @submit.prevent="$emit('partageAliment', destinataire, aliment.nom,  aliment.id, aliment.qte, qteEnvoyee)" >
        <!-- à l'envoi du formulaire, on envoie l'événement partageAliment à l'élément parent FrigoContenu -->
        <div id="champsPartage">
            <div id='champDestinataire'>
                <label for="destinataireSelector">Destinataire : </label>
                <select id="destinataireSelector" v-model="destinataire">
                    <option disabled value="0" selected>Choisissez un destinataire</option>
                    <option v-for="etudiant in etudiants" :key="etudiant.id" :value="etudiant.id">
                        {{etudiant.nom}} {{etudiant.prenom}}
                    </option>
                </select>
            </div>

            <div id="champProduit">
                <label for="champAliment">Aliment : </label>
                <select id="alimentSelector" v-model="aliment">
                        <option disabled value="0" selected>Sélectionnez un aliment</option>
                        <option v-for="aliment in listeAliments" :key="aliment.id" :value="{ nom : aliment.nom, id : aliment.id, qte : aliment.quantite }">
                            {{aliment.nom}}
                        </option>
                    </select>

                <label for="envoiQte">Quantité : </label>
                <input type="number" v-model="qteEnvoyee" placeholder="Entrez une quantité" required id="envoiQte"/>
            </div>
        </div>
        
        <div class="envoiFormulaire">
            <input type="submit" value="Partager" class="boutonOption bouton"/>
        </div>
    </form>
</template>

<script setup>
    import { reactive, ref, onMounted } from 'vue'
    import Etudiant from "../Etudiant";

    const etudiants = reactive([]);

    const props = defineProps({
        listeAliments: {
            type: Array,
            required: true,
        },
    });

    let destinataire = ref('')
    let nom = ref('')
    let qte = ref('')

    onMounted(()=>{ listerEtudiants() })

    //fonction qui permet de récupérer tous les étudiants de FIE3 présents dans le fichier FIE3.json
    function listerEtudiants() {
        const fetchOptions = { method: "GET" };

        fetch("src/data/FIE3.json", fetchOptions)
            .then((response) => { return response.json();})
            .then((dataJSON) => { 
                etudiants.splice(0, etudiants.length) //on vide la liste avant de la reremplir
                dataJSON.forEach((etudiant) => 
                {etudiants.push(new Etudiant(etudiant.id, etudiant.nom, etudiant.prenom))}) //on remplit la liste d'étudiants
            })
            .catch((error) => alert(error));
    }

</script>

<style>
    select {
        box-sizing: border-box;
        height: 2.5em;

        border-radius: 7px;
        border: 2px solid #7898a5 ;
        font-family: 'Montserrat', sans-serif;;
    }

    #champsPartage{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    #champDestinataire{
        margin-bottom: 2%;
    }

    #champProduit{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    #alimentSelector{
        width: 37%;
    }

    #envoiQte{
        width: 29%;
    }

</style>