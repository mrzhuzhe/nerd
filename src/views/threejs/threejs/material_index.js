import { buildTube } from "./builtin/ob/tube.js";
import { _buildBoxesGroup } from "./builtin/ob/boxGroup.js";
import { buildPavingStones } from "./builtin/ob/pavingStones.js";
import { buildCone } from "./builtin/ob/cone.js";

//create a blue LineBasicMaterial
const material_green_line = new THREE.LineBasicMaterial( { color: 0x00ff00 } );

// 一些点
const points = [];
points.push( new THREE.Vector3( - 3, 0, 0 ) );
points.push( new THREE.Vector3( 0, 3, 0 ) );
points.push( new THREE.Vector3( 3, 0, 0 ) );
points.push( new THREE.Vector3( 0, -3, 0 ) );
points.push( new THREE.Vector3( - 3, 0, 0 ) );

const geometry_line = new THREE.BufferGeometry().setFromPoints( points );

/*
const geometry_txt = new THREE.TextGeometry( '你是猪', {
    font: "helvetiker",
    size: 80,
    height: 5,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 10,
    bevelSize: 8,
    bevelOffset: 0,
    bevelSegments: 5
} );
*/



//  初始化
const blue_line = new THREE.Line( geometry_line, material_green_line );
//  const material_blue = new THREE.MeshBasicMaterial( { color: 0x0000ff } );

var box_group1 = _buildBoxesGroup("box", 250)
var box_group2 = _buildBoxesGroup("sphere", 250)
var tube1 = buildTube();
var tube2 = buildTube();
var pavingStones01 = buildPavingStones()
var cone01 = buildCone();
var cone02 = buildCone();
var cone03 = buildCone();
var cone04 = buildCone();
var cone05 = buildCone();

export { blue_line, box_group1, box_group2, tube1, tube2, pavingStones01
    , cone01
    , cone02
    , cone03
    , cone04
    , cone05}