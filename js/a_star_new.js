'use strict'
var	divName="square";
var	mapa=[],nodes=[];
        ////////0,1,2,3,4,5,6,7,8,9

mapa[0]=[0,0,0,0,0,0,0,0,0,0];
mapa[1]=[0,0,0,0,0,0,0,0,0,0];
mapa[2]=[0,0,1,1,1,1,1,1,1,0];
mapa[3]=[0,0,0,0,0,0,0,0,1,0];
mapa[4]=[0,0,1,1,1,1,1,1,1,0];
mapa[5]=[0,0,0,0,0,0,0,0,1,0];
mapa[6]=[0,0,1,1,1,1,1,1,1,0];
mapa[7]=[0,0,0,0,0,0,0,0,1,0];
mapa[8]=[0,0,0,0,0,0,0,0,1,0];
mapa[9]=[0,0,0,0,0,0,0,0,1,0];


function addDiv(arr){
	for(var g=0;g<arr.length;g++){
		nodes[g]=["i","i","i","i","i","i","i","i","i","i"];
		for(var j=0;j<arr.length;j++){
			var nombre=divName+g+'_'+j;
			createDiv(nombre,arr[g][j]);
			positionDiv(nombre,g*82,j*82);
			if(mapa[g][j]!=0){///////////condition to close nodes
				nodes[g][j]="u";
			}

		};
	};
};
function createDiv(name,clase){
	$('body').append('<div class="clase'+clase+'" id="'+name+'"><p class="id"/><p class="hg"/><p class="f"/><p class="p"/><p class="a"/></div>')
}
function positionDiv(name,y,x){
	$('#'+name).css({
		'top':y+"px",
		'left':x+"px"
	});
};

function startHL(divS,divE){///////////RED
	$('#'+divName+divS.y+"_"+divS.x).css('background','blue');
	$('#'+divName+divS.y+"_"+divS.x).html(sP.y+"_"+sP.x);
	$('#'+divName+divE.y+"_"+divE.x).css('background','blue');
	$('#'+divName+divE.y+"_"+divE.x).html(eP.y+'_'+eP.x);
};
var arrows=[];
arrows[0]=8600;
arrows[1]=8595;
arrows[2]=8601;
arrows[3]=8592;
arrows[4]=8598;
arrows[5]=8593;
arrows[6]=8599;
arrows[7]=8594;

function neighNodes(ind){
	var x,y,a;
	switch(ind){
		case 0: 	x=-1;		y=-1;		a=arrows[ind];	break;//NW
		case 1: 	x=0;		y=-1;		a=arrows[ind];	break;//N
		case 2: 	x=1;		y=-1;		a=arrows[ind];	break;//NE
		case 3: 	x=1;		y=0;		a=arrows[ind];	break;//E
		case 4: 	x=1;		y=1;		a=arrows[ind];	break;//SE
		case 5: 	x=0;		y=1;		a=arrows[ind];	break;//S
		case 6: 	x=-1;		y=1;		a=arrows[ind];	break;//SW
		case 7: 	x=-1;		y=0;		a=arrows[ind];	break;//W
		default:	break;
	}
	return{x,y,a};
};
function findN(mapArr,initialNode){
	////////////write on initial
	var initNode=$("#"+divName+initialNode.y+"_"+initialNode.x);
	initNode.css({"background":"rgb(120,120,220)","font-size":".6em"});

	var 	y=[], x=[], a=[];
	for(var g=7;g>=0;g--){
		var	one=neighNodes(g).y+initialNode.y;
		var	two=neighNodes(g).x+initialNode.x;
		if(one>=0 && one<=9 && two>=0 && two<=9){
			if(nodes[initialNode.y][two]!="u" && nodes[one][initialNode.x]!="u"){////dont cross corners
				if(nodes[one][two]=="i" || nodes[one][two]=="o"){
					y.push(one);///////////existing boundaries
					x.push(two);
					a.push(g);
				}
			}
		}
	};
	return {y,x,a};
};

function getMinIndex(obj){	
	var	t=[], q=[], s=[], i;
	for(i=0;i<obj.length;i++){
		t.push(obj[i].f);
	}
	for(i=0;i<obj.length;i++){
		if(t[i]==Math.min.apply(null,t)) q.push(i);
		s.push(obj[i].h);
	}
	if(q.length>1){
		i=s.indexOf(Math.min.apply(null,s)); ////IN H
	}else{
		i=t.indexOf(Math.min.apply(null,t));///// IN F
	}
	return i;
};
function getHipo(c1,c2,typ){
	var	k,
		cat1=Math.abs(c1.y-c2.y),
		cat2=Math.abs(c1.x-c2.x);
	switch(typ){
		case "t":
			k=Math.floor(Math.sqrt(Math.pow(cat1,2)+Math.pow(cat2,2))*10);
			break;
		case "h":
			k=cat1+cat2*10;
			break;
		default: break;
	}
	return k;
};

var	sP={y:1,x:8},
	cP={y:1,x:8},
	eP={y:0,x:9};


function greenNodes(coord){
	$("#"+divName+coord.id.y+"_"+coord.id.x).css("background","rgb(100,100,100)");
	$("#"+divName+coord.id.y+"_"+coord.id.x+" .id").text("id: "+coord.id.y+"_"+coord.id.x);
	$("#"+divName+coord.id.y+"_"+coord.id.x+" .hg").text("h :"+coord.h+", g: "+coord.g);
	$("#"+divName+coord.id.y+"_"+coord.id.x+" .f").text("f: "+coord.f);
	$("#"+divName+coord.id.y+"_"+coord.id.x+" .p").text("p: "+coord.p.y+"_"+coord.p.x);
	$("#"+divName+coord.id.y+"_"+coord.id.x+" .a").html("&#"+arrows[coord.a]+";");
};
function cerrarNodo(){
	$(".clase0").bind('click',function(){
		$(this).css({background:"orange"});
	})
}

var	openNodes=[], closedNodes=[],process=0;

function getNodes(sN,cN,fN,map){
	nodes[cN.y][cN.x]="x";
	var	arr=findN(map,cN);

	for(var r=0;r<arr.y.length;r++){//////new or renew nodes 1>8
		var mim={y:arr.y[r],x:arr.x[r]};
		if(nodes[mim.y][mim.x]=="i"){
			var g,h,f,p;
			openNodes.push({id: mim,h,g,f,p,a:arr.a[r]});
		}
		nodes[arr.y[r]][arr.x[r]]="x";
	};

	for(var i=0;i<openNodes.length;i++){
		var	 nd=openNodes[i],
			par={y:cN.y,x:cN.x};
		if(nd.h==undefined){
			nd.p=par;
			nd.h=getHipo(nd.id,fN,"t");
			nd.g=getHipo(nd.id,cN,"t");
			nd.f=nd.h+nd.g;
			nodes[nd.id.y][nd.id.x]="o";
		}
		if(nd.g && nodes[nd.id.y][nd.id.x]=="o"){////////////open Node recalculate
			if(getHipo(nd.id,cN,"t")<nd.g){
				nd.g=getHipo(nd.id,cN,"t");
				nd.f=nd.h+nd.g;
				nodes[nd.id.y][nd.id.x]="c";
			}
		}
		nd.par=par;
		greenNodes(nd);
	}
	var min=getMinIndex(openNodes);
	closedNodes.push(openNodes.splice(min,1));

	var last=closedNodes.length-1;	
	cN.y=closedNodes[last][0].id.y;
	cN.x=closedNodes[last][0].id.x;

	if(cN.y==fN.y && cN.x==fN.x){
		
		$("#"+divName+sP.y+"_"+sP.x).css({background:"purple"});
		$("#"+divName+eP.y+"_"+eP.x).css({background:"purple"});
		$("#start").hide();
		mem=1;
		var kik=findRoute(closedNodes);
		cerrarNodo();
		for(var g=0;g<kik.length;g++){
			$("#"+divName+kik[g].y+"_"+kik[g].x).css({background:"red"});
		}
		console.log(kik);
	}else{
		process++;
	};	
}

function findRoute(arr){
	var	final=[],
		nodeD={y:arr[arr.length-1][0].id.y,x:arr[arr.length-1][0].id.x},
		process=0;
	while(process<arr.length){
	//console.log(arr[process][0].id.y+"_"+arr[process][0].id.x+"-------->"+arr[process][0].p.y+"_"+arr[process][0].p.x);
		for(var i=0;i<arr.length;i++){
			if(arr[i][0].id.y==nodeD.y && arr[i][0].id.x==nodeD.x){
				final.push(arr[i][0].id);
				nodeD={y:arr[i][0].p.y,x:arr[i][0].p.x};
				break;
			}
		}
		if(nodeD.y==sP.y && nodeD.x==sP.x) break;
		process++;
	}
	for(var i=0;i<final.length;i++){
		
	}
	return final;

}
function buttonStart(){
	$("#start").bind("click",function(){
	});
}
var mem=0
$(document).ready(function(){
	addDiv(mapa);
	startHL(sP,eP);
	while(mem<1){
		getNodes(sP,cP,eP,mapa);
	}
	buttonStart();
	// mem=setInterval(function(){
	// 	findRoute(sP,eP,mapa);
	// },10);
	//startClick();
});