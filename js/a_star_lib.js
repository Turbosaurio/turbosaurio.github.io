'use strict'
function neighNodes(ind){
	var x,y,a;
	switch(ind){
		case 0: 	x=-1;		y=-1;		break;//NW
		case 1: 	x=0;		y=-1;		break;//N
		case 2: 	x=1;		y=-1;		break;//NE
		case 3: 	x=1;		y=0;		break;//E
		case 4: 	x=1;		y=1;		break;//SE
		case 5: 	x=0;		y=1;		break;//S
		case 6: 	x=-1;		y=1;		break;//SW
		case 7: 	x=-1;		y=0;		break;//W
		default:	break;
	}
	return{x,y,a};
};
function findN(mapArr,initialNode){
	var 	y=[], x=[];
	for(var g=7;g>=0;g--){
		var	one=neighNodes(g).y+initialNode.y;
		var	two=neighNodes(g).x+initialNode.x;
		if(one>=0 && one<mapArr.length && two>=0 && two<mapArr.length){
			if(star_nodes[initialNode.y][two]!="u" && star_nodes[one][initialNode.x]!="u"){////dont cross corners
				if(star_nodes[one][two]=="i" || star_nodes[one][two]=="o"){
					y.push(one);///////////existing boundaries
					x.push(two);
				}
			}
		}
	};
	return {y,x};
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

function findRoute(arr,start){
	var	final=[],
		nodeD={y:arr[arr.length-1][0].id.y,x:arr[arr.length-1][0].id.x},
		process=0;
	while(process<arr.length){
		for(var i=0;i<arr.length;i++){
			if(arr[i][0].id.y==nodeD.y && arr[i][0].id.x==nodeD.x){
				final.push(arr[i][0].id);
				nodeD={y:arr[i][0].p.y,x:arr[i][0].p.x};
				break;
			}
		} if (nodeD.y==start.y && nodeD.x==start.x) break;
		process++;
	}
	return final;
}


function getNodes(sN,cN,fN,map){
	star_nodes[cN.y][cN.x]="x";
	var	arr=findN(map,cN);
	for(var r=0;r<arr.y.length;r++){//////new or renew star_nodes 1>8
		var mim={y:arr.y[r],x:arr.x[r]};
		if(star_nodes[mim.y][mim.x]=="i"){
			var g,h,f,p;
			star_openNodes.push({id: mim,h,g,f,p});
		}
		star_nodes[arr.y[r]][arr.x[r]]="x";
	};
	for(var i=0;i<star_openNodes.length;i++){
		var	 nd=star_openNodes[i],
			par={y:cN.y,x:cN.x};
		if(nd.h==undefined){
			nd.p=par;
			nd.h=getHipo(nd.id,fN,"t");
			nd.g=getHipo(nd.id,cN,"t");
			nd.f=nd.h+nd.g;
			star_nodes[nd.id.y][nd.id.x]="o";
		}
		if(nd.g && star_nodes[nd.id.y][nd.id.x]=="o"){////////////open Node recalculate
			if(getHipo(nd.id,cN,"t")<nd.g){
				nd.g=getHipo(nd.id,cN,"t");
				nd.f=nd.h+nd.g;
				star_nodes[nd.id.y][nd.id.x]="c";
			}
		}
		nd.par=par;
	}
	var min=getMinIndex(star_openNodes);
	star_closedNodes.push(star_openNodes.splice(min,1));
	
	var last=star_closedNodes.length-1;

	cN.y=star_closedNodes[last][0].id.y;
	cN.x=star_closedNodes[last][0].id.x;
	
	if(cN.y==fN.y && cN.x==fN.x){
		star_nodesLoop=1;
	}
}
var	star_node_start,
	star_node_current,
	star_node_end,
	star_nodes=[],
	star_openNodes=[],
	star_closedNodes=[],
	star_nodesLoop=0;

function starRoute(arrMap,start,end,t){
	star_node_start={y:start.y,x:start.x},
	star_node_current={y:start.y,x:start.x},
	star_node_end={y:end.y,x:end.x};
	for(var g=0;g<arrMap.length;g++){
		star_nodes[g]=addEmptyArr(arrMap.length);
		for(var j=0;j<arrMap[0].length;j++){
			var kak=arrMap[g][j];
			if(instanceColor(kak,t)){
				star_nodes[g][j]="i";
			}
		};
	};
	while(star_nodesLoop==0){
		getNodes(star_node_start , star_node_current , star_node_end,arrMap);
	}
	var arr=findRoute(star_closedNodes,start);
	arr.reverse	();
	return arr;
}
