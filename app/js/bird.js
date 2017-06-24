// 鸟类
function Bird(cvs, ctx, x, y, width, height) {

    // 判断鸟类是否初始化过，没有的话，就请回吧
    if (!Bird.isInit) {
        throw '请先初始化Bird类!';
    }

    this.cvs = cvs;
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.index = 0;    // 小鸟渲染的第几帧
    this.speed = 1;   // 小鸟的运动速度
    this.speedPlus = 0.05;  // 加速度
}

// 给鸟类添加一个静态方法，用来初始化需要的一些数据
Bird.init = function (img) {
    // 给鸟类添加一个静态属性，这个属性值是图片对象
    Bird.img = img;
    // 小鸟的默认宽度（常量）, 因为这张图片由3只小鸟构成，所以需要除以3。
    Bird.IMG_WIDTH = img.width / 3;
    // 小鸟的默认高度（常量）
    Bird.IMG_HEIGHT = img.height;

    // 鸟类是否已经初始化控制
    if (img) {
        Bird.isInit = true;
    }
};

// 给Bird原型扩充方法
extend(Bird.prototype, {

    // 小鸟渲染函数
    draw: function () {

        // 保存当前状态
        this.ctx.save();
        /*
         * 如果要让一个图形旋转，需要如下几步骤：
         * 1、计算好要绘制图形的中心坐标
         * 2、然后根据计算好的坐标平移坐标系
         * 3、根据想要旋转的弧度旋转坐标系
         * 4、绘制图形，绘制的图形的x轴为-width/2，绘制的图形的y轴为-height/2
         * */

        // 1、
        var coreX = this.x + this.width / 2;
        var coreY = this.y + this.height / 2;
        // 2、
        this.ctx.translate(coreX, coreY);
        // 3、
        // 下落速度越快，旋转弧度越大，下落速度为1，旋转10度
        var rad = this.speed * 10;
        // 限制最大旋转角度为45度
        rad = rad > 45? 45 : rad;
        // 角度转为弧度
        rad = angleToRad(rad);
        this.ctx.rotate(rad);
        // 4、
        this.ctx.drawImage(Bird.img,
            Bird.IMG_WIDTH * this.index, 0, Bird.IMG_WIDTH, Bird.IMG_HEIGHT,
            -this.width / 2, -this.height / 2, this.width, this.height);

        // 保存当前状态
        this.ctx.restore();
    },

    // 更新小鸟下一帧渲染时所需的数据
    update: function () {
        this.index = ++this.index % 3;   // 更新帧
        this.y += this.speed;   // 更新渲染小鸟的Y轴
        this.speed += this.speedPlus;  // 更新小鸟下落的速度
    }
});
