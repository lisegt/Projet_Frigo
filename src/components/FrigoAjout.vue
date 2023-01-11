<template>

    <h1 class="titreBloc">Ajouter un aliment</h1>
    <form @submit.prevent="$emit('ajoutAliment', nom, qte)"> 
        <!-- à l'envoi du formulaire, on envoie l'événement ajoutAliment à l'élément parent FrigoContenu -->
        <div class="champs">
            <label for="champNom">Aliment : </label>
            <input type="text" v-model="nom" placeholder="Saisissez le nom de l'aliment" required id="champNom"/>

            <label for="champQte">Quantité : </label>
            <input type="number" v-model="qte" placeholder="Entrez une quantité" required id="champQte" />
        </div>
        
        <div class="envoiFormulaire">
            <input type="submit" value="Ajouter" class="boutonOption bouton"/>
        </div>
    </form>
    
</template>

<script setup>

    import { ref } from 'vue'
    let nom = ref('')
    let qte = ref('')

</script>

<style>

    form{
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        padding: 0 15px;
        font-size: large;
    }
    .champs{
        display: flex;
        justify-content: space-between;
        align-items: center;

        font-size: large;
    }

    input {
        box-sizing: border-box;
        height: 2.5em;

        border-radius: 7px;
        border: 2px solid #7898a5 ;

        font-family: 'Montserrat', sans-serif;;
    }

    #champNom{
        width: 37%;
    }
    #champQte{
        width: 29%;
    }

    .envoiFormulaire{
        text-align: end;
        margin-top: 15px;
    }
</style>