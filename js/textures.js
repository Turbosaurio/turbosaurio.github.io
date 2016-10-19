'use strict'
function assignStyles(){
	////////////////////sprites measures
	var	columns=6,
		rows=6,
		max=360, ///////////total textures
		maxObj=48,	///////////total objects
		x=300/2, ////////////sprite width
		y=2*x, //////////sprite height
		url,
		px="px",
		divSize=document.createElement('style');

	//////////////////////////objects textures
	divSize.innerHTML=
		'.floor,	#objectArea	{	padding:0px;	margin:0px;	position:absolute;	}'+
		'.floor div	{	position: absolute;	color: white;	display: none;	width: '+x+'px;	height: '+y+'px;		margin: 0px;	padding: 0px;	}'+
		'.objects div	{	position: absolute;	color: white;	display: block;	width: '+x+'px;	height: '+y+'px;		margin: 0px;	padding: 0px;	}';
	document.head.appendChild(divSize);
	for(var g=1;g<=max;g++){
		var	a,b,
			yolo=g%columns-1,
			yalo=Math.ceil(g/rows)-1;
			
		yolo<0 ? a=5*x*-1 : a=yolo*x*-1;
		b=(yalo)*y*-1;
		a+=px;
		b+=px;
		url="url(img/texture"+(Math.ceil(g/24))+".png)";
		var sheet=document.createElement('style');
		sheet.innerHTML='.texture'+g+'{background: '+url+" "+a+" "+b+';}';
		document.head.appendChild(sheet);
	};
	for(var g=1;g<=maxObj;g++){
		var	a,b,
			yolo=g%columns-1,
			yalo=Math.ceil(g/rows)-1;
			
		yolo<0 ? a=5*x*-1 : a=yolo*x*-1;
		b=(yalo)*y*-1;
		a+=px;
		b+=px;
		url="url(img/objects"+(Math.ceil(g/24))+".png)";
		var sheet=document.createElement('style');
		sheet.innerHTML='.object'+g+'{background: '+url+" "+a+" "+b+';}';
		document.head.appendChild(sheet);
	};
};
assignStyles();