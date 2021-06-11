//import Tablero from "./tablero.js"
//const tablero = new Tablero()
//Array para las urls de los meaplos
var URLS  = [];
//lleno un array de acuerdo al maso de juego de maples de cada jugador
URLS.unshift("./IMG/Meaples2.png","./IMG/Meaples2.png","./IMG/Meaples2.png","./IMG/Meaples2.png");
URLS.unshift("./IMG/Meaples1.png","./IMG/Meaples1.png","./IMG/Meaples1.png","./IMG/Meaples1.png","./IMG/Meaples1.png");
URLS.unshift("./IMG/Meaples3.png","./IMG/Meaples3.png");
//arrays que  almacenan las manos de cada jugador
var mano1 = [];
var mano2 = [];
var mano3 = [];
var mano4 = [];
//clase de cada ficha
class Pieza{
    constructor(url, id){
        this.url = url;
        this.id = id;
    }//asigna la imagen del url que recibe al id que recibe
    asignaImagen(url, id){
        document.getElementById(id).src=url;
        document.getElementById(id).style.height='65px';
        document.getElementById(id).style.width='80px';
        //document.getElementById(id).className="fill1";
    }

}//clase jugador
class Jugador{
    constructor(cacao, monedas, remancio){
        this.cacao = cacao;
        this.monedas = monedas;
        this.remancio = remancio;
    }
    //carga los mazo y los marcadores de los jugadores del tamanio que recibe
    cargarMazos(tamano){
       
        var meaple = new Pieza();
        // si la partida es de dos jugadores llena el array de las barajas
           if(tamano =="2"){
              for(let i = 0; i<11; i++){
                 let rand1 = Math.floor(Math.random()*11);//crea random
                 mano1[i] = URLS[rand1];//la asigna la posicion i de la mano la url random que necesita
                 meaple.asignaImagen(mano1[i], "mazo1");//llama el metodo que pone la imagen. todo esto es lo mismo para abajo
                 let rand2 = Math.floor(Math.random()*11);
                 mano2[i] = URLS[rand2];
                 setTimeout(meaple.asignaImagen(mano2[i], "mazo2"), 10000);  //delay para que no se repitan las imagenes
                }
              }
          
           if(tamano == "3"){
               for(let i = 0; i<11; i++){
                  let rand1 = Math.floor(Math.random()*11);
                  mano1[i] = URLS[rand1];
                  meaple.asignaImagen(mano1[i], "mazo1");
                  let rand2 = Math.floor(Math.random()*11);
                  mano2[i] = URLS[rand2];
                  setTimeout(meaple.asignaImagen(mano2[i], "mazo2"), 10000);
                  let rand3 =  Math.floor(Math.random()*11);
                  mano3[i] = URLS[rand3];
                  setTimeout(meaple.asignaImagen(mano3[i], "mazo3"), 10000);   
              }
          }
           if(tamano == "4"){
              for(let i = 0; i<11; i++){
                  let rand1 = Math.floor(Math.random()*11);
                  mano1[i] = URLS[rand1];
                  meaple.asignaImagen(mano1[i], "mazo1");
                  let rand2 = Math.floor(Math.random()*11);
                  mano2[i] = URLS[rand2];
                  setTimeout(meaple.asignaImagen(mano2[i], "mazo2"), 10000);
                  let rand3 =  Math.floor(Math.random()*11);
                  mano3[i] = URLS[rand3];
                  setTimeout(meaple.asignaImagen(mano3[i], "mazo3"), 10000);
                  let rand4 =  Math.floor(Math.random()*11);
                  mano4[i] = URLS[rand4];
                  setTimeout(meaple.asignaImagen(mano4[i] , "mazo4"), 10000);
              }     
           }
      }//metodo para remplazar la baraja a la hora de mover la ficha al tablero
    remplazar(){     
            window.alert("Entro al dragend");  //aviso de entrada al metodo
            var remplazo = new Pieza();//nueva instacia de la ficha 
            let ram = Math.floor(Math.random()*11);    //crea un valor radom para sustuir en el array de la mano
            remplazo.asignaImagen(mano1[ram],"mazo11");//reemplaza en la mano de cada jugador y la pone en la nueva imagen
            setTimeout(remplazo.asignaImagen(mano2[ram],"mazo22"),10000); //lo mismo pero con delay para que no se repitan las imagenes
            setTimeout(remplazo.asignaImagen(mano3[ram],"mazo33"),100000);
            setTimeout(remplazo.asignaImagen(mano4[ram],"mazo44"),1000000);                
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
//creacion de los fill de cada mazo
const fill1 = document.querySelector('.fill1');
const fill2 = document.querySelector('.fill2');
const fill3 = document.querySelector('.fill3');
const fill4 = document.querySelector('.fill4');
const empties = document.querySelectorAll('.empty');
var x = document.getElementById("button");

//Fill Listeners
fill1.addEventListener('dragstart', dragStart);
fill1.addEventListener('dragend', dragEnd);
fill2.addEventListener('dragstart', dragStart);
fill2.addEventListener('dragend', dragEnd);
fill3.addEventListener('dragstart', dragStart);
fill3.addEventListener('dragend', dragEnd);
fill4.addEventListener('dragstart', dragStart);
fill4.addEventListener('dragend', dragEnd);
// Loop through empties and call drag events
for(const empty of empties){
    empty.addEventListener('dragover', dragOver);
    empty.addEventListener('dragenter', dragEnter);
    empty.addEventListener('dragleave', dragLeave);
    empty.addEventListener('drop', dragDrop);
}

//Drag functions

function dragStart(res){
    this.className += ' hold';
   // setTimeout(() => (this.className = 'invisible'), 0);
  if( res== true){
    var p = new Jugador();
    p.remplazar()
  }
}

function dragEnd(){
    this.className = 'empty';
    dragStart(true)
   
}

function dragOver(e){
    e.preventDefault();
}
function dragEnter(e){
    e.preventDefault();
    this.className += 'hovered';
}
function dragLeave(){
    this.className ='fill1';
    this.className ='fill2';
    this.className ='fill3';
    this.className ='fill4';
}
function dragDrop(){
    this.className = 'empty';
    let imprime = document.getElementById("mazo1");// pone las imaganes en el lugar seleccionado
    this.append(imprime);
    imprime = document.getElementById("mazo2");
    this.append(imprime);

}
//metodo para el botton
function verDatosClick(){
    var x = document.getElementById("button");
    let cant = cantidadJugadores();
    var jugador = new Jugador(); 
    jugador.cargarMazos(cant);   
}
           //metodo que define la cantidad de jugadores
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
            if(jug =="3"){
                 document.getElementById("marcador4").style.display = "none";
                 salir = true;
                 return jug;
            }
            return jug;
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