var Local = function() {
	// 游戏对象
  var game;
  // 时间间隔
  var INTERVAL = 200;
  // 定时器
  var timer = null;
  // 移动
  var move = function() {
    if (!game.down()) { // 如果不能下降再去变成已经下落的
      game.fixed();
      game.checkClear(); // 消除行
      if (game.checkGameOver()) { // 检查游戏结束
        stop();
      } else {
        game.preformNext(generateType(), generateDir());
      }
      
    } 
  }
  // 随机生成一个方块
  var generateType = function() {
    return Math.ceil(Math.random() * 7) - 1;
  }
  // 随机生成一个旋转次数
  var generateDir = function() {
    return Math.ceil(Math.random() * 4) - 1;
  }
  // 绑定键盘事件
  var bindKeyEvent = function() {
    document.onkeydown = function(e) {
      if (e.keyCode == 38) { // up
        game.rotate();
      } else if (e.keyCode == 39) { // right
        game.right();
      } else if (e.keyCode == 40) { // down
        game.down();
      } else if (e.keyCode == 37) { // left
        game.left();
      } else if (e.keyCode == 32) { // space
        game.fall();
      }
    }
  }
  // 开始
  var start = function() {
    var doms = {
      gameDiv: document.getElementById('game'),
      nextDiv: document.getElementById('next')
    }
    game = new Game();
    game.init(doms, generateType(), generateDir());
    // 初始化事件
    bindKeyEvent();
    game.preformNext(generateType(), generateDir());
    timer = setInterval(move, INTERVAL)
  }
  // 结束
  var stop = function() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
    // 清除键盘事件
    document.onkeydown = null;
  }
  // 导出API
  this.start = start;
}