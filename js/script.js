
//----------------------------------------------------------
//------------LINEAS SOCKET.IO-------------------------------
//-----------------------------------------------------------
/*document.getElementById("j1").textContent = person;
document.getElementById("j1").style.fontSize = "26px";
document.getElementById("j1").style.marginTop = "30px";*/
// socket.emit('name',person);
//------------------------------------------------------------
/*
console.log("HOLA MUNDO!");
const socket = io();

socket.emit('nombres',"DARIO");

socket.on('nombres',(data)=>{
    console.log(data);
});*/
//------------------------------------------------------------


var URLS  = [];


var LocetasURL  = [];
var losetasMazo = [];   //Aquí están en orden, para luego pasarlas aleatorias a otro vector de objetos
var meaplesMazo1 = [];  // también
var meaplesMazo2 = [];  // también
var meaplesMazo3 = [];  // también
var meaplesMazo4 = [];  // también

const selvasObjects1 = [];//--Aqué están en desorden
const selvasObjects2 = [];
const trabajadoresObjects1 = [];
const trabajadoresObjects2 = [];
const trabajadoresObjects3 = [];
const trabajadoresObjects4 = [];

var JUGADORES = []; //---Array de Jugadores
var GANADOR;    //--ganador
var empate;

var turno;  //  --  Para interar los turnos
var numberOfPlayers;    //  --  Numero de Jugadores

var cont1 = 27; //--    Contador de Losetas Selva
var cont3 = 10; //--    Contador de Losetas Trabajadores de Jugador #1
var cont4 = 10; //--    Losetas de Jugador #2
var cont5 = 10; //--    Jugador #3
var cont6 = 10; //--    Jugador #4

let grados = 0; //--    grados de giro de imagens loseta

var primerClick = true;
var casilla;
var colocarEncima = false;
var jungleType;

//----Variebles de datos de jugador
var cabezas;
var cacaos=0;
var monedas=0;
var sun =0;
var remanso = -10;

//----Booleanos para colocación automática de loseta selva si existen meaples adyacentes
var selvaTOP = false;
var selvaDOWN = false;
var selvaLEFT = false;
var selvaRIGHT = false;

//----CLASES CONTENEDORAS (contienen los mazos de en la parte gráfica)
class contenedorMazoTrabajadores{
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
class contenedorMazoSelvas{
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
//-----clase TRABAJADOR loseta
class LosetaTrabajador{   // logic = 12
    constructor(top,down,left,right,url,player){
        this.top = top;
        this.down = down;
        this.left = left;
        this.right = right;
        this.url = url;
        this.dueño = "404";
    }
    girarDerecha(){
        let auxLeft = this.left;
        let auxTop = this.top;
        let auxRigth = this.right;
        let auxDown = this.down;
        this.top = this.left;
        this.right = auxTop;
        this.down = auxRigth;
        this.left = auxDown;
    }
    setImage(img){
        this.img = img;
    }
    setValorLogico(value){//valor que representará a la ficha en la matriz lógica
        this.value = value;
    }  
    asignaImagen(url, ide, ancho, alto){
        document.getElementById(ide).src=url;
        document.getElementById(ide).style.height=alto;
        document.getElementById(ide).style.width= ancho;
    }
}
//---clase SELVA loseta
class LosetaSelva{
    constructor(url, value, tipo){
        this.url = url;
        this.value = value;
        this.tipo = tipo;
    }//asigna la imagen del url que recibe al id que recibe
    asignaImagen(url, ide, ancho, alto){
        document.getElementById(ide).src=url;
        document.getElementById(ide).style.height=alto;
        document.getElementById(ide).style.width= ancho;
        // document.getElementById(ide).style.height='65px';
        // document.getElementById(ide).style.width='80px';

    }
    setImage(img){
        this.img = img;
    }
    setValorLogico(value){//valor que representará a la ficha en la matriz lógica
        this.value = value;
    }                    
      
}//----clase JUGADOR
class Jugador{
    constructor(){
        this.cacao = 0;
        this.monedas = 0;
        this.monedas5 =0;
        this.monedas10 =0;
        this.remanso = -10;
        this.sol = 0;
        this.tmpl = 0;
        this.puntos = 0;
        this.color = "red";
    }
      //metodo para remplazar la baraja a la hora de mover la ficha al tablero
      remplazar(vali,url){
        let remplazo = new LosetaSelva(); 
      //  let sacar = Math.floor(Math.random*11);
        if(vali == 1){
            remplazo.asignaImagen(url,"mazo1","75px","80px");
            vali = 0;
        }   
        if(vali == 2){
            setTimeout(remplazo.asignaImagen(url,"mazo2","75px","80px"),10000);
            vali = 0;
        }
        if(vali == 3){
            setTimeout(remplazo.asignaImagen(url,"mazo3","75px","80px"),10000);
            vali = 0;
        }
        if(vali == 4){
            setTimeout(remplazo.asignaImagen(url,"mazo4","75px","80px"),10000);
            vali = 0;
        }
    }
    RemplazarLocetas(param) {
        let remplazo = new LosetaSelva(); 
        if(param == 1){
            remplazo.asignaImagen(selvasObjects1[cont1].url, "LocId1","75px","80px");
        }
        if(param == 2){
            setTimeout(remplazo.asignaImagen(selvasObjects1[cont1].url,"LocId2","75px","80px"),10000);
        }
    }
    enviaValores(valor, identif){
        document.getElementById(identif).innerHTML = valor;
    }
}
//----------Iinstancias de CONTENEDORES DE LOSETAS---------
var pieza = new LosetaSelva();
var contenedorSelvasUno = new contenedorMazoSelvas(pieza,false);
var contenedorSelvasDos = new contenedorMazoSelvas(pieza,false);
var contenedorTrabajadoresUno = new contenedorMazoTrabajadores(pieza,false);
var contenedorTrabajadoresDos = new contenedorMazoTrabajadores(pieza,false);
var contenedorTrabajadoresTres = new contenedorMazoTrabajadores(pieza,false);
var contenedorTrabajadoresCuatro = new contenedorMazoTrabajadores(pieza,false);

//----MATRIZ DE TRABAJADORES-----
//-Cada vez que un jugador coloca
//-un meaple, se coloca el valor
//-del contador de ese meaple.
//-Por lo que todos los valores 
//-son diferentes.---------------
var matrizTrabajadores = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];
  //-----MATRIZ DE SELVAS--------
  //-Cada vez que se coloca una 
  //-selva, se coloca el valor
  //-(del 1 al 10) que representa
  //-el tipo de loseta de selva.
var matrizSelvas = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 3, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];
//----A CONTINUACIÓN-----
//-Funciones con "For's" para asignar valores numericos
//-a la matriz, o para imprimir la matriz.
  function setTrabajadoresMatrix(xData,yData,id){
    for(let x=0; x<8; x++){
        for(let y=0; y<8; y++){
            if(x == xData && y == yData){
                matrizTrabajadores[x][y] = id;
            }
        }
    }
  }
  
function setLogic(xData,yData,int){
    for(let x=0; x<8; x++){
        for(let y=0; y<8; y++){
            if(x == xData && y == yData){
                matrizSelvas[x][y] = int;
            }
        }
    }
}
function printTrabajadoresMatrix(){
    var matrizText = "";
    for(let x=0; x<8; x++){
        for(let y=0; y<8; y++){
            matrizText = matrizText + matrizTrabajadores[x][y];
        }
        matrizText = matrizText +"\n";
    }
    console.log(matrizText);
}
function printMatrix(){
    var matrizText = "";
    for(let x=0; x<8; x++){
        for(let y=0; y<8; y++){
            matrizText = matrizText + matrizSelvas[x][y];
        }
        matrizText = matrizText +"\n";
    }
    console.log(matrizText);
}
//---GIRAR FICHA-----
//-La variable 'casilla' es actualizada en cada jugada
//-con el id de la posición que tiene en la matriz de Trabajadores la última losetaTrabajador colocada.
//-Obtiene el índice que tiene esa posición en la matriz,
// y con el indice encuentra el trabajador a girar.
//-Valida si hay selvas cercanas, para premiar al jugador #1 (no pudimos hacer que premie correctamente)
function girarClick(){
    grados = grados + 90;
        var x = casilla.toString().slice(0,-1);
        var y = casilla.toString().slice(1);
        var num = matrizTrabajadores[x][y];
        var meapAux = trabajadoresObjects1[num];//revisar con los otros trabajadores
        meapAux.girarDerecha();
        validarSelvasCercanas(x,y,trabajadoresObjects1[num]);

        document.getElementById(casilla).style.transform = `rotate(${grados}deg)`;
        if(grados == 360){
            grados = 0;
        }
}

function setName(j,val){
    document.getElementById(j).textContent = val;
    document.getElementById(j).style.fontSize = "26px";
    document.getElementById(j).style.marginTop = "30px";
}
//----Evento de BOTON JUGAR-----
//----obtiene numberOfPayers
//--recorre tablero
//--carga mazos
//--asigna eventos Listener 
//--asigna marcadores
function verDatosClick(){
    // socket.on('nombres',(nombres)=>{
    // });
    numberOfPlayers = cantidadJugadores();
    var jugador = new Jugador(); 

    inicializarTablero();//llena tablero de imágenes en negro (para setear la nuev imagen) 
  cargarMazos(numberOfPlayers);  //cargar meaples y locetas en un mismo método
    eventosClick(numberOfPlayers);
    actualizarTablero();//imprimir tablero deacuerdo a matriz lógica
    asignaMarcadores(numberOfPlayers);
    //jugador.enviaValores("2",'CacaoJ4');
}
function actualizarTablero(){
    let srcImage;
    for(let x=0; x<8; x++){
        for(let y=0; y<8; y++){
            console.log(matrizSelvas.toString());
            switch(matrizSelvas[x][y]){
                case 1: //Plantación Simple    
                    document.getElementById(x.toString() + y.toString()).src = "./IMG/Semillas1.png";
                    break;
                case 3: //Mercado de 2
                    document.getElementById(x.toString() + y.toString()).src = "./IMG/Mercado2.png";
                    break;
                }            
        }
    }
}
function inicializarTablero(){
    var contenedor = new LosetaSelva();
    for(let i = 0; i<78; i++){
        i = evaluaIndice(i);
        contenedor.asignaImagen("./IMG/contenedor.png",i,"75px","80px");//solo pinta..
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
            indice = "07";
            break;
        case 8:
            indice = 10;
            break;
        case 18:
            indice = 20;
            break;
        case 28:
            indice = 30;
            break;
        case 38:
            indice = 40;
            break;
        case 48:
            indice = 50;
            break;
        case 58:
            indice = 60;
            break;
        case 68:
            indice = 70;
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
        case "07":
            indice = 7;
            break;
    }
    return indice;
}

function desordenarTrabajadores(unArray){
        var t = unArray.sort(function(a,b){return (Math.random()-0.10)});
        return [...t];
    }
function desordenarSelvas(unArray){
    var t = unArray.sort(function(a,b){return (Math.random()-0.27)});
    return [...t];
}
function cargarMazos(cantidad){
    for(let i = 0; i<28; i++){
        if(i<6){
            //inicializar locetasMazo con Fichas
            let card = new LosetaSelva("./IMG/Semillas1.png",1,"PlantacionSimple");
            losetasMazo.unshift(card);
            LocetasURL.unshift("./IMG/Cacao1.png");  
        }
        if(i>=6 && i<8){
            let card = new LosetaSelva("./IMG/Semillas2.png",2, "PlantacionDoble");
            losetasMazo.unshift(card);
            LocetasURL.unshift("./IMG/Semillas2.png");
        }
        if(i>=8 && i<15){
            if(i<10){
                let card = new LosetaSelva("./IMG/Mercado2.png",3,"Mercado2");
                losetasMazo.unshift(card);
                LocetasURL.unshift("./IMG/Mercado2.png");      
            }
            if(i>=10 && i<14){
                let card = new LosetaSelva("./IMG/Mercado3.png",4,"Mercado3");
                losetasMazo.unshift(card);
                LocetasURL.unshift("./IMG/Mercado3.png");   
            }
            if(i==14){
                let card = new LosetaSelva("./IMG/Mercado4.png",5,"Mercado4");
                losetasMazo.unshift(card);
                LocetasURL.unshift("./IMG/Mercado4.png");  
            }
        }
        if(i>=15 && i<18){
            if(i<17){
                let card = new LosetaSelva("./IMG/Mina1.png",6,"Mina1");
                losetasMazo.unshift(card);
                LocetasURL.unshift("./IMG/Mina1.png");
            }
            else{
                let card = new LosetaSelva("./IMG/Mina2.png",7,"Mina2");
                losetasMazo.unshift(card);
                LocetasURL.unshift("./IMG/Mina2.png");
            }
        }
        if(i>=18 && i<21){
            let card = new LosetaSelva("./IMG/Lago.png",8,"Lago");
            losetasMazo.unshift(card);
            LocetasURL.unshift("./IMG/Lago.png");
        }
        if(i>=21 && i<23){
            let card = new LosetaSelva("./IMG/MayaSun.png",9,"MayaSun");
            losetasMazo.unshift(card);
            LocetasURL.unshift("./IMG/MayaSun.png");
        }
        if(i>=23){   
            let card = new LosetaSelva("./IMG/Templos.png",10,"Templos");
            losetasMazo.unshift(card);
            LocetasURL.unshift("./IMG/Templos.png");
       }
    }
    // array trabajadores 
    for(let i=0; i<11;i++){
        if(i<5){
            //----
            let meap1 = new LosetaTrabajador(1,1,1,1,"./IMG/Meaples1.png",1);   
            if(cantidad == 2){ 
                meaplesMazo1.unshift(meap1);
                meaplesMazo2.unshift(meap1);
                URLS.unshift("./IMG/Meaples1.png");
            }
            if(cantidad==3){
                meaplesMazo1.unshift(meap1);
                meaplesMazo2.unshift(meap1);
                meaplesMazo3.unshift(meap1);
                URLS.unshift("./IMG/Meaples1.png");
            }
            if(cantidad ==4){
                meaplesMazo1.unshift(meap1);
                meaplesMazo2.unshift(meap1);
                meaplesMazo3.unshift(meap1);
                meaplesMazo4.unshift(meap1);
                URLS.unshift("./IMG/Meaples1.png");
            }
        }
        if(i>=5 && i<9){
            let meap1 = new LosetaTrabajador(1,1,0,2,"./IMG/Meaples2.png",1);
            if(cantidad ==2){
                meaplesMazo1.unshift(meap1);
                meaplesMazo2.unshift(meap1);
                URLS.unshift("./IMG/Meaples2.png");
            }
            if(cantidad==3){
                meaplesMazo1.unshift(meap1);
                meaplesMazo2.unshift(meap1);
                meaplesMazo3.unshift(meap1);
                URLS.unshift("./IMG/Meaples2.png");
            }
            if(cantidad ==4){
                meaplesMazo1.unshift(meap1);
                meaplesMazo2.unshift(meap1);
                meaplesMazo3.unshift(meap1);
                meaplesMazo4.unshift(meap1);
                URLS.unshift("./IMG/Meaples2.png");
            }
        }
        if(i>=9){
            let meap1 = new LosetaTrabajador(1,0,0,3,"./IMG/Meaples3.png",1);
            if(cantidad ==2){
                meaplesMazo1.unshift(meap1);
                meaplesMazo2.unshift(meap1);
                URLS.unshift("./IMG/Meaples3.png");
            }
            if(cantidad==3){
                meaplesMazo1.unshift(meap1);
                meaplesMazo2.unshift(meap1);
                meaplesMazo3.unshift(meap1);
                URLS.unshift("./IMG/Meaples3.png");
            }
            if(cantidad ==4){
                meaplesMazo1.unshift(meap1);
                meaplesMazo2.unshift(meap1);
                meaplesMazo3.unshift(meap1);
                meaplesMazo4.unshift(meap1);
                URLS.unshift("./IMG/Meaples3.png");
            }
        
        }      
    }
            console.log(losetasMazo);

            var randSelvas =[];
            var randMeaplesUno = [];
            var randMeaplesDos = [];
            var randMeaplesTres = [];
            var randMeaplesCuatro = [];
            var x,y;
            var rand,rand1,rand2,rand3,rand4;
            selvasArr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27];
      switch(cantidad) {
          case "2": 

              for(let i = 0; i<28; i++){ //
                    //-----------------------------
                    //Locetas
                x =  desordenarSelvas(selvasArr);
                randSelvas = x;
                rand = randSelvas[i];
                selvasObjects1[i] = losetasMazo[rand];//OBJETOS                      
              }
              contenedorSelvasUno.setPieza(selvasObjects1[cont1]);
              contenedorSelvasDos.setPieza(selvasObjects1[cont1]);
              numeros = [0,1,2,3,4,5,6,7,8,9,10];
              numeros2 = [0,1,2,3,4,5,6,7,8,9,10];
            
              for(let i = 0; i<11; i++){
                    //-----------------------------
                    //meaples  
                    x = desordenarTrabajadores(numeros);
                    y = desordenarTrabajadores(numeros2);
                    randMeaplesUno =  x;
                    randMeaplesDos = y;
                    rand1 = randMeaplesUno[i] ;
                    rand2 = randMeaplesDos[i];
                     trabajadoresObjects1[i] = meaplesMazo1[rand1];
                     trabajadoresObjects2[i] = meaplesMazo2[rand2];      
              }
             
              contenedorTrabajadoresUno.setPieza(trabajadoresObjects1[10]);
              contenedorTrabajadoresDos.setPieza(trabajadoresObjects2[10]);
            break;
          case "3":
              for(let i = 0; i<28; i++){ //
                    //-----------------------------
                    //Locetas
                x =  desordenarSelvas(selvasArr);
                randSelvas = x;
                rand = randSelvas[i];
                selvasObjects1[i] = losetasMazo[rand];//OBJETOS                      
              }
                contenedorSelvasUno.setPieza(selvasObjects1[10]);
                contenedorSelvasDos.setPieza(selvasObjects1[10]);

                numeros = [0,1,2,3,4,5,6,7,8,9,10];
                numeros2 = [0,1,2,3,4,5,6,7,8,9,10];
                numeros3 = [0,1,2,3,4,5,6,7,8,9,10]; 
            for(let i = 0; i<11; i++){
                    //-----------------------------
                    //meaples  
                    x = desordenarTrabajadores(numeros);
                    randMeaplesUno =  x;
                    y = desordenarTrabajadores(numeros2);
                    randMeaplesDos = y;
                    x = desordenarTrabajadores(numeros3)
                    randMeaplesTres =  x;  
                    rand1 = randMeaplesUno[i] ;
                    rand2 = randMeaplesDos[i];
                    rand3 = randMeaplesTres[i];
                     trabajadoresObjects1[i] = meaplesMazo1[rand1];
                     trabajadoresObjects2[i] = meaplesMazo2[rand2];
                     trabajadoresObjects3[i] = meaplesMazo3[rand3];
              }
              
                contenedorTrabajadoresUno.setPieza(trabajadoresObjects1[10]);
                contenedorTrabajadoresDos.setPieza(trabajadoresObjects2[10]);
                contenedorTrabajadoresTres.setPieza(trabajadoresObjects3[10]);
            break;
          case "4":
            
            for(let i = 0; i<28; i++){ //
                  //-----------------------------
                  //Locetas
              x =  desordenarSelvas(selvasArr);
              randSelvas = x;
              let rand = randSelvas[i];
              selvasObjects1[i] = losetasMazo[rand];//OBJETOS                      
            }
                    contenedorSelvasUno.setPieza(selvasObjects1[10]);
                    contenedorSelvasDos.setPieza(selvasObjects1[10]);
                    numeros = [0,1,2,3,4,5,6,7,8,9,10];
                    numeros2 = [0,1,2,3,4,5,6,7,8,9,10];
                    numeros3 = [0,1,2,3,4,5,6,7,8,9,10]; 
                    numeros4 = [0,1,2,3,4,5,6,7,8,9,10]
                for(let i = 0; i<11; i++){
                    //-----------------------------
                    //meaples  
                    x = desordenarTrabajadores(numeros);
                    randMeaplesUno =  x;
                    y = desordenarTrabajadores(numeros2);
                    randMeaplesDos = y;
                    x = desordenarTrabajadores(numeros3)
                    randMeaplesTres =  x;
                    y = desordenarTrabajadores(numeros4);
                    randMeaplesCuatro = y; 
                    rand1 = randMeaplesUno[i] ;
                    rand2 = randMeaplesDos[i];
                    rand3 = randMeaplesTres[i];
                    rand4 = randMeaplesCuatro[i];
                     trabajadoresObjects1[i] = meaplesMazo1[rand1];
                     trabajadoresObjects2[i] = meaplesMazo2[rand2];
                     trabajadoresObjects3[i] = meaplesMazo3[rand3];
                     trabajadoresObjects4[i] = meaplesMazo4[rand4];
              }
                    contenedorTrabajadoresUno.setPieza(trabajadoresObjects1[10]);
                    contenedorTrabajadoresDos.setPieza(trabajadoresObjects2[10]);
                    contenedorTrabajadoresTres.setPieza(trabajadoresObjects3[10]);
                    contenedorTrabajadoresCuatro.setPieza(trabajadoresObjects4[10]);
     }     
  }
  function eventosClick(cant){ 
    prepareMazoSelvas('LocId1',selvasObjects1[cont1].url,selvasObjects1[cont1].value,contenedorSelvasUno,"LocetasUno");
    prepareMazoSelvas('LocId2',selvasObjects1[cont1].url,selvasObjects1[cont1].value,contenedorSelvasDos,"LocetasDos");
    prepareMazoTrabajadores('mazo1',trabajadoresObjects1[cont3].url,trabajadoresObjects1[cont3].value,contenedorTrabajadoresUno,"MeaplesUno",1);
    prepareMazoTrabajadores('mazo2',trabajadoresObjects2[cont4].url,trabajadoresObjects2[cont4].value,contenedorTrabajadoresDos,"MeaplesDos",2);
    if(cant =="3"){
        prepareMazoTrabajadores('mazo3',trabajadoresObjects3[cont5].url,trabajadoresObjects3[cont5].value,contenedorTrabajadoresTres,"MeaplesTres",3);
    }
    if(cant == "4"){
        prepareMazoTrabajadores('mazo3',trabajadoresObjects3[cont5].url,trabajadoresObjects3[cont5].value,contenedorTrabajadoresTres,"MeaplesTres",3);
        prepareMazoTrabajadores('mazo4',trabajadoresObjects4[cont6].url,trabajadoresObjects4[cont6].value,contenedorTrabajadoresCuatro,"MeaplesCuatro",4);
    }
    
    listenForGrid();
}
  function prepareMazoSelvas(idImage,url,value,contenedor,locetaId){
    let piezaAux = new LosetaSelva();
    var image = document.getElementById(idImage);//get imagen del tablero
    piezaAux.setImage(image);//Set la imagen en una pieza
    piezaAux.asignaImagen(url, idImage,"75px","80px");//set a parte Gráfica
    piezaAux.setValorLogico(value);//Set valor lógico
    //CONTENEDOR
    contenedor.setPieza(piezaAux);
    contenedor.ficha.img.addEventListener("click", function (e) {
            contenedor.setEstado(true);
            document.getElementById(locetaId).style.backgroundColor = 'red'; 
        });
  }
  function prepareMazoTrabajadores(idImage,url,value,contenedor,locetaId,playerID){
    let piezaAux = new LosetaTrabajador();
    var image = document.getElementById(idImage);//get imagen del tablero
    piezaAux.setImage(image);//Set la imagen en una pieza
    piezaAux.asignaImagen(url, idImage,"75px","80px");//set a parte Gráfica
    piezaAux.setValorLogico(value);//Set valor lógico
    //CONTENEDOR
    contenedor.setPieza(piezaAux);
    contenedor.ficha.img.addEventListener("click", function (e) {
        contenedor.setEstado(true);
        document.getElementById(locetaId).style.backgroundColor = JUGADORES[playerID].color; 
    });
  }

  /*
function detectarDueño(){
    switch(turno){
        case 1:
            return trabajadoresObjects1;
        case 2:
            return trabajadoresObjects2;
        case 3:
            return trabajadoresObjects3;
        case 4:
            return trabajadoresObjects4;
    }
}*/

function updateTurno(){
    let limitTurns = parseInt(numberOfPlayers) + 1;
    turno = turno + 1;
    if(turno == limitTurns){
        turno = 1;
    }
}
function updateCont(contador){
    if(contador != 0){
        contador = contador - 1;
    }
    return contador;
}
function listenForGrid(){
    let rem = new Jugador();
     for(let i = 0; i<78; i++){
         i = evaluaIndice(i);     
         let imagen = document.getElementById(i);
         imagen.addEventListener("click", function (e) {
             if(contenedorSelvasUno.selected){
                var x = i.toString().slice(0,-1);
                var y = i.toString().slice(1);
                if(validarEspacioVacio(x,y)){
                    selvaClicked(selvasObjects1,i,"LocetasUno",contenedorSelvasUno);
                    cont1 = updateCont(cont1);
                    updateTurno();
                    rem.RemplazarLocetas(1);
                }
             }
             if(contenedorSelvasDos.selected){
                var x = i.toString().slice(0,-1);
                var y = i.toString().slice(1);
                if(validarEspacioVacio(x,y)){
                    selvaClicked(selvasObjects1,i,"LocetasDos",contenedorSelvasDos);
                    cont1 = updateCont(cont1);
                    updateTurno();
                    rem.RemplazarLocetas(1);
                }
             }
             if(contenedorTrabajadoresUno.selected){
                var x = i.toString().slice(0,-1);
                var y = i.toString().slice(1);
                if(validarEspacioVacio(x,y) || colocarEncima){
                    trabajadoresObjects1[cont3].dueño = 1;
                    meapleClicked(trabajadoresObjects1[cont3],i,"MeaplesUno",contenedorTrabajadoresUno,cont3);
                    cont3 = updateCont(cont3);
                    updateTurno();
                    rem.remplazar(1,trabajadoresObjects1[cont3].url);
                }
             }if(contenedorTrabajadoresDos.selected){
                var x = i.toString().slice(0,-1);
                var y = i.toString().slice(1);
                if(validarEspacioVacio(x,y) || colocarEncima){
                    trabajadoresObjects2[cont4].dueño = 2;
                    meapleClicked(trabajadoresObjects2[cont4],i,"MeaplesDos",contenedorTrabajadoresDos,cont4);
                    cont4 = updateCont(cont4);
                    updateTurno();
                    rem.remplazar(2,trabajadoresObjects2[cont4].url);
                }
             }
             if(contenedorTrabajadoresTres.selected){
                var x = i.toString().slice(0,-1);
                var y = i.toString().slice(1);
                if(validarEspacioVacio(x,y) || colocarEncima){
                    trabajadoresObjects3[cont5].dueño = 3;
                    meapleClicked(trabajadoresObjects3[cont5],i,"MeaplesTres",contenedorTrabajadoresTres,cont5);
                    cont5 = updateCont(cont5);
                    updateTurno();
                    rem.remplazar(3,trabajadoresObjects3[cont5].url);
                }
             }
             if(contenedorTrabajadoresCuatro.selected){
                 var x = i.toString().slice(0,-1);
                 var y = i.toString().slice(1);
                 if(validarEspacioVacio(x,y) || colocarEncima){
                    trabajadoresObjects4[cont6].dueño = 4;
                    meapleClicked(trabajadoresObjects4[cont6],i,"MeaplesTres",contenedorTrabajadoresCuatro,cont6);
                    cont6 = updateCont(cont6);
                    updateTurno();
                    rem.remplazar(4,trabajadoresObjects4[cont6].url);
                }
             }
         });
     }
 }
 function selvaClicked(objetoSelva,i,elementId,contenedor){
    resetSelvasBooleans();
    document.getElementById(i).src = objetoSelva[cont1].url;
    var x = i.toString().slice(0,-1);
    var y = i.toString().slice(1);
    //var dueñoDeMeaple = detectarDueño(); 
    var dueñoDeMeaple = trabajadoresObjects1 //--no queda de otra--
    validarMeaplesCercanos(x,y,objetoSelva[cont1],dueñoDeMeaple);
    setLogic(x,y,objetoSelva[cont1].value);
    if(llenarEspacioSelva(x,y,objetoSelva[cont1-1],cont1) == true){
        if(cont1 != 0){
            cont1 = cont1 - 1;
        }
    }
    printMatrix();
    document.getElementById(elementId).style.backgroundColor = 'black'; 
    contenedor.setEstado(false);
}
function meapleClicked(objetoTrabajador,i,elementId,contenedor,cont){
    document.getElementById(i).style.backgroundColor = JUGADORES[turno].color;
    document.getElementById(i).src = objetoTrabajador.url;

    var x = i.toString().slice(0,-1);
    var y = i.toString().slice(1);
    validarSelvasCercanas(x,y,objetoTrabajador);
    casilla = i;
    setTrabajadoresMatrix(x,y,cont);
    printTrabajadoresMatrix();
    document.getElementById(elementId).style.backgroundColor = 'black'; 
    contenedor.setEstado(false);
}
function validarSelvasCercanas(x,y,losetaMeaple){
    let xAbajo = parseInt(x) + 1;
    let xArriba = parseInt(x) - 1;
    let yDerecha = parseInt(y) + 1;
    let yIzquierda = parseInt(y) - 1;

    if(matrizSelvas[xAbajo][y] != 0){       //validar ABAJO
        selvaId = matrizSelvas[xAbajo][y]; 
        getTipoSelvaWithId(selvaId);
        cabezas = losetaMeaple.down;
        switchTipos(jungleType,cabezas,losetaMeaple.dueño);
    }
    if(matrizSelvas[xArriba][y] != 0){      //validar ARRIBA
        selvaId = matrizSelvas[xArriba][y];
        getTipoSelvaWithId(selvaId);
        cabezas = losetaMeaple.top;
        switchTipos(jungleType,cabezas,losetaMeaple.dueño);
        selvaTOP = true;
    }
    if(matrizSelvas[x][yIzquierda] != 0){   //validar IZQUIERDA
        selvaId = matrizSelvas[x][yIzquierda];
        getTipoSelvaWithId(selvaId);
        cabezas = losetaMeaple.left;
        switchTipos(jungleType,cabezas,losetaMeaple.dueño);
        selvaLEFT = true;
    }
    if(matrizSelvas[x][yDerecha] != 0){     //validar DERECHA
        selvaId = matrizSelvas[x][yDerecha];
        getTipoSelvaWithId(selvaId);
        cabezas = losetaMeaple.right;
        switchTipos(jungleType,cabezas,losetaMeaple.dueño);
        selvaRIGHT = true;
    }
 }
 //---NOTA---
 //--En validar meaples cercanos existe un error, ya que al colocar una loseta de selva junto a una de meaple
 //--se debería premiar al dueño de la loseta de meaple, pero..
 //--siempre premia al jugador #1.
 //--No tuvimos chance de encontrar una solución para identificar el dueño de la loseta de trabajador cercana
function validarMeaplesCercanos(x,y,losetaSelva,trabajador){
    let xAbajo = parseInt(x) + 1;
    let xArriba = parseInt(x) - 1;
    let yDerecha = parseInt(y) + 1;
    let yIzquierda = parseInt(y) - 1;
    let mep;
    //en este caso, siempre se premia al jugador que tiene el TURNO
        if(matrizTrabajadores[xAbajo][y] != 0){  //  ABAJO
            mep = matrizTrabajadores[xAbajo][y];
            cabezas = parseInt(trabajador.top);
            switchTipos(losetaSelva.tipo,cabezas,trabajador[mep].dueño); 
            selvaDOWN = true;       }
        if(matrizTrabajadores[xArriba][y] != 0){ //  ARRIBA
            mep = matrizTrabajadores[xArriba][y];
            cabezas = parseInt(trabajador[mep].down);
            switchTipos(losetaSelva.tipo,cabezas,trabajador[mep].dueño);
            selvaTOP = true;     }
        if(matrizTrabajadores[x][yIzquierda] != 0){  //  IZQUIERDA
            mep = matrizTrabajadores[x][yIzquierda];
            cabezas = parseInt(trabajador[mep].left);
            switchTipos(losetaSelva.tipo,cabezas,trabajador[mep].dueño);
            selvaLEFT = true;         }
        if(matrizTrabajadores[x][yDerecha] != 0){ //  DERECHA
            mep = matrizTrabajadores[x][yDerecha];
            cabezas = parseInt(trabajador[mep].right);
            switchTipos(losetaSelva.tipo,cabezas,trabajador[mep].dueño);
            selvaRIGHT = true;         }
}
 function llenarEspacioSelva(x,y,newSelva,contador){ //llena un espacio con un trabajador AUTOMATICAMENTE si está vacio
    let xAbajo = parseInt(x) + 1;
    let xArriba = parseInt(x) - 1;
    let yDerecha = parseInt(y) + 1;
    let yIzquierda = parseInt(y) - 1;
    let idElement;
    contador = contador - 1;

    if(selvaTOP == true && selvaRIGHT == true){
        if(validarEspacioVacio(xArriba,yDerecha)){
            idElement = xArriba.toString() + yDerecha.toString();
            matrizSelvas[xArriba][yDerecha] = contador;
            document.getElementById(idElement).src = newSelva.url;
            setLogic(xArriba,yDerecha,contador);
            return true;
        }
    }
    if(selvaTOP && selvaLEFT){
        if(validarEspacioVacio(xArriba,yIzquierda)){
            idElement = xArriba.toString() + yIzquierda.toString();
            matrizSelvas[xArriba][yIzquierda] = contador;
            document.getElementById(idElement).src = newSelva.url;
            setLogic(xArriba,yIzquierda,contador);
            return true;
        }
    }
    if(selvaDOWN && selvaRIGHT){
        if(validarEspacioVacio(xAbajo,yDerecha)){
            idElement = xAbajo.toString() + yDerecha.toString();
            matrizSelvas[xAbajo][yDerecha] = contador;
            document.getElementById(idElement).src = newSelva.url;
            setLogic(xAbajo,yDerecha,contador);
            return true;
        }
    }
    if(selvaDOWN && selvaLEFT){
        if(validarEspacioVacio(xAbajo,yIzquierda)){
            idElement = xAbajo.toString() + yIzquierda.toString();
            matrizSelvas[xAbajo][yIzquierda] = contador;
            document.getElementById(idElement).src = newSelva.url;
            setLogic(xAbajo,yIzquierda,contador);
            return true;
        }
    }
    else{
        return false;
    }
 }
 
function getTipoSelvaWithId(id){

    switch(id){
        case 1:
            jungleType = "PlantacionSimple";
            break;
        case 2:
            jungleType = "PlantacionDoble";
            break;
        case 3:
            jungleType = "Mercado2";
            break;
        case 4:
            jungleType = "Mercado3";
            break;
        case 5:
            jungleType = "Mercado4";
            break;
        case 6:
            jungleType = "Mina1";
            break;
        case 7:
            jungleType = "Mina2";
            break;
        case 8:
            jungleType = "Lago";
            break;
        case 9:
            jungleType = "MayaSun";
            break;
        case 10:
            jungleType = "Templos";
            break;
    }
 }

function validarEspacioVacio(x,y){
    var xVar = parseInt(x);
    var yVar = parseInt(y);
    var idTrabajador = matrizTrabajadores[xVar][yVar];
    var idSelva = matrizSelvas[xVar][yVar];
    var casillaStatus;
    
    if(idTrabajador == 0 && idSelva == 0){
        casillaStatus = true;
    }else{
        casillaStatus =  false;
    }
    return casillaStatus;
}
function resetSelvasBooleans(){
    selvaTOP = false;
    selvaDOWN = false;
    selvaLEFT = false;
    selvaRIGHT = false;
 }

 function premiarCacao(cacaosWIN,dueño){
    JUGADORES[dueño].cacao = JUGADORES[dueño].cacao + cacaosWIN; 
    // aveces da error en esta línea de arriba. (991)

    switch(dueño){
        case 1:
            document.getElementById("CacaoJ1").textContent = JUGADORES[dueño].cacao.toString();
            break;
        case 2:
            document.getElementById("CacaoJ2").textContent = JUGADORES[dueño].cacao.toString();
            break;
        case 3:
            document.getElementById("CacaoJ3").textContent = JUGADORES[dueño].cacao.toString();
            break;
        case 4:
            document.getElementById("CacaoJ4").textContent = JUGADORES[dueño].cacao.toString();
            break;
    }
 }
 function premiarMonedas(monedasWIN,dueño){
    console.log("DUEÑO =" + dueño);
    let monedas1, monedas5, monedas10;
    JUGADORES[dueño].monedas = JUGADORES[dueño].monedas + monedasWIN;

    switch(dueño){
        case 1:
            monedas1 ="Monedas1J1";
            monedas5 ="Monedas5J1";
            monedas10 ="Monedas10J1";
            break;
        case 2:
            monedas1 ="Monedas1J2";
            monedas5 ="Monedas5J2";
            monedas10 ="Monedas10J2";
            break;
        case 3:
            monedas1 ="Monedas1J3";
            monedas5 ="Monedas5J3";
            monedas10 ="Monedas10J3";
            break;
        case 4:
            monedas1 ="Monedas1J4";
            monedas5 ="Monedas5J4";
            monedas10 ="Monedas10J4";
            break;
    }
    console.log("(monedas=" +JUGADORES[dueño].monedas);
    if(JUGADORES[dueño].monedas>5){
        JUGADORES[dueño].monedas5 = JUGADORES[dueño].monedas5 + 1;
        JUGADORES[dueño].monedas = JUGADORES[dueño].monedas - 5;
    }
    console.log("(monedas 5=" +JUGADORES[dueño].monedas5);
    if(JUGADORES[dueño].monedas5>1){
        JUGADORES[dueño].monedas10 = JUGADORES[dueño].monedas10 + 1;
        JUGADORES[dueño].monedas5 = JUGADORES[dueño].monedas5 - 1;
    }
    document.getElementById(monedas1).textContent = JUGADORES[dueño].monedas.toString();
    document.getElementById(monedas5).textContent = JUGADORES[dueño].monedas5.toString();
    document.getElementById(monedas10).textContent = JUGADORES[dueño].monedas10.toString();

 }
 function mayaSun(ficha,dueño){
    console.log("DUEÑO =" + dueño);
    JUGADORES[dueño].sol = JUGADORES[dueño].sol + ficha;

    switch(dueño){
        case 1:
            document.getElementById("solVal").textContent = JUGADORES[dueño].sol.toString();
            break;
        case 2:
            document.getElementById("solVal2").textContent = JUGADORES[dueño].sol.toString();
            break;
        case 3:
            document.getElementById("solVal3").textContent = JUGADORES[dueño].sol.toString();
            break;
        case 4:
            document.getElementById("solVal4").textContent = JUGADORES[dueño].sol.toString();
            break;
    }
 }
 function aguador(cenote,dueño){
    console.log("DUEÑO =" + dueño);
    JUGADORES[dueño].remanso = JUGADORES[dueño].remanso + cenote;

    switch(dueño){
        case 1:
            document.getElementById("RemansoJ1").textContent = JUGADORES[dueño].remanso.toString();
            break;
        case 2:
            document.getElementById("RemansoJ2").textContent = JUGADORES[dueño].remanso.toString();
            break;
        case 3:
            document.getElementById("RemansoJ3").textContent = JUGADORES[dueño].remanso.toString();
            break;
        case 4:
            document.getElementById("RemansoJ4").textContent = JUGADORES[dueño].remanso.toString();
            break;
    }
 }
function switchTipos(tipo,jupas,dueño){
    switch(tipo){
        case "PlantacionSimple":
            cacaos = (1*jupas);
            premiarCacao(cacaos,dueño);
            break;
        case "PlantacionDoble":
            cacaos = (2*jupas);
            premiarCacao(cacaos,dueño);
            break;
        case "Mercado2":
            if(jupas <= cacaos){
                cacaos = -jupas;
                premiarCacao(cacaos,dueño);
                monedas = (2*jupas);
                premiarMonedas(monedas,dueño);
            }
            break;
        case "Mercado3":
            if(jupas <= cacaos){
                cacaos = -jupas;
                premiarCacao(cacaos,dueño);
                monedas = (3*jupas);
                premiarMonedas(monedas,dueño);
            }
            break;
        case "Mercado4":
            if(jupas <= cacaos){
                cacaos = -jupas;
                premiarCacao(cacaos,dueño);
                monedas = (4*jupas);
                premiarMonedas(monedas,dueño);
            }
            break;
        case "Mina1":
            monedas = (1*jupas);
            premiarMonedas(monedas,dueño);
            break;
        case "Mina2":
            monedas = (2*jupas);
            premiarMonedas(monedas,dueño);
            break;
        case "MayaSun":
            sun = (1*jupas);
            mayaSun(sun,dueño);
            break;
        case "Lago":
            remanso = +(1*jupas);
            aguador(remanso,dueño)
        case "Templos": 
             tmpl = (1*jupas);
             return tmpl, dueño;   //--- ???    
    }
}


           //metodo que define la cantidad de jugadores
function  cantidadJugadores(){
        var jug = window.prompt("Digite la cantidad de Jugadores");
        turno = 1;
        var colores = ["null","chartreuse","gold","red","blue"];
        for(let i=0; i<parseInt(jug)+1; i++){
            var player = new Jugador();
            player.color = colores[i];
            console.log("COLOR-"+i.toString() + " = " +  colores[i]);
            JUGADORES.push(player);
        }

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

function asignaMarcadores(cantidad){
    let marcadores = new LosetaSelva();

        marcadores.asignaImagen("./IMG/FichaCacao.png","cacao1",'20px','20px');
        marcadores.asignaImagen("./IMG/Monedas1.png","monedas1",'20px','20px');
        marcadores.asignaImagen("./IMG/Monedas5.png","monedas5",'20px','20px');
        marcadores.asignaImagen("./IMG/Monedas10.png","monedas10",'20px','20px');
        marcadores.asignaImagen("./IMG/FichaSol.png","fichaSol1",'20px','20px');
        marcadores.asignaImagen("./IMG/Remanso.png","remanso",'20px','20px');
        //marcadores juagdor 2
        marcadores.asignaImagen("./IMG/FichaCacao.png","cacao2",'20px','20px');
        marcadores.asignaImagen("./IMG/Monedas1.png","monedas12",'20px','20px');
        marcadores.asignaImagen("./IMG/Monedas5.png","monedas52",'20px','20px');
        marcadores.asignaImagen("./IMG/Monedas10.png","monedas102",'20px','20px');
        marcadores.asignaImagen("./IMG/FichaSol.png","fichaSol2",'20px','20px');
        marcadores.asignaImagen("./IMG/Remanso.png","remanso2",'20px','20px');

    if(cantidad == "3"){
        marcadores.asignaImagen("./IMG/FichaCacao.png","cacao3",'20px','20px');
        marcadores.asignaImagen("./IMG/Monedas1.png","monedas13",'20px','20px');
        marcadores.asignaImagen("./IMG/Monedas5.png","monedas53",'20px','20px');
        marcadores.asignaImagen("./IMG/Monedas10.png","monedas103",'20px','20px');
        marcadores.asignaImagen("./IMG/FichaSol.png","fichaSol3",'20px','20px');
        marcadores.asignaImagen("./IMG/Remanso.png","remanso3",'20px','20px');
    }
    if(cantidad =="4"){
        marcadores.asignaImagen("./IMG/FichaCacao.png","cacao3",'20px','20px');
        marcadores.asignaImagen("./IMG/Monedas1.png","monedas13",'20px','20px');
        marcadores.asignaImagen("./IMG/Monedas5.png","monedas53",'20px','20px');
        marcadores.asignaImagen("./IMG/Monedas10.png","monedas103",'20px','20px');
        marcadores.asignaImagen("./IMG/FichaSol.png","fichaSol3",'20px','20px');
        marcadores.asignaImagen("./IMG/Remanso.png","remanso3",'20px','20px');

        marcadores.asignaImagen("./IMG/FichaCacao.png","cacao4",'20px','20px');
        marcadores.asignaImagen("./IMG/Monedas1.png","monedas14",'20px','20px');
        marcadores.asignaImagen("./IMG/Monedas5.png","monedas54",'20px','20px');
        marcadores.asignaImagen("./IMG/Monedas10.png","monedas104",'20px','20px');
        marcadores.asignaImagen("./IMG/FichaSol.png","fichaSol4",'20px','20px');
        marcadores.asignaImagen("./IMG/Remanso.png","remanso4",'20px','20px');
    }   
}

function terminarClick(){
    let puntosP1, puntosP2, puntosP3, puntosP4;
    for(let x=0; x<numberOfPlayers; x++){
        contarPuntosFinales(JUGADORES[x]);
    }
    puntosP1 = JUGADORES[1].puntos;
    puntosP2 = JUGADORES[2].puntos;
    cacaosP1 = JUGADORES[1].cacao;
    cacaosP2 = JUGADORES[2].cacao
    

    switch(numberOfPlayers){
        case 2:
            if(puntosP1 > puntosP2){
                GANADOR = JUGADORES[1];
            }
            if(puntosP2 > puntosP1){
                GANADOR = JUGADORES[2];
            }
            if(puntosP1 == puntosP2){

                if(cacaosP1 > cacaosP2){
                    GANADOR = JUGADORES[1];
                }
                if(cacaosP2 > cacaosP1){
                    GANADOR = JUGADORES[2];
                }
                if(cacaosP1 == cacaosP2){
                    empate = true;                    
                }
            }
            break;
        case 3:
            puntosP3 = JUGADORES[3].puntos;
            cacaosP3 = JUGADORES[3].cacao;
            if(puntosP1 > (puntosP2 && puntosP3)){
                GANADOR = JUGADORES[1];
            }
            if(puntosP2 > (puntosP1 && puntosP3)){
                GANADOR = JUGADORES[2];
            }
            if(puntosP3 > (puntosP1 && puntosP2)){
                GANADOR = JUGADORES[3];
            }
            if(puntosP1 == puntosP2){

                if(cacaosP1 > cacaosP2){
                    GANADOR = JUGADORES[1];
                }
                if(cacaosP2 > cacaosP1){
                    GANADOR = JUGADORES[2];
                }
                if(cacaosP1 == cacaosP2){
                    empate = true;                    
                }
            }
            if(puntosP1 == puntosP3){

                if(cacaosP1 > cacaosP3){
                    GANADOR = JUGADORES[1];
                }
                if(cacaosP3 > cacaosP1){
                    GANADOR = JUGADORES[3];
                }
                if(cacaosP1 == cacaosP3){
                    empate = true;                    
                }
            }
            if(puntosP2 == puntosP3){

                if(cacaosP2 > cacaosP3){
                    GANADOR = JUGADORES[2];
                }
                if(cacaosP3 > cacaosP2){
                    GANADOR = JUGADORES[3];
                }
                if(cacaosP2 == cacaosP3){
                    empate = true;                    
                }
            }
            if(puntosP1 == puntosP2){

                if(cacaosP1 > cacaosP2){
                    GANADOR = JUGADORES[1];
                }
                if(cacaosP2 > cacaosP1){
                    GANADOR = JUGADORES[2];
                }
                if(cacaosP1 == cacaosP2){
                    empate = true;                    
                }
            }
            if((puntosP1 == puntosP2) && (puntosP3 == puntosP2)){

                if(cacaosP1 > (cacaosP2 && cacaosP3)){
                    GANADOR = JUGADORES[1];
                }
                if(cacaosP2 > (cacaosP1 && cacaosP3)){
                    GANADOR = JUGADORES[2];
                }
                if(cacaosP3 > (cacaosP1 && cacaosP2)){
                    GANADOR = JUGADORES[3];
                }
                if(cacaosP1 == cacaosP2){
                    empate = true;                    
                }
            }
            break;
    }
}

function contarPuntosFinales(player){
    let points;
    points = player.monedas + player.monedas5 + player.monedas10;
    points = points + player.remancio;
    points = points + player.piedraSolar;
    points = points + validarTemplos(player);

    player.puntos = points;
}

function validarTemplos(){
    return 1; //HACER
}