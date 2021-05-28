//import Tablero from "./tablero.js"
//const tablero = new Tablero()

var items = [
    [0, 4, 0, 4, 0, 4, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 7, 0, 0, 0, 4],
    [0, 4, 0, 5, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [4, 0, 4, 0, 0, 0, 4]
  ];

var baraja[] = {};

const fill = document.querySelector('.fill');
const empties = document.querySelectorAll('.empty');
var  x = document.getElementById("button");

//Fill Listeners

fill.addEventListener('dragstart', dragStart);
fill.addEventListener('dragend', dragEnd);


// Loop through empties and call drag events
for(const empty of empties){
    empty.addEventListener('dragover', dragOver);
    empty.addEventListener('dragenter', dragEnter);
    empty.addEventListener('dragleave', dragLeave);
    empty.addEventListener('drop', dragDrop);
}

//Drag functions

function dragStart(){
    this.className += ' hold';
    setTimeout(() => (this.className = 'invisible'), 0);
}

function dragEnd(){
    this.className = 'empty';
}

function dragOver(e){
    e.preventDefault();
}
function dragEnter(e){
    e.preventDefault();
    this.className += 'hovered';
}
function dragLeave(){
    this.className ='fill';
}
function dragDrop(){
    this.className = 'empty';
    this.append(fill);
}

function verDatosClick(){
    var x = document.getElementById("button");
    // document.getElementById("demo").innerHTML = x;

    //importarScript("tablero.js");    ==IMPORT==
    //const tablero = new Tablero()
    
  /*    console.log(items[1][0]); // 3
      console.log(items[2][1]); // */
      //console.log(items);
     
      mostrarMazo1();
      mostrarMazo2();
      //printMinas();

    //var img = document.querySelectorAll('.empty');
    //img = tablero.getElementById(3);
}

function getMapData(id){
    return this.map[id][id];
}

function getItemsXY(x,y){
    return this.items[x][y];
}

function mostrarMazo1(){
    document.getElementById("mazo1").src= Rand_mina();
    document.getElementById("mazo1").style.height='65px';
    document.getElementById("mazo1").style.width='80px';
    document.getElementById("mazo1").className="fill";
}
function mostrarMazo2(){
    document.getElementById("mazo2").src=Rand_mina();
    document.getElementById("mazo2").style.height='65px';
    document.getElementById("mazo2").style.width='80px';
}

/// IMPRIMIR MINA () == 4
function printMinas(){
    for(var i = 0;i<6;i++){
        for(var j = 0;j<7;j++){
            var valor = items[i][j];
            
            var txt = ""+i+j;
            console.log(txt);
            if(valor == 5){
                document.getElementById(txt).src="./IMG/Mina2.png";
                document.getElementById(txt).style.height='65px';
                document.getElementById(txt).style.width='80px';
            }
        }
    }
}

function  Rand_mina(){
var random = Math.floor(Math.random()*10)+1;
console.log(random);

    switch(random){

     case 1: return  "./IMG/Mina1.png"; break;
     case 2: return  "./IMG/Mina2.png"; break;
     case 3: return  "./IMG/Lago.png"; break;
     case 4: return  "./IMG/Cacao1.png"; break;
     case 6: return  "./IMG/Semillas2.png"; break;
     case 7: return  "./IMG/Meaples2.png"; break;
     case 8: return  "./IMG/Templos.png"; break;
     case 9: return  "./IMG/Mercado2.png"; break;
     case 10: return  "./IMG/Mercado3.png"; break;
     case 11: return  "./IMG/Mercado1.png"; break;
     default: return  "./IMG/degrad.jpg"; break;
    }
}

/*  //CODIGO JAVA
    private void cargarMapa(Integer matrixMapa[][], int numeroMapa, Image textura){
        grid = new GridPane(); 
        grid.getChildren().clear();

        colocarPersonaje(numeroMapa);
        
        matrixMapa = evaluaBaseDeDatos(matrixMapa);
        
        setMatrizLógica(matrixMapa);
        
        imprimirEstrellas();       
        imprimirMuros(textura);       
        imprimirCajas();
        
        eventosJava(textura);
        
        grid.setLayoutX(150);
        grid.setLayoutY(130);
        anchorPane.getChildren().add(grid);   
    }

    //---------------------------------------------

    private void setMatrizLógica(Integer matriz[][]){
        mapa = new Mapa();
        int elemento;
        for(int i=0;i<8;i++){
            for(int j=0;j<12;j++){
                elemento = matriz[i][j];
                mapa.cargarElemento(i,j,elemento);
            }
        }
    }
    //------------------------------------------------

*/