# Présentation du projet

Application web de gestion partagée d'un frigo.
La base de données est gérée avec un backend coté serveur et est accessible à travers une API.
Chaque étudiant dispose d'un identifiant lui permettant d'accéder à son frigo personnel

L'application présente les fonctionnalités suivantes :

- Afficher le contenu du frigo
- Ajouter un nouveau produit au frigo : son nom, sa quantité
- Supprimer un produit du frigo (totalement quelle que soit la quantité)
- Incrémenter la quantité d’un produit présent dans le frigo
- Décrémenter la qte d’un produit présent dans le frigo (si la quantité est nulle, alors on supprime le produit)
- Rechercher des produits dans le frigo
- Transférer un aliment (en choisissant la quantité) dans le frigo d'un autre étudiant

Pour une expérience optimale, activez le son de votre équipement !

### Exécution du projet

- Executez la commande `npm run dev` dans un terminal
- Entrez l'URL `http://localhost:3000/`dans un navigateur (Google Chrome de préférence)

## Fabriqué avec

- Vue.js - Framework JS
- HTML
- CSS
- JavaScript
