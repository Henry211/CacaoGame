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
//Las clases Contenedoras no son totalmente necesarias, puede que se necesiten más adelante
class contenedorMazoMeaples{
    constructor(ficha,selected){
        this.ficha = ficha;
        this.selected = selected;
    }
    setPieza(ficha){
        this.ficha = ficha;
    }
    setEstado(selected){
        this.selected = selected;
    }
}
class contenedorMazoLosetas{
    constructor(ficha,selected){
        this.ficha = ficha;
        this.selected = selected;
    }
    setPieza(ficha){
        this.ficha = ficha;
    }
    setEstado(selected){
        this.selected = selected;
    }
}
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
    setImage(img){
        this.img = img;
    }
    setValorLógico(value){//valor que representará a la ficha en la matriz lógica
        this.value = value;
    }
}//clase jugador
class Jugador{
    constructor(cacao, monedas, remancio){
        this.cacao = cacao;
        this.monedas = monedas;
        this.remancio = remancio;
    }
}
    //carga los mazo y los marcadores de los jugadores del tamanio que recibe
   /* cargarMazos(tamano){
       
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
      //metodo para remplazar la baraja a la hora de mover la ficha al tablero
    remplazar(){     
            window.alert("Entro al dragend");  //aviso de entrada al metodo
            var remplazo = new Pieza();//nueva instacia de la ficha 
            let ram = Math.floor(Math.random()*11);    //crea un valor radom para sustuir en el array de la mano
            remplazo.asignaImagen(mano1[ram],"mazo11");//reemplaza en la mano de cada jugador y la pone en la nueva imagen
            setTimeout(remplazo.asignaImagen(mano2[ram],"mazo22"),10000); //lo mismo pero con delay para que no se repitan las imagenes
            setTimeout(remplazo.asignaImagen(mano3[ram],"mazo33"),100000);
            setTimeout(remplazo.asignaImagen(mano4[ram],"mazo44"),1000000);                
      }
*/


/*
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

}*/

//----------CONTENEDORES DE LOSETAS---------
var pieza = new Pieza();
var contenedorLosetasUno = new contenedorMazoLosetas(pieza,false);
var contenedorLosetasDos = new contenedorMazoLosetas(pieza,false);
var contenedorMeaplesUno = new contenedorMazoMeaples(pieza,false);
var contenedorMeaplesDos = new contenedorMazoMeaples(pieza,false);

var matrizLogica = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 0, 8, 0, 0],
    [0, 0, 0, 5, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
  ];

//metodo para el botton
function verDatosClick(){
    var x = document.getElementById("button");
    let cant = cantidadJugadores();
    var jugador = new Jugador(); 
    //jugador.cargarMazos(cant);   
    inicializarTablero();//llena tablero de imágenes en negro (para setear la nuev imagen)
    //cargarMeaples(cant);   
    cargarMazos(cant);  //cargar meaples y locetas en un mismo método
    eventosClick();
    actualizarTablero();//imprimir tablero deacuerdo a matriz lógica
}
function actualizarTablero(){
    let srcImage;
    for(let x=0; x<6; x++){
        for(let y=0; y<7; y++){
            console.log(matrizLogica.toString());
            switch(matrizLogica[x][y]){
                case 1: //Plantación Simple
                    document.getElementById(x.toString() + y.toString()).src = "./IMG/Templos.png";
                    break;
                case 2: //Plantación Doble
                    document.getElementById(x.toString() + y.toString()).src = "./IMG/Mina1.png";
                    break;
                case 3: //Mercado de 2
                    document.getElementById(x.toString() + y.toString()).src = "./IMG/Templos.png";
                    break;
                case 4: //Mercado de 3
                    document.getElementById(x.toString() + y.toString()).src = "./IMG/Mina1.png";
                    break;
                case 5: //Mercado de 4
                    document.getElementById(x.toString() + y.toString()).src = "./IMG/Templos.png";
                    break;
                case 6: //Mina de 1
                    document.getElementById(x.toString() + y.toString()).src = "./IMG/Mina1.png";
                    break;
                case 7: //Mina de 2
                    document.getElementById(x.toString() + y.toString()).src = "./IMG/Templos.png";
                    break;
                case 8: //Cenotes
                    document.getElementById(x.toString() + y.toString()).src = "./IMG/Mina1.png";  
                    break;
                case 9: //Centro de culto solar
                    document.getElementById(x.toString() + y.toString()).src = "./IMG/Mina1.png";
                    break;
                case 10: //Templos
                    document.getElementById(x.toString() + y.toString()).src = "./IMG/Mina1.png";
                    break;
                //--------
                //En el caso de "Meaples", se identifica con un case, pero se aplican métodos aparte para validar el tipo y los lados del meaple
            }            
        }
    }
}
function inicializarTablero(){
    var contenedor = new Pieza();
    for(let i = 0; i<57; i++){
        i = evaluaIndice(i);
        contenedor.asignaImagen("./IMG/contenedor.png",i);
        i = evaluaIndice(i);
    }
}

function evaluaIndice(indice){
    switch(indice){
        case 0:
            indice = "00";
            break;
        case 1:
            indice = "01";
            break;
        case 2:
            indice = "02";
            break;
        case 3:
            indice = "03";
            break;
        case 4:
            indice = "04";
            break;
        case 5:
            indice = "05";
            break;
        case 6:
            indice = "06";
            break;
        case 7:
            indice = 10;
            break;
        case 17:
            indice = 20;
            break;
        case 27:
            indice = 30;
            break;
        case 37:
            indice = 40;
            break;
        case 47:
            indice = 50;
            break;
        //-----------Casos de acomodo posterior
        case "00":
            indice = 0;
            break;
        case "01":
            indice = 1;
            break;
        case "02":
            indice = 2;
            break;
        case "03":
            indice = 3;
            break;
        case "04":
            indice = 4;
            break;
        case "05":
            indice = 5;
            break;
        case "06":
            indice = 6;
            break;
    }
    return indice;
}
function cargarMeaples(tamano){ //implementar este método en el mismo de "cargarMazos" (más abajo) para que estén todos en uno solo (locetas y meaples)
    
    let URLS  = ["./IMG/Meaples1.png","./IMG/Meaples2.png","./IMG/Meaples3.png"];
    var meaple = new Pieza();
    var mano1 = [];
    var mano2 = [];
    var mano3 = [];
    var mano4 = [];
    /*   if(tamano=="2"){           //ESTO está en el "cargarMazos"
          for(let i = 0; i<11; i++){
            
             let rand1 = Math.floor(Math.random()*3);
             mano1[i] = URLS[rand1];
             meaple.asignaImagen(mano1[i], "mazo1");
             let rand2 = Math.floor(Math.random()*3);
             mano2[i] = URLS[rand2];
             //setTimeout(meaple.asignaImagen(mano2[i], "mazo2"), 10000);
             meaple.asignaImagen(mano2[i], "mazo2");
          }
      }*/
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
  function cargarMazos(cantidad){
  
      let URL  = ["./IMG/Mercado2.png","./IMG/Mina1.png","./IMG/Templos.png"];
      var losetasUno = [];
      var losetasDos = [];
      var meaplesUno = [];
      var meaplesDos = [];
      switch(cantidad) {
          case "2": //llena los 2 mazos con 11 locetas c/u
              for(let i = 0; i<11; i++){ 
                  //-----------------------------
                  //Locetas
                  let rand1 = Math.floor(Math.random()*3);
                  losetasUno[i] = URL[rand1];
                  pieza.asignaImagen(losetasUno[i], "LocId1");//set datos a PIEZA
                  contenedorLosetasUno.setPieza(pieza);//set pieza a CONTENEDOR
                  let rand2 = Math.floor(Math.random()*3);
                  losetasDos[i] = URL[rand2];
                  pieza.asignaImagen(losetasDos[i], "LocId2");//set datos a PIEZA
                  contenedorLosetasDos.setPieza(pieza);//set pieza a CONTENEDOR
                    //-----------------------------
                    //meaples       (hay que usar las imágenes adecuadas en meaples)
                  meaplesUno[i] = URL[rand1];
                  pieza.asignaImagen(meaplesUno[i], "mazo1");//set datos a PIEZA
                  contenedorMeaplesUno.setPieza(pieza);//set pieza a CONTENEDOR

                  meaplesDos[i] = URL[rand2];
                  pieza.asignaImagen(meaplesDos[i], "mazo2");//set datos a PIEZA
                  contenedorMeaplesDos.setPieza(pieza);//set pieza a CONTENEDOR
              }
            break;
          case 3:
            // code block
            break;
          case 4:
            // code block
        }
  }
  function eventosClick(){ 
    //EVENTOS 'click' PARA LOS DOS MAZOS (ojo, en uno se usa la clase 'contenedora' y en el otro no // esto como una prueba, ya que posteriormente estas imágenes deben poder identificarse con un valor entero, para poder asignar el valor a la matriz lógica)
    var auxPieza = new Pieza();
    var int;
    //MAZO 1 LOCETAS
    var imageLosetas1 = document.getElementById('LocId1');//get imagen del tablero
    let piezaAux = new Pieza();
    piezaAux.setImage(imageLosetas1);//Set la imagen en una pieza
    piezaAux.setValorLógico(2); // '2' es un ejemplo, suponiendo que ese sea su valor lógico
    contenedorLosetasUno.setPieza(piezaAux);//Set la pieza en el contenendor
    contenedorLosetasUno.ficha.img.addEventListener("click", function (e) {
        contenedorLosetasUno.setEstado(true);
        document.getElementById("LocetasUno").style.backgroundColor = 'red'; 
        auxPieza.url = imageLosetas1.src;
        int = 2;//VALOR LÓGICO DE LA FICHA ('2' es un ejemplo)
    });
    //MAZO 2 LOCETAS
    var imageLosetas2 = document.getElementById('LocId2');
    imageLosetas2.addEventListener("click", function (e) {
            contenedorLosetasDos.setEstado(true);
            document.getElementById("LocetasDos").style.backgroundColor = 'red'; 
            auxPieza.url = imageLosetas2.src;
            int = 2;//VALOR LÓGICO DE LA FICHA ('2' es un ejemplo)
    });
    //MAZO 1 MEAPLES
    var imageMeaples1 = document.getElementById('mazo1');//get imagen del tablero
    piezaAux.setImage(imageMeaples1);//Set la imagen en una pieza
    contenedorMeaplesUno.setPieza(piezaAux);//Set la pieza en el contenendor
    contenedorMeaplesUno.ficha.img.addEventListener("click", function (e) {
            contenedorMeaplesUno.setEstado(true);
            document.getElementById("MeaplesUno").style.backgroundColor = 'red'; 
            auxPieza.url = imageMeaples1.src;
            int = 2;//VALOR LÓGICO DE LA FICHA ('2' es un ejemplo)
    });
    //MAZO 2 MEAPLES
    var imageMeaples2 = document.getElementById('mazo2');
    imageMeaples2.addEventListener("click", function (e) {
            contenedorMeaplesDos.setEstado(true);
            document.getElementById("MeaplesDos").style.backgroundColor = 'red'; 
            auxPieza.url = imageMeaples2.src;
            int = 2;//VALOR LÓGICO DE LA FICHA ('2' es un ejemplo)
    });
    listenForContenedores(auxPieza,int);
}

function listenForContenedores(pieza,valorLogico){
    for(let i = 0; i<57; i++){
        i = evaluaIndice(i);
        let imagen = document.getElementById(i);
        imagen.addEventListener("click", function (e) {
            //SI LA LOCETA ESTÁ SELECCIONADA
            if(contenedorLosetasUno.selected){//Aqui se debe leer el valorLógico y guardarlo en la matriz según corresponda la posición
                //Debería pasarsele una Ficha, no la dirección de una imagen.
                //document.getElementById(i).src = contenedorLosetasUno.ficha.url;
                document.getElementById(i).src = pieza.url;
                document.getElementById('LocId1').src = "./IMG/Templos.png";
                document.getElementById("LocetasUno").style.backgroundColor = 'black'; 
                contenedorLosetasUno.setEstado(false);
            }if(contenedorLosetasDos.selected){
                document.getElementById(i).src = pieza.url;
                document.getElementById('LocId2').src = "./IMG/Templos.png";
                document.getElementById("LocetasDos").style.backgroundColor = 'black'; 
                contenedorLosetasDos.setEstado(false);
            }//SI EL MEAPLE ESTÁ SELECCIONADO
            if(contenedorMeaplesUno.selected){
                document.getElementById(i).src = pieza.url;
                document.getElementById('mazo1').src = "./IMG/Templos.png";
                document.getElementById("MeaplesUno").style.backgroundColor = 'black'; 
                contenedorMeaplesUno.setEstado(false);
            }if(contenedorMeaplesDos.selected){
                document.getElementById(i).src = pieza.url;
                document.getElementById('mazo2').src = "./IMG/Templos.png";
                document.getElementById("MeaplesDos").style.backgroundColor = 'black'; 
                contenedorMeaplesDos.setEstado(false);
            }
        });
    }
    
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
