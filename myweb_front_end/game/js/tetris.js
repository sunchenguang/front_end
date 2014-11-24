// JavaScript Document

var TETRIS_ROWS = 20;
var TETRIS_COLS = 20;
var CELL_SIZE = 0;// 格子大小 是 长宽的比率
var tetris_status = []; //该数组用于记录底下已经固定的方块
var colors = ["azure","blue","green","black","yellow","pink","purple","red"];

//创建一个Canvas组件
var createCanvas = function(rows , cols , cellWidth , cellHeight){
	tetris_canvas = document.getElementById("gameCanvas"); 
	tetris_canvas.width = 300 ;
	tetris_canvas.height = 300 ;
	//tetris_canvas.style.border = "1px solid black";
	tetris_ctx = tetris_canvas.getContext("2d"); //获取Canvas绘图API(二维上下文)
	tetris_ctx.fillStyle="#fff";
	 tetris_ctx.fillRect(0,0,tetris_canvas.width,tetris_canvas.height);
	 tetris_ctx.beginPath(); //开始创建 路径
	 
	 CELL_SIZE = tetris_canvas.height / TETRIS_ROWS;
	 
	// var t_w=tetris_canvas.width/TETRIS_COLS;
	for(var i = 1; i <= TETRIS_ROWS; i++){  //绘制 横向 网格的路径
		tetris_ctx.moveTo(0,i * CELL_SIZE);
		tetris_ctx.lineTo(tetris_canvas.width, i * CELL_SIZE);
	}
	for(var i = 1; i < TETRIS_COLS; i++){  //绘制 纵向 网格的路径
		tetris_ctx.moveTo(i * CELL_SIZE, 0);
		tetris_ctx.lineTo(i * CELL_SIZE, tetris_canvas.width);
	}
	tetris_ctx.closePath(); //结束 路径
	
	tetris_ctx.strokeStyle = "#0f0"; //设置线条 颜色
	tetris_ctx.lineWidth = 1;  //设置线条 粗度
	tetris_ctx.stroke(); //绘制 线条
	
	//var tetris_status = []; //该数组用于记录底下已经固定的方块
    for(var i = 0; i < TETRIS_ROWS; i++ ){
	  tetris_status[i] = [];
	    for(var j = 0; j < TETRIS_COLS; j++ ){ 
		  tetris_status[i][j] = 0; //二维数组记录游戏界面每个位置的方块值  0 代表界面还没有方块
	}
  }
  
}
//Canvas组件创建 结束

var blockArr = [
        //方块组合 Z
        [
		   {x: TETRIS_COLS / 2 - 1  , y: 0 , color: 1},
		   {x: TETRIS_COLS / 2      , y: 0 , color: 1},
		   {x: TETRIS_COLS / 2      , y: 1 , color: 1},
		   {x: TETRIS_COLS / 2 + 1  , y: 1 , color: 1}
		],
		[    //方块组合 反Z
		   {x: TETRIS_COLS / 2 + 1  , y: 0 , color: 2},
		   {x: TETRIS_COLS / 2      , y: 0 , color: 2},
		   {x: TETRIS_COLS / 2      , y: 1 , color: 2},
		   {x: TETRIS_COLS / 2 - 1  , y: 1 , color: 2}
		],
		[   //方块组合 田
		   {x: TETRIS_COLS / 2 - 1  , y: 0 , color: 3},
		   {x: TETRIS_COLS / 2      , y: 0 , color: 3},
		   {x: TETRIS_COLS / 2 - 1  , y: 1 , color: 3},
		   {x: TETRIS_COLS / 2      , y: 1 , color: 3}
		],
		[    //方块组合 L
		   {x: TETRIS_COLS / 2 - 1  , y: 0 , color: 4},
		   {x: TETRIS_COLS / 2 - 1  , y: 1 , color: 4},
		   {x: TETRIS_COLS / 2 - 1  , y: 2 , color: 4},
		   {x: TETRIS_COLS / 2      , y: 2 , color: 4}
		],
		[   //方块组合 J
		   {x: TETRIS_COLS / 2      , y: 0 , color: 5},
		   {x: TETRIS_COLS / 2      , y: 1 , color: 5},
		   {x: TETRIS_COLS / 2      , y: 2 , color: 5},
		   {x: TETRIS_COLS / 2 -  1 , y: 2 , color: 5}
		],
		[    //方块组合 竖条 |
		   {x: TETRIS_COLS / 2      , y: 0 , color: 6},
		   {x: TETRIS_COLS / 2      , y: 1 , color: 6},
		   {x: TETRIS_COLS / 2      , y: 2 , color: 6},
		   {x: TETRIS_COLS / 2      , y: 3 , color: 6}
		],
		[    //方块组合 山（下面3个方块，第二个方块上面有一个方块）
		   {x: TETRIS_COLS / 2      , y: 0 , color: 7},
		   {x: TETRIS_COLS / 2 - 1  , y: 1 , color: 7},
		   {x: TETRIS_COLS / 2      , y: 1 , color: 7},
		   {x: TETRIS_COLS / 2 + 1  , y: 1 , color: 7}
		]
];


var initBlock = function(){  //初始化正在掉落的 方块
	var rand = Math.floor(Math.random() * blockArr.length); // Math.random()的随机数 [0,1) Math.floor()向下取整 
	                                                        //  rand取值范围 (0,1,2,3,4,5,6)
	currentFall = [ //正在下落的 形体 由 4个方块 组成
		{x: blockArr[rand][0].x , y: blockArr[rand][0].y , color: blockArr[rand][0].color},
		{x: blockArr[rand][1].x , y: blockArr[rand][1].y , color: blockArr[rand][1].color},
		{x: blockArr[rand][2].x , y: blockArr[rand][2].y , color: blockArr[rand][2].color},
		{x: blockArr[rand][3].x , y: blockArr[rand][3].y , color: blockArr[rand][3].color}
	];
};


var lineFull = function (){
	for(var i = 0; i < TETRIS_ROWS; i++){
		var flag = true;
		for(var j = 0; j < TETRIS_COLS ; j++ ){ //判断一行中是否有空，若有空跳出循环，进入下一行，若没空，则向下运行
			if(tetris_status[i][j] == 0){
				flag = false;
				break;
			}
		}
		if(flag){
			curScoreEle.innerHTML = curScore+=100;
			localStorage.setItem("curScore",curScore);
			if(curScore >= curSpeed * curSpeed * 500){ //如果当前积分达到升级极限
				curSpeedEle.innerHTML = curSpeed += 1; 
				localStorage.setItem("curSpeed",curSpeed);
				clearInterval(curTimer); //清除当前计时器
				//根据游戏速度启用新的计时器
				curTimer = setInterval("moveDown();" , 500 / curSpeed); 
			}
			for(var k = i ; k > 0 ; k --){ //遍历 消除行 上方的所有行 下移一行  
				for(var l = 0 ; l < TETRIS_COLS ; l ++){
					tetris_status[k][l] = tetris_status[k-1][l]; //记录各个方块的 状态
				}
			}
			drawBlock();//消除方块后，重新绘制一遍方块
		}
	}
}


var isPlaying = true;


window.onkeydown = function(evt){
	switch(evt.keyCode){
		case 40:  // 按下 向下 箭头
		   if(!isPlaying) return;
		   moveDown();
		   break;
		case 37:  // 按下 向左 箭头
		   if(!isPlaying) return;
		   moveLeft();
		   break;
		case 39:  // 按下 向右 箭头
		   if(!isPlaying) return;
		   moveRight();
		   break;
		case 38:  // 按下 向上 箭头
		   if(!isPlaying) return;
		   rotate();
		   break;
	}
}


var moveDown = function(){ //形体 下降 函数
   var canDown = true;
   for(var i = 0; i < currentFall.length; i++){ //遍历每个方块，看能否下落
	   if(currentFall[i].y >= TETRIS_ROWS - 1){ //判断是否到 最底下
		   canDown = false;
		   break;
	   }
	   if(tetris_status[currentFall[i].y + 1][currentFall[i].x] != 0){ //判断下方是否 有空格 tetris_status[][]二维数组 
	                                                                          //二维数组第一个下标是 TETRIS_ROWS 是 y值
		   canDown = false;                                                   //二维数组第一个下标是 TETRIS_COLS 是 x值
		   break;
	   }
   }

    if(canDown){
		//将下移前的每个方块涂成白色
		for(var i = 0; i < currentFall.length; i++){
			var cur = currentFall[i];
			tetris_ctx.fillStyle = 'white';
			tetris_ctx.fillRect(cur.x * CELL_SIZE + 1 , cur.y * CELL_SIZE + 1 , CELL_SIZE - 2 , CELL_SIZE - 2);//绘制矩形
		}
		for(var i = 0; i < currentFall.length; i++){     //控制每个方块掉落一格
			var cur = currentFall[i];
			cur.y ++;
		}
		for(var i = 0; i < currentFall.length; i++){    //将下移后的每个方格背景色改成该方块的颜色
			var cur = currentFall[i];
			tetris_ctx.fillStyle = colors[cur.color];
			tetris_ctx.fillRect(cur.x * CELL_SIZE + 1 , cur.y * CELL_SIZE + 1 , CELL_SIZE - 2 , CELL_SIZE - 2);//绘制矩形
		}
	}else{ //不能向下掉落
		for(var i = 0; i < currentFall.length; i++){
			var cur = currentFall[i];
			if(cur.y < 2){ //有方块到达最上面
				localStorage.removeItem("curScore");
				localStorage.removeItem("tetris_status");
				localStorage.removeItem("curSpeed");
				if(confirm("你已经输了，是否参与排名？")){ //读取localStorage中的 maxScore
					maxScore = localStorage.getItem("maxScore");
					maxScore = maxScore == null ? 0 : maxScore;
					if(curScore >= maxScore ){
						localStorage.setItem("maxScore",curScore);
					}
					
				}
			isPlaying = false;	
			clearInterval(curTimer);	//清除定时器
			return;	
			}
			tetris_status[cur.y][cur.x] = cur.color; //把每个方块当前位置改为当前方块颜色
			
		}
	    lineFull(); //判断是否 有可消除的行
		localStorage.setItem("tetris_status",JSON.stringify(tetris_status));
		initBlock(); //开始一组 新的方块
	}
}



var moveLeft = function(){ //左移方块 的函数
	var canLeft = true;
	for(var i = 0; i < currentFall.length; i++ ){
		if(currentFall[i].x <= 0){ //形体的4个方块中任意一个已经到达最左边，则不能左移
			canLeft = false;
			break;
		}
		if(tetris_status[ currentFall[i].y ][ currentFall[i].x - 1 ] != 0){ //左边位置已有方块则不能左移
			canLeft = false;
			break;
		}
	}
	if(canLeft){
		for(var i = 0; i < currentFall.length; i++ ){ //将左移前的每个方块背景色涂成 白色
		    var cur = currentFall[i]; 
			tetris_ctx.fillStyle = 'white';
			tetris_ctx.fillRect(cur.x * CELL_SIZE + 1 ,cur.y * CELL_SIZE + 1 , CELL_SIZE - 2, CELL_SIZE - 2);
		}
		for(var i = 0; i < currentFall.length; i++ ){ //位移
		    var cur = currentFall[i];
			cur.x --;
		}
		for(var i = 0; i < currentFall.length; i++ ){ //将左移后的每个方块涂成对应的颜色
		    var cur = currentFall[i]; 
			tetris_ctx.fillStyle = colors[cur.color];
			tetris_ctx.fillRect(cur.x * CELL_SIZE + 1 ,cur.y * CELL_SIZE + 1 , CELL_SIZE - 2, CELL_SIZE - 2);
		}
	}
}



var moveRight = function(){ //右移方块 的函数
	var canRight = true;
	for(var i = 0; i < currentFall.length; i++ ){
		if(currentFall[i].x >= TETRIS_COLS - 1){
			canRight = false;
			break;
		}
		if(tetris_status[ currentFall[i].y ][ currentFall[i].x + 1 ] != 0){
			canRight = false;
			break;
		}
	}
	if(canRight){
		for(var i = 0; i < currentFall.length; i++ ){
		    var cur = currentFall[i]; 
			tetris_ctx.fillStyle = 'white';
			tetris_ctx.fillRect(cur.x * CELL_SIZE + 1 ,cur.y * CELL_SIZE + 1 , CELL_SIZE - 2, CELL_SIZE - 2);
		}
		for(var i = 0; i < currentFall.length; i++ ){
		    var cur = currentFall[i];
			cur.x ++;
		}
		for(var i = 0; i < currentFall.length; i++ ){
		    var cur = currentFall[i]; 
			tetris_ctx.fillStyle = colors[cur.color];
			tetris_ctx.fillRect(cur.x * CELL_SIZE + 1 ,cur.y * CELL_SIZE + 1 , CELL_SIZE - 2, CELL_SIZE - 2);
		}
	}
}



var rotate = function(){  //旋转方块 的函数
	var canRotate = true;
	for(var i = 0; i < currentFall.length; i++ ){
	      var preX = currentFall[i].x;
		  var preY = currentFall[i].y;
		  if(i != 2){   //始终以第3个方块为旋转中心
			  var afterRotateX = currentFall[2].x + preY -  currentFall[2].y; //旋转后的x,y坐标
			  var afterRotateY = currentFall[2].y + currentFall[2].x - preX;
			  
			  if(tetris_status[afterRotateY][afterRotateX + 1] != 0){ //旋转后位置已有方块
				  canRotate = false;
				  return;
			  }
			  
			  if(afterRotateX < 0 || tetris_status[afterRotateY - 1][afterRotateX] != 0){//旋转后坐标超出最左边边界
				  moveRight();
				  afterRotateX = currentFall[2].x + preY -  currentFall[2].y; 
			      afterRotateY = currentFall[2].y + currentFall[2].x - preX;
				  break;
			  }
			  if(afterRotateX < 0 || tetris_status[afterRotateY - 1][afterRotateX] != 0){
				  moveRight();
				  break;
			  }
			  
			  if(afterRotateX >= TETRIS_COLS - 1 || tetris_status[afterRotateY][afterRotateX + 1] != 0){//旋转后坐标超出最右边边界
				  moveLeft();
				  afterRotateX = currentFall[2].x + preY -  currentFall[2].y; 
			      afterRotateY = currentFall[2].y + currentFall[2].x - preX;
				  break;
			  }
			  if(afterRotateX >= TETRIS_COLS - 1 || tetris_status[afterRotateY][afterRotateX + 1] != 0){
				  moveLeft();
				  break;
			  }
		   }
		}
		
		if(canRotate){
			for(var i = 0; i < currentFall.length; i++ ){//将旋转前的每个方块涂成白色
		      var cur = currentFall[i]; 
			  tetris_ctx.fillStyle = 'white';
			  tetris_ctx.fillRect(cur.x * CELL_SIZE + 1 ,cur.y * CELL_SIZE + 1 , CELL_SIZE - 2, CELL_SIZE - 2);
		    }
			for(var i = 0; i < currentFall.length; i++ ){
	          var preX = currentFall[i].x;
		      var preY = currentFall[i].y;
			    if(i != 2){       //旋转后的坐标
			       currentFall[i].x = currentFall[2].x + preY -  currentFall[2].y; 
			       currentFall[i].y = currentFall[2].y + currentFall[2].x - preX;
			    }
			}
			for(var i = 0; i < currentFall.length; i++ ){ //将旋转后的方块涂成对应的颜色
		      var cur = currentFall[i]; 
			  tetris_ctx.fillStyle = colors[cur.color];
			  tetris_ctx.fillRect(cur.x * CELL_SIZE + 1 ,cur.y * CELL_SIZE + 1 , CELL_SIZE - 2, CELL_SIZE - 2);
		    }
		}
}



window.onload = function(){ //页面加载完成时，执行该函数
	createCanvas(TETRIS_ROWS , TETRIS_COLS , CELL_SIZE , CELL_SIZE);  //创建Canvas
	//document.body.appendChild(tetris_canvas);
	curScoreEle = document.getElementById("curScoreEle");
	curSpeedEle = document.getElementById("curSpeedEle");
	maxScoreEle = document.getElementById("maxScoreEle");
	
	var tmpStatus = localStorage.getItem("tetris_status");//读取localStorage中的tetris_status
	tetris_status = tmpStatus == null ? tetris_status : JSON.parse(tmpStatus);
	
	
	
	curScore = localStorage.getItem("curScore");//读取localStorage中的curScore
	curScore = curScore == null ? 0 : parseInt(curScore);
	curScoreEle.innerHTML = curScore;
	
	curSpeed = localStorage.getItem("curSpeed");//读取localStorage中的curSpeed
	curSpeed = curSpeed == null ? 1 : parseInt(curSpeed);
	curSpeedEle.innerHTML = curSpeed;
	
	maxScore = localStorage.getItem("maxScore");//读取localStorage中的maxScore
	maxScore = maxScore == null ? 0 : parseInt(maxScore);
	maxScoreEle.innerHTML = maxScore;
	
	initBlock();//初始化正在掉落的形体
	drawBlock();//绘制方块状态
	
	curTimer = setInterval("moveDown();", 500 / curSpeed);
	
}



var drawBlock = function(){ //绘制方块状态
     for(var m = 0 ; m < TETRIS_ROWS ; m++){
		for(var n = 0 ; n < TETRIS_COLS ; n++){
			if(tetris_status[m][n] != 0 ){ //有方块的地方绘制颜色
				tetris_ctx.fillStyle = colors[ tetris_status[m][n] ];
				tetris_ctx.fillRect(n * CELL_SIZE + 1 ,m * CELL_SIZE + 1 , CELL_SIZE - 2, CELL_SIZE - 2); //绘制矩形
			}else{                              //没方块的地方绘制 白色
				tetris_ctx.fillStyle = 'white';
				tetris_ctx.fillRect(n * CELL_SIZE + 1 ,m * CELL_SIZE + 1 , CELL_SIZE - 2, CELL_SIZE - 2); //绘制矩形
			}
		}
	}
}















