//Variaveis Gerais
var angle = document.getElementById("angle");
var animation = document.getElementsByClassName("animation")[0];
var IniciarRot = document.getElementById("IniciarRot");
var PararRot = document.getElementById("PararRot");

//Altera posição do Quadrado ao clicar em botões
var DistanciaEXS = document.getElementById("DistanciaEXS");
var DistanciaEYS = document.getElementById("DistanciaEYS");
var DistanciaEZS = document.getElementById("DistanciaEZS");
var DistanciaEXM = document.getElementById("DistanciaEXM");
var DistanciaEYM = document.getElementById("DistanciaEYM");
var DistanciaEZM = document.getElementById("DistanciaEZM");

//Altera a Rotação do Quadrado ao clicar em botoes
var RotationEXS = document.getElementById("RotationEXS");
var RotationEYS = document.getElementById("RotationEYS");
var RotationEZS = document.getElementById("RotationEZS");
var RotationEXM = document.getElementById("RotationEXM");
var RotationEYM = document.getElementById("RotationEYM");
var RotationEZM = document.getElementById("RotationEZM");

var RotationFullX = document.getElementById("RotationFullX");
var RotationFullY = document.getElementById("RotationFullY");
var RotationFullZ = document.getElementById("RotationFullZ");

var RotationFullMX = document.getElementById("RotationFullMX");
var RotationFullMY = document.getElementById("RotationFullMY");
var RotationFullMZ = document.getElementById("RotationFullMZ");

var AddCuboX = document.getElementById("AddCuboX");
var AddCuboZ = document.getElementById("AddCuboZ");
var AddCuboXZ = document.getElementById("AddCuboXZ");

var inputColor = document.getElementById("inputColor");

// Cria scene
var scene = new THREE.Scene();
scene.background = new THREE.Color();

// Cria Camera
var camera = new THREE.PerspectiveCamera( 33, window.innerWidth/window.innerHeight, 0.1, 1000 );

// Cria Render
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
animation.appendChild( renderer.domElement );

//Ao alterar o tamanho da janela, é reajustado automaticamente
window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

//Cria Controle de camera
var controls = new THREE.OrbitControls( camera, renderer.domElement );
//controls.update() must be called after any manual changes to the camera's transform
camera.position.set( 8, 15, 8 );
controls.update();

//Cria/remove o cubo da cena
function toggleCube(cube, x, y, z, color="black", rx = 0, ry = 0, rz = 0){
  if(cube){
    scene.remove(cube);
    cube = undefined;
    return false;
  }else{
    var geometry = new THREE.BoxGeometry( 1, 1, 1, 4, 4, 4);
    geometry.translate(x,y,z);
    var material = new THREE.MeshBasicMaterial( {color: color, wireframe: true} );
    var cube = new THREE.Mesh( geometry, material );
    cube.rotation.x = rx;
    cube.rotation.y = ry;
    cube.rotation.z = rz;
    scene.add(cube);
    return cube;
  }
}

//Movimenta os cubos
function rotationE(eixo, operador){
  if(operador == "soma"){
    switch(eixo){

      case 'x':
        if(cubeX){
          cubeX.rotation.x += 0.02;
        }
        if(cubeZ){
          cubeZ.rotation.x += 0.02;
        }
        if(cubeXZ){
          cubeXZ.rotation.x += 0.02;
        }
        cube.rotation.x += 0.02;
        break;

      case 'y':
        if(cubeX){
          cubeX.rotation.y += 0.02;
        }
        if(cubeZ){
          cubeZ.rotation.y += 0.02;
        }
        if(cubeXZ){
          cubeXZ.rotation.y += 0.02;
        }
        cube.rotation.y += 0.02;
        break;

      case 'z':
          if(cubeX){
            cubeX.rotation.z += 0.02;
          }
          if(cubeZ){
            cubeZ.rotation.z += 0.02;
          }
          if(cubeXZ){
            cubeXZ.rotation.z += 0.02;
          }
          cube.rotation.z += 0.02;
        break;

        default:
          console.log("Erro");
          return false;
    }

  }else if(operador == "subtracao"){
    switch(eixo){

      case 'x':
        if(cubeX){
          cubeX.rotation.x -= 0.02;
        }
        if(cubeZ){
          cubeZ.rotation.x -= 0.02;
        }
        if(cubeXZ){
          cubeXZ.rotation.x -= 0.02;
        }
        cube.rotation.x -= 0.02;
        break;

      case 'y':
        if(cubeX){
          cubeX.rotation.y -= 0.02;
        }
        if(cubeZ){
          cubeZ.rotation.y -= 0.02;
        }
        if(cubeXZ){
          cubeXZ.rotation.y -= 0.02;
        }
        cube.rotation.y -= 0.02;
        break;

      case 'z':
          if(cubeX){
            cubeX.rotation.z -= 0.02;
          }
          if(cubeZ){
            cubeZ.rotation.z -= 0.02;
          }
          if(cubeXZ){
            cubeXZ.rotation.z -= 0.02;
          }
          cube.rotation.z -= 0.02;
        break;

        default:
          console.log("Erro");
          return false;
    }
  }
}

//Cria o cubo Principal
var cube = toggleCube(null, 0.5, 0.5, 0.5);

//Cordenadas do cubo principal
var posX, posY, posZ, rotX, rotY, rotZ;

setInterval(() => {
  posX = cube.geometry.boundingSphere.center.x;
  posY = cube.geometry.boundingSphere.center.y;
  posZ = cube.geometry.boundingSphere.center.z;
  rotX = cube.rotation.x;
  rotY = cube.rotation.y;
  rotZ = cube.rotation.z;
},500);

//Cria os cubos Reflexos e seta eles com a posição contraria ao cubo principal
var cubeX, cubeXZ, cubeZ;

AddCuboX.onclick = () => {cubeX = toggleCube(cubeX,-posX,posY,posZ, undefined, rotX, rotY, rotZ);}
AddCuboXZ.onclick = () => {cubeXZ = toggleCube(cubeXZ,-posX,posY,-posZ, undefined, rotX, rotY, rotZ);}
AddCuboZ.onclick = () => {cubeZ = toggleCube(cubeZ, posX,posY,-posZ, undefined, rotX, rotY, rotZ);}

var translatX = 0.0; 
var translatY = 0.0; 
var translatZ = 0.0; 

// var translat = 0.0;

// function translateCubs(x=0,y=0,z=0, operation){
//   if(operation == "soma"){
//     translat += 0.1;
//   }else if(operation == "subtrai"){
//     translat -= 0.1;
//   }
  
//   if(cubeX){
//     cubeX.geometry.translate(x,y,z);
//   }
//   if(cubeZ){
//     cubeZ.geometry.translate(x,y,z);
//   }
//   if(cubeXZ){
//     cubeXZ.geometry.translate(x,y,z);
//   }
//   cube.geometry.translate(x,y,z);
// }

DistanciaEXS.onclick = () => {
  translatX = 0.0;
  translatX += 0.1;
  if(cubeX){
    cubeX.geometry.translate(-translatX,0,0);
  }
  if(cubeZ){
    cubeZ.geometry.translate(translatX,0,0);
  }
  if(cubeXZ){
    cubeXZ.geometry.translate(-translatX,0,0);
  }
  cube.geometry.translate(translatX,0,0);
}

DistanciaEYS.onclick = () => {
  translatY = 0;
  translatY += 0.1;
  if(cubeX){
    cubeX.geometry.translate(0,translatY,0);
  }
  if(cubeZ){
    cubeZ.geometry.translate(0,translatY,0);
  }
  if(cubeXZ){
    cubeXZ.geometry.translate(0,translatY,0);
  }
  cube.geometry.translate(0,translatY,0);
}

DistanciaEZS.onclick = () => {
  translatZ = 0;
  translatZ += 0.1;
  if(cubeX){
    cubeX.geometry.translate(0,0,translatZ);
  }
  if(cubeZ){
    cubeZ.geometry.translate(0,0,-translatZ);
  }
  if(cubeXZ){
    cubeXZ.geometry.translate(0,0,-translatZ);
  }
  cube.geometry.translate(0,0,translatZ);
}

DistanciaEXM.onclick = () => {
  translatX = 0.0;
  translatX -= 0.1;
  if(cubeX){
    cubeX.geometry.translate(-translatX,0,0);
  }
  if(cubeZ){
    cubeZ.geometry.translate(translatX,0,0);
  }
  if(cubeXZ){
    cubeXZ.geometry.translate(-translatX,0,0);
  }
  cube.geometry.translate(translatX,0,0);
}

DistanciaEYM.onclick = () => {
  translatY = 0;
  translatY -= 0.1;
  if(cubeX){
    cubeX.geometry.translate(0,translatY,0);
  }
  if(cubeZ){
    cubeZ.geometry.translate(0,translatY,0);
  }
  if(cubeXZ){
    cubeXZ.geometry.translate(0,translatY,0);
  }
  cube.geometry.translate(0,translatY,0);
}

DistanciaEZM.onclick = () => {
  translatZ = 0;
  translatZ -= 0.1;
  if(cubeX){
    cubeX.geometry.translate(0,0,translatZ);
  }
  if(cubeZ){
    cubeZ.geometry.translate(0,0,-translatZ);
  }
  if(cubeXZ){
    cubeXZ.geometry.translate(0,0,-translatZ);
  }
  cube.geometry.translate(0,0,translatZ);
}

//Altera cor do Quadrado
inputColor.onchange = event => {
  event.preventDefault();

  if(cubeX){
    scene.remove(cubeX); 
    cubeX = toggleCube(null,-0.5,0.5,0.5,  inputColor.value);
  }
  if(cubeXZ){
    scene.remove(cubeXZ);
    cubeXZ = toggleCube(null,-0.5,0.5,-0.5, inputColor.value);
  }
  if(cubeZ){
    scene.remove(cubeZ); 
    cubeZ = toggleCube(null, 0.5,0.5,-0.5, inputColor.value);
  }

  scene.remove(cube);
  cube = toggleCube(null,0.5,0.5,0.5,inputColor.value);
}

//Adiciona a Scene
scene.add( new THREE.AxesHelper( 6 ) );
scene.add(cube);

var animate = function () {
    requestAnimationFrame( animate );

    //Altera a Rotação do Quadrado ao clicar em botoe
    RotationEXS.onclick = () => {rotationE("x", "soma");}
    RotationEYS.onclick = () => {rotationE("y", "soma");}
    RotationEZS.onclick = () => {rotationE("z", "soma");}
    RotationEXM.onclick = () => {rotationE("x", "subtracao");}
    RotationEYM.onclick = () => {rotationE("y", "subtracao");}
    RotationEZM.onclick = () => {rotationE("z", "subtracao");}
  

    if(RotationFullX.checked){rotationE("x", "soma");}
    if(RotationFullY.checked){rotationE("y", "soma");}
    if(RotationFullZ.checked){rotationE("z", "soma");}
    if(RotationFullMX.checked){rotationE("x", "subtracao");}
    if(RotationFullMY.checked){rotationE("y", "subtracao");}
    if(RotationFullMZ.checked){rotationE("z", "subtracao");}
    
    angle.innerHTML = "X:" + Math.floor(THREE.Math.radToDeg(cube.rotation.x) % 360) + "º";
    angle.innerHTML +=" Y:"+ Math.floor(THREE.Math.radToDeg(cube.rotation.y) % 360) + "º";
    angle.innerHTML +=" Z:"+ Math.floor(THREE.Math.radToDeg(cube.rotation.z) % 360) + "º";

    renderer.render( scene, camera );
};

animate();