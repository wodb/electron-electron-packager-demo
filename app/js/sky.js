// 天空类
function Sky(cvs, ctx, x) {

    // 判断天空类是否初始化过，没有的话，就请回吧
    if(!Sky.isInit) {
        throw '请先初始化Sky类!';
    }

    this.cvs = cvs;
    this.ctx = ctx;

    this.x = x || 0;  // 天空默认渲染的x轴坐标
    this.y = 0;  // 天空默认渲染的y轴坐标
    this.speed = -2;   // 天空的运动速度
    this.speedPlus = -0.0001;  // 加速度
}

// 给天空类添加一个静态方法，用来初始化需要的一些数据
Sky.init = function (img) {
    // 给天空类添加一个静态属性，这个属性值是图片对象
    Sky.img = img;
    // 天空的默认宽度（常量）, 因为这张图片由3只小鸟构成，所以需要除以3。
    Sky.IMG_WIDTH = img.width;
    // 天空的默认高度（常量）
    Sky.IMG_HEIGHT = img.height;

    // 天空是否已经初始化控制
    if (img) {
        Sky.isInit = true;
    }
};

// 给天空原型扩展方法
extend(Sky.prototype, {

    // 渲染天空
    draw: function () {
        this.ctx.drawImage(Sky.img, this.x, this.y);
    },

    // 更新天空下一帧渲染时的数据
    update: function () {
        this.x += this.speed;
        this.speed += this.speedPlus;

        if(this.x < - Sky.IMG_WIDTH) {

            // 当一张天空走出画布时，让这张天空向右拼接
            this.x = this.x + Sky.IMG_WIDTH * 2;
        }
    }
});