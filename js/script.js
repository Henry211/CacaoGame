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
//mano de la locetas
var LocetasURL  = [];
var losetasUno = [];      
var losetasDos = [];

//---------Cambios Henry
var losetasMazo = [];   //Aquí están en orden
var meaplesMazo = [];
const losetasObjects1 = [];//--desoreden
const losetasObjects2 = [];
const meaplesObjects1 = [];
const meaplesObjects2 = [];
var matrizMeaples;

var cont1 = 27; //--losetas1
var cont3 = 10; //--meales2
let grados = 0;
var primerClick = true;
var casilla;
var colocarEncima = false;
    
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
//--clase MEAPLE--
class Meaple{   // logic = 12
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
class Loseta{
    constructor(url, value){
        this.url = url;
        this.value = value;
    }//asigna la imagen del url que recibe al id que recibe
    asignaImagen(url, ide){
        document.getElementById(ide).src=url;
        document.getElementById(ide).style.height='65px';
        document.getElementById(ide).style.width='80px';
        //document.getElementById(id).className="fill1";
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
        let remplazo = new Loseta(); 
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
         setTimeout(remplazo.asignaImagen(mano3[ram],"mazo3"),10000);
            vali = 0;
          }
          if(vali == 4){
            setTimeout(remplazo.asignaImagen(mano4[ram],"mazo4"),10000);
            vali = 0;
          }
    }
    RemplazarLocetas(param) {
        let ram = Math.floor(Math.random()*11); 
        let remplazo = new Loseta(); 
        if(param == 1){
            remplazo.asignaImagen(losetasObjects1[cont1].url, "LocId1");
        }
        if(param == 2){
            setTimeout(remplazo.asignaImagen(losetasObjects1[cont1].url,"LocId2"),10000);
        }
    }
}
//----------CONTENEDORES DE LOSETAS---------
var pieza = new Loseta();
var contenedorLosetasUno = new contenedorMazoLosetas(pieza,false);
var contenedorLosetasDos = new contenedorMazoLosetas(pieza,false);
var contenedorMeaplesUno = new contenedorMazoMeaples(pieza,false);
var contenedorMeaplesDos = new contenedorMazoMeaples(pieza,false);
var contenedorMeaplesTres = new contenedorMazoMeaples(pieza,false);
var contenedorMeaplesCuatro = new contenedorMazoMeaples(pieza,false);

var matrizMeaples = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
  ];
var matrizLogica = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 0, 8, 0, 0],
    [0, 0, 0, 5, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
  ];

  function setMeapleMatrix(xData,yData,id){
    for(let x=0; x<7; x++){
        for(let y=0; y<7; y++){
            if(x == xData && y == yData){
                matrizMeaples[x][y] = id;
            }
        }
    }
    //console.log("Top: " + matrizMeaples[1][1].top + "Down: " + matrizMeaples[1][1].down);
  }
  
function setLogic(xData,yData,int){
    for(let x=0; x<7; x++){
        for(let y=0; y<7; y++){
            if(x == xData && y == yData){
                matrizLogica[x][y] = int;
            }
        }
    }
}
function printMeapleMatrix(){
    var matrizText = "";
    for(let x=0; x<7; x++){
        for(let y=0; y<7; y++){
            matrizText = matrizText + matrizMeaples[x][y];
        }
        matrizText = matrizText +"\n";
    }
    console.log(matrizText);
}
function printMatrix(){
    var matrizText = "";
    for(let x=0; x<7; x++){
        for(let y=0; y<7; y++){
            matrizText = matrizText + matrizLogica[x][y];
        }
        matrizText = matrizText +"\n";
    }
    console.log(matrizText);
}
/*
function girar(){
    const btn = document.getElementById("btnGiro");

    btn.addEventListener("click", () => {
        grados = grados + 90;
        document.getElementById(casilla).style.transform = `rotate(${grados}deg)`;
        if(grados == 270){
            grados = 0;
        }
    });
}*/

function girarClick(){
    grados = grados + 90;
        var x = casilla.toString().slice(0,-1);
        var y = casilla.toString().slice(1);
        var num = matrizMeaples[x][y];
        var meapAux = meaplesObjects1[num];
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
    var contenedor = new Loseta();
    for(let i = 0; i<57; i++){
        i = evaluaIndice(i);

        contenedor.asignaImagen("./IMG/contenedor.png",i);//solo pinta..
        i = evaluaIndice(i);
    }
    //----INtento de hacer matriz de objetos (reemplazo de lógica)
    for(let x=0; x<7; x++){
        for(let y=0; y<7; y++){
                //matrizMeaples[x][y] = new Meaple(0,0,0,0,"./IMG/contenedor.png",2);
        }
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

function cargarMazos(cantidad){
    for(let i = 0; i<28; i++){
        if(i<6){
            //inicializar locetasMazo con Fichas
            let card = new Loseta("./IMG/Cacao1.png",1);
            losetasMazo.unshift(card);
            LocetasURL.unshift("./IMG/Cacao1.png");
            //----
            let meap = new Meaple(1,1,1,1,"./IMG/Meaples1.png",1);
            meaplesMazo.unshift(meap);
        }
        if(i>=6 && i<8){
            let card = new Loseta("./IMG/Semillas2.png",2);
            losetasMazo.unshift(card);
            LocetasURL.unshift("./IMG/Semillas2.png");
            //----
            let meap = new Meaple(1,1,0,2,"./IMG/Meaples2.png",1);
            meaplesMazo.unshift(meap);
        }
        if(i>=8 && i<15){
            if(i<10){
                let card = new Loseta("./IMG/Mercado2.png",3);
                losetasMazo.unshift(card);
                LocetasURL.unshift("./IMG/Mercado2.png");
                //----
                let meap = new Meaple(1,0,0,3,"./IMG/Meaples3.png",1);
                meaplesMazo.unshift(meap);
            }
            if(i>=10 && i<14){
                let card = new Loseta("./IMG/Mercado3.png",4);
                losetasMazo.unshift(card);
                LocetasURL.unshift("./IMG/Mercado3.png");
                let meap = new Meaple(1,0,0,3,"./IMG/Meaples3.png",1);
                meaplesMazo.unshift(meap);
            }
            if(i==14){
                let card = new Loseta("./IMG/Mercado4.png",5);
                losetasMazo.unshift(card);
                LocetasURL.unshift("./IMG/Mercado4.png");
                
            }
        }
        if(i>=15 && i<18){
            if(i<17){
                let card = new Loseta("./IMG/Mina1.png",6);
                losetasMazo.unshift(card);
                LocetasURL.unshift("./IMG/Mina1.png");

                let meap = new Meaple(1,0,0,3,"./IMG/Meaples3.png",1);
                meaplesMazo.unshift(meap);
            }
            else{
                let card = new Loseta("./IMG/Mina2.png",7);
                losetasMazo.unshift(card);
                LocetasURL.unshift("./IMG/Mina2.png");
            }
        }
        if(i>=18 && i<21){
            let card = new Loseta("./IMG/Lago.png",8);
            losetasMazo.unshift(card);
            LocetasURL.unshift("./IMG/Lago.png");
        }
        if(i>=21 && i<23){
            let card = new Loseta("./IMG/MayaSun.png",9);
                losetasMazo.unshift(card);
            LocetasURL.unshift("./IMG/MayaSun.png");
        }
        if(i>=23){   
            let card = new Loseta("./IMG/Templos.png",10);
            losetasMazo.unshift(card);
            LocetasURL.unshift("./IMG/Templos.png");
       }
    }
      
      switch(cantidad) {
          case "2": //llena los 2 mazos con 11 locetas c/u
              for(let i = 0; i<28; i++){ //
                    //-----------------------------
                    //Locetas
                    let rand1 = Math.floor(Math.random()*28);
                    losetasObjects1[i] = losetasMazo[rand1];//OBJETOS                      
              }
              contenedorLosetasUno.setPieza(losetasObjects1[cont1]);
              contenedorLosetasDos.setPieza(losetasObjects1[cont1]);

              for(let i = 0; i<11; i++){
                    //-----------------------------
                    //meaples       
                    rand1 = Math.floor(Math.random()*11);
                    rand2 = Math.floor(Math.random()*11);
                    meaplesObjects1[i] = meaplesMazo[rand1];
                    meaplesObjects2[i] = meaplesMazo[rand2];
              }
              contenedorMeaplesUno.setPieza(meaplesObjects1[10]);
              contenedorMeaplesDos.setPieza(meaplesObjects2[10]);
            break;
          case "3":
            for(let i = 0; i<11; i++){ 
                //-----------------------------
                //Locetas
                let rand1 = Math.floor(Math.random()*28);
                losetasUno[i] = LocetasURL[rand1];
                pieza.asignaImagen(losetasUno[i], "LocId1");//set datos a PIEZA
                contenedorLosetasUno.setPieza(pieza);//set pieza a CONTENEDOR
                let rand2 = Math.floor(Math.random()*28);
                losetasDos[i] = LocetasURL[rand2];
                pieza.asignaImagen(losetasDos[i], "LocId2");//set datos a PIEZA
                contenedorLosetasDos.setPieza(pieza);//set pieza a CONTENEDOR
                  //-----------------------------
                  //meaples       (hay que usar las imágenes adecuadas en meaples)
                    rand1 = Math.floor(Math.random()*11);
                    rand2 = Math.floor(Math.random()*11);
                let rand3 = Math.floor(Math.random()*11);

                mano1[i] = URLS[rand1];
                pieza.asignaImagen(mano1[i], "mazo1");//set datos a PIEZA
                contenedorMeaplesUno.setPieza(pieza);//set pieza a CONTENEDOR
                mano2[i] = URLS[rand2];
                setTimeout(pieza.asignaImagen(mano2[i], "mazo2"),10000);//set datos a PIEZA
                contenedorMeaplesDos.setPieza(pieza);//set pieza a CONTENEDOR
                mano3[i] = URLS[rand3];
                setTimeout(pieza.asignaImagen(mano3[i], "mazo3"),10000);//set datos a PIEZA
                setTimeout(contenedorMeaplesTres.setPieza(pieza), 10000);//set pieza a CONTENEDOR
               
            }

            break;
          case "4":
            for(let i = 0; i<11; i++){ 
                //-----------------------------
                //Locetas
                let rand1 = Math.floor(Math.random()*28);
                losetasUno[i] = LocetasURL[rand1];
                pieza.asignaImagen(losetasUno[i], "LocId1");//set datos a PIEZA
                contenedorLosetasUno.setPieza(pieza);//set pieza a CONTENEDOR
                let rand2 = Math.floor(Math.random()*28);
                losetasDos[i] = LocetasURL[rand2];
                pieza.asignaImagen(losetasDos[i], "LocId2");//set datos a PIEZA
                contenedorLosetasDos.setPieza(pieza);//set pieza a CONTENEDOR
                  //-----------------------------
                  //meaples       (hay que usar las imágenes adecuadas en meaples)
                    rand1 = Math.floor(Math.random()*11);
                    rand2 = Math.floor(Math.random()*11);
                let rand3 = Math.floor(Math.random()*11);
                let rand4 = Math.floor(Math.random()*11);
                mano1[i] = URLS[rand1];
                pieza.asignaImagen(mano1[i], "mazo1");//set datos a PIEZA
                contenedorMeaplesUno.setPieza(pieza);//set pieza a CONTENEDOR
                mano2[i] = URLS[rand2];
                setTimeout(pieza.asignaImagen(mano2[i], "mazo2"),10000);//set datos a PIEZA
                contenedorMeaplesDos.setPieza(pieza);//set pieza a CONTENEDOR
                mano3[i] = URLS[rand3];
                setTimeout(pieza.asignaImagen(mano3[i], "mazo3"),10000);//set datos a PIEZA
                setTimeout(contenedorMeaplesTres.setPieza(pieza), 10000);//set pieza a CONTENEDOR
                mano4[i] = URLS[rand4];
                setTimeout(pieza.asignaImagen(mano4[i], "mazo4"),10000);//set datos a PIEZA
                setTimeout(contenedorMeaplesCuatro.setPieza(pieza), 10000);//set pieza a CONTENEDOR
            }
        }
  }
  function eventosClick(){ 
    var auxPieza = new Loseta();

    //MAZO 1 LOCETAS
    let piezaAux = new Loseta();
    var imageLosetas1 = document.getElementById('LocId1');//get imagen del tablero
    piezaAux.setImage(imageLosetas1);//Set la imagen en una pieza
    piezaAux.asignaImagen(losetasObjects1[cont1].url, "LocId1");//set a parte Gráfica
    piezaAux.setValorLogico(losetasObjects1[cont1].value);//Set valor lógico
    //CONTENEDOR
    contenedorLosetasUno.setPieza(piezaAux);
    contenedorLosetasUno.ficha.img.addEventListener("click", function (e) {
            contenedorLosetasUno.setEstado(true);
            document.getElementById("LocetasUno").style.backgroundColor = 'red'; 
        });

    //MAZO 2 LOCETAS
    var imageLosetas2 = document.getElementById('LocId2');
    piezaAux.setImage(imageLosetas2);//Set la imagen en una pieza
    piezaAux.asignaImagen(losetasObjects1[cont1].url, "LocId2");//  set a parte Gráfica
    piezaAux.setValorLogico(losetasObjects1[cont1].value);
    //CONTENEDOR
    contenedorLosetasDos.setPieza(piezaAux);//Set la pieza en el contenendor
    contenedorLosetasDos.ficha.img.addEventListener("click", function (e) {
            contenedorLosetasDos.setEstado(true);
            document.getElementById("LocetasDos").style.backgroundColor = 'red'; 
    });
    
    //MAZO 1 MEAPLES
    piezaAux = new Loseta();
    var imageMeaples1 = document.getElementById('mazo1');//get imagen del tablero
    piezaAux.setImage(imageMeaples1);//Set la imagen en una pieza
    piezaAux.asignaImagen(meaplesObjects1[cont3].url, "mazo1");//  set a parte Gráfica
    piezaAux.setValorLogico(meaplesObjects1[cont3].value);
    //CONTENEDOR
    contenedorMeaplesUno.setPieza(piezaAux);
    contenedorMeaplesUno.ficha.img.addEventListener("click", function (e) {
            contenedorMeaplesUno.setEstado(true);
            document.getElementById("MeaplesUno").style.backgroundColor ='Chartreuse' ; 
    });
    
    //MAZO 2 MEAPLES
    var imageMeaples2 = document.getElementById('mazo2');
    piezaAux.setImage(imageMeaples2);//Set la imagen en una pieza
    piezaAux.asignaImagen(meaplesObjects1[cont3].url, "mazo1");//  set a parte Gráfica
    piezaAux.setValorLogico(meaplesObjects1[cont3].value);
    //CONTENEDOR
    contenedorMeaplesDos.setPieza(piezaAux);
    contenedorMeaplesDos.ficha.img.addEventListener("click", function (e) {
            contenedorMeaplesDos.setEstado(true);
            document.getElementById("MeaplesDos").style.backgroundColor ='Chartreuse' ; 
    });
    //Mazo 3 meaples
    var imageMeaples3 = document.getElementById('mazo3');
    imageMeaples3.addEventListener("click", function (e) {
            contenedorMeaplesTres.setEstado(true);
            document.getElementById("MeaplesTres").style.backgroundColor = 'red'; 
            auxPieza.url = imageMeaples3.src;
            int = 2;//VALOR LÓGICO DE LA FICHA ('2' es un ejemplo)
        });
    //MAZO 4 Meaples
    var imageMeaples4 = document.getElementById('mazo4');
    imageMeaples4.addEventListener("click", function (e) {
            contenedorMeaplesCuatro.setEstado(true);
            document.getElementById("MeaplesCuatro").style.backgroundColor = 'OrangeRed'; 
            auxPieza.url = imageMeaples4.src;
            int = 2;//VALOR LÓGICO DE LA FICHA ('2' es un ejemplo)
        });
        
    listenForGrid();
}

function listenForGrid(){
   let rem = new Jugador();
    for(let i = 0; i<57; i++){
        i = evaluaIndice(i);     
        let imagen = document.getElementById(i);
        imagen.addEventListener("click", function (e) {
            if(contenedorLosetasUno.selected){
                document.getElementById(i).src = losetasObjects1[cont1].url;
                var x = i.toString().slice(0,-1);
                var y = i.toString().slice(1);
                //--VALIDACIONES--
                validarMeaplesCercanos(x,y);
                //----------------
                setLogic(x,y,2);// --valor lógico 2 ---
                printMatrix();
                document.getElementById("LocetasUno").style.backgroundColor = 'black'; 
                contenedorLosetasUno.setEstado(false);
                cont1 = cont1 - 1;
                rem.RemplazarLocetas(1);
            }
            if(contenedorLosetasDos.selected){
                document.getElementById(i).src = losetasObjects1[cont1].url;
                var x = i.toString().slice(0,-1);
                var y = i.toString().slice(1);
                setLogic(x,y,4);
                document.getElementById("LocetasDos").style.backgroundColor = 'black'; 
                contenedorLosetasDos.setEstado(false);
                cont1 = cont1 - 1;
                rem.RemplazarLocetas(2);
            }
            if(contenedorMeaplesUno.selected){
                //document.getElementById(i).src = pieza.url;
                document.getElementById(i).src = meaplesObjects1[cont3].url;
                var x = i.toString().slice(0,-1);
                var y = i.toString().slice(1);
                if(validarEspacioVacio(x,y)){
                    console.log("Lados: top-"+ meaplesObjects1[cont3].top + " down-" + meaplesObjects1[cont3].down + " left-" + meaplesObjects1[cont3].left + " right-" +meaplesObjects1[cont3].right);
                    casilla = i;
                    setMeapleMatrix(x,y,cont3);
                    printMeapleMatrix();
                    document.getElementById("MeaplesUno").style.backgroundColor = 'black'; 
                    contenedorMeaplesUno.setEstado(false);
                    cont3 = cont3 - 1;
                    rem.remplazar(1,meaplesObjects1[cont3].url);
                }if(colocarEncima){
                    console.log("Lados: top-"+ meaplesObjects1[cont3].top + " down-" + meaplesObjects1[cont3].down + " left-" + meaplesObjects1[cont3].left + " right-" +meaplesObjects1[cont3].right);
                    casilla = i;
                    setMeapleMatrix(x,y,cont3);
                    printMeapleMatrix();
                    document.getElementById("MeaplesUno").style.backgroundColor = 'black'; 
                    contenedorMeaplesUno.setEstado(false);
                    cont3 = cont3 - 1;
                    rem.remplazar(1,meaplesObjects1[cont3].url);
                }else{
                    console.log("CASILLA OCUPADA");
                }
            }if(contenedorMeaplesDos.selected){
                document.getElementById(i).src = meaplesObjects1[cont3].url;
                //girar(i);
                casilla = i;
                var x = i.toString().slice(0,-1);
                var y = i.toString().slice(1);
                console.log("Lados: top-"+ meaplesObjects1[cont3].top + " down-" + meaplesObjects1[cont3].down + " left-" + meaplesObjects1[cont3].left + " right-" +meaplesObjects1[cont3].right);
                setMeapleMatrix(x,y,cont3);
                printMeapleMatrix();

                document.getElementById("MeaplesDos").style.backgroundColor = 'black'; 
                contenedorMeaplesDos.setEstado(false);
                cont3 = cont3 - 1;
                rem.remplazar(1,meaplesObjects1[cont3].url);
            }
            if(contenedorMeaplesTres.selected){
                document.getElementById(i).src = pieza.url;
                document.getElementById("MeaplesTres").style.backgroundColor = 'black'; 
                contenedorMeaplesTres.setEstado(false);
                rem.remplazar(3);
            }
            if(contenedorMeaplesCuatro.selected){
                document.getElementById(i).src = pieza.url;
                document.getElementById("MeaplesCuatro").style.backgroundColor = 'black'; 
                contenedorMeaplesCuatro.setEstado(false);
                rem.remplazar(4);
            }
        });
        //i = evaluaIndice(i);
    }
    
}

function validarMeaplesCercanos(x,y){
    let xAbajo = parseInt(x) + 1;
    let xArriba = parseInt(x) -1;
    let yDerecha = parseInt(y) +1;
    let yIzquierda = parseInt(y) -1;
    let mep;
    var beneficios;

        if(matrizMeaples[xAbajo][y] != 0){  //  ABAJO
            mep = matrizMeaples[xAbajo][y];
            beneficios = parseInt(meaplesObjects1[mep].top);
            document.getElementById("Cabezas2").textContent = meaplesObjects1[mep].top;
        }
        if(matrizMeaples[xArriba][y] != 0){ //  ARRIBA
            mep = matrizMeaples[xArriba][y];
            beneficios = parseInt(meaplesObjects1[mep].down);
            document.getElementById("Cabezas2").textContent = meaplesObjects1[mep].down;
        }
        if(matrizMeaples[x][yIzquierda] != 0){  //  IZQUIERDA
            mep = matrizMeaples[x][yIzquierda];
            beneficios = parseInt(meaplesObjects1[mep].right);
            document.getElementById("Cabezas2").textContent = meaplesObjects1[mep].right;
        }
        if(matrizMeaples[x][yDerecha] != 0){ //  DERECHA
            mep = matrizMeaples[x][yDerecha];
            beneficios = parseInt(meaplesObjects1[mep]);
            document.getElementById("Cabezas2").textContent = meaplesObjects1[mep].left;
        }
}

function validarEspacioVacio(x,y){
    var xVar = parseInt(x);
    var yVar = parseInt(y);
    var id = matrizMeaples[xVar][yVar];
    
    if(id == 0){
        return true;
    }else{
        console.log("ID de casilla = "+ id);
        return false;
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
