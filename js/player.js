function Player(name,isAlive,status,type,level,skin){
	this.name=name;
	this.isalive=isAlive;
	this.status=status;
	this.type=type;
	this.level=parseInt(level);
	
	this.skin=skin;
	
	switch(type){
		case 'wizard': 
			this.hitPoints=Math.round(level*100/7);
			this.resource=Math.round(level*80/6);
			break;
		case "warrior":
			this.hitPoints=Math.round(level*100*2);
			this.resource=0;
			break;
		case "hunter":
			this.hitPoints=Math.round(level*100);
			this.resource=50;
			break;
		default: break;
	};
};

function PlayerEquipment(owner,weapon,armor,jewel){
	this.owner=owner;
	this.weapon=weapon;
	this.armor=armor;
	this.jewel=armor;
	switch(weapon){
		case "staff": this.weaponDamage=15; break;
		case "sword": this.weaponDamage=14; break;
		case "bow": this.weaponDamage=5; break;
		case "fist": this.weaponDamage=2; break;
		default: break;
	}
};

////////////>>>>>>>>>>>>>>>>>>PLAYER SCRIPTS

var startPos="bloque1_1_1";

function createPlayer(){
	$(playerDiv).append('<div id="jugador1" class="player1"/>');
	var jug=$("#jugador1");
	jug.css({
		"top":($("#"+startPos).css("top")),
		"left":($("#"+startPos).css("left"))
	});
};
function movePlayer(button){
	var	onX=zone1Iso[0][4],
		onY=zone1Iso[0][4];
	switch(button){
		case "up":	onY-=1;	break;
		case "left":	onX-=1;	break;
		case "right":	onX+=1;	break;
		case "down":	onY+=1;	break;
		case "center":	console.log("center camera");	break;
		default: break;
	};
	if(onY && onX) $('#jugador1').animate({"top":onY+"px","left":onX+"px"},200);
	else $("#alerts").text(" You can't move there");
	startPos="bloque1_"+onX+"_"+onY;
	console.log(button);
		/*if($('#bloque1_'+onY+'_'+onX)){
		console.log("x: "+onX+" y: "+onY);
		startPos="bloque1_"+onX+'_'+onY;
		console.log(startPos);
	}else $("#alerts").text("you can't move there");*/
};

function playerControls(){
	var currentX=$('#'+startPos);
	$('#controlUp').click(function(){	movePlayer("up")	});
	$('#controlLe').click(function(){	movePlayer("left")	});
	$('#controlRi').click(function(){	movePlayer("right")	});
	$('#controlDo').click(function(){	movePlayer("down")	});
};