//分别代表x, y, 半径，边数，颜色
function Star(x, y, r, n, color) {
	this.loc = new Vector(x, y);
	this.r = r;
	this.n = n;
	// 随机速度
	this.v = new Vector((Math.random() - 0.5) * 0.8, Math.random()*-5 + 1);
	// 重力加速度
	this.g = new Vector(0, Math.random() * 0.2 + 0.1);
	// 角度
	this.angle = Math.random() * 3.14;
	// 角速度
	this.angleV = 0.2;
	this.time = 0;
	this.stars = [];
	this.big = false;
}

Star.prototype = {
	run: function(argument) {
		this.loc.plus(this.v);
		this.v.plus(this.g);
	},
	addChildStar: function(){
		var x, y, r, n, color;
		x = this.loc.x;
		y = this.loc.y;
		r = Math.random() * 4 + 1;
		n = parseInt(Math.random() * 4) + 3;
		color = randoColor();
		var star = new Star(x, y, r, n, color);
		this.stars.push(star);
	},
	update: function(){
		// 如果不是大星星就随着时间增加，半径减少
		// 是大星星，就不停的生成小星星
		if(!this.big) {
			this.time ++;
			if(this.time > 10) this.r -= 0.1;
		}else{
			var stars = this.stars;
			this.addStar();
			
			for(var i = 0 ; i < stars.length ; i ++){
				stars[i].updata();
				stars[i].draw();
				//如果一个小星星死亡，就删掉它
				if(stars[i].die()){
					stars.splice(i, 1);
					i--;
				}
			}
		}
		//更新
		this.run();
	},
	draw: function (argument) {
		var myCanvas = document.getElementById("main");
		var g = myCanvas.getContext("2d");
		var r = this.r;
		var n = this.n;
		var color = this.color;
		var x = this.loc.x;
		var y = this.loc.y;
		
		g.save(); 
		g.beginPath()  
		g.translate(x, y);
		this.angle += this.angleV;
		g.rotate(this.angle);//旋转角度
		g.moveTo(r, 0);
		
		g.fillStyle = color;  
		g.shadowColor= color; ;
		//画星星形状
		for (var i = 0; i < n * 2 - 1; i++){  
			 g.rotate(Math.PI/n);  
			 if(i % 2 === 0){  
				g.lineTo((r / 0.525731) * 0.200811, 0);  
			 }else{  
				g.lineTo(r, 0);  
			 }
		}
		g.closePath();  
		g.fill();
		g.restore(); 
	},
	die:function(){
		//死亡条件
		if(this.r < 1 || this.loc.x > 800 || this.loc.x < 0 || this.loc.y > 600 || this.loc.y < 0) return true;
		else return false;
	},
	drawBall: function(){  
		var myCanvas = document.getElementById("main");
		var g = myCanvas.getContext("2d");
		
		g.fillStyle = this.color;
		g.beginPath();
		g.arc(this.loc.x, this.loc.y, 1, 0, Math.PI*2, true);
		g.closePath();
		g.fill();
	 }
};
//随机颜色，为了是颜色亮点，各增加了100
function randomColor(){
	var r, g, b;
	r = parseInt(Math.random() * 255) + 100;
	g = parseInt(Math.random() * 255) + 100;
	b = parseInt(Math.random() * 255) + 100;	
	return ('rgb('+ r +','+ g + ','+  b +')');
}