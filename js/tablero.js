

var imgArray = new Array();

imgArray[0] = new Image();
imgArray[0].stc = '../IMG/Mina1.png';

imgArray[1] = new Image();
imgArray[1].stc = '../IMG/Mina2.png';

imgArray[2] = new Image();
imgArray[2].stc = '../IMG/MayaSun.png';

imgArray[3] = new Image();
imgArray[3].stc = '../IMG/Lago.png';

imgArray[4] = new Image();
imgArray[4].stc = '../IMG/Semillas2.png';

imgArray[5] = new Image();
imgArray[5].stc = '../IMG/Mercado2.png';

var person = prompt("Please enter your name", "Naruto Uzumaki");

//if (person != null) {
  //document.getElementById("marcador1").innerHTML =
  //"Hello " + person + "! How are you today?";
//}
/*
const map = new Map([
                    ['1','1','0','3'],
                    ['0','1','0','0'],
                    ['0','1','2','2'],
                    ['1','4','2','3']
                    ])

const filteredItems = items.filter((item) =>{
    return item;
})
*/
class Tablero {
    constructor(fichas){
        this.fichas = fichas
    }
}

class Ficha {
    constructor(tipo,row,column){
        this.tipo = tipo;
        this.row = row;
        this.column = column;
    }
}

function getMapData(id){
    return this.map[id][id];
}

function refreshTablero(){
    return TIPOS.map(tipo => {
        return new Ficha(tipo)
    })
}

function cargarTablero()
{
    for(var i = 3; i< imgArray.length; i++) imgArray[i] = new Image();

}
function getElementById(id){
    for(var i = 3; i< imgArray.length; i++){
        if(i == id){
            return imgArray[i].src
        }
    }
}
function getType(id){
    for(var i = 3; i< imgArray.length; i++){
        if(i = id){
            return imgArray[i].TIPOS;
        }
    }
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

