<template>
  <h1 class="titreBloc">Rechercher un aliment</h1>
    <form @submit.prevent="$emit('rechercheAliment', saisie)">
        <!-- à l'envoi du formulaire, on envoie l'événement rechercheAliment à l'élément parent FrigoContenu -->
        <div class="formRecherche">
            <input type="text" v-model="saisie" id="saisieRecherche" placeholder="Recherchez un aliment" class="champRecherche"/>
            <input type="submit" value="Rechercher" class="boutonOption bouton"/>
        </div>

    </form>
</template>

<script setup>
    
</script>

<style>
    .formRecherche{
        display: flex;
        justify-content: space-around;
    }

    .champRecherche{
        width: 75%;
    }
</style>