"use strict"

var floorNum=9; ////////////////////>>>>>>>>>>>>>>>>.NUMBER OF FLOORS
var currentFloor=0;
var px="px";


/////////////>>>>>>>position tiles arrrays
var arrayCoordX=[];
var coordL=11;

var	moduleWidth=145/2, 
	moduleHeight=68/2;

for(var i=1;i<coordL*2;i++){
	var qui=0;
	var mex,max=coordL;
	i>coordL ? mex=max-Math.round(i%coordL) : mex=i;
	for(var h=1;h<mex;h++){
		mex/2!=Math.round(mex/2) ? qui++ : qui=h%mex;
		arrayCoordX.push([qui+h-mex]*moduleWidth);
	};
};


function addStepWithClass(floor,a,b,stepName,zoneModule){
	var name=stepName+a+"_"+b;
	var type='texture'+(zoneModule[a][b]);///////////////////////textura
	$(floor).append('<div id="'+name+'" class="'+type+'" level="'+zoneModule[a][b]+'"></div>');
};
/*function addSelectors(a,b,selectorName){
	var name=selectorName+a+"_"+b;
	$('#selection').append('<div id="'+name+'" class="selector"></div>')
}*/
function getChar(number,pos){
	var numero,start=pos-1;
	number+="";
	var chars=number.length;
	if(chars===1)	numero="0"+number;
	if(chars===2)	numero=number+"";
	return parseInt(numero.substring(start,pos));
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

function positionStep(target,posX,posY,dep){
	$("#"+target).css({
		"top":posY+"px",
		"left":posX+"px",
		 "z-index":dep-1000
	});
};
function createIsometricScenario(floor,zoneArr,zoneArrIso,moduleName,initialX,initialY,selectorDiv){
	var uno,dos,tres=0;
	for(var k=0;k<zoneArrIso.length;k++){
		for(var d=0;d<zoneArrIso[k].length;d++){
			uno=zoneArrIso[k][d][0];
			dos=zoneArrIso[k][d][1];
			addStepWithClass(floor,uno,dos,moduleName,zoneArr);
			positionStep(moduleName+(uno+"_"+dos),arrayCoordX[tres]+initialX,k*moduleHeight+initialY,tres);
			tres++;
		};
	};
};

function generateLevels(wid,hei,num){ ////////////////////////////////////////////////////////RENDER SCENARIO BY FLOOR NUMBERS
	for(var k=1,j=num;k<=num,j>=1;k++,j--){
		var	zone=eval("zone"+k),
			iso=eval("zone"+k+"Iso");
		doubleFractal(zone,iso);
		var	ancho=wid*12-210,
			alto=j*hei*6.6;////////here to add depth on Y
		createIsometricScenario("#floor"+k,zone,iso,"bloque"+k+"_",ancho,alto,"selectorDiv"+k+"_");
	};
};

////////////////////////////sequencencial show module
var anim=[], btn=[], fadeInMod=[], time=5;
	for(var h=1;h<=floorNum;h++){
		anim[h]=1;
	};

function animateModules(floor,mode){
	var	kek=orderShow[anim[floor]].toString(),
		indY, indX;
	if(kek.length===2){
		indY=kek.substring(0,1),
		indX=kek.substring(2,1);
	}else{
		indY="0";
		indX=kek;
	};
	var block=$('#bloque'+floor+'_'+indY+"_"+indX);
	switch(mode){
		case "show":
			block.fadeIn('fast'); 
			anim[floor]++; 
			if(anim[floor]>=orderShow.length){///////////////////////////////////ENDS INTERVAL
				clearInterval(fadeInMod[floor]);
				startFloor();
				//$("#floor0"+floor).css('display','block');
				anim[floor]=100;
			};
			break;
		case 'hide':
			block.fadeOut('fast'); 
			anim[floor]--; 
			if(anim[floor]<=0){///////////////////////////////////ENDS INTERVAL
				clearInterval(fadeInMod[floor]);
				startFloor();
				//$("#floor0"+floor).css('display','block');
				anim[floor]=1;
			};
		default : break;
	}
};

function startFadeMod(floor,mode){
	fadeInMod[floor]=setInterval(function(){animateModules(floor,mode);},time);
};

function generateObjects(f,obj){
	var	ko=$('#objectArea'),
		name="o_obj";
	//ko.fadeIn('fast');
	for(var la=0;la<obj.length;la++){
		var w=obj[la];
		if(f==w.floor){
			ko.append('<div id="'+name+la+'" class="object'+w.value+'"></div>');
			var	p_g=getPosition(w.loc.y,w.loc.x,w.floor),
				pep=$('#'+name+la);

			//console.log(w.value);
			$('#'+name+la).css({
				"display":"block",
				"top":p_g.y+px,
				"left":p_g.x+px
			});
		}else{
			console.log('No objects in this floor.');
		}
	};
};




$(document).ready(function(){
	generateLevels(moduleWidth,moduleHeight,floorNum);
	moveFloor(0,'start',1);
	
	//buttonFunctions();
});