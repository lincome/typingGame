this.createjs = this.createjs||{};
(function(){
	var Panel = function(){

	}
	var p = Panel.prototype = new createjs.Container();
	p.Container_initialize = p.initialize;
	p.initialize = function(){
		this.Container_initialize();
	}
	p.init = function (){
		
	}
	p.isFirstVisible = false;
	p.isInit = true;
	p.getVisible = function (value){
		this.visible = true;
		if(value){
			if(this.isFirstVisible){
				this.init();
				isFirstVisible = true;
			}
			pop();
		}
	}
	p.pop = function(){
		var layer = this.parent;
		if(layer.contain(this)){
			this.setChildIndex(this,layer.numChildren-1)
		}
	}
createjs.Panel = Panel;
}());