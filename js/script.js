//import Tablero from "./tablero.js"
//const tablero = new Tablero()

var items = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 7, 4, 0, 0, 0],
    [0, 0, 0, 5, 4, 0, 0],
    [0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
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
    this.className = 'fill';
}

function dragOver(e){
    e.preventDefault();
}
function dragEnter(e){
    e.preventDefault();
    this.className += 'hovered';
}
function dragLeave(){
    this.className ='empty';
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
    
      console.log(items[1][0]); // 1
      console.log(getItemsXY(2,2)); // 2
  /*    console.log(items[1][0]); // 3
      console.log(items[1][1]); // 4
      console.log(items[2][0]); // 5
      console.log(items[2][1]); // 6*/
      
      console.log(items);
      console.log(items[1][0]);

    //var img = document.querySelectorAll('.empty');
    //img = tablero.getElementById(3);
}

function getMapData(id){
    return this.map[id][id];
}

function getItemsXY(x,y){
    return this.items[x][y];
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