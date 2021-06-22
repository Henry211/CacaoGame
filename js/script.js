//import Tablero from "./tablero.js"
//const tablero = new Tablero()
//Array para las urls de los meaplos
var URLS  = [];

//mano de la locetas
var LocetasURL  = [];
//---------Cambios Henry
var losetasMazo = [];   //Aquí están en orden
var meaplesMazo1 = [];
var meaplesMazo2 = [];
var meaplesMazo3 = [];
var meaplesMazo4 = [];
const selvasObjects1 = [];//--desoreden
const selvasObjects2 = [];
const trabajadoresObjects1 = [];
const trabajadoresObjects2 = [];
const trabajadoresObjects3 = [];
const trabajadoresObjects4 = [];
var matrizMeaples;

var cont1 = 27; //--losetas1
var cont3 = 10; //--meaples2
let grados = 0;
var primerClick = true;
var casilla;
var colocarEncima = false;

var cabezas;
var cacaos=0;
var monedas=0;
    
//Las clases Contenedoras no son totalmente necesarias, puede que se necesiten más adelante
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
//--clase MEAPLE--
class LosetaTrabajador{   // logic = 12
    constructor(top,down,left,right,url,player){
        this.top = top;
        this.down = down;
        this.left = left;
        this.right = right;
        this.url = url;
        this.player = player;
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
}
//clase de cada ficha
class LosetaSelva{
    constructor(url, value, tipo){
        this.url = url;
        this.value = value;
        this.tipo = tipo;
    }//asigna la imagen del url que recibe al id que recibe
    asignaImagen(url, ide){
        document.getElementById(ide).src=url;
        document.getElementById(ide).style.height='65px';
        document.getElementById(ide).style.width='80px';

    }
    setImage(img){
        this.img = img;
    }
    setValorLogico(value){//valor que representará a la ficha en la matriz lógica
        this.value = value;
    }                    
      
}//clase jugador
class Jugador{
    constructor(cacao, monedas, remancio){
        this.cacao = cacao;
        this.monedas = monedas;
        this.remancio = remancio;
    }
      //metodo para remplazar la baraja a la hora de mover la ficha al tablero
      remplazar(vali,url){
        let remplazo = new LosetaSelva(); 
        if(vali == 1){
           remplazo.asignaImagen(url,"mazo1");//reemplaza en la mano de cada jugador y la pone en la nueva imagen
           //reemplazo.setValorLógico(11); 
           vali = 0;
          }  
          if(vali == 2){
            setTimeout(remplazo.asignaImagen(url,"mazo2"),10000);
            vali = 0;
        }
        if(vali == 3){
            setTimeout(remplazo.asignaImagen(url,"mazo3"),10000);
            vali = 0;
        }
        if(vali == 4){
            setTimeout(remplazo.asignaImagen(url,"mazo4"),10000);
            vali = 0;
        }
    }
    RemplazarLocetas(param) {
        let ram = Math.floor(Math.random()*11); 
        let remplazo = new LosetaSelva(); 
        if(param == 1){
            remplazo.asignaImagen(selvasObjects1[cont1].url, "LocId1");
        }
        if(param == 2){
            setTimeout(remplazo.asignaImagen(selvasObjects1[cont1].url,"LocId2"),10000);
        }
    }
}
//----------CONTENEDORES DE LOSETAS---------
var pieza = new LosetaSelva();
var contenedorSelvasUno = new contenedorMazoSelvas(pieza,false);
var contenedorSelvasDos = new contenedorMazoSelvas(pieza,false);
var contenedorTrabajadoresUno = new contenedorMazoTrabajadores(pieza,false);
var contenedorTrabajadoresDos = new contenedorMazoTrabajadores(pieza,false);
var contenedorTrabajadoresTres = new contenedorMazoTrabajadores(pieza,false);
var contenedorTrabajadoresCuatro = new contenedorMazoTrabajadores(pieza,false);

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
var matrizSelvas = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 3, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];

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


function girarClick(){
    grados = grados + 90;
        var x = casilla.toString().slice(0,-1);
        var y = casilla.toString().slice(1);
        var num = matrizTrabajadores[x][y];
        var meapAux = trabajadoresObjects1[num];//revisar con los otros trabajadores
        meapAux.girarDerecha()

        document.getElementById(casilla).style.transform = `rotate(${grados}deg)`;
        if(grados == 360){
            grados = 0;
        }
}

//metodo para el botton
function verDatosClick(){
    //var x = document.getElementById("button");
    let cant = cantidadJugadores();
    var jugador = new Jugador(); 
    inicializarTablero();//llena tablero de imágenes en negro (para setear la nuev imagen) 
    cargarMazos(cant);  //cargar meaples y locetas en un mismo método
    eventosClick();
    actualizarTablero();//imprimir tablero deacuerdo a matriz lógica
}
function actualizarTablero(){
    let srcImage;
    for(let x=0; x<8; x++){
        for(let y=0; y<8; y++){
            console.log(matrizSelvas.toString());
            switch(matrizSelvas[x][y]){
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
    var contenedor = new LosetaSelva();
    for(let i = 0; i<77; i++){
        i = evaluaIndice(i);

        contenedor.asignaImagen("./IMG/contenedor.png",i);//solo pinta..
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
function cargarMazos(cantidad){
    for(let i = 0; i<28; i++){
        if(i<6){
            //inicializar locetasMazo con Fichas
            let card = new LosetaSelva("./IMG/Cacao1.png",1);
            losetasMazo.unshift(card);
            LocetasURL.unshift("./IMG/Cacao1.png");  
        }
        if(i>=6 && i<8){
            let card = new LosetaSelva("./IMG/Semillas2.png",2);
            losetasMazo.unshift(card);
            LocetasURL.unshift("./IMG/Semillas2.png");
        }
        if(i>=8 && i<15){
            if(i<10){
                let card = new LosetaSelva("./IMG/Mercado2.png",3);
                losetasMazo.unshift(card);
                LocetasURL.unshift("./IMG/Mercado2.png");      
            }
            if(i>=10 && i<14){
                let card = new LosetaSelva("./IMG/Mercado3.png",4);
                losetasMazo.unshift(card);
                LocetasURL.unshift("./IMG/Mercado3.png");   
            }
            if(i==14){
                let card = new LosetaSelva("./IMG/Mercado4.png",5);
                losetasMazo.unshift(card);
                LocetasURL.unshift("./IMG/Mercado4.png");  
            }
        }
        if(i>=15 && i<18){
            if(i<17){
                let card = new LosetaSelva("./IMG/Mina1.png",6);
                losetasMazo.unshift(card);
                LocetasURL.unshift("./IMG/Mina1.png");
            }
            else{
                let card = new LosetaSelva("./IMG/Mina2.png",7);
                losetasMazo.unshift(card);
                LocetasURL.unshift("./IMG/Mina2.png");
            }
        }
        if(i>=18 && i<21){
            let card = new LosetaSelva("./IMG/Lago.png",8);
            losetasMazo.unshift(card);
            LocetasURL.unshift("./IMG/Lago.png");
        }
        if(i>=21 && i<23){
            let card = new LosetaSelva("./IMG/MayaSun.png",9);
            losetasMazo.unshift(card);
            LocetasURL.unshift("./IMG/MayaSun.png");
        }
        if(i>=23){   
            let card = new LosetaSelva("./IMG/Templos.png",10);
            losetasMazo.unshift(card);
            LocetasURL.unshift("./IMG/Templos.png");
       }
    }
      for(let i=0; i<11;i++){
        if(i<5){
            //----
            if(cantidad ==2){
                let meap1 = new LosetaTrabajador(1,1,1,1,"./IMG/Meaples1.png",1);
                let meap2 = new LosetaTrabajador(1,1,1,1,"./IMG/Meaples1.png",1);
                meaplesMazo1.unshift(meap1);
                meaplesMazo2.unshift(meap2);
                URLS.unshift("./IMG/Meaples1.png");
            }
            if(cantidad==3){
                let meap1 = new LosetaTrabajador(1,1,1,1,"./IMG/Meaples1.png",1);
                let meap2 = new LosetaTrabajador(1,1,1,1,"./IMG/Meaples1.png",1);
                let meap3 = new LosetaTrabajador(1,1,1,1,"./IMG/Meaples1.png",1);
                meaplesMazo1.unshift(meap1);
                meaplesMazo2.unshift(meap2);
                meaplesMazo3.unshift(meap3);
                URLS.unshift("./IMG/Meaples1.png");
            }
            if(cantidad ==4){
                let meap1 = new LosetaTrabajador(1,1,1,1,"./IMG/Meaples1.png",1);
                let meap2 = new LosetaTrabajador(1,1,1,1,"./IMG/Meaples1.png",1);
                let meap3 = new LosetaTrabajador(1,1,1,1,"./IMG/Meaples1.png",1);
                let meap4 = new LosetaTrabajador(1,1,1,1,"./IMG/Meaples1.png",1);
                meaplesMazo1.unshift(meap1);
                meaplesMazo2.unshift(meap2);
                meaplesMazo3.unshift(meap3);
                meaplesMazo4.unshift(meap4);
                URLS.unshift("./IMG/Meaples1.png");
            }
        }
        if(i>=5 && i<9){
            if(cantidad ==2){
                let meap1 = new LosetaTrabajador(1,1,0,2,"./IMG/Meaples2.png",1);
                let meap2 = new LosetaTrabajador(1,1,0,2,"./IMG/Meaples2.png",1);
                meaplesMazo1.unshift(meap1);
                meaplesMazo2.unshift(meap2);
                URLS.unshift("./IMG/Meaples2.png");
            }
            if(cantidad==3){
                let meap1 = new LosetaTrabajador(1,1,1,1,"./IMG/Meaples2.png",1);
                let meap2 = new LosetaTrabajador(1,1,1,1,"./IMG/Meaples2.png",1);
                let meap3 = new LosetaTrabajador(1,1,1,1,"./IMG/Meaples2.png",1);
                meaplesMazo1.unshift(meap1);
                meaplesMazo2.unshift(meap2);
                meaplesMazo3.unshift(meap3);
                URLS.unshift("./IMG/Meaples2.png");
            }
            if(cantidad ==4){
                let meap1 = new LosetaTrabajador(1,1,1,1,"./IMG/Meaples2.png",1);
                let meap2 = new LosetaTrabajador(1,1,1,1,"./IMG/Meaples2.png",1);
                let meap3 = new LosetaTrabajador(1,1,1,1,"./IMG/Meaples2.png",1);
                let meap4 = new LosetaTrabajador(1,1,1,1,"./IMG/Meaples2.png",1);
                meaplesMazo1.unshift(meap1);
                meaplesMazo2.unshift(meap2);
                meaplesMazo3.unshift(meap3);
                meaplesMazo4.unshift(meap4);
                URLS.unshift("./IMG/Meaples2.png");
            }
        }
        if(i<9){
            if(cantidad ==2){
                let meap1 = new LosetaTrabajador(1,0,0,3,"./IMG/Meaples3.png",1);
                let meap2 = new LosetaTrabajador(1,0,0,3,"./IMG/Meaples3.png",1);
                meaplesMazo1.unshift(meap1);
                meaplesMazo2.unshift(meap2);

                URLS.unshift("./IMG/Meaples3.png");
            }
            if(cantidad==3){
                let meap1 = new LosetaTrabajador(1,1,1,1,"./IMG/Meaples3.png",1);
                let meap2 = new LosetaTrabajador(1,1,1,1,"./IMG/Meaples3.png",1);
                let meap3 = new LosetaTrabajador(1,1,1,1,"./IMG/Meaples3.png",1);
                meaplesMazo1.unshift(meap1);
                meaplesMazo2.unshift(meap2);
                meaplesMazo3.unshift(meap3);
                URLS.unshift("./IMG/Meaples3.png");
            }
            if(cantidad ==4){
                let meap1 = new LosetaTrabajador(1,1,1,1,"./IMG/Meaples3.png",1);
                let meap2 = new LosetaTrabajador(1,1,1,1,"./IMG/Meaples3.png",1);
                let meap3 = new LosetaTrabajador(1,1,1,1,"./IMG/Meaples3.png",1);
                let meap4 = new LosetaTrabajador(1,1,1,1,"./IMG/Meaples3.png",1);
                meaplesMazo1.unshift(meap1);
                meaplesMazo2.unshift(meap2);
                meaplesMazo3.unshift(meap3);
                meaplesMazo4.unshift(meap4);
                URLS.unshift("./IMG/Meaples3.png");
            }
        
        }      
    }

      switch(cantidad) {
          case "2": //llena los 2 mazos con 11 locetas c/u
              for(let i = 0; i<28; i++){ //
                    //-----------------------------
                    //Locetas
                    let rand1 = Math.floor(Math.random()*28);
                    selvasObjects1[i] = losetasMazo[rand1];//OBJETOS                      
              }
              contenedorSelvasUno.setPieza(selvasObjects1[cont1]);
              contenedorSelvasDos.setPieza(selvasObjects1[cont1]);

              for(let i = 0; i<11; i++){
                    //-----------------------------
                    //meaples       
                   let rand1 = Math.floor(Math.random()*11);
                   let rand2 = Math.floor(Math.random()*11);
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
                let rand1 = Math.floor(Math.random()*28);
                selvasObjects1[i] = losetasMazo[rand1];//OBJETOS                      
            }
                contenedorSelvasUno.setPieza(selvasObjects1[10]);
                contenedorSelvasDos.setPieza(selvasObjects1[10]);

            for(let i = 0; i<11; i++){ 
                //-----------------------------
                //Locetas
                    let rand1 = Math.floor(Math.random()*11);
                    let rand2 = Math.floor(Math.random()*11);
                    let rand3 = Math.floor(Math.random()*11);
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
                    let rand1 = Math.floor(Math.random()*28);
                    selvasObjects1[i] = losetasMazo[rand1];//OBJETOS                      
                }
                    contenedorSelvasUno.setPieza(selvasObjects1[10]);
                    contenedorSelvasDos.setPieza(selvasObjects1[10]);
    
                for(let i = 0; i<11; i++){ 
                    //-----------------------------
                    //Locetas
                        let rand1 = Math.floor(Math.random()*11);
                        let rand2 = Math.floor(Math.random()*11);
                        let rand3 = Math.floor(Math.random()*11);
                        let rand4 = Math.floor(Math.random()*11);

                       trabajadoresObjects1[i] = meaplesMazo1[rand1];
                       trabajadoresObjects2[i] = meaplesMazo2[rand2];
                       trabajadoresObjects3[i] = meaplesMazo3[rand3];
                       trabajadoresObjects4[i] = meaplesMazo3[rand4];

                }
                    contenedorTrabajadoresUno.setPieza(trabajadoresObjects1[10]);
                    contenedorTrabajadoresDos.setPieza(trabajadoresObjects2[10]);
                    contenedorTrabajadoresTres.setPieza(trabajadoresObjects3[10]);
                    contenedorTrabajadoresCuatro.setPieza(trabajadoresObjects4[10]);
            }     
  }
  function eventosClick(){ 
    var auxPieza = new LosetaSelva();

    //MAZO 1 LOCETAS
    let piezaAux = new LosetaSelva();
    var imageLosetas1 = document.getElementById('LocId1');//get imagen del tablero
    piezaAux.setImage(imageLosetas1);//Set la imagen en una pieza
    piezaAux.asignaImagen(selvasObjects1[cont1].url, "LocId1");//set a parte Gráfica
    piezaAux.setValorLogico(selvasObjects1[cont1].value);//Set valor lógico
    //CONTENEDOR
    contenedorSelvasUno.setPieza(piezaAux);
    contenedorSelvasUno.ficha.img.addEventListener("click", function (e) {
            contenedorSelvasUno.setEstado(true);
            document.getElementById("LocetasUno").style.backgroundColor = 'red'; 
            listenForGrid();
        });

    //MAZO 2 LOCETAS
    var imageLosetas2 = document.getElementById('LocId2');
    piezaAux.setImage(imageLosetas2);//Set la imagen en una pieza
    piezaAux.asignaImagen(selvasObjects1[cont1].url, "LocId2");//  set a parte Gráfica
    piezaAux.setValorLogico(selvasObjects1[cont1].value);
    //CONTENEDOR
    contenedorSelvasDos.setPieza(piezaAux);//Set la pieza en el contenendor
    contenedorSelvasDos.ficha.img.addEventListener("click", function (e) {
            contenedorSelvasDos.setEstado(true);
            document.getElementById("LocetasDos").style.backgroundColor = 'red'; 
            listenForGrid();
    });
    
    //MAZO 1 MEAPLES
    piezaAux = new LosetaSelva();
    var imageMeaples1 = document.getElementById('mazo1');//get imagen del tablero
    piezaAux.setImage(imageMeaples1);//Set la imagen en una pieza
    piezaAux.asignaImagen(trabajadoresObjects1[cont3].url, "mazo1");//  set a parte Gráfica
    piezaAux.setValorLogico(trabajadoresObjects1[cont3].value);
    //CONTENEDOR
    contenedorTrabajadoresUno.setPieza(piezaAux);
    contenedorTrabajadoresUno.ficha.img.addEventListener("click", function (e) {
            contenedorTrabajadoresUno.setEstado(true);
            document.getElementById("MeaplesUno").style.backgroundColor ='Chartreuse' ; 
            listenForGrid();
    });
    
    //MAZO 2 MEAPLES
    
    var imageMeaples2 = document.getElementById('mazo2');
    piezaAux.setImage(imageMeaples2);//Set la imagen en una pieza
    setTimeout(piezaAux.asignaImagen(trabajadoresObjects2[cont3].url, "mazo2"),10000);//  set a parte Gráfica
    setTimeout(piezaAux.setValorLogico(trabajadoresObjects2[cont3].value),10000);
    //CONTENEDOR
    contenedorTrabajadoresDos.setPieza(piezaAux);
    contenedorTrabajadoresDos.ficha.img.addEventListener("click", function (e) {
            contenedorTrabajadoresDos.setEstado(true);
            document.getElementById("MeaplesDos").style.backgroundColor ='gold' ; 
            listenForGrid();
    });
    //Mazo 3 meaples
    var imageMeaples3 = document.getElementById('mazo3');
    piezaAux.setImage(imageMeaples3);//Set la imagen en una pieza
    setTimeout(piezaAux.asignaImagen(trabajadoresObjects3[cont3].url, "mazo3"),10000);//  set a parte Gráfica
    setTimeout(piezaAux.setValorLogico(trabajadoresObjects3[cont3].value),10000);
    //CONTENEDOR
    contenedorTrabajadoresTres.setPieza(piezaAux);
    contenedorTrabajadoresTres.ficha.img.addEventListener("click", function (e) {
            contenedorTrabajadoresTres.setEstado(true);
            document.getElementById("MeaplesTres").style.backgroundColor ='red' ; 
            listenForGrid();
    });
    //MAZO 4 Meaples
    var imageMeaples4 = document.getElementById('mazo4');
    piezaAux.setImage(imageMeaples4);//Set la imagen en una pieza
    setTimeout(piezaAux.asignaImagen(trabajadoresObjects4[cont3].url, "mazo4"),10000);//  set a parte Gráfica
    setTimeout(piezaAux.setValorLogico(trabajadoresObjects4[cont3].value),10000);
    //CONTENEDOR
    contenedorTrabajadoresCuatro.setPieza(piezaAux);
    contenedorTrabajadoresCuatro.ficha.img.addEventListener("click", function (e) {
            contenedorTrabajadoresCuatro.setEstado(true);
            document.getElementById("MeaplesCuatro").style.backgroundColor ='blue' ; 
            listenForGrid();   
        });
    //listenForGrid(auxPieza,int);//al final asuxPieza no es necesario
}
  
function listenForGrid(){
    let rem = new Jugador();
     for(let i = 0; i<57; i++){
         i = evaluaIndice(i);     
         let imagen = document.getElementById(i);
         imagen.addEventListener("click", function (e) {
             if(contenedorSelvasUno.selected){
                 document.getElementById(i).src = selvasObjects1[cont1].url;
                 var x = i.toString().slice(0,-1);
                 var y = i.toString().slice(1);
                 //--VALIDACIONES--
                 validarMeaplesCercanos(x,y);
                 //----------------
                 setLogic(x,y,2);// --valor lógico 2 ---
                 printMatrix();
                 document.getElementById("LocetasUno").style.backgroundColor = 'black'; 
                 contenedorSelvasUno.setEstado(false);
                 cont1 = cont1 - 1;
                 rem.RemplazarLocetas(1);
             }
             if(contenedorSelvasDos.selected){
                 document.getElementById(i).src = selvasObjects1[cont1].url;
                 var x = i.toString().slice(0,-1);
                 var y = i.toString().slice(1);
                 setLogic(x,y,4);
                 document.getElementById("LocetasDos").style.backgroundColor = 'black'; 
                 contenedorSelvasDos.setEstado(false);
                 cont1 = cont1 - 1;
                 rem.RemplazarLocetas(2);
             }
             if(contenedorTrabajadoresUno.selected){
                 //document.getElementById(i).src = pieza.url;
                 document.getElementById(i).src = trabajadoresObjects1[cont3].url;
                 casilla = i;
                 var x = i.toString().slice(0,-1);
                 var y = i.toString().slice(1);
                 console.log("Lados: top-"+ trabajadoresObjects1[cont3].top + " down-" + trabajadoresObjects1[cont3].down + " left-" + trabajadoresObjects1[cont3].left + " right-" +trabajadoresObjects1[cont3].right);
                 setMeapleMatrix(x,y,cont3);
                 printMeapleMatrix();
 
                 document.getElementById("MeaplesUno").style.backgroundColor = 'black'; 
                 contenedorTrabajadoresUno.setEstado(false);
                 cont3 = cont3 - 1;
                 rem.remplazar(1,trabajadoresObjects1[cont3].url);
             }if(contenedorTrabajadoresDos.selected){
                 document.getElementById(i).src = trabajadoresObjects2[cont3].url;
                 casilla = i;
                 var x = i.toString().slice(0,-1);
                 var y = i.toString().slice(1);
                 console.log("Lados: top-"+ trabajadoresObjects2[cont3].top + " down-" + trabajadoresObjects2[cont3].down + " left-" + trabajadoresObjects2[cont3].left + " right-" +trabajadoresObjects2[cont3].right);
                 setMeapleMatrix(x,y,cont3);
                 printMeapleMatrix();
 
                 document.getElementById("MeaplesDos").style.backgroundColor = 'black'; 
                 contenedorTrabajadoresDos.setEstado(false);
                 cont3 = cont3 - 1;
                 rem.remplazar(2,trabajadoresObjects2[cont3].url);
             }
             if(contenedorTrabajadores.selected){
                 document.getElementById(i).src = trabajadoresObjects3[cont3].url;
                 casilla = i;
                 var x = i.toString().slice(0,-1);
                 var y = i.toString().slice(1);
                 console.log("Lados: top-"+ trabajadoresObjects3[cont3].top + " down-" + trabajadoresObjects3[cont3].down + " left-" + trabajadoresObjects3[cont3].left + " right-" +trabajadoresObjects3[cont3].right);
                 setMeapleMatrix(x,y,cont3);
                 printMeapleMatrix();
                 document.getElementById("MeaplesTres").style.backgroundColor = 'black'; 
                 contenedorTrabajadoresTres.setEstado(false);
                 cont3 = cont3 - 1;
                 rem.remplazar(3,trabajadoresObjects3[cont3].url);
             }
             if(contenedorTrabajadoresCuatro.selected){
                 document.getElementById(i).src = trabajadoresObjects4[cont3].url;
                 casilla = i;
                 var x = i.toString().slice(0,-1);
                 var y = i.toString().slice(1);
                 console.log("Lados: top-"+ trabajadoresObjects4[cont3].top + " down-" + trabajadoresObjects4[cont3].down + " left-" + trabajadoresObjects4[cont3].left + " right-" + trabajadoresObjects4[cont3].right);
                 setMeapleMatrix(x,y,cont3);
                 printMeapleMatrix();
 
                 document.getElementById("MeaplesCuatro").style.backgroundColor = 'black'; 
                 contenedorTrabajadoresCuatro.setEstado(false);
                 cont3 = cont3 - 1;
                 rem.remplazar(4,trabajadoresObjects4[cont3].url);
             }
         });
       
     }
     
 }

function validarMeaplesCercanos(x,y,tipoSelva){
    let xAbajo = parseInt(x) + 1;
    let xArriba = parseInt(x) - 1;
    let yDerecha = parseInt(y) + 1;
    let yIzquierda = parseInt(y) - 1;
    let mep;
    var tipoSelva;

        if(matrizTrabajadores[xAbajo][y] != 0){  //  ABAJO
            mep = matrizTrabajadores[xAbajo][y];
            cabezas = parseInt(trabajadoresObjects1[mep].top);
            switchTipos(tipoSelva,cabezas);        }
        if(matrizTrabajadores[xArriba][y] != 0){ //  ARRIBA
            mep = matrizTrabajadores[xArriba][y];
            cabezas = parseInt(trabajadoresObjects1[mep].down);
            switchTipos(tipoSelva,cabezas);        }
        if(matrizTrabajadores[x][yIzquierda] != 0){  //  IZQUIERDA
            mep = matrizTrabajadores[x][yIzquierda];
            cabezas = parseInt(trabajadoresObjects1[mep].right);
            switchTipos(tipoSelva,cabezas);        }
        if(matrizTrabajadores[x][yDerecha] != 0){ //  DERECHA
            mep = matrizTrabajadores[x][yDerecha];
            cabezas = parseInt(trabajadoresObjects1[mep]);
            switchTipos(tipoSelva,cabezas);        }
}

function validarEspacioVacio(x,y){
    var xVar = parseInt(x);
    var yVar = parseInt(y);
    var id = matrizTrabajadores[xVar][yVar];
    
    if(id == 0){
        return true;
    }else{
        console.log("ID de casilla = "+ id);
        return false;
    }
}

function switchTipos(tipo,jupas){
    switch(tipo){
        case "PlantacionSimple":
            cacaos = cacaos + (1*jupas);
            console.log("CACAOS : "+cacaos);
            document.getElementById("Cacaos2").textContent = cacaos.toString();
            break;
        case "PlantacionDoble":
            cacaos = cacaos+ (2*jupas);
            console.log("CACAOS : "+cacaos);
            document.getElementById("Cacaos2").textContent = cacaos.toString();
            break;
        case "Mercado2":
            if(jupas <= cacaos){
                monedas = monedas + (2*jupas);
                console.log("MONEDAS : "+MONEDAs);
                document.getElementById("Monedas2").textContent = monedas.toString();
                cacaos = cacaos - jupas;
                document.getElementById("Cacaos2").textContent = cacaos.toString();
            }
            break;
        case "Mercado3":
            if(jupas <= cacaos){
            monedas = monedas + (3*jupas);
            console.log("MONEDAS : "+monedas);
            document.getElementById("Monedas2").textContent = monedas.toString();
            cacaos = cacaos - jupas;
            document.getElementById("Cacaos2").textContent = cacaos.toString();
            }
            break;
        case "Mercado4":
            if(jupas <= cacaos){
            monedas = monedas + (4*jupas);
            console.log("MONEDAS : "+monedas);
            document.getElementById("Monedas2").textContent = monedas.toString();
            cacaos = cacaos - jupas;
            document.getElementById("Cacaos2").textContent = cacaos.toString();
            }
            break;
        case "Mina1":
            monedas = monedas + (1*jupas);
            console.log("MONEDAS : "+monedas);
            document.getElementById("Monedas2").textContent = monedas.toString();
            break;
        case "Mina2":
            monedas = monedas + (2*jupas);
            console.log("MONEDAS : "+monedas);
            document.getElementById("Monedas2").textContent = monedas.toString();
            break;
    }
    document.getElementById("Cabezas2").textContent = jupas.toString();
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
