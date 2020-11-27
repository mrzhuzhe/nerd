import './runBeforeRequire';
import { OrbitControls } from "./threejs/mjs/control/OrbitControls.js"
import { scene, camera, renderer } from "./threejs/camera.js";
import { blue_line, box_group1, box_group2, tube1, tube2, pavingStones01
  , cone01
  , cone02
  , cone03
  , cone04
  , cone05
 } from "./threejs/material_index.js";
import { hatsune_miku } from "./threejs/loadmmd.js"

scene.add( pavingStones01 );

//  scene.add( blue_line );
scene.add( box_group1 );
scene.add( box_group2 );
//  scene.add(tube1);
scene.add(cone01);
scene.add(cone02);
scene.add(cone03);
scene.add(cone04);
scene.add(cone05);
hatsune_miku();

/*
console.log(tube1)
var positions1 = tube1.geometry.attributes.position.array;
console.log(positions1)
*/

var cone01_positions = cone01.geometry.attributes.position.array;
var cone02_positions = cone02.geometry.attributes.position.array;
var cone03_positions = cone03.geometry.attributes.position.array;
var cone04_positions = cone04.geometry.attributes.position.array;
var cone05_positions = cone05.geometry.attributes.position.array;

cone01.position.x = -350;
cone01.position.y = -250;
cone02.position.x = -100;
cone02.position.y = -220;
cone03.position.x = 100;
cone03.position.y = -200;
cone04.position.x = 550;
cone04.position.y = -150;
cone05.position.x = 400;
cone05.position.y = 400;

cone01.rotation.x = -1.2; 
cone01.rotation.z = -0.3; 
cone02.rotation.x = -1.4; 
cone03.rotation.x = -1.1; 
cone03.rotation.z = 0.2; 
cone04.rotation.x = -1.0; 
cone04.rotation.z = 0.4; 
cone05.rotation.x = -1.5; 
//cone01.rotation.y = 0.5;

var _arc = 0;
var _delta = Math.random() // 每次增大百分之一圈

function sinwave (positions, obj) {
  // 角锥
  var count = 0;
  //  var _now = 0 //Date.now() * 0.01 * 0.01;
  _arc += 0.01//(0.1 * Math.random()).toFixed(2) // 每次增大百分之一圈
  //  console.log(_now)
  while ( count < positions.length ) {                
      var x = positions[count+1];
      //  因为是秒级别振幅的叠加 如果不乘以 0.05 会振幅极大
      positions[count+2] += 
        3 * Math.sin( 2 * Math.PI * ( (x ) / 960 + _arc + _delta) ) 
        //  + 0.5 * Math.cos( 2 * Math.PI * ( (x + 60) / 150 + _arc ) ) ;
      count += 3 
  }
  obj.geometry.attributes.position.needsUpdate = true;
  return obj
}

//  渲染
function animate() {    
    requestAnimationFrame( animate );
    

    pavingStones01.rotation.x -= 0.01;
    pavingStones01.rotation.y -= 0.01;
    
    /*
    blue_line.rotation.x += 0.01;
    blue_line.rotation.y += 0.01;
    */
    

    box_group1.scale.x += 0.5;
    box_group1.scale.y += 0.5;
    box_group1.scale.z += 0.5;

    box_group2.scale.x -= 0.5;
    box_group2.scale.y -= 0.5;
    box_group2.scale.z -= 0.5;

    //  线
    /* var count1 = 0;
    //  var _now = 0 //Date.now() * 0.01 * 0.01;
    _arc += 0.01 // 每次增大百分之一圈
    //  console.log(_now)
    while ( count1 < positions1.length ) {                
        var x = positions1[count1];
        //  因为是秒级别振幅的叠加 如果不乘以 0.05 会振幅极大
        positions1[count1+1] += 
          1 * Math.sin( 2 * Math.PI * ( (x + 120 ) / 240 + _arc ) ) 
          //  + 0.5 * Math.cos( 2 * Math.PI * ( (x + 60) / 150 + _arc ) ) ;
        count1 += 3 
    }
    tube1.geometry.attributes.position.needsUpdate = true; */
    sinwave(cone01_positions, cone01);
    sinwave(cone02_positions, cone02);
    sinwave(cone03_positions, cone03);
    sinwave(cone04_positions, cone04);
    sinwave(cone05_positions, cone05);
  
    //tube1.geometry.computeBoundingSphere();

    //tube1.rotation.x -= 0.01;
    //tube1.rotation.y -= 0.01;
    //camera.rotation.x += 0.01;
    //camera.rotation.y += 0.01;
    renderer.render( scene, camera );

    // controls
    const controls = new OrbitControls( camera, renderer.domElement );
    controls.maxPolarAngle = Math.PI * 0.5;
    controls.minDistance = 20;
    controls.maxDistance = 3000;


}
animate();
