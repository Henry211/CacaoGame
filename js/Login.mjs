
document.getElementById("Registerbtn").addEventListener("click",register);
document.getElementById("Loginbtn").addEventListener("click",Login);
window.addEventListener("resize",widthPage);
//Variables globales
// const socket=io();
//Variables Login.html
var Boxes=document.querySelector(".Boxes");
var Box2=document.querySelector(".Box2");
var LoginForm= document.querySelector(".LoginForm");
var RegisterForm=document.querySelector(".RegisterForm");
var Box1Login=document.querySelector(".Box1_Login");
var Box1Register=document.querySelector(".Box1_Register");
//Variables script.js
var waiting=false;
function getUser() {
    let us=document.querySelector("#ILoginUser").value;
    let pass=document.querySelector("#ILoginPass").value;
    let color=document.querySelector('#Color').value;
    const Jugador={ Name:us,Password:pass,Color:color};
    // alert("Usenarme: "+Jugador.Name+"\nPassword: "+Jugador.Password+"\nColor: "+Jugador.Color);
    // alert("Username: "+us+"\nColor: "+color+"\nPassword: "+pass);
    // socket.emit('name',Jugador);
    waiting =true; 
    getIframe();   
}
getIframe();
function getIframe(){
    if(waiting){
        document.querySelector("#Waiting_Room").style.display="block";
    }
}
function AddUser() {
    let us=document.querySelector('#RNombreUsuario').value;
    let pass=document.querySelector('#RContra').value;
    let cpass=document.querySelector('#RCContra').value;
    if(cpass==pass){
        console.log("User: "+us+"\nPassword: "+pass+"\nPassword Confirm: "+cpass);
        
        // <iframe src="Juego.html" frameborder="0"></iframe>
        
        // alert("Ha iniciado sesion de forma satisfactoria!");
        // let log=document.querySelector(".Login");
        // log.display="none";
    }
    else{
        alert("Las contraseñas no son identicas");
    }

}

function Autenticar(){

}
function IniciarSesion(){

}
function widthPage(params) {
    if(window.innerWidth>850){
        Box1Login.style.display="block";
        Box1Register.style.display="block";
    }
    else{
        Box1Register.style.display="block";
        Box1Register.style.opacity="1";
        Box1Login.style.opacity="0";
        Box1Login.style.display="none";
        LoginForm.style.display="block";
        RegisterForm.style.display="none";
        Box2.style.left="0px";
    }
}
widthPage();
function register(){
    if(window.innerWidth>850){
        RegisterForm.style.display="block";
        Box2.style.left="490px";
        LoginForm.style.display="none";
        Box1Register.style.opacity="0";
        Box1Login.style.opacity="1";
    }
    else{
        RegisterForm.style.display="block";
        Box2.style.left="0px";
        LoginForm.style.display="none";
        Box1Register.style.display="none";
        Box1Login.style.display="block";
        Box2.style.opacity="1";

    }
}
function Login(){
    if(window.innerWidth>850){
        LoginForm.style.display="block";
        Box2.style.left="10px";
        RegisterForm.style.display="none";
        Box1Login.style.opacity="0";
        Box1Register.style.opacity="1";
    }else{
        LoginForm.style.display="block";
        Box2.style.left="0px";
        RegisterForm.style.display="none";
        Box1Login.style.display="none";
        Box1Register.style.display="block";
    }
    
}
function Index(){
    LoginForm.href="./index.hmtl";
}