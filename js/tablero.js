const TIPOS =["lago","meaple","mina","cacao"]

var imgArray = new Array();

imgArray[0] = new Image();
imgArray[0].stc = '../IMG/Mina1.jpg';
imgArray[1] = new Image();
imgArray[1].stc = '../IMG/Mina1.jpg';

class Tablero {
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

function cargarTablero()
{
    for(var i = 3; i< imgArray.length; i++) imgArray[i] = new Image();
    console.log(i)
}

function getNextElement(elemet){
    var img = document.getElementById(element);

    for(var i = 0; i < imgArray.length; i++){
        if(imgArray[i].src == img.src){ //   << check this
            if(i == imgArray.length){   // máx
                document.getElementById(element).src = imgArray[0].src;
                break;
            }
            document.getElementById(element).src = imgArray[i+1].src;
            break;
        }
    }
}