//import Tablero from "./tablero.js"
//const tablero = new Tablero()
class Pieza{
    constructor(url, id){
        this.url = url;
        this.id = id;
    }
    asignaImagen(url, id){
        document.getElementById(id).src=url;
        document.getElementById(id).style.height='65px';
        document.getElementById(id).style.width='80px';
        document.getElementById(id).className="fill";
    }

}
class Jugador{
    constructor(cacao, monedas, meaples, remancio){
        this.cacao = cacao;
        this.monedas = monedas;
        this.meaples = meaples;
        this.remancio = remancio;
    }
    
    
}
var items = [
    [0, 4, 0, 4, 0, 4, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 7, 0, 0, 0, 4],
    [0, 4, 0, 5, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [4, 0, 4, 0, 0, 0, 4]
  ];

const fill = document.querySelector('.fill');
const empties = document.querySelectorAll('.empty');
var x = document.getElementById("button");

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
    let cant = cantidadJugadores();
    cargarMazos(cant);   
}
           
            

function getMapData(id){
    return this.map[id][id];
}

function getItemsXY(x,y){
    return this.items[x][y];
}

function cargarMazos(tamano){
    
  var URLS  = ["./IMG/Meaples1.png","./IMG/Meaples2.png","./IMG/Meaples3.png"];
  var meaple = new Pieza();
  var mano1 = [];
  var mano2 = [];
  var mano3 = [];
  var mano4 = [];
     if(tamano=="2"){
        for(let i = 0; i<11; i++){
          
           let rand1 = Math.floor(Math.random()*3);
           mano1[i] = URLS[rand1];
           meaple.asignaImagen(mano1[i], "mazo1");
           let rand2 = Math.floor(Math.random()*3);
           mano2[i] = URLS[rand2];
           setTimeout(meaple.asignaImagen(mano2[i], "mazo2"), 10000);
        }
    }
     if(tamano == "3"){
         for(let i = 0; i<11; i++){
            let rand1 = Math.floor(Math.random()*3);
            mano1[i] = URLS[rand1];
            meaple.asignaImagen(mano1[i], "mazo1");
            let rand2 = Math.floor(Math.random()*3);
            mano2[i] = URLS[rand2];
            setTimeout(meaple.asignaImagen(mano2[i], "mazo2"), 10000);
            let rand3 =  Math.floor(Math.random()*3);
            mano3[i] = URLS[rand3];
            setTimeout(meaple.asignaImagen(mano3[i], "mazo3"), 10000);
            
        }
    }
     if(tamano == "4"){
        for(let i = 0; i<11; i++){
            let rand1 = Math.floor(Math.random()*3);
            mano1[i] = URLS[rand1];
            meaple.asignaImagen(mano1[i], "mazo1");
            let rand2 = Math.floor(Math.random()*3);
            mano2[i] = URLS[rand2];
            setTimeout(meaple.asignaImagen(mano2[i], "mazo2"), 10000);
            let rand3 =  Math.floor(Math.random()*3);
            mano3[i] = URLS[rand3];
            setTimeout(meaple.asignaImagen(mano3[i], "mazo3"), 10000);
            let rand4 =  Math.floor(Math.random()*3);
            mano4[i] = URLS[rand4];
            setTimeout(meaple.asignaImagen(mano4[i] , "mazo4"), 10000);
        }     
     }
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
function  cantidadJugadores(){
        console.log(window);
        var jug = window.prompt("Digite la cantidad de Jugadores");
      
        if(jug == "1" || jug >"4"){
            window.alert("El tamanio de la partida no es el permitido que es de maximo 4 minimo 1");
            jug = window.prompt("Digite la cantidad de Jugadores");
        }else{
             if(jug == "2"){
                  document.getElementById("marcador3").style.display = "none";
                  document.getElementById("marcador4").style.display = "none";
                 salir = true;
                 return jug;
                 }
            if(jug = "3"){
                 document.getElementById("marcador4").style.display = "none";
                 salir = true;
                 return jug;
            }
            
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