//Variaveis Gerais
var angle = document.getElementById("angle");
var animation = document.getElementsByClassName("animation")[0];
var IniciarRot = document.getElementById("IniciarRot");
var PararRot = document.getElementById("PararRot");

var DistanciaEXS = document.getElementById("DistanciaEXS");
var DistanciaEYS = document.getElementById("DistanciaEYS");
var DistanciaEZS = document.getElementById("DistanciaEZS");
var DistanciaEXM = document.getElementById("DistanciaEXM");
var DistanciaEYM = document.getElementById("DistanciaEYM");
var DistanciaEZM = document.getElementById("DistanciaEZM");

var translatX = 0.1; 
var translatY = 0.1; 
var translatZ = 0.1; 

DistanciaEXS.onclick = () => {translatX = 0; translatX += 0.1; geometry.translate(translatX,0,0);}
DistanciaEYS.onclick = () => {translatY = 0; translatY += 0.1; geometry.translate(0,translatY,0);}
DistanciaEZS.onclick = () => {translatZ = 0; translatZ += 0.1; geometry.translate(0,0,translatZ);}
DistanciaEXM.onclick = () => {translatX = 0; translatX -= 0.1; geometry.translate(translatX,0,0);}
DistanciaEYM.onclick = () => {translatY = 0; translatY -= 0.1; geometry.translate(0,translatY,0);}
DistanciaEZM.onclick = () => {translatZ = 0; translatZ -= 0.1; geometry.translate(0,0,translatZ);}

// Cria scene
var scene = new THREE.Scene();
scene.background = new THREE.Color();

// Cria Camera
var camera = new THREE.PerspectiveCamera( 33, window.innerWidth/window.innerHeight, 0.1, 1000 );

// Cria Render
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
animation.appendChild( renderer.domElement );

//Cria Controle de camera
var controls = new THREE.OrbitControls( camera, renderer.domElement );
//controls.update() must be called after any manual changes to the camera's transform
camera.position.set( 8, 15, 8 );
controls.update();

//Cria um cubo
var geometry = new THREE.BoxGeometry( 1, 1, 1, 4, 4, 4);
geometry.translate(0.5,0.5,0.5);
var material = new THREE.MeshBasicMaterial( {color: 'black', wireframe: true} );
var cube = new THREE.Mesh( geometry, material );

//Adiciona a Scene
scene.add( cube );
scene.add( new THREE.AxesHelper( 6 ) );

var animate = function () {
    requestAnimationFrame( animate );

    cube.rotation.y += 0.01;
    angle.innerHTML = Math.floor(THREE.Math.radToDeg(cube.rotation.y) % 360) + "º";

    renderer.render( scene, camera );
};

animate();