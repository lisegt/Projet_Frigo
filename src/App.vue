<script setup>
import FrigoContenu from "./components/FrigoContenu.vue";

alert("Bienvenue sur votre application de frigo ! \nN'oubliez pas d'activer le son de votre ordinateur pour profiter pleinement de l'expérience !")

</script>

<template>

  

  <FrigoContenu /> <!-- composant affichant le contenu du frigo et les actions que l'on peut faire sur les aliments -->

</template>

<style>
  /* import de la police 'Montserrat' à partir de Google Web Font */
  @import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

  body {
    background-image: url("./assets/img/cuisine.jpg") ;
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;

    font-family: 'Montserrat', sans-serif;
  }

  .bouton{
    cursor: pointer;
  }

  .boutonOption{
    box-sizing: border-box;
    height:1.8rem;
    width: 20%;

    background-color: #2f63ad ;
    border: 2px solid rgb(27,32,42) ;
    color: #ffff;
  }
</style>
