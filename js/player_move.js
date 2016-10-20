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
	$('#selec'+floor+'_'+pos.y+'_'+pos.x).css('display','none');
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

var 	posA={y:6,x:14},
	posB={y:"",x:""};
var 	npcA={y:7, x:12};

function clickTile(floor){
	$('.tileSelec').click(function(){
		$('.tileSelec').hide();
		$('.mapObj').remove();
		restoreWall(floor,posA);
		posB={y:parseInt($(this).attr('ypos')),x:parseInt($(this).attr('xpos'))};
		var color=getColor(eval('floor_'+floor)[posA.y][posA.x]);

		var	player_route=starRoute(rotateLevel(eval('floor_'+floor),current_dir),posA,posB,color);
		//var	player_route=starRoute(rotateLevel(floor_2,"rot"),posA,posB,color);
		//console.log(getDepths(player_route,floor));
		animatePlayer=setInterval(function(){
			processToMove(player_route,floor);
		},animPlayTime);
	});
};

var animatePlayer, animPlayTime=100;
var ptm=0;

function playerFace(val,type){
	var	x, px="px",
		y=[1,3,2,0,1,0,2,3],
		w=-150, h=-300;
	px="px";
	if(type=="a"){
		switch(val){
			case 0: x=3; break;//S
			case 1: x=2; break;//SW
			case 2: x=2; break;//W
			case 3: x=2; break;//NW
			case 4: x=2; break;//N
			case 5: x=3; break;//NE
			case 6: x=3; break;//E
			case 7: x=3;  break;//SE
			default: break;
		}
	}if(type=="b"){
		switch(val){
			case 0: x=4; break;//S
			case 1: x=1; break;//SW
			case 2: x=1; break;//W
			case 3: x=1; break;//NW
			case 4: x=1; break;//N
			case 5: x=4; break;//NE
			case 6: x=4; break;//E
			case 7: x=4; break;//SE
			default: break;
		}
	}if(type=="c"){
		switch(val){
			case 0: x=5;break;//S
			case 1: x=0;break;//SW
			case 2: x=0;break;//W
			case 3: x=0;break;//NW
			case 4: x=0;break;//N
			case 5: x=5;break;//NE
			case 6: x=5; break;//E
			case 7: x=5;break;//SE
			default: break;
		}
	}
	$('#jugador01').css({"background-position" : x*w+px+" "+y[val]*h+px});
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
function processToMove(route,floor){
	var	mt=$('#tile'+floor+"_"+route[ptm].y+"_"+route[ptm].x),
		mik={y: parseInt(mt.position().top),x: parseInt(mt.position().left)},
		px="px",
		dep=parseInt(mt.css('z-index'));
	//console.log(getDepths(route,floor));
	//console.log($('#tile'+floor+"_"+posA.y+"_"+posA.x).css('z-index'));
	//console.log(route.length);
	//console.log(getDepths(route,floor));
	//$('#jugador01').css({'z-index':dep+1});
	var lal=getDepths(route,floor);
	$('#jugador01').css({'z-index': lal[ptm]});	
	
	$('#jugador01').animate({
		top: mik.y+px,
		left: mik.x+px,

		scrollTop: $('#jugador01').offset().top-200,
		scrollLeft: $('#jugador01').offset().left-400
	},animPlayTime);
	var kek,face;
	if(ptm==0)	kek=posA;
	if(ptm>0)	kek=route[ptm-1];

	for(var g=0;g<8;g++){
		if(kek.y==route[ptm].y+neighNodes(g).y && kek.x==route[ptm].x+neighNodes(g).x){
			face=g;
			break;
		}
	}
	var w=-150, h=-300;
	if(ptm%2==0)	playerFace(face,"a");
	if(ptm%2!=0)	playerFace(face,"b")
	ptm++;

	if(ptm>route.length-1){
	
		clearInterval(animatePlayer);
		star_openNodes.length=0;
		star_closedNodes.length=0;
		star_nodesLoop=0;
		ptm=0;

		//////////update new position///////////////
		posA.y=posB.y;
		posA.x=posB.x;
		posB.y="";
		//playerFace(face,"c");
		posB.x="";	

		$('.tileSelec').show();
		$('#selec'+floor+"_"+posA.y+"_"+posA.x).hide();
		hideCurrentWall(floor,posA,'one');
		//mapButtons(floor,posA);
		var pep=setTimeout(function(){playerFace(face,"c")},animPlayTime);
	};
};


function actionValidate(val){
	var actions=[
		97,125, ////sube yellow
		241,269,////sube red
		102,126,/////baja yellow
		246,270,/////baja red
		115,116,/////esc sube yell
		259,260,///esc sube red
		117,118,//esc baja yell
		261,262,////esc baja red
		17,20,21,24,//door yellow
		161,164,165,168, ///door red
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
				if(tileVal==97)				obj={id:"a", t:"u", c:"y"};
				if(tileVal==125)				obj={id:"b", t:"u", c:"y"};
				if(tileVal==241)				obj={id:"a", t:"u", c:"r"};
				if(tileVal==269)				obj={id:"b", t:"u", c:"r"};
				/////bajar
				if(tileVal==102) 				obj={id:"a", t:"d", c:"y"};
				if(tileVal==126) 				obj={id:"b", t:"d", c:"y"};
				if(tileVal==246) 				obj={id:"a", t:"d", c:"r"};
				if(tileVal==270) 				obj={id:"b", t:"d", c:"r"};
				/////door
				if(tileVal==20 || tileVal==164)	obj={id:"a", t:"door", c:'n'};
				if(tileVal==161 || tileVal==17)	obj={id:"b", t:"door", c:'n'};	
				if(tileVal==21 || tileVal==165)	obj={id:"c", t:"door", c:'n'};
				if(tileVal==168 || tileVal==24)	obj={id:"d", t:"door", c:'n'};

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
						startFloor(c.f+1,color);
					}
					
				},animPlayTime);
				break;
			case "d": 
				hideFloor(c.f);
				o.id=="a" ? v=6 : s=6;
				/*posA.y=parseInt($(this).attr('y'))+v;
				posA.x=parseInt($(this).attr('x'))+s;*/
				posA.y+=v;
				posA.x+=s;
				startFloor(c.f-1,color);
				$('#jugador01').css({"background-position" : 5*w+px+" "+3*h+px});
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