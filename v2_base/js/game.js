var Game = function() {
	// dom元素
	var gameDiv;
	var nextDiv;
	// 游戏矩阵
	var gameData = [
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	];
  // 当前方块
  var cur;
  // 下一个方块
  var next;

  // divs
  var nextDivs = []; 
  var gameDivs = [];

  // 初始化div
  var initDiv = function(container, data, divs) {
    for (var i = 0; i < data.length; i++) {
      var div = [];
      for (var j = 0; j < data[0].length; j++) {
        var newNode = document.createElement('div');
        newNode.className = 'none';
        newNode.style.top = (i*20) + 'px';
        newNode.style.left = (j*20) + 'px';
        // 需要初始化的容器
        container.appendChild(newNode);
        div.push(newNode);
      }
      divs.push(div);
    }
  }
  // 刷新div
  var refreshDiv = function(data, divs) {
    for (var i = 0; i < data.length; i++) {
      for (var j = 0; j < data[0].length; j++) {
        if (data[i][j] == 0) {
          divs[i][j].className = 'none';
        } else if (data[i][j] == 1) {
          divs[i][j].className = 'done';
        } else if (data[i][j] == 2) {
          divs[i][j].className = 'current';
        }
      }
    }
  }
  // 检查点是否合法
  var check = function(pos, x, y) {
    if (pos.x + x < 0) { // 超出上边界
      return false;
    } else if (pos.x + x >= gameData.length) { // 超出下边界
      return false;
    } else if (pos.y + y < 0) { // 超出左边界
      return false;
    } else if (pos.y + y >= gameData[0].length) { // 超出右边界
      return false;
    } else if (gameData[pos.x + x][pos.y + y] == 1) { // 如果这个位置已经有落下了
      return false;
    } else {
      return true;
    }
  }
  // 检测数据是否合法
  var isValid = function(pos, data) {
    for (var i = 0; i < data.length; i++) {
      for (var j = 0; j < data[0].length; j++) {
        if (data[i][j] != 0) {
          if (!check(pos, i, j)) {
            return false;
          }
        }
      }
    }
    return true;
  }
  // 清除数据
  var clearData = function() {
    // 吧下一个复制下来到游戏区域
    for (var i = 0; i < cur.data.length; i++) {
      for (var j = 0; j < cur.data[0].length; j++) {
        if (check(cur.origin, i, j)) {
          gameData[cur.origin.x + i][cur.origin.y + j] = 0;
        }
      }
    }
  }
  // 设置数据
  var setData = function() {
    // 吧下一个复制下来到游戏区域
    for (var i = 0; i < cur.data.length; i++) {
      for (var j = 0; j < cur.data[0].length; j++) {
        if (check(cur.origin, i, j)) {
          gameData[cur.origin.x + i][cur.origin.y + j] = cur.data[i][j];
        }
      }
    }
  }
  // 旋转
  var rotate = function() {
    if (cur.canRotate(isValid)) { // 如果能下降再去做操作
      clearData();
      cur.rotate(); // 下降
      setData();
      refreshDiv(gameData, gameDivs);
    }
  }
  // 下移
  var down = function() {
    if (cur.canDown(isValid)) { // 如果能下降再去做操作
      clearData();
      cur.down(); // 下降
      setData();
      refreshDiv(gameData, gameDivs);
      return true;
    } else {
      return false;
    }
  }
  // 下移
  var left = function() {
    if (cur.canLeft(isValid)) { // 如果能下降再去做操作
      clearData();
      cur.left(); // 下降
      setData();
      refreshDiv(gameData, gameDivs);
    }
  }
  // 下移
  var right = function() {
    if (cur.canRight(isValid)) { // 如果能下降再去做操作
      clearData();
      cur.right(); // 下降
      setData();
      refreshDiv(gameData, gameDivs);
    }
  }
  // 方块移动到底部，给他固定
  var fixed = function() {
    for (var i = 0; i < cur.data.length; i++) {
      for (var j = 0; j < cur.data[0].length; j++) {
        if (check(cur.origin, i, j)) {
          if (gameData[cur.origin.x + i][cur.origin.y + j] == 2) {
            gameData[cur.origin.x + i][cur.origin.y + j] = 1;
          }
        }
      }
    }
    refreshDiv(gameData, gameDivs);
  }
  // 消行
  var checkClear = function() {
    // 重下往上循环进行消行
    for (var i = gameData.length - 1; i >= 0; i-- ) {
      var clear = true;
      for (var j = 0; j < gameData[0].length; j++) {
        if (gameData[i][j] != 1) { // 如果这一行不全是下落的满行
          clear = false;
          break;
        }
      }
      if (clear) {
        for (var m = i; m >= 0; m--) {
          for (var n = 0; n < gameData[0].length; n++) {
            gameData[m][n] = gameData[m - 1][n];
          }
        }
        // 吧第一行变成0
        for (var n = 0; n < gameData[0].length; n++) {
          gameData[0][n] = 0;
        }
        i++;
      }
    }
  }
  // 检查游戏结束
  var checkGameOver = function() {
    var gameOver = false;
    for (var i = 0; i < gameData[0].length; i++) {
      if (gameData[1][i] == 1) {
        gameOver = true;
      }
    }
    return gameOver;
  }
  // 使用下一个方块
  var preformNext = function(type, dir) {
    cur = next;
    setData(); // 是当前数据去gameData里面生成
    next = SquareFactory.prototype.make(type, dir);
    refreshDiv(gameData, gameDivs);
    refreshDiv(next.data, nextDivs);
  }
  // 初始化
  var init = function(doms, type, dir) {
    gameDiv = doms.gameDiv;
    nextDiv = doms.nextDiv;
    // cur = SquareFactory.prototype.make(2, 2);
    next = SquareFactory.prototype.make(type, dir);
    // cur = new Square();
    // next = new Square();

    // cur.origin.x = 0;
    // cur.origin.y = 3;
    // setData();

    initDiv(gameDiv, gameData, gameDivs);
    initDiv(nextDiv, next.data, nextDivs);
    // refreshDiv(gameData, gameDivs);
    refreshDiv(next.data, nextDivs);
  }

  // 导出API
  this.init = init; // 初始化
  this.down = down;
  this.left = left;
  this.right = right;
  this.rotate = rotate;
  this.fall = function() {while(down());} //如果还不能下降就退出while
  this.fixed = fixed; // 下落到底部固定
  this.preformNext = preformNext; // 使用下一个方块
  this.checkClear = checkClear; // 消行
  this.checkGameOver = checkGameOver; // 检查游戏结束
}