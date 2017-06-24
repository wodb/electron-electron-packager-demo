// 管道类
function Pipe(cvs, ctx, x) {

    if (!Pipe.isInit) {
        throw '请按照套路出牌！';
    }

    this.cvs = cvs;
    this.ctx = ctx;

    // 上下管道之间的间隙
    this.jianxi = 120;

    this.x = x;
    this.width = Pipe.IMG_WIDTH; // 管道宽度为默认的宽度

    // 上管道高度为20 到 220之间
    this.height = Math.random() * 200 + 20;  // 在类中的方法或者实例方法中计算管道高度
    // 口朝下的管道(在上面渲染)算法：-(管道总高度 - 显示的高度)  等于 (显示的高度 - 管道总高度)
    this.downY = this.height - Pipe.IMG_HEIGHT;
    // 口朝上的管道(在下面渲染)算法: 上面管道高度 + 上下管道间隙
    this.upY = this.height + this.jianxi;

    this.speed = -2;
    this.speedPlus = -0.0001;

}

// 添加初始化函数
Pipe.init = function (pipeDown, pipeUp) {
    Pipe.pipeDown = pipeDown;
    Pipe.pipeUp = pipeUp;
    Pipe.IMG_WIDTH = pipeUp.width;
    Pipe.IMG_HEIGHT = pipeUp.height;

    if (pipeDown && pipeUp) {
        Pipe.isInit = true;
    }
};

// 扩展方法
extend(Pipe.prototype, {

    // 绘制
    draw: function () {
        this.ctx.drawImage(Pipe.pipeDown, this.x, this.downY, Pipe.IMG_WIDTH, Pipe.IMG_HEIGHT);
        this.ctx.drawImage(Pipe.pipeUp, this.x, this.upY, Pipe.IMG_WIDTH, Pipe.IMG_HEIGHT);
        this.drawPipePath();
    },

    // 根据管道绘制路径
    drawPipePath: function () {
        /*this.ctx.strokeStyle = 'blue';*/
        this.ctx.rect(this.x, this.downY, Pipe.IMG_WIDTH, Pipe.IMG_HEIGHT);
        this.ctx.rect(this.x, this.upY, Pipe.IMG_WIDTH, Pipe.IMG_HEIGHT);
        /*this.ctx.stroke();*/
    },

    // 更新数据
    update: function () {
        this.x += this.speed;
        this.speed += this.speedPlus;

        // 管道走出画布，向右拼接
        if (this.x < -this.width) {
            // 管道之间间隔是2个，所以当一个管道向右拼接时，新的x轴坐标算法为：当前的x轴坐标 + 一个管道宽度 * 3(1个自身+2个管道间隔) * 总管道数量
            this.x += Pipe.IMG_WIDTH * 3 * 6;
            // 上管道高度为20 到 220之间
            this.height = Math.random() * 200 + 20;  // 在类中的方法或者实例方法中计算管道高度
            // 口朝下的管道(在上面渲染)算法：-(管道总高度 - 显示的高度)  等于 (显示的高度 - 管道总高度)
            this.downY = this.height - Pipe.IMG_HEIGHT;
            // 口朝上的管道(在下面渲染)算法: 上面管道高度 + 上下管道间隙
            this.upY = this.height + this.jianxi;
        }
    }
});
