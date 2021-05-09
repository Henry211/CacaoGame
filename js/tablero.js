const TIPOS =["lago","meaple","mina","cacao"]

export default class Tablero {
    constructor(fichas){
        this.fichas = fichas
    }
}

class Ficha {
    constructor(tipo){
        this.tipo = tipo
    }
}

function refreshTablero(){
    return TIPOS.map(tipo => {
        return new Ficha(tipo)
    })
}