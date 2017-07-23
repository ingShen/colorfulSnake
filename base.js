function Snake(){
		this.index = 0;
		this.snakeMove = null;
		this.timer = null;
		this.oTa = document.createElement('table');
		this.oTb = document.createElement('tbody');
	}
	Snake.prototype = {
		// 绑定界面基本信息
		bindDOM:function(){
			for(var i=0;i<40;i++){   // m背景行数
				var oTr=document.createElement('tr');
					for(var j=0;j<40;j++){ // m背景列数
						var oTd=document.createElement('td');
						oTd.style.cssText='width:8px; height:8px; padding:0; border: 2p solid #ccc; background: #ccc;';
						oTr.appendChild(oTd);
					}
				this.oTb.appendChild(oTr);
			}
			this.oTa.appendChild(this.oTb);
			this.oTa.style.cssText='margin:20px auto 0; border:10px solid #333; background:#ccc;';
			document.body.appendChild(this.oTa);
 			 this.oTa.cellSpacing = '2';
		},
		// 蛇类
		bindSnake:function(){
			var rows=this.oTb.rows;
			var arr=[]
			litleSnake();
			function litleSnake(){
				var ini=rows.length/2-1;
     			arr = [[ini,ini+1]]
				snakeColor(arr);
			}
			function snakeColor(arr){
				// 设置每次吃完食物后颜色
				var colors = []
				for(var i = 0; i < 6; i++){
					var s = Math.floor(Math.random()*16).toString(16);
					colors.push(s);
				}
				var hex = colors.join().replace(/,/g,'');
				// console.log(hex);
				for(var i=1;i<arr.length;i++){
					// rows[arr[i][0]].cells[arr[i][1]].style.cssText='background: skyblue; border: 2px solid 	skyblue;';
					rows[arr[i-(i-1)][0]].cells[arr[i-(i-1)][1]].style.backgroundColor = "#"+hex+"";
					rows[arr[i-(i-1)][0]].cells[arr[i-(i-1)][1]].style.border = " 2px solid #"+hex+"";

				}
				rows[arr[0][0]].cells[arr[0][1]].style.cssText='background: #eee; border: 2px solid #333;'; // 头部颜色
				}
			var json={
				left  : {key:true,timer:null},
				up    : {key:true,timer:null},
				right : {key:true,timer:null},
				down  : {key:true,timer:null}
			};
			var aDir=[];
			document.onkeydown=function (ev){
				var ev=ev||event;
				for(var i=37;i<41;i++){
					if(ev.keyCode==i && ev.keyCode!=aDir[0]){
						aDir.unshift(ev.keyCode);
						break;
					}
				}
				aDir.length=2;
				if(Math.abs(aDir[0]-aDir[1])==2)return;
					switch(ev.keyCode){
        				case 32:
        	 				 timer ? (function(){clearInterval(timer);timer=null;})() : snakeMove && snakeMove();
        	 				 break;
						case 37:
							if(!json.left.key)return;
							onOff('left');
							fnTimer('left',0,-1);
							break;
						case 38:
							if(!json.up.key)return;
							onOff('up');
							fnTimer('up',-1,0);
							break;
						case 39:
							if(!json.right.key)return;
							onOff('right');
							fnTimer('right',0,1);
							break;
						case 40:
							if(!json.down.key)return;
							onOff('down');
							fnTimer('down',1,0);
							break;
						} //switch
			}; //onkeydown
			function onOff(dir){
				for(var i in json){
					if(i==dir){
						json[i].key=false;
					}else{
						json[i].key=true;
						clearInterval(this.timer);
					}
				}
			}
			function fnTimer(dir,m,n){
     			snakeMove = function(){ fnTimer(dir,m,n) };
				timer=setInterval(function (){
					if(arr[0][0]+m<0||arr[0][1]+n<0||arr[0][0]+m>39||arr[0][1]+n>39){
						clearInterval(timer);
						fail();
						return;
					}
					for(var i=2;i<arr.length;i++){
						if( arr[0][0]+m==arr[i][0] && arr[0][1]+n==arr[i][1] ){
							clearInterval(timer);
							fail();
						}
					}
					arr.unshift([arr[0][0]+m,arr[0][1]+n]);
					if(rows[arr[0][0]].cells[arr[0][1]].style.backgroundColor!='black'){
						snakeTail();
	
					}else{
	
						Snake.bindFood();
					}

				},100);
			}
			function fail(){
				alert('任务失败！');
				window.location.reload();
			}
			function snakeTail(){
				rows[arr[arr.length-1][0]].cells[arr[arr.length-1][1]].style.cssText='background: #ccc; 	border: 2px solid #ccc;'; // 走过痕迹
				arr.pop(arr[arr.length-1]);
				snakeColor(arr);
			}
		},
		// 食物
		bindFood:function(){
			var aTd=this.oTb.getElementsByTagName('td');
			var num=Math.floor(Math.random()*aTd.length+1);
			if(num!=this.index){
		      	this.index = num;
		 		aTd[this.index].style.cssText='border: 2px solid #333; background: black;';
			}else{
				arguments.callee;
			}
		}
	}
var Snake = new Snake();
