//un aliment
export default class Aliment {

    //constructeur d'une instance de classe Aliment
    constructor (id,nom, quantite) {
        //_ : attribut privé
        this._id = id
        this._nom = nom;
        this._quantite = quantite;
        
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
    get quantite() {
        return this._quantite
    }
    
}