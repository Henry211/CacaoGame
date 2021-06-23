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
var cont4 = 10;
var cont5 = 10;
var cont6 = 10;

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
      //  let sacar = Math.floor(Math.random*11);
        if(vali == 1){
           
            remplazo.asignaImagen(url,"mazo1");
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
    var cant = cantidadJugadores();
    var jugador = new Jugador(); 
    inicializarTablero();//llena tablero de imágenes en negro (para setear la nuev imagen) 
    cargarMazos(cant);  //cargar meaples y locetas en un mismo método
    eventosClick(cant);
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

      switch(cantidad) {
          case "2": //llena los 2 mazos con 11 locetas c/u
           var randSelvas =[];
           var randMeaplesUno = [];
           var randMeaplesDos = [];
           var randMeaplesTres = [];
           var randMeaplesCuatro = [];
           var x;
           var y;
           selvasArr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27];
              for(let i = 0; i<28; i++){ //
                    //-----------------------------
                    //Locetas
                x =  desordenarSelvas(selvasArr);
                randSelvas = x;
                let rand = randSelvas[i];
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
                    let rand1 = randMeaplesUno[i] ;
                    let rand2 = randMeaplesDos[i];
                     trabajadoresObjects1[i] = meaplesMazo1[rand1];
                     trabajadoresObjects2[i] = meaplesMazo2[rand2];      
              }
              //console.log(numeros);
              console.log(randMeaplesUno);
             // console.log(numeros2);
              console.log(randMeaplesDos);
              contenedorTrabajadoresUno.setPieza(trabajadoresObjects1[10]);
              contenedorTrabajadoresDos.setPieza(trabajadoresObjects2[10]);
            break;
          case "3":
            selvasArr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27];
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
                // randMeaplesUno =  desordenarTrabajadores(numeros);
                // randMeaplesDos = desordenarTrabajadores(numeros2);
                // randMeaplesTres =  desordenarTrabajadores(numeros3);
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
                    let rand3 = randMeaplesTres[i];
                     trabajadoresObjects1[i] = meaplesMazo1[rand1];
                     trabajadoresObjects2[i] = meaplesMazo2[rand2];
                     trabajadoresObjects3[i] = meaplesMazo3[rand3];
              }
                console.log(randMeaplesUno);
                console.log(randMeaplesDos);
                console.log(randMeaplesTres);
                contenedorTrabajadoresUno.setPieza(trabajadoresObjects1[10]);
                contenedorTrabajadoresDos.setPieza(trabajadoresObjects2[10]);
                contenedorTrabajadoresTres.setPieza(trabajadoresObjects3[10]);
            break;
          case "4":
            selvasArr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27];
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
                    // randMeaplesUno =  desordenarTrabajadores(numeros);
                    // randMeaplesDos = desordenarTrabajadores(numeros2);
                    // randMeaplesTres =  desordenarTrabajadores(numeros3);
                    // randMeaplesCuatro = desordenarTrabajadores(numeros4);
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
                    let rand4 = randMeaplesCuatro[i];
                     trabajadoresObjects1[i] = meaplesMazo1[rand1];
                     trabajadoresObjects2[i] = meaplesMazo2[rand2];
                     trabajadoresObjects3[i] = meaplesMazo3[rand3];
                     trabajadoresObjects4[i] = meaplesMazo4[rand4];
              }
              console.log(randMeaplesUno);
              console.log(randMeaplesDos);
              console.log(randMeaplesTres);
              console.log(randMeaplesCuatro);
 
                    contenedorTrabajadoresUno.setPieza(trabajadoresObjects1[10]);
                    contenedorTrabajadoresDos.setPieza(trabajadoresObjects2[10]);
                    contenedorTrabajadoresTres.setPieza(trabajadoresObjects3[10]);
                    contenedorTrabajadoresCuatro.setPieza(trabajadoresObjects4[10]);
     }     
  }
  function prepareMazo(idImage,url,value,contenedor,locetaId){
    let piezaAux = new LosetaSelva();
    var image = document.getElementById(idImage);//get imagen del tablero
    piezaAux.setImage(image);//Set la imagen en una pieza
    piezaAux.asignaImagen(url, idImage);//set a parte Gráfica
    piezaAux.setValorLogico(value);//Set valor lógico
    //CONTENEDOR
    contenedor.setPieza(piezaAux);
    contenedor.ficha.img.addEventListener("click", function (e) {
            contenedor.setEstado(true);
            document.getElementById(locetaId).style.backgroundColor = 'red'; 
        });
  }
  function eventosClick(cant){ 
    var auxPieza = new LosetaSelva();

    prepareMazo('LocId1',selvasObjects1[cont1].url,selvasObjects1[cont1].value,contenedorSelvasUno,"LocetasUno");
    prepareMazo('LocId2',selvasObjects1[cont1].url,selvasObjects1[cont1].value,contenedorSelvasDos,"LocetasDos");
    prepareMazo('mazo1',trabajadoresObjects1[cont3].url,trabajadoresObjects1[cont3].value,contenedorTrabajadoresUno,"MeaplesUno");
    prepareMazo('mazo2',trabajadoresObjects2[cont4].url,trabajadoresObjects2[cont4].value,contenedorTrabajadoresDos,"MeaplesDos");
    if(cant =="3"){
        prepareMazo('mazo3',trabajadoresObjects3[cont5].url,trabajadoresObjects3[cont5].value,contenedorTrabajadoresTres,"MeaplesTres");
    }
    if(cant == "4"){
        prepareMazo('mazo3',trabajadoresObjects3[cont5].url,trabajadoresObjects3[cont5].value,contenedorTrabajadoresTres,"MeaplesTres");
        prepareMazo('mazo4',trabajadoresObjects4[cont6].url,trabajadoresObjects4[cont6].value,contenedorTrabajadoresCuatro,"MeaplesCuatro");
    }
    
    listenForGrid();//al final asuxPieza no es necesario
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
                 validarMeaplesCercanos(x,y,selvasObjects1[cont1].tipo);
                 
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
                var x = i.toString().slice(0,-1);
                var y = i.toString().slice(1);
                if(validarEspacioVacio(x,y)){
                    console.log("Lados: top-"+ trabajadoresObjects1[cont3].top + " down-" + trabajadoresObjects1[cont3].down + " left-" + trabajadoresObjects1[cont3].left + " right-" + trabajadoresObjects1[cont3].right);
                    casilla = i;
                    setTrabajadoresMatrix(x,y,cont3);
                    printTrabajadoresMatrix();
                    document.getElementById("MeaplesUno").style.backgroundColor = 'black'; 
                    contenedorTrabajadoresUno.setEstado(false);
                    cont3 = cont3 - 1;
                    rem.remplazar(1,trabajadoresObjects1[cont3].url);
                }if(colocarEncima){
                    console.log("Lados: top-"+ trabajadoresObjects1[cont3].top + " down-" + trabajadoresObjects1[cont3].down + " left-" + trabajadoresObjects1[cont3].left + " right-" + trabajadoresObjects1[cont3].right);
                    casilla = i;
                    setTrabajadoresMatrix(x,y,cont3);
                    printTrabajadoresMatrix();
                    document.getElementById("MeaplesUno").style.backgroundColor = 'black'; 
                    contenedorTrabajadoressUno.setEstado(false);
                    cont3 = cont3 - 1;
                    rem.remplazar(1,trabajadoresObjects1[cont3].url);
                }
             }if(contenedorTrabajadoresDos.selected){
                 document.getElementById(i).src = trabajadoresObjects2[cont4].url;
                 casilla = i;
                 var x = i.toString().slice(0,-1);
                 var y = i.toString().slice(1);
               //  console.log("Lados: top-"+ trabajadoresObjects2[cont3].top + " down-" + trabajadoresObjects2[cont3].down + " left-" + trabajadoresObjects2[cont3].left + " right-" +trabajadoresObjects2[cont3].right);
                 setTrabajadoresMatrix(x,y,cont4);
                 printTrabajadoresMatrix();
 
                 document.getElementById("MeaplesDos").style.backgroundColor = 'black'; 
                 contenedorTrabajadoresDos.setEstado(false);
                 cont4 = cont4 - 1;
                 rem.remplazar(2,trabajadoresObjects2[cont4].url);
             }
             if(contenedorTrabajadoresTres.selected){
                 document.getElementById(i).src = trabajadoresObjects3[cont5].url;
                 casilla = i;
                 var x = i.toString().slice(0,-1);
                 var y = i.toString().slice(1);
                // console.log("Lados: top-"+ trabajadoresObjects3[cont3].top + " down-" + trabajadoresObjects3[cont3].down + " left-" + trabajadoresObjects3[cont3].left + " right-" +trabajadoresObjects3[cont3].right);
                 setTrabajadoresMatrix(x,y,cont5);
                 printTrabajadoresMatrix();
                 document.getElementById("MeaplesTres").style.backgroundColor = 'black'; 
                 contenedorTrabajadoresTres.setEstado(false);
                 cont5 = cont5 - 1;
                 rem.remplazar(3,trabajadoresObjects3[cont5].url);
             }
             if(contenedorTrabajadoresCuatro.selected){
                 document.getElementById(i).src = trabajadoresObjects4[cont6].url;
                 casilla = i;
                 var x = i.toString().slice(0,-1);
                 var y = i.toString().slice(1);
               //  console.log("Lados: top-"+ trabajadoresObjects4[cont3].top + " down-" + trabajadoresObjects4[cont3].down + " left-" + trabajadoresObjects4[cont3].left + " right-" + trabajadoresObjects4[cont3].right);
                setTrabajadoresMatrix(x,y,cont6);
                printTrabajadoresMatrix();
                 document.getElementById("MeaplesCuatro").style.backgroundColor = 'black'; 
                 contenedorTrabajadoresCuatro.setEstado(false);
                 cont6 = cont6 - 1;
                 rem.remplazar(4,trabajadoresObjects4[cont6].url);
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
