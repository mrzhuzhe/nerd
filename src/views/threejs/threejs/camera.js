/**
 * webgl compact check
 * https://threejs.org/docs/index.html#manual/en/introduction/WebGL-compatibility-check
 */


const scene = new THREE.Scene();


//  scene.background = new THREE.Color( 0xcccccc );

const camera = new THREE.PerspectiveCamera( 
    75,     //  第一个参数是视野 degree
    window.innerWidth / window.innerHeight, 
    0.1, // near 太近
    3000 // far 太远
);

//  const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );

//  初始化视框
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//  这两个是等价的
//  camera.position.z = 5;
//  camera.position.set( 0, 0, 5 );
camera.position.set( 0, 0, 1000 );
camera.lookAt( 0, 0, 0 );

export { scene, camera, renderer }