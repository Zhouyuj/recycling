/**
 * Created by wujiahui on 2018/11/20.
 */
var steps = 0;
var timer = setInterval(function () {
    console.log(++steps);
    if (steps >= 20) {
        clearInterval(timer);
    }
}, 1000);