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
		$('#name'+pos.y+"_"+pos.x).css({background: 'white', color: 'black'});
		var	beb=$(this).attr('id'),
			y=pos.y, x=pos.x;
		switch(beb){
			case 'btn_1':
				if(current_pos=="ori"){
					y*=-1;
					y+=len;
					current_pos='rot';
				}if(current_pos=="rot"){
					x*=-1;
					x+=len;
					current_pos="inv";
				}if(current_pos=="inv"){
					y*=-1;
					y+=len;
					current_pos='rev';
				}if(current_pos=="rev"){
					x*=-1;
					x+=len;
					current_pos="ori";
				}
				break;
			case 'btn_2':

				break;
			default: break;
		}
		pos.y=y;
		pos.x=x;
		console.log(current_pos);
		console.log(pos);
		showCurrent();
	})
}
var	pos={y:4,x:9},
	current_pos="ori";

function showCurrent(){
	$('#name'+pos.y+"_"+pos.x).addClass('current');
}
$(document).ready(function(){
	//var gog=[1,2,3,4,5];
	//createPlayerBubble(gog);
	createTiles(15);
	addButtons(15);
	showCurrent();
});