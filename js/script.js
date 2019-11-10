var angle = document.getElementById("angle");
var rotation = document.getElementsByName("rotation")[0];

// Cria scene
var scene = new THREE.Scene();

// Cria Camera
var camera = new THREE.PerspectiveCamera( 33, window.innerWidth/window.innerHeight, 0.1, 1000 );

// Cria Render
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
rotation.appendChild( renderer.domElement );

//Cria Controle de camera
var controls = new THREE.OrbitControls( camera, renderer.domElement );
//controls.update() must be called after any manual changes to the camera's transform
camera.position.set( 8, 15, 8 );
controls.update();

//Cria um cubo
var geometry = new THREE.BoxGeometry( 1, 1, 1, 4, 4, 4);
geometry.translate(0.5, 0.5, 0.5);
var material = new THREE.MeshBasicMaterial( {color: 'pink', wireframe: true} );
var cube = new THREE.Mesh( geometry, material );

//Adiciona a Scene
scene.add( cube );
scene.add( new THREE.AxesHelper( 6 ) );

var animate = function () {
    requestAnimationFrame( animate );

    cube.rotation.y += 0.01;
    angle.innerHTML = THREE.Math.radToDeg(cube.rotation.y) % 360;

    renderer.render( scene, camera );
};

animate();