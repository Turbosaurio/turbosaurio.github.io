"use strict"
var	zone1=[],zone2=[],zone3=[],zone4=[],zone5=[],zone6=[],zone7=[],zone8=[],zone9=[],zone10=[],
	zone1Iso=[],zone2Iso=[],zone3Iso=[],zone4Iso=[],zone5Iso=[],zone6Iso=[],zone7Iso=[],zone8Iso=[],zone9Iso=[],
	textureClass01=[];

for(var rho=0;rho<=24;rho++){ //////////////cantidad de  imagenes por sprite
	textureClass01.push("marmol"+rho);
};

/////////////>>>>>>>position tiles arrrays
var arrayCoordX=[];
var arrayCoordY=[];
var coordL=10;

var	moduleWidth=220,
	moduleHeight=70;

for(var i=1;i<coordL*2;i++){
	var qui=0;
	var mex,max=coordL;
	i>coordL ? mex=max-Math.round(i%coordL) : mex=i;
	arrayCoordY.push(i*20);
	for(var h=1;h<mex;h++){
		mex/2!=Math.round(mex/2) ? qui++ : qui=h%mex;
		arrayCoordX.push([qui+h-mex]*moduleWidth);
	};
};
//console.log(arrayCoordX);
//////////////>>>>>>>>>>>>>>>>>>>>f>>>>>>>>>>>>>

	zone1[0]=[14,21,13,,24,,,,];
	zone1[1]=[19,24,24,20,24,24,,,];
	zone1[2]=[15,24,24,24,20,24,24,0,];
	zone1[3]=[,20,24,24,24,20,,0,0];
	zone1[4]=[,,20,24,24,24,20,,0];
	zone1[5]=[24,,,20,24,24,24,20,];
	zone1[6]=[,24,,,20,24,24,24,18];
	zone1[7]=[,24,24,24,,20,24,24,19];
	zone1[8]=[19,,,0,0,,16,21,17];
	zone2[0]=[19,0,0,,0,14,7,,0];
	zone2[1]=[24,,,,0,10,17,0,];
	zone2[2]=[,24,,0,,0,0,0,];
	zone2[3]=[24,24,24,,,24,,24,];
	zone2[4]=[0,0,14,13,,24,,,24];
	zone2[5]=[0,,15,0,18,,,24,14];
	zone2[6]=[,0,0,16,17,,24,0,24];
	zone2[7]=[,,,0,,24,0,0,24];
	zone2[8]=[,,,,24,,24,24,];
	zone3[0]=[0,0,0,24,24,24,24,0,0];
	zone3[1]=[0,24,24,24,24,24,24,24,24];
	zone3[2]=[24,24,24,0,24,24,24,24,24];
	zone3[3]=[0,0,0,24,24,0,24,24,24];
	zone3[4]=[0,0,24,24,0,24,0,24,0];
	zone3[5]=[24,24,24,0,24,24,0,24,0];
	zone3[6]=[0,24,24,24,0,24,0,24,0];
	zone3[7]=[24,0,0,24,24,24,0,0,0];
	zone3[8]=[24,24,24,0,0,24,0,24,24];

var	board="#tablero",
	selectionTiles="#selection",
	playerDiv="#jugadores";

function addStepWithClass(a,b,stepName,zoneModule){
	var name=stepName+a+"_"+b;
	var type=textureClass01[(zoneModule[a][b])];
	$(board).append('<div id="'+name+'" class="'+type+'" level="'+zoneModule[a][b]+'"></div>');
};
function addSelectors(a,b,selectorName){
	var name=selectorName+a+"_"+b;
	$(selectionTiles).append('<div id="'+name+'" class="selector"></div>')
}
function positionStep(target,posX,posY){
	$("#"+target).css({
		"left":posX+"px",
		"top":posY+"px"
	});
};
function getChar(number,pos){
	var numero,start=pos-1;
	number+="";
	var chars=number.length;
	if(chars===1)	numero="0"+number;
	if(chars===2)	numero=number+"";
	return parseInt(numero.substring(start,pos));
};

function createIsometricScenario(zoneArr,zoneArrIso,moduleName,initialX,initialY,selectorDiv){
	var uno,dos,tres=0,cuatro=0;
	for(var k=0;k<zoneArrIso.length;k++){
		for(var d=0;d<zoneArrIso[k].length;d++){
			uno=zoneArrIso[k][d][0];
			dos=zoneArrIso[k][d][1];
			addStepWithClass(uno,dos,moduleName,zoneArr);
			addSelectors(uno,dos,selectorDiv);

			positionStep(moduleName+(uno+"_"+dos),arrayCoordX[tres]+initialX,k*moduleHeight+initialY);
			//positionStep(selectorDiv+(uno+"_"+dos),arrayCoordX[tres]+initialX+moduleWidth-133,k*moduleHeight+initialY+426);

			/*$("#"+selectorDiv+(uno+"_"+dos)).click(function(){
				var chin=$(this).attr("id");
				var chan=chin.length;
				var chon=chin.substring(chan-3,chan);
				var xuan=$("#"+moduleName+chon).attr("level");
				if(parseInt(xuan)>= 0){
					movePlayer(moduleName+chon);
					$("#alerts").text("You can move");
				}
				if(xuan>=1 && xuan<=4) {
					movePlayer(moduleName+chon);
					 $("#alerts").text("You walk on grass");
				}
				if(xuan>=7 && xuan<=12) {
					movePlayer(moduleName+chon);
					 $("#alerts").text("You walk on steady ground");
				}

				else $("#alerts").text("You can not go there");
			});*/
			tres++,cuatro++;
		};
	};
};

function doubleFractal(arr,arrIso){
	var	max=arr.length,
		maxArr=max*2-1;/////////////<<<----------only square arr
	for(var u=0,v=maxArr;u<max*2,v>0;u++,v--){
		var pinky,thumb;
		if(u>=arr.length){
			thumb=v-1;
			pinky=(max-1)*10+Math.round((u+1)%max);
		}	
		else{
			thumb=u;
			pinky=u*10;
		};
		var indexA=getChar(pinky,1);
		var indexB=getChar(pinky,2);
		arrIso.push([[indexA,indexB]]);//////<<<<<------index data
		for(var t=0;t<thumb;t++){
			var	updatePinky=pinky-9,
				indexG=getChar(updatePinky,1),
				indexH=getChar(updatePinky,2);
			arrIso[u].push([indexG,indexH]);//////<<<<------inside index data
			pinky=updatePinky;
		};
	};
};


////////////>>>>>>>>>>>>>>>>>>PLAYER SCRIPTS

var startPos="bloque1_1_1";

function createPlayer(){
	$(playerDiv).append('<div id="jugador1" class="player1"/>');
	var jug=$("#jugador1");
	jug.css({
		"top":($("#"+startPos).css("top")),
		"left":($("#"+startPos).css("left"))
	});
/*	$('#controlUp').click(function(){
		movePlayer
	})*/
};
function movePlayer(button){
	var	onX=zone1Iso[0][4],
		onY=zone1Iso[0][4];
	switch(button){
		case "up":	onY-=1;	break;
		case "left":	onX-=1;	break;
		case "right":	onX+=1;	break;
		case "down":	onY+=1;	break;
		case "center":	console.log("center camera");	break;
		default: break;
	};
	if(onY && onX) $('#jugador1').animate({"top":onY+"px","left":onX+"px"},200);
	else $("#alerts").text(" You can't move there");
	startPos="bloque1_"+onX+"_"+onY;
	console.log(button);
		/*if($('#bloque1_'+onY+'_'+onX)){
		console.log("x: "+onX+" y: "+onY);
		startPos="bloque1_"+onX+'_'+onY;
		console.log(startPos);
	}else $("#alerts").text("you can't move there");*/
};

function playerControls(){
	var currentX=$('#'+startPos);
	$('#controlUp').click(function(){	movePlayer("up")	});
	$('#controlLe').click(function(){	movePlayer("left")	});
	$('#controlRi').click(function(){	movePlayer("right")	});
	$('#controlDo').click(function(){	movePlayer("down")	});
};

function generateLevels(wid,hei,num){
	doubleFractal(zone1,zone1Iso);
	doubleFractal(zone2,zone2Iso);
	doubleFractal(zone3,zone3Iso);

	createIsometricScenario(zone1,zone1Iso,"bloque1_",wid*30*num,0,"selectorDiv1_");
	createIsometricScenario(zone2,zone2Iso,"bloque2_",wid*21,hei*9,"selectorDiv2_");
	createIsometricScenario(zone3,zone3Iso,"bloque3_",wid*12,hei*18,"selectorDiv3_");
	


	//createIsometricScenario(zone2,zone2Iso,"bloque2_",wid*9.5*2,hei*9.5*2,'selectrDiv2_');   4444
}

$(document).ready(function(){
	playerControls();

	generateLevels(moduleWidth,moduleHeight,1);	
	/////>>>>>>cambio posicion inicial en X
	//doubleFractal(zone2,zone2Iso);
	//createIsometricScenario(zone2,zone2Iso,"bloque2_",1000,2000,"selectorDiv2_");
	/*doubleFractal(zone3,zone3Iso);
	createIsometricScenario(zone3,zone3Iso,"bloque3_",xgap,ygap*2,"selectorDiv3_");

	doubleFractal(zone4,zone4Iso);
	createIsometricScenario(zone4,zone4Iso,"bloque4_",xgap*4,ygap,"selectorDiv4_");
	doubleFractal(zone5,zone5Iso);
	createIsometricScenario(zone5,zone5Iso,"bloque5_",xgap*3,ygap*2,"selectorDiv5_");
	doubleFractal(zone6,zone6Iso);
	createIsometricScenario(zone6,zone6Iso,"bloque6_",xgap*2,ygap*3,"selectorDiv6_");

	doubleFractal(zone7,zone7Iso);
	createIsometricScenario(zone7,zone7Iso,"bloque7_",xgap*5,ygap*2,"selectorDiv7_");
	doubleFractal(zone8,zone8Iso);
	createIsometricScenario(zone8,zone8Iso,"bloque8_",xgap*4,ygap*3,"selectorDiv8_");
	doubleFractal(zone9,zone9Iso);
	createIsometricScenario(zone9,zone9Iso,"bloque9_",xgap*3,ygap*4,"selectorDiv9_");*/
	
	createPlayer();
	/*for(var piq=1;piq<=9;piq++){
		doubleFractal("zone"+piq,"zone"+piq+"Iso");
		createIsometricScenario("zone"+piq,"zone"+piq+"Iso","bloque"+piq,xgap);
	}*/
});



















