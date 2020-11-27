import { BasisTextureLoader } from '../../mjs/loaders/BasisTextureLoader.js';
import { renderer } from "../../camera.js";

var buildPavingStones = function () {    
    const geometryBox = new THREE.BoxGeometry(200, 200, 200);
    const material_green = new THREE.MeshBasicMaterial(  );
    const cube_green = new THREE.Mesh( geometryBox, material_green );
    //const ball_blue = new THREE.Mesh( geometryBall, material_blue );

    //  const text_green = new THREE.Mesh( geometry_txt, material_green );
    const loader = new BasisTextureLoader();
    loader.setTranscoderPath( '../static/libs/basis/' );
    loader.detectSupport( renderer );
    loader.load( '../static/textures/compressed/PavingStones.basis', function ( texture ) {

        texture.encoding = THREE.sRGBEncoding;
        material_green.map = texture;
        material_green.needsUpdate = true;

    }, undefined, function ( error ) {

        console.error( error );

    } );
    return cube_green
}
export { buildPavingStones }