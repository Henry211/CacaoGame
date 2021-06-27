const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);
const path = require("path");
const { emit } = require("process");
const { updateSwitch } = require("typescript");

var tablero = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
  ];

let users = ["KENDALL","MARIANO","GRANADOS"];

var njug = 0, nrecolec = 43;

let websockets = [];
let colors = [];

const messages = {
    general: [],
    random: [],
    jokes: [],
    javascript: []
};
console.log(__dirname)
//app.set('port',procces.env.Port || 3000);
//static files
app.use(express.static(path.join(__dirname)));

//
var username = [];


io.on('connection', (socket) => {
    websockets.push(socket);
    console.log("nuevo cliente. ID: " + socket.id);

   /* socket.on('jugada', (data) => {
       console.log('cantidad de jugadores '+data);
    });*/

    socket.on('turno', (xyz,jugador ) => {
        f = xyz[0];
        c = xyz[1];
       let val = true;
        if(tablero[f][c]!==0){//está llena la casilla.
            val = false;
        }
        else{tablero[f][c] = xyz[2];
         if(5 === xyz[2]){
             nrecolec--;
             io.sockets.emit('gameover',nrecolec === 0);
            }
        }
        socket.emit('valida',val);
        io.sockets.emit('gameover',nrecolec === 0);
     });
     
    socket.on('name', (name) => {
        let val =  true;
        console.log(name);
        for(let i = 0;i < users.length;i++){
            if(name==users[i]){
                val = false;
            }
            else{
                users.push(name);
            }
          //  socket.emit('valida',val);

        }

     });

   socket.emit('nombres',"juan")
  // io.sockets.emit('nombres',"JUAN");

    socket.on("disconnect", () => {
        users = users.filter(u => u.id !== socket.id);
        io.emit("new user",users);
    });
});
//io.listen(3000, () => console.log('server is running on port 3000'));
server.listen(3000, () => console.log('server is running on port 3000'));