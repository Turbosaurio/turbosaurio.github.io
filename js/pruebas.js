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
$(document).ready(function(){
	var gog=[1,2,3,4,5];
	createPlayerBubble(gog);
});