"use strict"
function showPlayer(pos,floor){
	$('.player').remove();
	var til=$('#tile'+floor+"_"+pos.y+"_"+pos.x);
	$('#piso'+floor).append('<div id="jugador01" class="player"/>');
	$('#jugador01').css({
		top: til.position().top+"px",
		left: til.position().left+"px",
		'z-index': til.css('z-index')
	});
	$('.tileSelec').show();
	$('#selec'+floor+'_'+pos.y+'_'+pos.x).css('display','none');
	playerFace(Player.face,"c");
};
function showNPC(pos,floor){
	$('.almond').remove();
	var til=$('#tile'+floor+"_"+pos.y+"_"+pos.x);
	$('#piso'+floor).append('<div id="npc01" class="almond"/>');
	$('#npc01').css({
		top: til.position().top+"px",
		left: til.position().left+"px",
		'z-index': til.css('z-index')
	});
	$('#selec'+floor+'_'+pos.y+'_'+pos.x).css('display','none');
};

function clickTile(floor){
	$('.tileSelec').click(function(){
		var lim=eval('floor_'+floor).length;
		$('.tileSelec').hide();
		$('.a_btn').remove();
		var newPos={y:parseInt($(this).attr('ypos')),x:parseInt($(this).attr('xpos'))};
		var newOri=rotatePlayerPos(Player.cam, Player.coord,20);
		var	color=getColor(rotateLevel(eval('floor_'+floor),Player.cam)[newOri.y][newOri.x]);
		/*console.log("click: "+newPos.y+","+newPos.x);
		console.log("from: "+newOri.y+","+newOri.x);
		console.log(color);*/
		var	arr=[];
		arr=rotateLevel(eval('floor_'+floor),Player.cam);
		$('#buttons').fadeOut('fast');
		var route=starRoute(arr, newOri, newPos, color);
		var pep=rotatePlayerPos(Player.cam,newPos,20);
		if(route){
			animatePlayer=setInterval(function(){
				processToMove(route,floor,newPos);
			},animPlayTime);
		}else{
			console.log(route);
		}
		clearWalls(lim,"show");
		//restoreWalls(lim,newOri,floor);
	});
};

var animatePlayer, animPlayTime=250;
var ptm=0;

function playerFace(val,type){
	/*
	S 0
	SW 1
	W 2
	NW 3
	N 4 
	NE 5
	E 6
	SE 7
	*/
	var	px="px",
		y=[1,3,2,0,1,0,2,3],
		x_a=[3,2,2,2,2,3,3,3], //////walking
		x_b=[4,1,1,1,1,4,4,4], //////walking
		x_c=[5,0,0,0,0,5,5,5], //////standing
		x=eval('x_'+type)[val];
	$('#jugador01').css({"background-position" : x*-150+px+" "+y[val]*-300+px});
}
function getDepths(route,f){
	var	a=[];
	//console.log(route.length);
	//a[0]=parseInt($('#tile'+f+"_"+posA.y+"_"+posA.x).css('z-index'));
	//a.push("p: "+parseInt($('#tile'+f+"_"+posA.y+"_"+posA.x).css('z-index')));
	for(var r=0;r<route.length;r++){
		var	uno=parseInt($('#tile'+f+"_"+route[r].y+"_"+route[r].x).css('z-index')),
			dos=uno;
		if(r<route.length-1){
			dos=parseInt($('#tile'+f+"_"+route[r+1].y+"_"+route[r+1].x).css('z-index'));
		}
		if(uno>dos){
			//console.log("u: "+uno);
			a.push(uno);
		}
		if(dos>uno){
			//console.log("d: "+dos);
			a.push(dos);
		}else{
			a.push(uno);
		}
	};
	//console.log(a);
	return a;
}
function processToMove(route,floor,newPos){
	var	mt=$('#tile'+floor+"_"+route[ptm].y+"_"+route[ptm].x),
		mik={y: parseInt(mt.position().top),x: parseInt(mt.position().left)},
		px="px",
		dep=parseInt(mt.css('z-index')),
		lang=eval("floor_"+floor).length;

	var lal=getDepths(route,floor);
	
	$('#jugador01').css({'z-index': dep});	
	$('#jugador01').animate({
		top: mik.y+px,
		left: mik.x+px,
		/*scrollTop: $('#jugador01').offset().top-200,
		scrollLeft: $('#jugador01').offset().left-400*/
	},animPlayTime);
	var kek,face;
	if(ptm==0)	kek=Player.coord;
	if(ptm>0)	kek=route[ptm-1];

	for(var g=0;g<8;g++){
		if(kek.y==route[ptm].y+neighNodes(g).y && kek.x==route[ptm].x+neighNodes(g).x){
			face=g;
			break;
		}
	}
	if(ptm%2==0)	playerFace(face,"a");
	if(ptm%2!=0)	playerFace(face,"b")
	ptm++;
	if(ptm>route.length-1){
		clearInterval(animatePlayer);
		star_resetVars();
		ptm=0;

		//////////update new position///////////////
		switch(Player.cam){
			case 'ori': Player.coord=newPos; break;
			case 'rev': Player.coord=rotatePlayerPos('rot',newPos,lang); break;
			case 'rot': Player.coord=rotatePlayerPos('rev',newPos,lang); break;
			case 'inv': Player.coord=rotatePlayerPos('inv',newPos,lang); break;
			default: break;
		}
		Player.face=face;
		clearWalls(lang,"hide");
		analizeWalls(lang);
		/////////reveal selectors////////////
		$('.tileSelec').show();
		$('#selec'+floor+"_"+newPos.y+"_"+newPos.x).hide();

		var pep=setTimeout(function(){playerFace(face,"c")},animPlayTime,clearInterval(pep));
		$('#buttons').fadeIn('fast');
		//var farbe=getColor(rotateLevel(eval('floor_'+floor),current_dir)[newPos.y][newPos.x]);
		//startPlayer(floor,newPos,farbe);
	};
};
function getNeighTiles(f,pos,lim){
	var a=[];
	for(var g=0;g<=8;g++){
		var	y=neighNodes(g).y+pos.y,
			x=neighNodes(g).x+pos.x;
		if(y>=0 && y<lim || x>=0 && x<lim){
			a.push({y,x});
		}if(g==8){
			a.push(pos);
		}
	}
	return a;
}
function findAction(val){
	//console.log(val);
	var	a=[],
		actions=[
		/////doors
		61,62,63,64,65,66,67,68,
		/////stairs up yellow
		81,82,83,84,101,102,103,104,121,122,123,124,
		/////stairs up red
		261,262,263,264,281,282,283,284,301,302,303,304
	];
	for(var g=0;g<actions.length;g++){
		//console.log(actions[g]);
		if(val==actions[g]){
			//console.log("es gibt ein: "+actions[g]);
			return actions[g];
			//a.push(actions[g]);
		}
	}
	//return a;
}
function analizeWalls(lim){
	var	a=getNeighTiles(Player.floor,Player.coord,lim),
		b=[];
	for(var h=0;h<a.length;h++){
		var action=eval('floor_'+Player.floor)[a[h].y][a[h].x];
		if(findAction(action)!=undefined){
			//console.log(a.length);
			b.push(findAction(action));
		}
	}
	//console.log(b);
	createActionButtons(b);
}
function createActionButtons(arr){
	//showActionBubble();
	var action;
	//console.log(arr.length);
	for(var g=0;g<arr.length;g++){
		if(arr[g]>=61 && arr[g]<=68){////////////enter
			action="enter";
		}
		if(arr[g]>=81 && arr[g]<=124 || arr[g]>=260 && arr[g]<=305){////////////up yellow
			action="one_up";
		}
		//console.log(action);
		$('body').append('<div id="p_btn'+g+'" p_a="'+action+'" class="a_btn"/>');
		var play=$('#jugador01').offset();
		$('#p_btn'+g).css({
			top: play.top+"px",
			left: play.left+(70*g)+"px",
			'z-index': 1000+g
		});
	}
	$('.a_btn').click(function(){
		var g=$(this).attr('p_a');
		console.log(g);
		switch(g){
			case "one_up":
				console.log('up');
				$('#jugador01, .a_btn').remove();
				clearWalls(20,"show");
				Player.floor+=1;
				startFloor(Player.floor,Player.cam)
				startPlayer(Player.floor,Player.coord,getColor(eval('floor_'+Player.floor)[Player.coord.y][Player.coord.x]));
				break;
			default: break;
		}
	});
}
function clearWalls(lim,mode){
	var	a=getNeighTiles(Player.floor,Player.coord,lim),
		farbe=getColor(eval('floor_'+Player.floor)[Player.coord.y][Player.coord.x]);

	for(var h=0;h<a.length;h++){
		var	newCoord=rotatePlayerPos(Player.cam,a[h],lim),
			tile=$('#tile'+Player.floor+"_"+newCoord.y+"_"+newCoord.x),
			lvl=parseInt(tile.attr('level')),
			level=flipTileWall(Player.cam,lvl),
			texture=lvl,
			value=eval('floor_'+Player.floor)[a[h].y][a[h].x];
		if(rotableWalls(getColor(value), value)){
			switch(mode){
				case "hide": 
					texture=level+wallValue(farbe,lvl);
					break;
				case "show":
					texture=lvl+level;
					break;
			}	
			tile.attr('class','txt'+Math.abs(texture)); 
		}
	}
}
function getRanges(color){
	var rangos=[13,24,25,36,61,68,81,120];
	return rangos;
}
function wallValue(farbe,val){
	var p=0, lol=getRanges(), e;
	switch(farbe){
		case "yellow": e=0; break;
		case "red": e=180; break;
		case "blue": e=360; break;
		default: break;
	}
	/*if(val>(lol[0]+e) && val<(lol[1]+e)) p=24;
	if(val>(lol[2]+e) && val<(lol[3]+e)) p=8;
	if(val>(lol[4]+e) && val<(lol[5]+e)) p=20;*/

	if(val>=lol[0]+e && val<=lol[1]+e){
		 if(val%4==0 || val%4==3){
			p=24;
		 }
	}
	if(val>=lol[2]+e && val<=lol[3]+e){
		if(val%4==0 || val%4==3 || val%4==2){
			p=24;
		}

	}
	if(val>=lol[4]+e && val<=lol[5]+e){
		if(val%4==0 || val%4==3){
			p=8;
		}
	}
	if(val>=lol[6]+e && val<=lol[7]+e){
		if(val%4==0 || val%4==3){
			p=20;
		}
	}
	

	return val+p;
	/*if(farbe=="yellow"){
		if(val%4!=1){
			if(val>2 && val<37) p=24;
			if(val>60 && val<69) p=8;
			if(val>80 && val<121) p=20;
		}
	}
////////////rest of color ranges here 
	if(farbe=="red"){
		if(val%4!=1){
			if(val>182 && val<217) p=24;
			if(val>240 && val<249) p=8;
			if(val>261 && val<301) p=20;
		}
	}
////////////////////////////////////////////////
	return val+p;*/
}
function flipTileWall(cam,value){
	var p=0;
	switch(cam){
		case "rot":
			if(value%4==0) p=-3;
			else p=1;
			break;
		case "rev":
			if(value%4==1) p=+3;
			else p=-1;
			break;
		case "inv":
			if(value%4==0) p=-2;
			if(value%4==3) p=-2;
			if(value%4==2) p=+2;
			if(value%4==1) p=+2;
			break;
		case "ori":
			p=0;
			break;
		default: break;
	}
	return parseInt(p);
}

function rotableWalls(farbe,val){
	var e;
	switch(farbe){
		case 'yellow': e=0; break;
		case 'red': e=180; break;
		case 'blue': e=360; break;
		default: return false; break;
	}
	var a=getRanges();
	if(val>(a[0]+e+10) && val<(a[1]+e) || val>(a[2]+e) && val<(a[3]+e) || val>(a[4]+e) && val<(a[5]+e)){
		return true;
	}else{
		return false;
	}
}

function actionValidate(val){
	var actions=[
		61,82, ////sube yellow
		241,269,////sube red
		102,126,/////baja yellow
		246,270,/////baja red
		115,116,/////esc sube yell
		259,260,///esc sube red
		117,118,//esc baja yell
		261,262,////esc baja red
		41,43,48,46,//door yellow
		221,223,228,226, ///door red
		482,487/////elevator

		];
	for(var u=0;u<actions.length;u++){
		if(actions[u]==val){
			return true;
		}
	}
}

function mapButtons(f,pos){
	var	len=eval('floor_'+f).length;
	for(var r=0;r<=8;r++){
		var y,x;
		if(r==8){
			y=pos.y;
			x=pos.x;
			//console.log("current: "+y+","+x);
		}else{
			y=neighNodes(r).y+pos.y,
			x=neighNodes(r).x+pos.x;
			//console.log(r+": "+y+","+x);
		}
		if(y>=0 && y<len && x>=0 && x<len){
			var	tileVal=eval('floor_'+f)[y][x],
				coord={f,y,x},
				obj;
			if(actionValidate(tileVal)){
				/////subir
				if(tileVal==61)				obj={id:"a", t:"u", c:"y"};
				if(tileVal==82)				obj={id:"b", t:"u", c:"y"};
				if(tileVal==241)				obj={id:"a", t:"u", c:"r"};
				if(tileVal==269)				obj={id:"b", t:"u", c:"r"};
				/////bajar
				if(tileVal==102) 				obj={id:"a", t:"d", c:"y"};
				if(tileVal==126) 				obj={id:"b", t:"d", c:"y"};
				if(tileVal==246) 				obj={id:"a", t:"d", c:"r"};
				if(tileVal==270) 				obj={id:"b", t:"d", c:"r"};
				/////door
				if(tileVal==43 || tileVal==223)	obj={id:"a", t:"door", c:'n'};
				if(tileVal==221 || tileVal==41)	obj={id:"b", t:"door", c:'n'};	
				if(tileVal==48 || tileVal==228)	obj={id:"c", t:"door", c:'n'};
				if(tileVal==226 || tileVal==46)	obj={id:"d", t:"door", c:'n'};

				if(tileVal==482 || tileVal==487)	obj={id:"a",t: "e", c:'n'};
				createMapButton(obj,coord,f);
			}
		}
	}
}
function createMapButton(o,c,f){
	var	color, name=c.f+"_"+c.y+"_"+c.x,
		a,b;
	if(o.id=="a" && o.t=="u") a=0, b=0;
	if(o.id=="b" && o.t=="u") a=-150, b=0;
	if(o.id=="a" && o.t=="d") a=-300, b=0;
	if(o.id=="b" && o.t=="d") a=-450, b=0;

	if(o.id=="a" && o.t=="door") a=-600, b=0;
	if(o.id=="c" && o.t=="door") a=-750, b=0;
	if(o.id=="b" && o.t=="door") a=-900, b=0;
	if(o.id=="d" && o.t=="door") a=-1050, b=0;

	if(o.id=="a" && o.t=="e") a=-600, b=0;
	if(o.id=="b" && o.t=="e") a=-750, b=0;
	//console.log(o.id);
	switch(o.c){
		case "y":
			color="yellow"; 
			break;
		case "r": 
			color='red';
			break;
		default: break;
	}
	$('body').append('<div class="mapObj" id="m_o'+name+'" y="'+c.y+'" x="'+c.x+'" ident="'+c.id+'"/>');
	$('#m_o'+name).css({
		'top': $('#tile'+name).offset().top+"px",
		'left': $('#tile'+name).offset().left+"px",
		'background-position': a+"px "+b+"px"
	});
	$('.mapObj').hover(function(){
		$(this).css({
			'background-position':a+"px 300px"
		});
	},function(){
		$(this).css({
			'background-position':a+"px 0px"
		});
	})
	$('.mapObj').bind('click', function(){
		$('.tileSelec').remove();
		var	w=-150, h=-300, px="px";
		var	v=0, s=0;
		switch(o.t){
			case "u": 
				o.id=="a" ? v=-1 : s=-1;
				var stair_path=[];
				for(var h=0;h<7;h++){
					stair_path.push({y:posA.y+v*h,x:posA.x+s*h});
				}
				posA.y+=v*6;
				posA.x+=s*6;
				var cos=0;
				animatePlayer=setInterval(function(){
					var kek=$('#tile'+c.f+"_"+stair_path[cos].y+"_"+stair_path[cos].x);
					var yup=0, yap=0;
					if(o.id!="b") yap=-300;
					if(cos%2==0) yup=-150;
					$('#jugador01').css({
						'background': 'url("img/player_stair.png") '+yup+'px '+yap+'px',
						'z-index': parseInt(kek.css('z-index'))+10
					});
					$('#jugador01').animate({
						top: kek.position().top-(cos*30)+px,
						left: kek.position().left+px
					},animPlayTime);
					cos++;
					if(cos>6){
						clearInterval(animatePlayer);
						startFloor(c.f+1,current_dir);
						startPlayer(f+1,posA,color);
						rotateFloorButton(f+1);
					}
					
				},animPlayTime);
				break;
			case "d": 
				hideFloor(c.f);
				o.id=="a" ? v=6 : s=6;
				/*posA.y=parseInt($(this).attr('y'))+v;
				posA.x=parseInt($(this).attr('x'))+s;*/
				posA.y+=s;
				posA.x+=v;
				startFloor(c.f-1,current_dir);
				startPlayer(f-1,posA,color);
				rotateFloorButton(f-1);
				break;
			case 'door':
				var corA,corB;
				corA=getColor(eval('floor_'+f)[posA.y][posA.x]);
				switch(o.id){
					case "a":
						s=-1
						break;
					case "b":
						s=1
						break;
					case "c":
						v=-1;
						break;
					case "d":
						v=1;
						break;
					default: break;
				}
				corB=getColor(eval('floor_'+f)[posA.y+v][posA.x+s]);
				if(corA==corB){
					s*=-1;
					v*=-1;
				}
				posA.y+=v;
				posA.x+=s;

				corB=getColor(eval('floor_'+f)[posA.y][posA.x]);
				$('#selection *').remove();
				createSelectors(c.f,eval('floor_'+c.f).length,corB);
				showPlayer(posA,c.f);
				clickTile(c.f);
				break;
			case "e":
				posA.y=parseInt($(this).attr('y'));
				posA.x=parseInt($(this).attr('x'))+1;
				openPanel(f,9);
				$('#jugador01').css({"background-position" : 0+px+" "+0+px});
				break;
			default: break;
		}
		$('.mapObj').remove();
	})
}
function openPanel(f,tot){
	$('body').append('<div id="userPanel"/>');
	for(var g=0;g<tot;g++){
		$('#userPanel').append('<div class="panelButton" level="'+(g+1)+'">'+(g+1)+'</div>');
	}
	/*$('#userPanel').css({
		top: $('#jugador01').offset().top+"px",
		left: $('#jugador01').offset().left+"px"
	});*/
	$('.panelButton').bind('click',function(){
		console.log(f);
		var level=parseInt($(this).attr('level'));
		if(level<f){
			for(var x=1;x<=4;x++){
				$('#piso'+x).hide();
			}
		}
		//console.log(getColor(eval('floor_'+f)[posA.y][posA.x]));
		startFloor(level, 'yellow');
		$('#userPanel').remove();
	});
}