function getImgObj(fn) {
    // 把路径按照名字存起来
    var imgPathObj = {
        'birds': './imgs/birds.png',
        'land': './imgs/land.png',
        'pipeDown': './imgs/pipeDown.png',
        'pipeUp': './imgs/pipeUp.png',
        'sky': './imgs/sky.png'
    };

    // 用来存储不同的图像对象
    var imgObj = {};

    // 用来统计当前已经加载了多种张图片
    var imgLoadCount = 0;

    // 遍历全部路径
    for (var key in imgPathObj) {
        var path = imgPathObj[key];
        var img = new Image();
        img.addEventListener('load', function () {

            // 每一张图片加载完毕，那么就让imgLoadCount累加一次
            imgLoadCount++;

            if (imgLoadCount >= 5) {

                // 当全部图像加载完毕之后，调用一个函数，
                // 并且给他传入全部的图像对象
                fn(imgObj);
            }
        });
        img.src = path;
        // 按照存路径时的key来存储图像对象
        imgObj[key] = img;
    }
}