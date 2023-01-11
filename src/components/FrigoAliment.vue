<script setup>
    defineProps(['aliment']);
</script>

<template>
    <div id="blocAliment">
        <div id="nomAliment">
            {{ aliment.nom }}
        </div>
        <div id="footerCarteAliment">
            <div id="qteAliment">
                <!-- Au click sur le bouton '-' on envoie un événement au composant parent qui va exécuter une fonction
                qui va décrémenter la quantité du produit sélectionné -->
                <button name="boutonMoins" class="bouton" @click="$emit('suppressionQuantite', aliment.id, aliment.nom, aliment.quantite)">
                    <img src="../assets/img/minus.png" alt="signe moins" width="10" />
                </button>

                {{ aliment.quantite }}

                <!-- Au click sur le bouton + on envoie un événement au composant parent qui va exécuter une fonction
                qui va incrémenter la quantité du produit sélectionné -->
                <button name="boutonPlus" class="bouton" @click="$emit('ajoutQuantite', aliment.id, aliment.nom, aliment.quantite)"> 
                    <img src="../assets//img/plus.png" alt="signe plus" width="10" />
                </button>
            </div>
            <div id="optionsAliment">
                <!-- Au click sur le bouton poubelle on envoie un événement au composant parent qui va exécuter une fonction
                qui va supprimer l'aliment sélectionné -->
                <button name="boutonSuppr" class="bouton" @click="$emit('suppressionAliment', aliment.id)"> 
                    <img src="../assets//img/trash.png" alt="supprimer un aliment" width="16"/>
                </button>
                
            </div>
            
        </div>
    </div>
</template>



<style>

#blocAliment{
    background-color: #ffff;

    top: 11%;
    left: 7%;
    height: 5em;
    width : 11em;

    border-radius: 15px;
    margin-bottom: 15%;

    padding: 15px 5px 0 5px;

    color: rgb(27,32,42) ;
    justify-content: center;

    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

#nomAliment{
    text-align: center;
    margin-top: 5%;
}

#footerCarteAliment{
    display: flex;
    justify-content: space-between;
    align-items: center;
}

#footerCarteAliment img{
    margin-right: 3px;
    margin-left: 3px;
}

#qteAliment{
    font-size: small;
}

button{
    border: transparent;
    border-radius: 15px;
}

</style>