this.createjs = this.createjs||{};
(function(){
var Button = function(text){
	this.initialize(text);
	this.width = 60;
	this.height = 35;
}
var p = Button.prototype = new createjs.Container();
p.Container_initialize = p.initialize;
var upSkin = new createjs.Shape();
var overSkin = new createjs.Shape();
var label = new createjs.Text("label", "12px Arial", "#777");
var baseY,baseX;
p.initialize = function(text){
	this.Container_initialize();
	this.addChild(upSkin);
	this.addChild(overSkin);
	this.addChild(label);
	label.text = text;
	upSkin.graphics.beginFill("rgb(248, 244, 232)").drawRoundRect(0,0, 60, 30, 5);
	overSkin.graphics.beginFill("rgb(252, 242, 212)").drawRoundRect(0,0, 60, 30, 5);
	overSkin.visible = false;
	this.onMouseOver =this.overHandler;
	this.onMouseOut = this.outHandler;
	label.y = 10;
	label.x = 5;
}

p.overHandler = function (){
	upSkin.visible = false;
	overSkin.visible = true;
	this.x += 1;
	this.y += 1;
}
p.outHandler = function (){
	upSkin.visible = true;
	overSkin.visible = false;
	this.x -=1;
	this.y -=1;
}
createjs.Button = Button;
}());