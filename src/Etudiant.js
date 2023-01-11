//un étudiant
export default class Aliment {

    //constructeur d'une instance de classe Aliment
    constructor (id,nom, prenom) {
        //_ : attribut privé
        this._id = id
        this._nom = nom;
        this._prenom = prenom;
        
    }

    //getter pour obtenir le nom d'un aliment
    get nom() {
        return this._nom;
    }

    //getter pour obtenir l'id d'un aliment
    get id() {
        return this._id
    }

    //getter pour obtenir la quantité d'un aliment
    get prenom() {
        return this._prenom
    }
    
}