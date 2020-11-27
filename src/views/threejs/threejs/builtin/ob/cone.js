/* import { Lut } from "../../mjs/math/Lut.js";

const updateColors = function () {

    lut.setColorMap( params.colorMap );

    lut.setMax( 2000 );
    lut.setMin( 0 );

    const geometry = mesh.geometry;
    const pressures = geometry.attributes.pressure;
    const colors = geometry.attributes.color;

    for ( let i = 0; i < pressures.array.length; i ++ ) {

        const colorValue = pressures.array[ i ];

        const color = lut.getColor( colorValue );

        if ( color === undefined ) {

            console.log( 'Unable to determine color for value:', colorValue );

        } else {

            colors.setXYZ( i, color.r, color.g, color.b );

        }

    }

    colors.needsUpdate = true;

    const map = sprite.material.map;
    lut.updateCanvas( map.image );
    map.needsUpdate = true;

} */

const buildCone = function (color=0xffff00) {
    
    const geometry = new THREE.ConeBufferGeometry( 90, 1200, 640, 500 );
    const material = new THREE.MeshBasicMaterial( { 
        vertexColors: true, 
        color: 0xffff00, 
        vertexColors: THREE.VertexColors,
        //transparent: true, 
        //opacity: 0.5 ,
        side: THREE.DoubleSide });

    const count = geometry.attributes.position.count;
    geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( count * 3, 3 ) );
    
    color = new THREE.Color();
    const positions1 = geometry.attributes.position;
    const colors1 = geometry.attributes.color;

    for ( let i = 0; i < count; i ++ ) {
        var a = 1- (positions1.getY( i ) + 600) / 1200;
        color.setRGB( 1, a, a);
        colors1.setXYZ( i, color.r, color.g, color.b );
    }

    var mesh = new THREE.Mesh( geometry, material );
    
    return mesh
}
export { buildCone }