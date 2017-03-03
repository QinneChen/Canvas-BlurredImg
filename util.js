//image.onload = function (e) {
//    initCanvas();
//}

var canvasWidth = 510;
var canvasHeight = 300;

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var timeOutFlag = false;
var image = new Image();

image.src = "a.jpeg";
var radius = 50;
var clippingRegion = {
    x: 300,
    y: 50,
    r: radius
};
var blurImg = function () {
    return {
        initCanvas: function () {
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;
            clippingRegion = {
                x: Math.random() * (canvasWidth - 2 * radius) + radius,
                y: Math.random() * (canvasHeight - 2 * radius) + radius,
                r: radius
            };
            blurImg.drawImg(image, clippingRegion);
        },
        setClippingRegion: function (clippingRegion) {
            context.beginPath();
            context.arc(clippingRegion.x, clippingRegion.y, clippingRegion.r, 0, Math.PI * 2, false);
            context.clip();
        },
        drawImg: function (obj, clippingRegion) {
            context.clearRect(0, 0, canvas.width, canvas.height); //每次绘制前清除画布
            context.save();
            blurImg.setClippingRegion(clippingRegion);
            context.drawImage(obj, 0, 0);
            context.restore();
        },
        reset: function () {
            clearInterval(timeOutFlag);
            blurImg.initCanvas();
        },
        show: function () {
            if (clippingRegion.r > radius) {
                return;
            } else {
                timeOutFlag = setInterval(function () {
                    clippingRegion.r += 20;
                    if (clippingRegion.r > 2*Math.max(canvasWidth,canvasHeight)) {
                        clearInterval(timeOutFlag);
                    } else {
                        blurImg.drawImg(image, clippingRegion);
                    }
                }, 30);
            }
        }
    }
}();

window.onload = function () {
    blurImg.initCanvas();
};
