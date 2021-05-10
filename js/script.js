//import Tablero from "./tablero"

//const tablero = new Tablero()

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
    console.log(x);
}