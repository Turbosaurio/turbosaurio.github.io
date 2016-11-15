'use strict'
function pressMenu(ind){
	var	kok="#drop"+ind,
		kik="#menuDrop"+ind;
	$(kok).click(function(){
		if($(kik).css("display")=="none"){
			$(kik).slideDown("fast");
		}else{
			$(kik).slideUp("fast");
		}console.log(ind);
	});
	
};
function smallMenu(){
	$('#smallMenu').click(function(){
		$('#menuList,#close').css('display')==='none' ?
		$('#menuList,#close').slideDown('fast') :
		$('#menuList,#close').slideUp('fast')
	});
	$('#medMenu').click(function(){
		$('.eleMenu').css('display')==='none' ?
		$('.eleMenu').slideDown('fast') :
		$('.eleMenu').slideUp('fast')
	});
	$('#close').click(function(){$('#menuList,#socialBottom,#close').slideUp('fast')});
	$('#cinta').css({"top":($('#content').offset(top))+"px"});
};
function addElements(){
	$('body').append('<img id="firma" src="imgs/ts.png" alt="firma"/><img id="cinta" src="imgs/cinta.png"/>')
};

function readAdressBar(){
	var pepe=document.location.href;
	var pope=pepe.search("xyz00aut");
	console.log("#"+pepe.substring(pope,pepe.length));
}
function buttonLoc(){
	$('btn').click(function(){
		var menuH;
		if($('.smallDisplay').css('display')=="block" || $('.mediumDisplay').css('display')=="block"){
			var	mem=$('#menu').css('height');
			menuH=parseInt(mem.substring(0,mem.length-2));
		}else menuH=0;
		var	dis=$(this).attr('dest'),
			des=Math.round($('#'+dis).position().top);
		$("html, body").animate({"scrollTop":des+menuH+"px"});
		$('#top').show();
		buttonTop();
	});
}
function buttonTop(){
	$('#top').click(function(){
		$("html, body").animate({"scrollTop":"0px"});
		$('#top').hide();
	});
}
$(document).ready(function(){
	addElements();
	for(var t=1; t<=5; t++){
		pressMenu(t);
	};
	smallMenu();
	buttonLoc();
});
	