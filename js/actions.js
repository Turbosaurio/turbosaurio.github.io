"use strict"
var	framerate=1000/12;
var	i=0,k=0,kak=[],kek=[];
for(var g=0;g<10;g++){
	kek[g]=0;
};
function animateSprite(target,distance,frames,orientation,type){
	var	moveOnX,moveOnY,
		lal,lel,op;	
	switch (type){
		case "loop":
			lal=0,lel=1;
			break;
		case "comeback":
			lal=frames,lel=2;
			break;frames-=1;
		default: break;
	};
	op=Math.abs(i%(frames*lel)-lal)*distance*-1+"px";
	switch (orientation){
		case "onX":
				moveOnX=op;
				moveOnY="0px";
				break;
		case "onY":
				moveOnX="0px";
				moveOnY=op;
				break;
		default : 	break;
	}
	$(target).css({"background-position":moveOnX+" "+moveOnY});
	i++;
};
function resetBGPos(target){
	$(target).css({"background-position":"0px 0px"});
};
$(document).ready(function(){
	var	g1="#gears1",
		g2="#gears2",
		g3="#gears3";
	kak[0]=setInterval(function(){animateSprite(g1,100,9,"onX","loop")},framerate);
	kak[1]=setInterval(function(){animateSprite(g2,100,18,"onX","loop")},framerate);
	kak[2]=setInterval(function(){animateSprite(g3,100,18,"onX","loop")},framerate);
});