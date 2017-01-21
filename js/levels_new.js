'use strict'
function assignStyles(){
	////////////////////sprites measures
	var	columns=4,
		rows=5,
		perPage=20,
		max=880, ///////////total textures
		x=150, ////////////sprite width
		y=2*x, //////////sprite height
		divSize=document.createElement('style');

	//////////////////////////objects textures

	document.head.appendChild(divSize);
	for(var g=1;g<=max;g++){
		var	a=g%columns,
			c=Math.floor((g-1)/perPage),
			b=Math.floor((g-1)/columns)%rows;
		if(a==0) a=columns;
		a-=1;
		//console.log(g+">> "+"column:" +(a)+", row: "+(b)+", page: "+c);
		var url="url(img/tiles"+c+".png)";
		var sheet=document.createElement('style');
		sheet.innerHTML='.txt'+g+
			'{background-image: '+url+";"+
			'background-position:'+(a*x*-1)+"px"+" "+(b*y*-1)+"px;"+
			'background-repeat: none;}';
		//console.log(sheet);
		document.head.appendChild(sheet);
	};
};

var floor_0=[], floor_1=[], floor_2=[], floor_3=[], floor_4=[], floor_5=[], floor_6=[],floor_7=[], floor_8=[], floor_9=[];

floor_0[0]=[,,,,,,,,,,,,,,,,,,,];
floor_0[1]=[,,,,,,,,,,,,,,,,,,,];
floor_0[2]=[,,,,,,,,,,,,,,,,,,,];
floor_0[3]=[,,,,,,,,,,,,,,,,,,,];
floor_0[4]=[,,,,641,710,714,646,646,646,646,686,690,646,646,642,,,,];
floor_0[5]=[,,,,645,718,718,718,718,718,718,718,718,718,718,647,,,,];
floor_0[6]=[,,,,645,718,718,718,718,718,718,718,718,718,718,647,,,,];
floor_0[7]=[,,,,645,718,718,718,718,718,718,718,718,718,718,647,,,,];
floor_0[8]=[,,,,645,718,718,718,718,718,718,718,718,718,718,647,,,,];
floor_0[9]=[,,,,665,670,670,686,670,670,666,665,658,654,650,642,,,,];
floor_0[10]=[,,,,705,718,718,718,718,718,671,669,718,718,718,647,,,,];
floor_0[11]=[,,,,645,718,681,718,718,718,671,669,718,718,718,647,,,,];
floor_0[12]=[,,,,645,718,718,718,718,718,671,669,718,718,718,647,,,,];
floor_0[13]=[,,,,645,718,718,718,718,718,671,669,718,718,718,647,,,,];
floor_0[14]=[,,,,645,718,718,718,718,718,718,718,718,718,718,647,,,,];
floor_0[15]=[,,,,644,648,648,648,648,648,648,648,648,648,648,643,,,,];
floor_0[16]=[,,,,,,,,,,,,,,,,,,,];
floor_0[17]=[,,,,,,,,,,,,,,,,,,,];
floor_0[18]=[,,,,,,,,,,,,,,,,,,,];
floor_0[19]=[,,,,,,,,,,,,,,,,,,,];
floor_1[0]=[,,,,,,,,,,,,,,,,,,,];
floor_1[1]=[,,,,,,,,,,,,,,,,,,,];
floor_1[2]=[,,,,,,,,,,,,,,,,,,,];
floor_1[3]=[,,,,,,,,,,,,,,,,,,,];
floor_1[4]=[,,,,29,18,378,378,378,378,25,14,14,14,14,30,,,,];
floor_1[5]=[,,,,17,2,2,2,2,2,2,2,2,2,2,19,,,,];
floor_1[6]=[,,,,28,16,12,2,2,2,2,2,2,2,2,19,,,,];
floor_1[7]=[,,,,97,137,13,2,2,2,2,2,2,2,2,19,,,,];
floor_1[8]=[,,,,93,133,13,2,2,2,2,2,2,2,2,19,,,,];
floor_1[9]=[,,,,89,129,13,2,2,2,2,2,2,2,2,19,,,,];
floor_1[10]=[,,,,85,125,13,2,2,2,2,2,2,2,2,19,,,,];
floor_1[11]=[,,,,81,121,13,2,2,2,2,2,2,2,2,19,,,,];
floor_1[12]=[,,,,17,2,2,2,2,2,2,2,2,2,2,19,,,,];
floor_1[13]=[,,,,17,2,2,2,2,2,2,2,2,2,2,19,,,,];
floor_1[14]=[,,,,17,2,2,2,2,2,2,2,2,2,2,19,,,,];
floor_1[15]=[,,,,32,20,20,20,20,20,20,20,20,20,20,31,,,,];
floor_1[16]=[,,,,,,,,,,,,,,,,,,,];
floor_1[17]=[,,,,,,,,,,,,,,,,,,,];
floor_1[18]=[,,,,,,,,,,,,,,,,,,,];
floor_1[19]=[,,,,,,,,,,,,,,,,,,,];
floor_2[0]=[602,602,602,569,602,602,602,602,602,602,602,602,602,602,602,602,602,569,602,602];
floor_2[1]=[602,602,602,569,602,563,602,563,602,563,602,563,602,563,602,563,602,569,602,602];
floor_2[2]=[602,602,602,569,602,602,602,602,602,602,602,602,602,602,602,602,602,569,602,602];
floor_2[3]=[602,602,602,549,542,542,542,542,542,542,542,542,542,542,542,542,542,550,602,602];
floor_2[4]=[602,602,602,541,29,18,18,18,18,18,18,18,18,18,18,30,601,543,602,602];
floor_2[5]=[602,602,602,541,17,2,2,2,2,2,2,2,2,2,2,19,601,543,602,602];
floor_2[6]=[602,602,602,541,17,2,2,2,2,2,2,2,2,2,2,63,601,543,602,602];
floor_2[7]=[602,602,602,541,369,367,2,2,2,2,2,2,2,2,2,67,601,543,602,602];
floor_2[8]=[602,602,602,541,385,367,2,2,2,2,2,2,2,2,2,19,601,543,602,602];
floor_2[9]=[602,602,602,541,385,367,2,2,2,2,2,2,2,2,2,19,601,543,602,602];
floor_2[10]=[602,602,602,541,385,0,205,198,198,198,198,198,242,246,198,210,601,543,602,602];
floor_2[11]=[602,602,602,541,385,0,193,182,182,182,182,182,182,182,182,199,601,543,602,602];
floor_2[12]=[602,602,602,541,385,0,193,182,182,182,182,182,182,182,182,199,601,543,602,602];
floor_2[13]=[602,602,602,541,385,0,208,196,196,196,196,182,182,182,182,199,601,543,602,602];
floor_2[14]=[602,602,602,541,183,183,320,316,312,308,304,182,182,182,182,199,601,543,602,602];
floor_2[15]=[602,602,602,541,183,183,280,276,272,268,264,200,200,200,200,211,601,543,602,602];
floor_2[16]=[602,602,602,552,544,544,544,544,544,544,544,544,544,544,544,544,544,551,602,602];
floor_2[17]=[602,602,602,569,602,602,602,602,602,602,602,602,602,602,602,602,602,569,602,602];
floor_2[18]=[602,602,602,569,602,563,602,563,602,563,602,563,602,563,602,563,602,569,602,602];
floor_2[19]=[602,602,602,569,602,602,602,602,602,602,602,602,602,602,602,602,602,569,602,602];
floor_3[0]=[,,,,,,,,,,,,,,,,,,,];
floor_3[1]=[,,,,,,,,,,,,,,,,,,,];
floor_3[2]=[,,,,,,,,,,,,,,,,,,,];
floor_3[3]=[,,,,,,,,,,,,,,,,,,,];
floor_3[4]=[,,,,205,194,194,194,194,194,194,194,194,194,194,206,,,,];
floor_3[5]=[,,,,193,182,182,182,182,182,182,182,182,182,182,195,,,,];
floor_3[6]=[,,,,193,182,182,182,182,182,182,182,182,182,182,195,,,,];
floor_3[7]=[,,,,193,182,182,182,182,182,182,182,182,182,182,195,,,,];
floor_3[8]=[,,,,193,182,182,182,182,182,182,182,182,182,182,195,,,,];
floor_3[9]=[,,,,193,182,182,182,182,182,182,182,182,182,182,195,,,,];
floor_3[10]=[,,,,193,182,182,182,182,182,182,182,182,182,182,195,,,,];
floor_3[11]=[,,,,193,182,182,182,182,182,182,182,182,182,182,195,,,,];
floor_3[12]=[,,,,193,182,182,182,182,182,182,182,182,182,182,195,,,,];
floor_3[13]=[,,,,193,182,182,182,182,182,182,182,182,182,182,195,,,,];
floor_3[14]=[,,,,193,182,406,406,406,406,402,182,182,182,182,195,,,,];
floor_3[15]=[,,,,208,196,412,428,428,428,431,196,196,196,196,207,,,,];
floor_3[16]=[,,,,,,,,,,,,,,,,,,,];
floor_3[17]=[,,,,,,,,,,,,,,,,,,,];
floor_3[18]=[,,,,,,,,,,,,,,,,,,,];
floor_3[19]=[,,,,,,,,,,,,,,,,,,,];
floor_4[0]=[,,,,,,,,,,,,,,,,,,,];
floor_4[1]=[,,,,,,,,,,,,,,,,,,,];
floor_4[2]=[,,,,,,,,,,,,,,,,,,,];
floor_4[3]=[,,,,,,,,,,,,,,,,,,,];
floor_4[4]=[,,,,2,2,2,2,2,2,2,2,2,2,2,2,,,,];
floor_4[5]=[,,,,2,2,2,2,2,2,2,2,2,2,2,2,,,,];
floor_4[6]=[,,,,2,2,2,2,122,126,130,134,138,2,2,2,,,,];
floor_4[7]=[,,,,2,2,137,2,2,2,2,2,2,2,2,2,,,,];
floor_4[8]=[,,,,2,2,133,2,2,2,2,2,2,123,2,2,,,,];
floor_4[9]=[,,,,2,2,129,2,2,2,2,2,2,127,2,2,,,,];
floor_4[10]=[,,,,2,2,125,2,2,2,2,2,2,131,2,2,,,,];
floor_4[11]=[,,,,2,2,121,2,2,2,2,2,2,135,2,2,,,,];
floor_4[12]=[,,,,2,2,2,2,2,2,2,2,2,139,2,2,,,,];
floor_4[13]=[,,,,2,2,2,140,136,132,128,124,2,2,2,2,,,,];
floor_4[14]=[,,,,2,2,2,2,2,2,2,2,2,2,2,2,,,,];
floor_4[15]=[,,,,2,2,2,2,2,2,2,2,2,2,2,2,,,,];
floor_4[16]=[,,,,,,,,,,,,,,,,,,,];
floor_4[17]=[,,,,,,,,,,,,,,,,,,,];
floor_4[18]=[,,,,,,,,,,,,,,,,,,,];
floor_4[19]=[,,,,,,,,,,,,,,,,,,,];
floor_5[0]=[,,,,,,,,,,,,,,,,,,,];
floor_5[1]=[,,,,,,,,,,,,,,,,,,,];
floor_5[2]=[,,,,,,,,,,,,,,,,,,,];
floor_5[3]=[,,,,,,,,,,,,,,,,,,,];
floor_5[4]=[,,,,2,2,2,2,2,2,2,2,2,2,2,2,,,,];
floor_5[5]=[,,,,2,2,2,2,2,2,2,2,2,2,2,2,,,,];
floor_5[6]=[,,,,2,2,2,2,0,0,0,0,0,2,2,2,,,,];
floor_5[7]=[,,,,2,2,0,2,2,2,2,2,2,2,2,2,,,,];
floor_5[8]=[,,,,2,2,0,2,2,2,2,2,2,0,2,2,,,,];
floor_5[9]=[,,,,2,2,0,2,2,2,2,2,2,0,2,2,,,,];
floor_5[10]=[,,,,2,2,0,2,2,2,2,2,2,0,2,2,,,,];
floor_5[11]=[,,,,2,2,0,2,2,2,2,2,2,0,2,2,,,,];
floor_5[12]=[,,,,2,2,2,2,2,2,2,2,2,0,2,2,,,,];
floor_5[13]=[,,,,2,2,2,0,0,0,0,0,2,2,2,2,,,,];
floor_5[14]=[,,,,2,2,2,2,2,2,2,2,2,2,2,2,,,,];
floor_5[15]=[,,,,2,2,2,2,2,2,2,2,2,2,2,2,,,,];
floor_5[16]=[,,,,,,,,,,,,,,,,,,,];
floor_5[17]=[,,,,,,,,,,,,,,,,,,,];
floor_5[18]=[,,,,,,,,,,,,,,,,,,,];
floor_5[19]=[,,,,,,,,,,,,,,,,,,,];
floor_6[0]=[147,265,266,267,268,269,197,197,197,197,197,197,197,197,173,,,,,];
floor_6[1]=[169,196,196,196,196,426,146,146,146,146,146,146,146,146,203,,,,,];
floor_6[2]=[194,146,146,146,146,146,146,146,146,146,146,146,146,146,203,,,,,];
floor_6[3]=[194,146,146,146,146,146,146,146,146,146,146,146,146,146,203,,,,,];
floor_6[4]=[194,146,146,146,146,146,146,146,146,146,146,146,146,146,203,,,,,];
floor_6[5]=[194,146,363,376,376,376,364,146,146,146,146,146,146,146,203,,,,,];
floor_6[6]=[246,,375,,,,377,146,146,412,411,146,146,146,203,,,,,];
floor_6[7]=[252,,375,,,,377,146,146,412,411,146,146,146,203,,,,,];
floor_6[8]=[252,,375,,,,377,146,146,412,414,146,146,146,203,,,,,];
floor_6[9]=[252,,375,,,,377,146,146,412,411,146,146,146,203,,,,,];
floor_6[10]=[252,,375,,,,377,146,146,412,411,146,146,146,203,,,,,];
floor_6[11]=[252,,,,,,377,146,146,146,429,146,146,146,203,,,,,];
floor_6[12]=[252,,,,,,377,146,146,146,146,146,146,146,203,,,,,];
floor_6[13]=[252,,,,,,377,146,146,146,146,146,146,146,203,,,,,];
floor_6[14]=[379,,,,,,377,200,200,200,200,200,200,200,176,,,,,];
floor_6[15]=[,,,,,,,,,,,,,,,,,,,];
floor_6[16]=[,,,,,,,,,,,,,,,,,,,];
floor_6[17]=[,,,,,,,,,,,,,,,,,,,];
floor_6[18]=[,,,,,,,,,,,,,,,,,,,];
floor_6[19]=[,,,,,,,,,,,,,,,,,,,];
floor_7[0]=[170,270,276,276,276,217,173,,,,,,,,,,,,,];
floor_7[1]=[194,229,229,229,229,148,203,,,,,,,,,,,,,];
floor_7[2]=[194,146,146,146,146,146,203,,,,,,,,,,,,,];
floor_7[3]=[179,200,200,165,166,200,176,,,,,,,,,,,,,];
floor_7[4]=[,,377,290,290,375,,,,,,,,,,,,,,];
floor_7[5]=[,,377,290,290,375,,,,,,,,,,,,,,];
floor_7[6]=[,,377,290,290,375,,,,,,,,,,,,,,];
floor_7[7]=[,,377,290,290,375,,,,,,,,,,,,,,];
floor_7[8]=[,,377,290,290,375,,,,,,,,,,,,,,];
floor_7[9]=[,,377,290,290,375,,,,,,,,,,,,,,];
floor_7[10]=[,,377,290,290,375,,,,,,,,,,,,,,];
floor_7[11]=[,,377,290,290,375,,,,,,,,,,,,,,];
floor_7[12]=[,,377,290,290,375,,,,,,,,,,,,,,];
floor_7[13]=[493,53,53,23,24,53,53,29,,,,,,,,,,,,];
floor_7[14]=[493,2,2,2,2,2,2,59,,,,,,,,,,,,];
floor_7[15]=[486,2,2,2,2,2,2,29,378,378,378,378,378,378,378,378,378,378,378,378];
floor_7[16]=[483,2,2,2,2,2,2,20,475,475,475,475,475,475,475,475,475,475,475,475];
floor_7[17]=[482,2,2,2,2,2,2,19,475,475,475,475,475,475,475,475,475,475,475,475];
floor_7[18]=[481,2,2,2,2,2,2,59,376,376,376,376,376,376,376,376,376,376,376,376];
floor_7[19]=[493,56,56,56,56,56,56,32,,,,,,,,,,,,];
floor_8[0]=[27,54,54,54,54,54,54,54,54,54,54,54,54,54,54,54,54,54,54,30];
floor_8[1]=[51,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,60];
floor_8[2]=[51,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,60];
floor_8[3]=[51,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,60];
floor_8[4]=[51,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,60];
floor_8[5]=[3,113,119,408,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,60];
floor_8[6]=[3,112,118,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,60];
floor_8[7]=[3,111,117,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,60];
floor_8[8]=[3,110,116,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,60];
floor_8[9]=[3,109,115,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,60];
floor_8[10]=[3,25,52,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,60];
floor_8[11]=[3,49,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,60];
floor_8[12]=[3,49,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,60];
floor_8[13]=[493,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,60];
floor_8[14]=[493,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,60];
floor_8[15]=[486,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,60];
floor_8[16]=[483,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,60];
floor_8[17]=[482,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,60];
floor_8[18]=[481,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,60];
floor_8[19]=[493,57,57,57,57,57,57,57,57,57,57,57,57,57,57,57,57,57,57,33];
floor_9[0]=[374,384,384,384,384,384,384,384,384,384,384,384,384,384,384,,,,,];
floor_9[1]=[383,475,475,475,475,475,475,475,475,475,475,475,475,475,381,,,,,];
floor_9[2]=[383,475,475,475,475,475,510,510,510,510,510,475,475,475,381,,,,,];
floor_9[3]=[383,475,475,475,475,475,509,509,509,509,509,475,475,475,381,,,,,];
floor_9[4]=[383,475,475,475,475,475,508,508,508,508,508,475,475,475,381,,,,,];
floor_9[5]=[383,527,528,475,475,475,518,518,518,518,518,475,475,475,381,,,,,];
floor_9[6]=[383,527,528,475,475,475,507,507,507,507,507,475,475,475,381,,,,,];
floor_9[7]=[383,527,528,475,475,475,506,506,506,506,506,475,475,475,381,,,,,];
floor_9[8]=[383,527,528,475,475,475,505,505,505,505,505,475,475,475,381,,,,,];
floor_9[9]=[383,525,526,475,475,475,475,475,475,475,475,475,475,475,381,,,,,];
floor_9[10]=[383,475,475,475,475,475,475,475,475,475,475,475,475,475,381,,,,,];
floor_9[11]=[383,475,475,475,475,524,475,475,475,475,475,523,475,475,381,,,,,];
floor_9[12]=[383,475,475,475,475,475,475,475,475,475,475,475,475,475,381,,,,,];
floor_9[13]=[383,475,475,475,475,475,475,475,475,475,475,475,475,475,381,,,,,];
floor_9[14]=[367,382,382,382,382,382,382,382,382,382,382,382,382,382,373,,,,,];
floor_9[15]=[,,,,,,,,,,,,,,,,,,,];
floor_9[16]=[,,,,,,,,,,,,,,,,,,,];
floor_9[17]=[,,,,,,,,,,,,,,,,,,,];
floor_9[18]=[,,,,,,,,,,,,,,,,,,,];
floor_9[19]=[,,,,,,,,,,,,,,,,,,,];