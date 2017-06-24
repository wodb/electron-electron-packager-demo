// 大地类
function Land(cvs, ctx, x) {

    if(!Land.isInit) {
        throw '请初始化Lnad类！';
    }

    this.cvs = cvs;
    this.ctx = ctx;

    this.x = x || 0;
    this.y = this.cvs.height - Land.IMG_HEIGHT;
    this.width = Land.IMG_WIDTH;
    this.height = Land.IMG_HEIGHT;
    this.speed = -1;   // 运动速度
    this.speedPlus = -0.0001;
}

Land.init = function (img) {
    // 把图片添加到类上
    Land.img = img;
    // 静态属性，代表大地源图像的宽
    Land.IMG_WIDTH = img.width;
    // 静态属性，代表大地源图像的高
    Land.IMG_HEIGHT = img.height;

    if(img) {
        Land.isInit = true;
    }
};

extend(Land.prototype, {

    // 渲染大地
    draw: function () {
        this.ctx.drawImage(Land.img, this.x, this.y);
    },

    // 更新下一帧渲染时的数据
    update: function () {
        this.x += this.speed;
        this.speed += this.speedPlus;

        // 当大地走出画布，那么向右拼接
        if(this.x < -this.width) {
            this.x += this.width * 4;
        }
    }
});
