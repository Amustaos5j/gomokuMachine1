var canvas=document.getElementById('canvas');
var ctx=canvas.getContext('2d');
var canvasSize=360;
canvas.width=canvas.height=canvasSize;

var stoneMap=[];
var stoneMapSize=15;

function clearStoneMap()
{
	for(var i=0;i<stoneMapSize**2;i++)
	{
		stoneMap[i]=0;
	}
}
function putStone(type,x,y)
{
	if(stoneMap[x+y*stoneMapSize]!=0)
	{
		return;
	}
	stoneMap[x+y*stoneMapSize]=type;
	var n=[1,1,1,1];
	for(var i=1;i<5;i++)
	{
		if(getStone(x+i,y)!=type)
		{
			break;
		}
		n[0]++;
	}
	for(var i=1;i<5;i++)
	{
		if(getStone(x-i,y)!=type)
		{
			break;
		}
		n[0]++;
	}
	for(var i=1;i<5;i++)
	{
		if(getStone(x,y+i)!=type)
		{
			break;
		}
		n[1]++;
	}
	for(var i=1;i<5;i++)
	{
		if(getStone(x,y-i)!=type)
		{
			break;
		}
		n[1]++;
	}
	for(var i=1;i<5;i++)
	{
		if(getStone(x+i,y+i)!=type)
		{
			break;
		}
		n[2]++;
	}
	for(var i=1;i<5;i++)
	{
		if(getStone(x-i,y-i)!=type)
		{
			break;
		}
		n[2]++;
	}
	for(var i=1;i<5;i++)
	{
		if(getStone(x+i,y-i)!=type)
		{
			break;
		}
		n[3]++;
	}
	for(var i=1;i<5;i++)
	{
		if(getStone(x-i,y+i)!=type)
		{
			break;
		}
		n[3]++;
	}
	if(n[0]>=5||n[1]>=5||n[2]>=5||n[3]>=5)
	{
		winGame(type);
		winPos=[x,y];
	}
	goLevelArr=goLevel();
}
function getStone(x,y)
{
	if(x<0||stoneMapSize<=x||y<0||stoneMapSize<=y)
	{
		return 0;
	}
	return stoneMap[x+y*stoneMapSize];
}
function drawStoneMap()
{
	var cssms=canvasSize/stoneMapSize;
	ctx.fillStyle='#ffffff';
	ctx.fillRect(0,0,canvasSize,canvasSize);
	ctx.beginPath();
	for(var x=0;x<stoneMapSize;x++)
	{
		ctx.moveTo(x*cssms+cssms/2,0);
		ctx.lineTo(x*cssms+cssms/2,canvasSize);
		ctx.moveTo(0,x*cssms+cssms/2);
		ctx.lineTo(canvasSize,x*cssms+cssms/2);
	}
	ctx.strokeStyle='#000000';
	ctx.lineWidth=1;
	ctx.stroke();
}
function drawStone(type,x,y)
{
	var cssms=canvasSize/stoneMapSize;
	ctx.beginPath();
	ctx.arc(cssms*x+cssms/2,cssms*y+cssms/2,cssms/2,0,Math.PI*2,true);
	if(type==1)
	{
		ctx.fillStyle='#000000';
	}
	if(type==2)
	{
		ctx.fillStyle='#ffffff';
	}
	ctx.fill();
	ctx.lineWidth=2;
	ctx.strokeStyle='#7f7f7f';
	ctx.stroke();
}
function stoneMapToArray()
{
	var t,arr=[];
	for(var x=0;x<stoneMapSize;x++)
	{
		for(var y=0;y<stoneMapSize;y++)
		{
			t=getStone(x,y);
			arr[x+y*stoneMapSize]=t==1?-1:t==2?1:0;
		}
	}
	return arr;
}
function winGame(type)
{
	win=true;
	console.log(type+' is winner');
}
function restart()
{
	clearStoneMap();
	player=starter;
	win=false;
	winPos=null;
	goLevelArr=goLevel();
}
canvas.onmousedown=function(e)
{
	if(e.button!=0)
	{
		return;
	}
	if(win==true)
	{
		restart();
		return;
	}
	if(player==1)
	{
		var x=e.layerX;
		var y=e.layerY;
		var cssms=canvasSize/stoneMapSize;
		x=Math.floor(x/cssms);
		y=Math.floor(y/cssms);
		if(!getStone(x,y))
		{
			player=2;
			putStone(1,x,y);
			if(win==false)
			{
				doComputer();
			}
		}
	}
};

function goLevel()
{
	var arr=stoneMapToArray().map(x=>x==-1?2:x);
	
	for(var i=0;i<stoneMapSize**2;i++)
	{
		if(arr[i]==0)
		{
			let x=i%stoneMapSize;
			let y=Math.floor(i/stoneMapSize);
			arr[i]=-1.5+Math.sqrt((stoneMapSize/2-x)**2+(stoneMapSize/2-y)**2)/Math.sqrt((stoneMapSize/2)**2+(stoneMapSize/2)**2);
		}
	}
	
	var ty=(function(){
		var o=-1;
		var y=3;
		var f=6;
		var m=16;
		var i=64;
		return(
		[
			[
				[
					[i,o,o,o,o,i]
				],
				[
					[i],
					[o],
					[o],
					[o],
					[o],
					[i]
				],
				[
					[i,0,0,0,0,0],
					[0,o,0,0,0,0],
					[0,0,o,0,0,0],
					[0,0,0,o,0,0],
					[0,0,0,0,o,0],
					[0,0,0,0,0,i],
				],
				[
					[0,0,0,0,0,i],
					[0,0,0,0,o,0],
					[0,0,0,o,0,0],
					[0,0,o,0,0,0],
					[0,o,0,0,0,0],
					[i,0,0,0,0,0],
				]
			],
			[
				[
					[m,o,o,o,m]
				],
				[
					[m],
					[o],
					[o],
					[o],
					[m],
				],
				[
					[m,0,0,0,0],
					[0,o,0,0,0],
					[0,0,o,0,0],
					[0,0,0,o,0],
					[0,0,0,0,m],
				],
				[
					[0,0,0,0,m],
					[0,0,0,o,0],
					[0,0,o,0,0],
					[0,o,0,0,0],
					[m,0,0,0,0],
				]
			],
			[
				[
					[f,o,o,f]
				],
				[
					[f],
					[o],
					[o],
					[f]
				],
				[
					[f,0,0,0],
					[0,o,0,0],
					[0,0,o,0],
					[0,0,0,f]
				],
				[
					[0,0,0,f],
					[0,0,o,0],
					[0,o,0,0],
					[f,0,0,0]
				]
			],
			[
				[
					[y,y,y],
					[y,o,y],
					[y,y,y]
				]
			]
		]);
	})();
	
	for(var p=1;p<=2;p++)
	{
		for(var x=-1;x<stoneMapSize;x++)
		{
			for(var y=-1;y<stoneMapSize;y++)
			{
				for(var i=0;i<ty.length;i++)
				{
					for(var j=0;j<ty[i].length;j++)
					{
						let filter=ty[i][j];
						let w=filter[0].length;
						let h=filter.length;
						
						let end=false;
						if(x+w-2<stoneMapSize&&y+h-2<stoneMapSize)
						{
							for(var x2=0;x2<w;x2++)
							{
								for(var y2=0;y2<h;y2++)
								{
									if(i<ty.length-1&&filter[y2][x2]>0&&getStone(x+x2,y+y2)==p)
									{
										end=true;
										break;
									}
									if(filter[y2][x2]==-1&&getStone(x+x2,y+y2)!=p)
									{
										end=true;
										break;
									}
								}
								if(end)
								{
									break;
								}
							}
							if(!end)
							{
								for(var x2=0;x2<w;x2++)
								{
									for(var y2=0;y2<h;y2++)
									{
										let xx=x+x2;
										let yy=y+y2;
										if(filter[y2][x2]>0&&getStone(x+x2,y+y2)==0&&0<=xx&&xx<stoneMapSize&&0<=yy&&yy<stoneMapSize)
										{
											if(arr[yy*stoneMapSize+xx]==0)
											{
												arr[yy*stoneMapSize+xx]=-1;
											}
											arr[yy*stoneMapSize+xx]-=filter[y2][x2];
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
	return arr.map(x=>x>0?0:x);
}

var goLevelArr;

function doComputer()
{
	if(player==2)
	{
		var minIndex=0;
		for(var i=0;i<goLevelArr.length;i++)
		{
			if(goLevelArr[i]<goLevelArr[minIndex])
			{
				minIndex=i;
			}
		}
		
		putStone(2,minIndex%stoneMapSize,Math.floor(minIndex/stoneMapSize));
		player=1;
	}
}

function doComputer2()
{
	if(player==1)
	{
		var minIndex=0;
		for(var i=0;i<goLevelArr.length;i++)
		{
			if(goLevelArr[i]<goLevelArr[minIndex])
			{
				minIndex=i;
			}
		}
		
		putStone(1,minIndex%stoneMapSize,Math.floor(minIndex/stoneMapSize));
		player=2;
	}
}

var DRAW=false;
var winPos=null;

function drawer()
{
	if(!win)
	{
		if(player==1)
		{
			//doComputer2();
		}
		else
		{
			doComputer();
		}
	}
	var t;
	drawStoneMap();
	var cssms=canvasSize/stoneMapSize;
	function p(n)
	{
		return '0'.repeat(2-(n=n.toString(16)).length)+n;
	}
	for(var x=0;x<stoneMapSize;x++)
	{
		for(var y=0;y<stoneMapSize;y++)
		{
			t=getStone(x,y);
			if(t!=0)
			{
				drawStone(t,x,y);
			}
			if(DRAW)
			{
				let co=-goLevelArr[y*stoneMapSize+x]+1;
				if(co>3)
				{
					co=Math.floor(Math.max(Math.min(255-Math.log(co)*50,255),0));
					ctx.globalAlpha=0.5;
					ctx.fillStyle='#ff'+p(co)+p(co);
					ctx.fillRect(cssms*x,cssms*y,cssms,cssms);
					ctx.globalAlpha=1;
				}
			}
		}
	}
	if(winPos!=null)
	{
		ctx.globalAlpha=0.5;
		ctx.fillStyle='#00ff00';
		ctx.fillRect(cssms*winPos[0],cssms*winPos[1],cssms,cssms);
		ctx.globalAlpha=1;
	}
}
setInterval(drawer);

var starter=1;
var player=starter;
var win=false;

function main()
{
	restart();
}