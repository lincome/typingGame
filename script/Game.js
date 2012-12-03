var canvas;
var scoreTF;
var letterList =  [];
var pool = [];
var stage;
var WIDTH = 0;
var HEIGHT = 0;
var angle = 0;
var score = 0;
var speed = 5;
//game layer
var downLayer;
var mainLayer;
var uiLayer;
//game status
var STATUS = {
	init:"init",
	start:"start",
	pause:"pause",
	end:"game End"
};
var game_status;
function init(){
	initStage();
	initLayer();
	//initUI();
	initEvent();
	//gameLogic();
	status=STATUS.init
}
function initEvent(){
	document.body.onkeydown = onkeydown;
	createjs.Ticker.addListener(window);
}

function initStage(){
	canvas = document.getElementById("c");
	WIDTH = canvas.width;
	HEIGHT = canvas.height;
	stage = new createjs.Stage(c);
	stage.enableMouseOver(20);
}
function initUI(){
	scoreTF = new createjs.Text("分数:0", "20px Arial", "#F8F4E8");
	mainLayer.addChild(scoreTF);
	scoreTF.x = 10;
	scoreTF.y = 10;
}
function initLayer(){
	downLayer = new createjs.Container();
	uiLayer = new createjs.Container();
	mainLayer = new createjs.Container();
	initPanel = new createjs.Container();
	stage.addChild(downLayer);
	stage.addChild(mainLayer);
	stage.addChild(uiLayer);
	uiLayer.addChild(initPanel);
}
function onkeydown(evt){
	var len = letterList.length;
	var isErr = true;
	for(var i = len-1; i >=0;i-- ){
		var tf = letterList[i];
		if(tf.text==String.fromCharCode(evt.keyCode)){
			mainLayer.removeChild(tf);
			letterList.splice(i,1);
			pool.push(tf);
			isErr = false;
			break;
		}
	}
	if(isErr){score --}
	else{score ++}
	scoreTF.text ="分数:"+ score;
}
function game_logic_start(){
	// stage.update();
	if(parseInt(Math.random()*30)==1){
		var letterTF = pool.length>0?pool.pop():new createjs.Text("letter", "20px Arial","#F8F4E8");
		letterTF.text = String.fromCharCode(parseInt(Math.random()*26+65));
		letterList.unshift(letterTF);
		mainLayer.addChild(letterTF);
		letterTF.y = 0;
		letterTF.x = 20+Math.random()*(WIDTH-40);
		letterTF.angle = 0;
	}
	var len = letterList.length;
	for(var i = len-1; i >= 0; i--){
		var tf = letterList[i];
		tf.y +=speed;
		tf.angle += 0.1;
		tf.x+= Math.sin(tf.angle)*1;
		if(tf.y >= HEIGHT){
			mainLayer.removeChild(tf);
			letterList.splice(i,1);
			pool.push(tf);
			score--;
			scoreTF.text ="分数:"+ score
		}
	}
}
var isInit = false;
function game_logic_init(){
	if(isInit==false){
		var startBtn = new createjs.Button("开始游戏");
		
		startBtn.x = WIDTH/2 - startBtn.width/2;
		startBtn.y = 300;
		isInit = true;
		var title = new createjs.Text("打字游戏", "30px Arial", "#F8F4E8");
		title.x = 140;
		title.y = 140;
		
		for(var i = 0;i < 100;i++){
			var size = Math.random()*-10+20;
			var temp = new createjs.Text(String.fromCharCode(parseInt(Math.random()*26+65)), size+"px Arial", "#53595E");
			temp.x = Math.random()*500;
			temp.y = Math.random()*500;
			initPanel.addChild(temp);
		}
		initPanel.addChild(startBtn);
		initPanel.addChild(title);
		startBtn.onClick = function(){
			status = STATUS.start;
			//startBtn.visible = false;
			initPanel.visible = false;
			initUI();
		}
	}
	
	// stage.update();
}
function tick(){
	stage.update();
	if(status==STATUS.init){
		game_logic_init();
	}
	else if(status==STATUS.start)
	{
		game_logic_start();
	}
	else if(status==STATUS.pause){

	}
	else if(status==STATUS.end){

	}
}
function getColor(){
	var colorArr = [0,1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F"];
	var str = "#";
	for(var i = 0;i < 6;i++){
		str += colorArr[parseInt(Math.random()*colorArr.length)]+"";
	}
	return str;
}

