function shake(obj, dir, endFn) {
    if(obj.onOff) return;
    obj.onOff = true;
    var pos = parseInt(getStyle(obj, dir));
    var num = 0;
    var arr = [];


    for (var i = 6; i > 0; i -= 2) {
        arr.push(i, -i);
    }
    arr.push(0);  //抖动距离添加
    clearInterval(obj.shake);
    obj.shake = setInterval(function () {
        obj.style[dir] = pos + arr[num] + 'px';
        num++;
        if (num == arr.length) {
            clearInterval(obj.shake);
            endFn && endFn();
            obj.onOff = false;
        }
    }, 50);
}

function toMove(obj, dir, v, target, endFn) {
    v = parseInt(getStyle(obj, dir)) < target ? v : -v;
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var speed = parseInt(getStyle(obj, dir)) + v;
        if (speed > target && v > 0 || speed < target && v < 0) {
            speed = target;
        }
        obj.style[dir] = speed + 'px';
        if(speed==target){
            clearInterval(obj.timer);
            endFn && endFn();
        }
    }, 100)
}

function toOpa(obj, v, target, endFn) {
    v = parseFloat(getStyle(obj, 'opacity')) < target ? v : -v;
    clearInterval(obj.opa);
    obj.opa = setInterval(function () {
        var speed = parseFloat(getStyle(obj, 'opacity')) + v;
        if (speed > target && v > 0 || speed < target && v < 0) {
            speed = target;
        }
        obj.style.opacity = speed;
        obj.style.filter = 'alpha(opacity = ' + speed*100 + ')';
        if(speed==target){
            clearInterval(obj.opa);
            endFn && endFn();
        }
    }, 30)
}

function getStyle(obj, attr) {
    return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];

}
