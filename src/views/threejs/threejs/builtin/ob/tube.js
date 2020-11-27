import { Lut } from "../../mjs/math/Lut.js";

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

}

const buildTube = function (color=0xffff00) {
    class CustomSinCurve extends THREE.Curve {

        constructor( scale = 1 ) {
    
            super();
            this.scale = scale;
    
        }
    
        getPoint( t, optionalTarget = new THREE.Vector3() ) {   
            /* const ty = t * 24 - 6;
            const tx = Math.sin( 2 * Math.PI * t ) + t * 36; */
            const tz = 0// t * 240 - 120;
            const tx = t * 240 - 120;
            const ty = 0//-t * 240 + 120;//Math.sin( 2 * Math.PI * t ) * 8;
            const points = optionalTarget.set( tx, ty, tz ).multiplyScalar( this.scale ); 
            return points
    
        }
    
    }
    const path = new CustomSinCurve( 10 );
    const geometry = new THREE.TubeBufferGeometry( path, 64, 4, 8, false );
    const material = new THREE.MeshBasicMaterial( { 
        vertexColors: true, 
        //  color: 0xffffff, 
        vertexColors: THREE.VertexColors,
        transparent: true, 
        opacity: 0.5 ,
        side: THREE.DoubleSide });

    const count = geometry.attributes.position.count;
    geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( count * 3, 3 ) );
    
    color = new THREE.Color();
    const positions1 = geometry.attributes.position;
    const colors1 = geometry.attributes.color;

    for ( let i = 0; i < count; i ++ ) {
        var a = 1 - (positions1.getX( i ) + 120) / 240;
        color.setRGB( 1, a, a);
        colors1.setXYZ( i, color.r, color.g, color.b );

    }

    var mesh = new THREE.Mesh( geometry, material );
    //mesh.scale.x = 10;
    //mesh.scale.y = 10;
    //mesh.scale.z = 10;
    return mesh
}
export { buildTube }