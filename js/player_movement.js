function parseWithoutTxt(strA,strB){//////////////REMOVE SUFFIX OF STRING
	var	kek=strA.search(strB),
		kok=strA.substring(0,kek);
	return parseInt(kok);
};


function createSelectors(floor){
	var selection=$('#selection');
	//selection.css('top',($('floor0'+floor).css('top')));
	for(var j=0;j<=9;j++){
		for(var k=0;k<=9;k++){
			var	sap=$('#bloque'+floor+'_'+j+"_"+k),
				name='selector'+floor+'_'+j+"_"+k,
				kak=sap.attr('level');
			if(
				///////////////>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>walkable
				kak>=7 && kak<=15 || kak>=25 && kak<=96 || kak>=241 && kak<=288
				///////////////>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>walkable
				){
				selection.append('<div class="selectionDiv" id="'+name+'"/>');
				var	huh=parseWithoutTxt(sap.css('top'),px),
					hah=parseWithoutTxt(sap.css('left'),px);

				var	w=moduleWidth,
					h=moduleHeight,
					t=huh+235,
					l=hah+45;

				$('#'+name).css({
					"width":w+px,
					"height":h+px,
					"top": t+px,
					'left': l+px
				});
			};
		};
	};
};
function deleteSelectors(){
	$('#selection *').remove();
}
function hideSelectors(){
	$('.selectionDiv').css('display','none');
}
function showSelectors(){
	$('.selectionDiv').css('display','block');
	$('#selector'+currentFloor+'_'+posA.y+'_'+posA.x).css('display','none');////////hide current player position selector
}
function getPosition(a,b,f){
	var	nak=$('#bloque'+f+"_"+a+"_"+b),
		nek=parseWithoutTxt(nak.css('top'),px),
		nik=parseWithoutTxt(nak.css('left'),px);
	return {y:parseInt(nek)+7,x:parseInt(nik)+6};
};

var 	posA={y:0,x:7},
	posB={y:"",x:""};

function clickTile(){
	$('.selectionDiv').click(function(){
		var	bat="selectorX",
			bet=$(this).attr('id'),
			bit=bet.substring(bat.length,bat.length+4),
			bot=bit.substring(1,2),
			but=bit.substring(3,4);
		
		posB={y:parseInt(bot),x:parseInt(but)};
		hideSelectors();
		resetBubble();
		var player_route=starRoute(eval('zone'+currentFloor),posA,posB);
		animatePlayer=setInterval(function(){
			processToMove(player_route);
		},animPlayTime);
	});
};

var animatePlayer, animPlayTime=150;
var ptm=0;


function processToMove(route){
	var	mik=getPosition(route[ptm].y,route[ptm].x,currentFloor),
		dep=parseInt($('#bloque'+currentFloor+"_"+route[ptm].y+"_"+route[ptm].x).css('z-index'));
	$('#jugador01').css({'z-index':dep+1});	
	$('#jugador01').css({'top': mik.y+px,'left': mik.x+px});
	//$('#jugador01').css({})
	//console.log(dep);
	//console.log($('#jugador01').css('z-index'));
	var kek,face;
	if(ptm==0)	kek=posA;
	if(ptm>0)	kek=route[ptm-1];

	for(var g=0;g<8;g++){
		if(kek.y==route[ptm].y+neighNodes(g).y && kek.x==route[ptm].x+neighNodes(g).x){
			face=g;
			break;
		}
	}
	//console.log(face);
	var w=-150, h=-300;
	if(ptm%2==0){
		//console.log("pap");
		switch(face){
			case 0: $('#jugador01').css({"background-position" : 3*w+px+" "+h+px}); break; //S
			case 1: $('#jugador01').css({"background-position" : 2*w+px+" "+3*h+px}); break; //SW
			case 2: $('#jugador01').css({"background-position" : 2*w+px+" "+2*h+px}); break; //W
			case 3: $('#jugador01').css({"background-position" : 2*w+px+" "+0+px}); break; //NW
			case 4: $('#jugador01').css({"background-position" : 2*w+px+" "+h+px}); break; //N
			case 5: $('#jugador01').css({"background-position" : 3*w+px+" "+0+px}); break; //NE
			case 6: $('#jugador01').css({"background-position" : 3*w+px+" "+2*h+px}); break; //E
			case 7: $('#jugador01').css({"background-position" : 3*w+px+" "+3*h+px}); break; //SE
			default: break;
		}
	}
	if(ptm%2!=0){
		//console.log("pop");
		switch(face){
			case 0: $('#jugador01').css({"background-position" : 4*w+px+" "+h+px}); break; //S
			case 1: $('#jugador01').css({"background-position" : w+px+" "+3*h+px}); break; //SW
			case 2: $('#jugador01').css({"background-position" : w+px+" "+2*h+px}); break; //W
			case 3: $('#jugador01').css({"background-position" : w+px+" "+0+px}); break; //NW
			case 4: $('#jugador01').css({"background-position" : w+px+" "+h+px}); break; //N
			case 5: $('#jugador01').css({"background-position" : 4*w+px+" "+0+px}); break; //NE
			case 6: $('#jugador01').css({"background-position" : 4*w+px+" "+2*h+px}); break; //E
			case 7: $('#jugador01').css({"background-position" : 4*w+px+" "+3*h+px}); break; //SE
			default: break;
		}
	}
	ptm++;

	if(ptm>route.length-1){
		switch(face){
			case 0: $('#jugador01').css({"background-position" : 5*w+px+" "+h+px}); break; //S
			case 1: $('#jugador01').css({"background-position" : 0+px+" "+3*h+px}); break; //SW
			case 2: $('#jugador01').css({"background-position" : 0+px+" "+2*h+px}); break; //W
			case 3: $('#jugador01').css({"background-position" : 0+px+" "+0+px}); break; //NW
			case 4: $('#jugador01').css({"background-position" : 0+px+" "+h+px}); break; //N
			case 5: $('#jugador01').css({"background-position" : 5*w+px+" "+0+px}); break; //NE
			case 6: $('#jugador01').css({"background-position" : 5*w+px+" "+2*h+px}); break; //E
			case 7: $('#jugador01').css({"background-position" : 5*w+px+" "+3*h+px}); break; //SE
			default: break;
		}
		
		clearInterval(animatePlayer);
		star_openNodes.length=0;
		star_closedNodes.length=0;
		star_nodesLoop=0;
		ptm=0;

		//////////updae new position///////////////
		posA.y=posB.y;
		posA.x=posB.x;
		posB.y="";
		posB.x="";
		//console.log(posA);
		//console.log(posB);

		showSelectors();
		displayBubble(scanDestinationTile(posA,currentFloor));
		
	};
};
var jugW=150,jugH=300;


function showPlayer(a,f){
	var lal=getPosition(a.y,a.x,f);
	$('#floor1').append('<div id="jugador01" class="player"/>');
	$('#jugador01').css({
		'display':'none',
		'height':300+px,
		'width':150+px,
		'top':lal.y+px,
		'left':lal.x+px
	});
	$('#jugador01').fadeIn('fast');
	$('#selector'+f+'_'+a.y+'_'+a.x).css('display','none');
};
var	p_actions=[];
	/////////////////////////t_action 		tile 	texture
	p_actions[0]=	['i_op',		00,	0,0];
	p_actions[1]=	["o_pick",		00,	0,1];
	p_actions[2]=	["o_give",		00,	0,2];
	//p_actions[3]=	["o_drop",		00,	0,3];

	p_actions[3]=	["m_push",		219,	0,4];
	p_actions[4]=	["m_push",		220,	0,4];
	p_actions[5]=	["m_push",		221,	0,4];
	p_actions[6]=	["m_push",		225,	0,4];
	p_actions[7]=	["m_push",		226,	0,4];
	p_actions[8]=	["m_push",		227,	0,4];

	/*p_actions[5]=	["b_look",		00,	1,0];
	p_actions[6]=	["b_read",		00,	1,1];	
	p_actions[7]=	["b_lock",		00,	2,0];
	p_actions[8]=	["b_unlo",		00,	2,1];*/
 
	//////////stairs up & down
	p_actions[9]=	["m_sup",		97,	3,0];
	p_actions[10]=	["m_sup",		103,	3,0];
	p_actions[11]=	["m_sup",		109,	3,0];
	p_actions[12]=	["m_sup",		115,	3,0];
	p_actions[13]=	["m_sup",		125,	3,0];
	p_actions[14]=	["m_sup",		131,	3,0];
	p_actions[15]=	["m_sup",		137,	3,0];
	p_actions[16]=	["m_sup",		143,	3,0];

	p_actions[17]=	["m_sdo",		101,	3,1];
	p_actions[18]=	["m_sdo",		107,	3,1];
	p_actions[19]=	["m_sdo",		113,	3,1];
	p_actions[20]=	["m_sdo",		119,	3,1];
	p_actions[21]=	["m_sdo",		121,	3,1];
	p_actions[22]=	["m_sdo",		127,	3,1];
	p_actions[23]=	["m_sdo",		133,	3,1];
	p_actions[24]=	["m_sdo",		139,	3,1];

	p_actions[25]=	["m_cup",		00,	3,2];
	p_actions[26]=	["m_sdo",		00,	3,3];
	p_actions[27]=	["m_ent",		00,	4,0];
	p_actions[28]=	["m_exi",		00,	4,1];

var	exp_act=[];
	exp_act[0]=p_actions[0];
	exp_act[1]=p_actions[9];
	exp_act[2]=p_actions[10];
	exp_act[3]=p_actions[6];

function scanDestinationTile(pos,f){
	var	arr=[];
	for(var s=0;s<8;s++){
		var	uno=parseInt(pos.y)+parseInt(neighNodes(s).y),
			dos=parseInt(pos.x)+parseInt(neighNodes(s).x),
			zone=eval('zone'+f);
		try{
			if(zone[uno][dos]!=undefined){
				if(f>1){
					if(zone[uno][dos]==0 || zone[uno][dos]==97 || zone[uno][dos]==126 || zone[uno][dos]==144){
						arr.push(eval('zone'+(f-1)[uno][dos]))
					}
				}
			}
		}catch(err){};
	};
	var	newArr=analizeNeighbourTiles(arr);
	newArr.push(p_actions[9],p_actions[17]); //////add open inventory action
	//console.log(arr);
	return newArr;
};
function analizeNeighbourTiles(arr){
	var	a=[];
	for(var u=0;u<arr.length;u++){
		for(var v=0;v<p_actions.length;v++){
			if (arr[u]==p_actions[v][1]){
				a.push(p_actions[v]);
			}
		};
	};
	return a;
};
function displayBubble(bubbleArr){
	$('.actionButton').hide();
	var	pepe=$('#actionsBubble'),
		papa=getPosition(posA.y,posA.x,currentFloor);

	pepe.fadeIn('fast');
	pepe.css({
		'top':papa.y+25+px,
		'left':papa.x+45+px,
		'width':bubbleArr.length*60+60+5+px
	});
	for(var p=0;p<bubbleArr.length;p++){
		var	buttonName='bubbleButton'+p;
		var	a=bubbleArr[p][2]*60,	//////////////////////action button width and heigth
			b=bubbleArr[p][3]*60,
			c=bubbleArr[p][0],
			state=1;
		if(currentFloor==1 && p==2) state=0;
		if(currentFloor==9 && p==1) state=0;
		pepe.append('<div type="'+c+'" b_en="'+state+'" class="actionButton" id="'+buttonName+'"/>');
		a*=-1;
		b*=-1;

		var left=60+(p%4*60);
		var top=Math.floor(p/4)*60;

		$("#"+buttonName).css({
			'top':top+px,
			'left':left+px,
			'background-position':b+px+" "+a+px
		});
	};
	openActions();
	bubbleButtons();
};

function openActions(){
	$('.alert').click(function(){
		$('.actionButton').slideDown('fast');
	});
};

function resetBubble(){
	$('#actionsBubble').fadeOut('fast');
	$('.actionButton').remove();
};

function moveFloor(current,type,final){
	$('.player').fadeOut('fast');
	$('.player').remove();
	deleteSelectors();
	resetBubble();

	var how='show';
	var final=final || "";
	switch(type){
		case 'start':
			current=final;
			currentFloor=final;
			break;
		case 'm_sup':
			focusWalls(current,'hide');
			focusWalls(current+1,'show');
			current++;
			currentFloor++;
			break;
		case 'm_sdo':
			focusWalls(current,'hide');
			focusWalls(current-1,'show');
			how='hide';
			currentFloor--;
			break;
		case 'elevator_up':
			how='show';
			currentFloor=final;
		case 'elevator_down':
			how='show';
			currentFloor=final;
		default: break;
	};
	focusWalls(current,how);
	startFadeMod(current,how); ///////////////////floor.js 
	//var	find_e=findExits(currentFloor);
};


/*find_stairEntrance(f){
	var	j=eval('zone'+f),exp;
	for(var h=0;h<stairs_e.length;h++){
		var	w=0,
			d=0;
		while(exp!=stairs_Exit[h]){
			exp=j[Math.floor(w/10)][d%10];
			w++; d++;
		 }	 
	};
};*/
function startFloor(pM){////////////////active in floor.js
	$('#objectArea *').hide();
	createSelectors(currentFloor);
	clickTile();
	showPlayer(posA,currentFloor);
	displayBubble(scanDestinationTile(posA,currentFloor));
	//console.log(scanDestinationTile(posA,currentFloor));
	generateObjects(currentFloor,building_A_objects);
	//scrollToFloor(currentFloor);
}

function scrollToFloor(f){
	var	dis=$('#bloque'+f+posA.y+"_"+posA.x).position.top;
	console.log("dis: "+dis);
	$("html, body").scrollTop(dis);
};

function playerAction(type){
	switch(type){
		case 'm_sup':
			stairsPlayer(type,1);
			moveFloor(currentFloor,type,currentFloor+1);
			break;
		case 'm_sdo':
			stairsPlayer(type,-1);
			moveFloor(currentFloor,type,currentFloor-1);
			break;
		case 'i_op':
			uiDis('open','inventory');
			$('#inv_close').click(function(){
				uiDis('close','inventory');
			});
			break;
		case 'b_read':
			uiDis('open','magnifier');
			$('#magni_close').click(function(){
				uiDis('close','magnifier');
			});
			break;
		case "m_push":
			openElevator(currentFloor,type);
			break;
		default:break;
	};
	//console.log(type);
};

var stairs_e=[97,103,109,115,125,131,137,143];
function stairsPlayer(typ,toF){
	var pap,lel;
	toF>0 ? pap=-5 : pap=5;
	for(var dad=0;dad<=stairs_e.length;dad++){
		if(eval('zone'+currentFloor)[posA.y][posA.x]==stairs_e[dad]) lel=dad; break;
	}
	var lal=stairs_e[lel];
	console.log(eval('zone'+currentFloor)[posA.y][posA.x]);
	if(lal>96 && lal<120)		posA.x+=pap;
	if(lal>120 && lal<144)	posA.y+=pap;
	console.log(posA);
		/*for(var g=0;g<=p_actions.length;g++){
			if(typ==p_actions[g][0]){
				for(var h=0;h<=stairs_e.length;h++){
					if(p_actions[g][1]==stairs_e[h]){
						if(h<4){
							posA.x+=pap;
						} else{
							posA.y+=pap;
						}
					}
	*/	
};
////////////////////////////////floor selectors>>>>>>>>>>>>>>>>>>>>>>
function buttonFunctions(){	
	$("#start_game").click(function(){
		$('.commands').fadeOut('fast');
		moveFloor(0,'start',1);
	});
};

function bubbleButtons(){
	$('.actionButton').click(function(){
		var	hah=$(this).attr('type'),
			heh=$(this).attr('b_en');
		if(heh==1){
			playerAction(hah);
		}else{
			$(this).css('display','none');
			alert("You can't go there");
		}
	});
};
////////////////////////////////floor selectors>>>>>>>>>>>>>>>>>>>>>>

var cam=200; //////////////camera speed
function scrollToFloor(f){
	f==0 ?
		$('body').animate({'scrollTop':"2500px"},cam) :
		$('body').animate({'scrollTop':getPosition(9,9,f).y+"px"},cam);
};
function scrollToPlayer(f){
	var mik=getPosition(posA.x,posA.y,f);
	$('body').animate({'scrollTop':mik.y+px+mik.x+px},cam);
}

function focusWalls(floor,bol){
	var	kok="texture";
	switch(bol){
		case 'hide':
			for (var nik=0;nik<=9;nik++){
				for (var nek=0;nek<=9;nek++){
					var	suk=$('#bloque'+floor+'_'+nik+'_'+nek),
						sik=suk.attr('class').substring(kok.length,kok.length+3),
						sok;
					if(sik>48 && sik<73){ 		///////////////////////////range of walls to change background to hidden
						sok=parseInt(sik)-24;
						suk.attr('class',kok+sok);
					};
					if(sik>13 && sik<16){
						sok=parseInt(sik)-2;
						suk.attr('class',kok+sok);
					};
					if(sik>144 && sik<153){
						sok=parseInt(sik)+8;
						suk.attr('class',kok+sok);
					};
					//suk.attr('class',kok+sik);
				}
			};
			break;
		case 'show':
			for (var nik=0;nik<=9;nik++){
				for (var nek=0;nek<=9;nek++){
					var	suk=$('#bloque'+floor+'_'+nik+'_'+nek),
						sik=suk.attr('class').substring(kok.length,kok.length+3),
						sok;
					if (sik>27 && sik<37 || sik>42 && sik<49){ 	///////////////////////////range of walls to change background to hidden
						sok=parseInt(sik)+24;
						suk.attr('class',kok+sok);
					};
					if(sik>11 && sik<14){
						sok=parseInt(sik)+2;
						suk.attr('class',kok+sok);
					};
					if(sik>152 && sik<161){
						sok=parseInt(sik)-8;
						suk.attr('class',kok+sok);
					}
					
				}
			};
		default: break;
	};
};
///////////////////////////Player inventory
var	inventory=[];
	//inventory.length=8;
	inventory[0]=new invObject('fork');
	inventory[1]=new invObject('knife');
	inventory[2]=new invObject('key');
	inventory[3]=new invObject('paper');
	inventory[4]=new invObject('lighter');
	inventory[5]=new invObject('photo');
	inventory[6]=new invObject('wallet');
	inventory[7]=new invObject('cellphone');

function invObject(name){
	this.name=name;
}

function uiDis(action,what){
	switch(action){
		case "open":
			$('#'+what).slideDown('fast');
			break;
		case "close":
			$('#'+what).slideUp('up');
			break;
		default: break;
	}
}