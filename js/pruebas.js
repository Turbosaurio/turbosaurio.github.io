'use strict'

$(document).ready(function(){
	for(var g=0;g<40;g++){
		var x;
		if(g%4==0){x=-3;}
		else {x=1};
		console.log(g+": "+x);
	}
	
});