const TIPOS =["lago","meaple","mina","cacao"]

var imgArray = new Array();

imgArray[0] = new Image();
imgArray[0].stc = 'images/IMG/Mina1.jpg';

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

function cargarTablero(element)
{
    for(var i = 0; i< imgArray.length; i++) imgArray[i] = new Image();
}