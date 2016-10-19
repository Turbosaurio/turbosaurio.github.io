"use strict"
var	totalsquares=300,
	i=0,kak=[],kok=[],spaces=[],kik=[],random=[],
	framerate=500;

for(var t=0;t<=totalsquares;t++){ //////empty vars and intervals
	kak[t]="";
	kok[t]=1;
	spaces[t]=t*100;
	random[t]=Math.round(Math.random()*9+1);
}


function cuadrosAnim(target,ind,distance,frames,orientation,type){
	var	moveOnX,moveOnY,
		lal,lel,op,
		h=parseInt(kok[ind]);

	switch (type){
		case "loop": lal=0,lel=1;break;
		case "comeback": lal=frames,lel=2;break;frames-=1;
		default: break;
	};

	op=Math.abs(h%(frames*lel)-lal)*distance*-1+"px";

	switch (orientation){
		case "onX":	moveOnX=op;
				moveOnY="0px";
				break;
		case "onY":	moveOnX="0px";
				moveOnY=op;
				break;
		default : 	break;
	}
	$(target+ind).css({"background-position":moveOnX+" "+moveOnY});
	h++;
	kok[ind]=h;
};

$(document).ready(function(){
	var cuadro="#cuadro";
	for(var q=0;q<=totalsquares;q++){
		$("#cheb").append('<div class="divSqr" id="cuadro'+q+'"></div>');
		/*$(cuadro+q).css({
			"background-position":
			spaces[Math.round(Math.random()*20)]*-1+"px "+
			spaces[Math.round(Math.random()*10)]*-1+"px"
		});*/
		//kik[q]=$(cuadro+q).attr("id").substring(cuadro.length-1,cuadro.length+1);
		/*kak[q]=setInterval(function(){
			var o=$(this).attr("name");
			cuadrosAnim(cuadro,q,100,20,"onX","loop"),framerate
		});*/
		//$(cuadro+q).css("background-position","0px "+random[q]*100*-1+"px");
		$(cuadro+q)
		.mouseenter(function(){
			var	f=$(this).attr("id").substring(cuadro.length-1,cuadro.length+1),
				u=kok[f];
			$(this).css({
				"background-position":
				u*100*-1+"px "+
				//spaces[Math.round(Math.random()*10)]*-1+"px "+
				//random[u]*100-1+"px"
				"0px"
			});
			u++;
			if(u>=19) u=19;
			console.log(u);
			kok[f]=u;
		});
	};
});