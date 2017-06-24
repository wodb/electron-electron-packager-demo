// 把角度转换为弧度
function angleToRad(angle) {
    return Math.PI / 180 * angle;
}

// 把第二个对象的属性copy到第一个对象中
function extend(obj1, obj2) {
    for (var key in obj2) {
        obj1[key] = obj2[key];
    }
}