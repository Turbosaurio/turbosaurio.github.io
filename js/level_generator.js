'use strict'

function rotateArr(arr){
	var	tall=arr.length*2-1,
		iso=[],a,b,c=0;
	for(var k=0, m=tall; k<tall, m>0; k++,m--){
		var	y=k, x=0, u=k;
		if(k>arr.length-1){
			y=arr.length-1;
			x=k-arr.length+1;
			u=m-1;
		}
		iso.push([[y,x]]);
		a=iso[k][0][0];
		b=iso[k][0][1];
		for(var g=0;g<u;g++){
			a--;
			b++;
			iso[k].push([a,b]);
			c++;
		}
	}
	return iso;
}

function c_x(long,wid){
	var arr=[], p=0;
	for(var i=1;i<long*2;i++){
		var qui=0;
		var mex,max=long;
		i>long ? mex=max-i%long : mex=i;
		for(var h=1;h<mex;h++){
			mex/2!=Math.round(mex/2) ? qui++ : qui=h%mex;
			arr.push([qui+h-mex]*wid);
			p++;
		};
	};
	return arr;
}
function addEmptyArr(tot){
	var e=[];
	for(var h=0; h<tot; h++){
		e.push("u");
	}
	return e;
}

function rotateLevel(arr, dir){
	var a=[];
	for(var h=0, j=arr.length-1; h<arr.length, j>=0; h++, j--){
		a[h]=addEmptyArr(arr.length);
		for(var n=0, m=arr.length-1; n<arr.length, m>=0; n++, m--){
			switch(dir){
				case 'ori':
					a[h][n]=arr[h][n];
					break;
				case "rot":
					a[h][n]=arr[m][h];
					break;
				case "rev":
					a[h][n]=arr[n][j];
					break;
				case "inv":
					a[h][n]=arr[j][m];
					break;
				default: break;
			}
		}
	}
	return a;
}

function rotatePlayerPos(hand,pos,len){
	var a=[];
	for(var h=0;h<len;h++) a[h]=addEmptyArr(len);
	a[pos.y][pos.x]="hier";
	var b=rotateLevel(a,hand);
	for(var y=0;y<len;y++){
		for(var x=0;x<len;x++){
			if(b[y][x]=="hier"){
				return {y,x};
			}
		}
	}
}

function createLevel(arr,tar,clase,height,width,tileName,f,typ){
	var	kak=rotateArr(arr),
		kek=rotateLevel(arr,typ),
		kok=c_x(arr.length+1,width), xpos=0;
	for(var h=0;h<kak.length;h++){
		for(var p=0;p<kak[h].length;p++){
			var	y=kak[h][p][0],
				x=kak[h][p][1],
				tile=kek[y][x];
			if(tile>12 && tile<37 || tile>192 && tile<217){
				tile+=24;
			}

			$('#'+tar).append('<tile id="'+tileName+f+"_"+y+"_"+x+'" class="'+clase+tile+'" level="'+tile+'" fpos="'+1+'" ypos="'+y+'" xpos="'+x+'"></tile>');			
			$('#'+tileName+f+"_"+y+"_"+x).css({
				top: h*height+"px",	
				left: kok[xpos]+"px",
				'z-index': xpos-1000
			});
			xpos++;
		}
	}
	pisos[f]="open";
}
function enterInstance(color){
	
}
function instanceColor(val,color){
	switch(color){
		case 'yellow': 
			if(val==2 || val>4 && val<61){
				return true;
			}break; 

		case 'red': 	
			if(val==182 || val>184 && val<361){
				return true;
			}break;
		case 'green':
			if(val==445 || val==446){
				return true;
			}break;
		case 'blue':
			if(val==290 || val>299 && val<361){
				return true;
			}break;
		case 'street':
			if(val>540 && val<581 || val==601 || val==602){
				return true;
			}break;
		case 'storage':
			if(val>640 && val<661 || val >684 && val<701 || val==718){
				return true;
			}break;
		default: break;
	}
}
function getColor(val){
	if(val==2 || val>4 && val<61) return 'yellow';
	if(val==182 || val>184 && val<361) return 'red';
	if(val==445 || val==446) return 'green';
	if(val==290 || val>199 && val<361) return 'blue';
	if(val>540 && val<581 || val==601 || val==602) return 'street';
	if(val>640 && val<661 || val >684 && val<701 || val==718) return 'storage';
}
function createSelectors(f,leng,color){
	$('#selection *').remove();
	var selection=$('#selection');
	for(var j=0;j<leng;j++){
		for(var k=0;k<leng;k++){
			var	sap=$('#tile'+f+'_'+j+"_"+k),
				name='selec'+f+'_'+j+"_"+k,
				kak=sap.attr('level');
			if(instanceColor(kak,color)){
				selection.append('<div class="tileSelec" id="'+name+'" ypos="'+j+'" xpos="'+k+'">'+j+","+k+'</div>');
				//selection.append('<div class="tileSelec" id="'+name+'" ypos="'+j+'" xpos="'+k+'"></div>');
				$('#selec'+f+"_"+Player.y+"_"+Player.x).hide();
				$('#'+name).css({
					top: sap.offset().top+226+"px",
					left: sap.offset().left+35+"px"
				});
			};				
		};
	};
};


function focusWalls(f,t){
	var arr=eval('floor_'+f);
	for(var a=0; a<arr.length; a++){
		for( var b=0; b<arr[a].length; b++){
			switch(t){
				case "cover":
					if(arr[a][b]>51 && arr[a][b]<61 || arr[a][b]>66 && arr[a][b]<73 || arr[a][b]>195 && arr[a][b]<205 || arr[a][b]>210 && arr[a][b]<217){
						$('#tile'+f+"_"+a+"_"+b).attr({class: 'txt'+parseInt($('#tile'+f+"_"+a+"_"+b).attr('level')-24)});
					}
					break;
				case 'show':
					if(arr[a][b]>24 && arr[a][b]<73 || arr[a][b]>168 && arr[a][b]<217){
						$('#tile'+f+"_"+a+"_"+b).attr({class: 'txt'+$('#tile'+f+"_"+a+"_"+b).attr('level')});
					}
					break;
				default: break;
			}
		}
	}
}
function hideCurrentWall(floor,coord,mode){
	switch(mode){
		case 'all':
			for(var h=0;h<8;h++){
				var	y=neighNodes(h).y+coord.y,
					x=neighNodes(h).y+coord.x,
					f=eval('floor_'+floor);
				if(y>=0 && y<f.length && x>=0 && x<f.length){
					var	lol=f[y][x],
						tile=$('#tile'+floor+"_"+y+"_"+x);
					if(	////walls
						lol>12 && lol<37 && lol%4==3 || lol%4==0 ||////////yellow
						lol>171 && lol<181 || lol>186 && lol<193///////red
						){
						console.log(tile);
						tile.attr({class:(parseInt(tile.attr('level'))+24)})
					}
					if(
						///doors
						lol>40 && lol<49 || ///yellow
						lol>220 && lol<229 ////red
						){
						tile.attr({class: 'txt'+(parseInt(tile.attr('level'))+8)});
					}
				}
			}
			break;
		case 'one':
			var	lol=eval('floor_'+floor)[coord.y][coord.x],
				tile=$('#tile'+floor+"_"+coord.y+"_"+coord.x);
			if(
				////walls
				lol>12 && lol<37 && lol%4==3 || lol%4==0 ||////////yellow
				lol>171 && lol<181 || lol>198 && lol<204///////red
				){
				tile.attr({class: 'txt2'});
				//tile.css({opacity:.75});
			}if(
				///doors
				lol>40 && lol<49 || ///yellow
				lol>220 && lol<229 ////red
				){
				tile.attr({class: 'txt'+(parseInt(tile.attr('level'))+8)});
			}
			break;
		default: break;
	}
}
function restoreWall(floor,coord){
	$('#tile'+floor+"_"+coord.y+"_"+coord.x).attr('class','txt'+$('#tile'+floor+"_"+coord.y+"_"+coord.x).attr('level'));
	//$('#tile'+floor+"_"+coord.y+"_"+coord.x).css({opacity:1});
}
function hideFloor(f){
	$('#piso'+f).hide();
}
var pisos=[];
pisos[0]="";
for(var ch=0;ch<=9;ch++){
	pisos[ch]="closed";
}
var	t_w=34,
	t_h=74;

function startFloor(f,typ){
	var arr=eval('floor_'+f);
	$('#piso'+f+' *').remove();
	createLevel(arr,'piso'+f,"txt",t_w,t_h,'tile',f,typ);
	/*$('html, body').animate({
		scrollTop: $('#jugador01').offset().top-200,
		scrollLeft: $('#jugador01').offset().left-300
	},animPlayTime);*/
};

function startPlayer(f,pos,color){
	var	arr=eval('floor_'+f);
	createSelectors(f,eval('floor_'+f).length,color);
	showPlayer(pos,f);
	clickTile(f);
};
function playerAttr(y,x,face,cam,floor){
	this.face=face;
	this.cam=cam;
	this.floor=floor;
	this.coord={y,x};
	this.set_y=function(e){this.coord.y=e};
	this.set_x=function(e){this.coord.x=e};
}
var Player=new playerAttr(15,10,1,'ori',1);

$(document).ready(function(){
	assignStyles();
	for(var r=0, u=pisos.length;r<=pisos.length, u>=0;r++, u--){
		$('body').append('<div class="floor" id="piso'+r+'"/>');
		$('#piso'+r).css({
			top: u*225+"px"
		});
		
	}
	$('body').append('<div id="selection"/>');
	for(var kok=0; kok<Player.floor; kok++){
		startFloor(kok,Player.cam);
	}
	startFloor(Player.floor,Player.cam);
	startPlayer(Player.floor,Player.coord,getColor(eval('floor_'+Player.floor)[Player.coord.y][Player.coord.x]));
	rotateFloorButton(Player.floor);
});

function rotateFloorButton(f){
	$('#buttons').css('z-index', 1000);
	$('.button_dev').click(function(){
		rotateFloorAction(f,$(this).attr('id'),Player.coord,Player.cam);
	});
}
function rotateFloorAction(f,wo,position,c_d){
	var to_cam, face=Player.face;
	switch(wo){
		case "rotateCW":
			switch(c_d){
				case 'ori': to_cam="rot"; break;
				case 'rot': to_cam="inv"; break;
				case 'inv': to_cam="rev"; break;
				case 'rev': to_cam="ori"; break;
				default: break
			}face>=6 ? face-=6 : face+=2;
			break;
		case "rotateCCW":
			switch(c_d){
				case 'ori': to_cam='rev'; break;
				case 'rev': to_cam='inv'; break;
				case 'inv': to_cam='rot'; break;
				case 'rot': to_cam='ori'; break;
				default: break;
			}face<=1 ? face+=6 : face-=2;
			break;
		default: break;
	}
	Player.cam=to_cam;
	$('#piso'+f+' *').remove();
	flipFloors(f,to_cam);
	flipPlayer(f,Player,to_cam,face);
}
function flipFloors(f,cam){
	if(f>0){
		for(var r=0;r<f;r++){
			startFloor(r,cam);
			flipClass(rotateLevel(eval('floor_'+r),cam),r,cam);
		}
	}
	startFloor(f,cam);
	flipClass(rotateLevel(eval('floor_'+f),cam),f,cam);
}
function flipPlayer(f,play,cam,face){
	var	newPos=rotatePlayerPos(cam,{y:play.coord.y, x:play.coord.x},eval('floor_'+f).length),
		farbe=getColor(rotateLevel(eval('floor_'+f),cam)[newPos.y][newPos.x]);
	Player.face=face;
	startPlayer(f,newPos,farbe);
}
function update_player(p,attr){
	p=new playerAttr(attr.y,attr.x,attr.face,"jugador01",attr.floor);
}
function flipClass(arr,f,typ){
	for(var g=0; g<arr.length; g++){
		for(var i=0;i<arr[0].length; i++){
			var t=arr[g][i];
			if(
			t>4 && t<177 || t>185 && t<353 || t>360 && t<425 || 
			t>540 && t<581 || t>640 && t<717 ||
			t>724 && t<797 || t>824 && t<885
			){////yellow
				var p;
				switch(typ){
					case "rot":
						if(arr[g][i]%4==0) p=-3;
						else p=1;
						break;
					case "rev":
						if(arr[g][i]%4==1) p=+3;
						else p=-1;
						break;
					case "inv":
						if(arr[g][i]%4==0) p=-2;
						if(arr[g][i]%4==3) p=-2;
						if(arr[g][i]%4==2) p=+2;
						if(arr[g][i]%4==1) p=+2;
						break;
					case "ori":
						p=0;
						break;
					default: break;
				}
				var tile=$('#tile'+f+"_"+g+"_"+i);
				tile.attr({class: "txt"+(parseInt(tile.attr('level'))+p)});
			}
		}
	}
}