import { MMDLoader } from './mjs/loaders/MMDLoader.js';
import { scene } from "./camera.js";
const modelFile = '../static/models/mmd/miku/miku_v2.pmd';

const loader = new MMDLoader();


function onProgress( xhr ) {

    if ( xhr.lengthComputable ) {

        const percentComplete = xhr.loaded / xhr.total * 100;
        console.log( Math.round( percentComplete, 2 ) + '% downloaded' );

    }

}

//  此处给一个promise
var hatsune_miku = function () {
    loader.load( modelFile, function ( object ) {

        var mesh = object;
        mesh.position.y = -250;
        mesh.position.x = -500
        mesh.scale.x = 30
        mesh.scale.y = 30
        mesh.scale.z = 30

        scene.add( mesh );
    
        /* let vpdIndex = 0;
    
        
        function loadVpd() {
    
            const vpdFile = vpdFiles[ vpdIndex ];
    
            loader.loadVPD( vpdFile, false, function ( vpd ) {
    
                vpds.push( vpd );
    
                vpdIndex ++;
    
                if ( vpdIndex < vpdFiles.length ) {
    
                    loadVpd();
    
                } else {
    
                    initGui();
    
                }
    
            }, onProgress, null );
    
        }
    
        loadVpd();
    */
    
    }, onProgress, null );
}

export { hatsune_miku }