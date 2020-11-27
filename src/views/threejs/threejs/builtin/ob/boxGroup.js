
var _buildBoxesGroup = function (type, maxponit)  {
    //  建一个盒子
    var geometryBufferSphere = new THREE.SphereBufferGeometry( 0.1, 8, 8 );
    switch(type) {
        case "sphere":
            geometryBufferSphere = new THREE.SphereBufferGeometry( 0.1, 8, 8 );
            break;
        case "box":
            geometryBufferSphere = new THREE.BoxBufferGeometry( 0.1, 0.1, 0.1 );
            break;
        default:
            break
    }
    geometryBufferSphere
    const MAX_POINTS = maxponit || 500;
    const MAX_COLOR = 10;
    const group = new THREE.Group();
    //  产生 MAX_COLOR 个 随机材质
    const _random_material_list = (function () {
        var j = 0, res = [];
        while (j < MAX_COLOR) {
            res.push(new THREE.MeshBasicMaterial( { color: new THREE.Color( Math.random(), Math.random(), Math.random() )} ))
            j++;
        }
        return res
    })();

    let x, y, z;
    x = y = z = 0;

    for ( let i = 0, l = MAX_POINTS; i < l; i ++ ) {    
        //  每十个一轮更换颜色
        var _remainder = i % MAX_COLOR;
        var cubeTmp = new THREE.Mesh( geometryBufferSphere, _random_material_list[_remainder] );
        x = ( Math.random() - 0.5 ) * 20;
        y = ( Math.random() - 0.5 ) * 20;
        z = ( Math.random() - 0.5 ) * 20;
        cubeTmp.opacity =  0.8;
        cubeTmp.position.set( x, y, z );
        group.add( cubeTmp );
    }
    return group

}
export { _buildBoxesGroup }