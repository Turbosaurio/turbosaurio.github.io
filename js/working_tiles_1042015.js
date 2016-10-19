"use strict"
var	zone1=[],zone2=[],zone3=[],zone4=[],zone5=[],zone6=[],zone7=[],zone8=[],zone9=[],zone10=[],
	zone1Iso=[],zone2Iso=[],
	textureClass01=[];
	

for(var rho=0;rho<12;rho++){
	textureClass01.push("module"+rho);
};

/////////////>>>>>>>position arrrays
var arrayCoordX=[];
var arrayCoordY=[];
var coordL=9;
for(var i=1;i<coordL*2;i++){
	var qui=0;
	var mex,max=coordL;
	if(i>coordL)	mex=max-Math.round(i%coordL);
	else 		mex=i;
	arrayCoordY.push(i*20);
	for(var h=1;h<mex;h++){
		if (mex/2!=Math.round(mex/2)) qui++;
		else qui=h%mex;
		arrayCoordX.push([qui+h-mex]*37);
	};
};
//////////////>>>>>>>>>>>>>>>>>>>>f>>>>>>>>>>>>>

	zone1[0]=[0,0,1,1,2,3,2,5];
	zone1[1]=[0,1,1,1,2,3,2,5];
	zone1[2]=[2,2,1,1,6,3,2,5];
	zone1[3]=[0,6,1,1,6,6,5,5];
	zone1[4]=[0,6,6,1,6,5,5,5];
	zone1[5]=[5,5,5,7,5,5,5,5];
	zone1[6]=[5,5,5,7,5,5,5,5];
	zone1[7]=[10,9,9,9,9,9,10,1];
	zone2[0]=[10,9,9,9,9,9,10,3];
	zone2[1]=[10,9,9,9,9,9,10,4];
	zone2[2]=[10,10,9,9,9,10,10,4];
	zone2[3]=[1,1,1,1,1,1,1,4];
	zone2[4]=[0,1,1,1,1,1,1,1];
	zone2[5]=[0,2,1,1,1,1,1,1];
	zone2[6]=[0,1,1,1,2,5,1,2];
	zone2[7]=[1,2,5,5,1,1,1,1];
	zone3[0]=[0,5,5,5,2,0,3,3];
	zone3[1]=[0,5,5,0,5,0,0,0];
	zone3[2]=[5,5,0,5,5,0,0,0];
	zone3[3]=[5,0,5,5,5,5,0,0];
	zone3[4]=[5,5,5,4,5,5,0,0];
	zone3[5]=[4,5,0,0,0,0,0,0];
	zone3[6]=[4,5,4,0,0,0,0,0];
	zone3[7]=[0,5,0,0,0,0,0,0];
	zone4[0]=[6,6,6,0,0,10,9,9];
	zone4[1]=[6,6,6,0,0,10,9,9];
	zone4[2]=[5,6,6,6,0,10,9,9];
	zone4[3]=[5,6,6,0,0,10,9,9];
	zone4[4]=[5,6,6,0,0,10,9,9];
	zone4[5]=[5,5,6,0,0,10,9,9];
	zone4[6]=[5,5,5,5,0,10,9,9];
	zone4[7]=[1,5,5,5,5,10,9,9];
	zone5[0]=[1,1,5,5,5,10,9,9];
	zone5[1]=[2,1,6,5,5,10,9,9];
	zone5[2]=[2,1,6,6,6,10,9,9];
	zone5[3]=[1,1,6,6,6,10,9,9];
	zone5[4]=[1,1,6,6,6,10,9,9];
	zone5[5]=[1,1,6,6,6,10,9,9];
	zone5[6]=[1,1,8,8,8,11,9,9];
	zone5[7]=[1,1,6,6,6,10,10,10];
	zone6[0]=[1,1,6,6,6,6,6,10];
	zone6[1]=[1,1,3,4,3,3,6,10];
	zone6[2]=[0,3,4,4,4,3,6,10];
	zone6[3]=[0,0,3,4,3,5,6,10];
	zone6[4]=[0,0,5,3,4,5,6,10];
	zone6[5]=[0,0,5,5,5,5,6,6];
	zone6[6]=[0,0,0,5,5,5,5,5];
	zone6[7]=[0,0,0,0,5,5,5,5];
	zone7[0]=[9,1,3,2,2,0,0,0];
	zone7[1]=[9,0,1,1,4,4,4,4];
	zone7[2]=[10,1,1,1,1,1,1,1];
	zone7[3]=[10,1,1,1,1,1,1,1];
	zone7[4]=[10,1,1,1,1,1,1,1];
	zone7[5]=[10,1,1,2,3,3,4,4];
	zone7[6]=[10,1,1,1,2,2,3,2];
	zone7[7]=[10,1,1,1,0,0,0,0];
	zone8[0]=[10,1,1,0,0,0,0,0];
	zone8[1]=[10,1,1,0,0,0,0,0];
	zone8[2]=[10,5,7,5,5,0,0,0];
	zone8[3]=[10,5,7,5,5,5,5,5];
	zone8[4]=[10,5,7,7,7,7,7,5];
	zone8[5]=[9,5,7,5,5,5,5,5];
	zone8[6]=[9,5,7,5,0,0,0,0];
	zone8[7]=[9,10,1,1,1,0,0,0];
	zone9[0]=[9,10,1,1,1,1,0,0];
	zone9[1]=[9,10,1,1,1,1,1,0];
	zone9[2]=[9,10,1,1,1,1,1,1];
	zone9[3]=[9,10,1,2,2,1,0,1];
	zone9[4]=[9,11,1,0,0,0,11,2];
	zone9[5]=[6,6,1,2,0,0,2,1];
	zone9[6]=[5,5,5,1,1,2,1,0];
	zone9[7]=[5,0,0,0,0,1,0,0];
	zone10[0]=[0,1,2,3,4,5,6,7];
	zone10[1]=[1,2,3,4,5,6,7,8];
	zone10[2]=[2,3,4,5,6,7,8,9];
	zone10[3]=[3,4,5,6,7,8,9,10];
	zone10[4]=[4,5,6,7,8,9,10,11];
	zone10[5]=[5,6,7,8,9,10,11,0];
	zone10[6]=[6,7,8,9,10,11,0,1];
	zone10[7]=[7,8,9,10,11,0,1,2];

var	board="#tablero";

function addStepWithClass(a,b,stepName,zoneModule){
	var name=stepName+a+"_"+b;
	var type=textureClass01[(zoneModule[a][b])];
	$(board).append('<div id="'+name+'" class="'+type+'"></div>');
};
function positionStep(target,posX,posY){
	//console.log("target: "+target+" posX: "+posX+" posY: "+posY);
	//console.log($("#"+target).attr("level"));
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
	if(chars===2)	numero=number+"	";
	return parseInt(numero.substring(start,pos));
};

function createIsometricScenario(zoneArr,zoneArrIso,moduleName,initial){
	var uno,dos,tres=0,cuatro=0;
	for(var k=0;k<zoneArrIso.length;k++){
		for(var d=0;d<zoneArrIso[k].length;d++){
			uno=zoneArrIso[k][d][0];
			dos=zoneArrIso[k][d][1];
			addStepWithClass(uno,dos,moduleName,zoneArr);
			positionStep(moduleName+(uno+"_"+dos),arrayCoordX[tres]+initial,k*21);
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



$(document).ready(function(){
	//createScenario(zone1,"bloque");
	doubleFractal(zone8,zone1Iso);
	createIsometricScenario(zone8,zone1Iso,"bloque",500);
	//console.log(arrayCoordX.length);
});



















