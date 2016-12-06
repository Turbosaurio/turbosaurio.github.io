'use strict'
function createPlayerBubble(com){
	var 	a=[1,4,5,4,1,-2,-3,-2],
			b=[5,4,1,-2,-3,-2,1,4],
			distance=300;
	$('#bubble').append('<div id="b_m"/>');
	$('#b_m').css({
		top: distance+"px",
		left: distance+"px"
	});
	for(var w=0; w<com.length; w++){
		$('#bubble').append('<div id="b_c'+w+'" class="circle"/>');
		var 	x=40*b[w]+distance,
				y=40*a[w]+distance,
				by=0, bx=0,
				size=100;
		$('#b_c'+(w+1)).css({
			top: y+"px",
			left: x+"px",
			'background-position': (by*size*-1)+"px "+(bx*size*-1)+"px"
		});
	}
}
function createTiles(w){
	var pep=0;
	for(var j=0;j<w;j++){
		for(var k=0;k<w;k++){
			$('body').append('<div id="name'+j+"_"+k+'" class="cuadro">'+j+"_"+k+'</div>');
			$('#name'+j+"_"+k).css({
				top: pep%w*52+"px",
				left: Math.floor(pep/w)*52+"px"
			});
			pep++;
		}
	}
}
function addButtons(len){
	$('body').append('<div id="buttonArea"/>');
	$('#buttonArea').append('<div class="button" id="btn_1">R</div>');
	$('#buttonArea').append('<div class="button" id="btn_2">L</div>');
	$('.button').bind('click', function(){
		//$('#name'+posA.y+"_"+posA.x).css({background: 'white', color: 'black'});
		var cam;
		switch($(this).attr('id')){
			case "btn_1":
				if(current_dir=="ori") cam="rot"; break;
				if(current_dir=="rot") cam="inv"; break;
				if(current_dir=="inv") cam="rev"; break;
				if(current_dir=="rev") cam="ori"; break;
			case "btn_2":
				if(current_dir=="ori") cam="rev"; break;
				if(current_dir=="rev") cam="inv"; break;
				if(current_dir=="inv") cam="rot"; break;
				if(current_dir=="rot") cam="ori"; break;
			default: break;
		}
		var	lol=rotatePlayerPos(cam,posA,len);
		posA.y=lol.y;
		posA.x=lol.x;
		console.log(current_dir+"_"+posA.y+","+posA.x);
		showCurrent();
	})
}
var	posA={y:4,x:9},
	current_dir="ori";

function showCurrent(){
	$('#name'+posA.y+"_"+posA.x).addClass('current');
}
$(document).ready(function(){
	//var gog=[1,2,3,4,5];
	//createPlayerBubble(gog);
	createTiles(15);
	addButtons(15);
	showCurrent();
});

function rotateLevel(arr, dir){
	var a=[];
	for(var h=0, j=arr.length-1; h<arr.length, j>=0; h++, j--){
		a[h]=addEmptyArr(arr.length);
		for(var n=0, m=arr.length-1; n<arr.length, m>=0; n++, m--){
			switch(dir){
				case 'ori':
					a[h][n]=arr[h][n];
					break;
				case "rot":
					a[h][n]=arr[m][h];
					break;
				case "rev":
					a[h][n]=arr[n][j];
					break;
				case "inv":
					a[h][n]=arr[j][m];
					break;
				default: break;
			}
		}
	}
	return a;
}

function rotatePlayerPos(hand,pos,len){
	var a=[];
	for(var h=0;h<len;h++) a[h]=addEmptyArr(len);
	a[pos.y][pos.x]="hier";
	var b=rotateLevel(a,hand);
	//console.log(a);
	for(var y=0;y<len;y++){
		for(var x=0;x<len;x++){
			if(b[y][x]=="hier"){
				//console.log(y+","+x);
				//rot_click++;
				return {y,x};
			}
		}
	}
}
function addEmptyArr(tot){
	var e=[];
	for(var h=0; h<tot; h++){
		e.push("u");
	}
	return e;
}