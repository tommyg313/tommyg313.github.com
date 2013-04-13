
function init()
{
	frogger = new frog(100,475,16,33,"TF");

	lives = 3;
	level = 1;
	time = 0;
	
	score = 0;
	high_score = 0;	
	score_init();
	current_row = -1;
	
	pressed = new Object;
	pressed['LEFT'] = false;
	pressed['RIGHT'] = false;
	pressed['UP'] = false;
	pressed['DOWN'] = false;
	
	logs_init();
	cars_init();
	home_loc_init();
		
	prev_pressed = false;
	
	
	fly = new Fly(0,0,16,16);
	
	TIMER = 0;
	DEAD_TIMER = 20;
	FLY_H_TIMER = 0;
	FLY_S_TIMER = 0;
	FLY_DURATION = 0;
	
	isDead = false;

}

function Fly(x,y,w,h)
{
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.box = new boundBox(x,y,w,h);
	this.show = false;
	this.hidden = true;
	
}


function home_loc_init()
{
	homeLoc = new Array();
	
	homeLoc[0] = new home(4,68,48,37);
	homeLoc[1] = new home(89,68,48,37);
	homeLoc[2] = new home(174,68,48,37);
	homeLoc[3] = new home(260,68,48,37);
	homeLoc[4] = new home(346,68,48,37);
	
}

function logs_init()
{	
	logs_r1 = new Array();
	logs_r2 = new Array();
	logs_r3 = new Array();
	logs_r4 = new Array();
	logs_r5 = new Array();
	
	//LOG ROW 1
	var r1_x = 100;
	for(var l1=0; l1<3; l1++)
	{	
		logs_r1[l1] = new log(r1_x,117,1.5,"med",116,21);
		r1_x-=160;
	}
	log_row1 = new Log_Row(logs_r1,160,250,"right");
	
	
	//LOG ROW 2
	var r2_x = 350;
	for(var l2=0; l2<3; l2++)
	{
		logs_r2[l2] = new log(r2_x,148,-2.5,"small",84,21);
		r2_x+=100;
	}
	log_row2 = new Log_Row(logs_r2,100,300,"left");
	
	
	//LOG ROW 3
	var r3_x = 150;
	for(var l3=0; l3<2; l3++)
	{
		logs_r3[l3] = new log(r3_x,179,2.75,"big",177,21);
		r3_x -= 350;
	}
	log_row3 = new Log_Row(logs_r3,350,300,"right");
	
	
	//LOG ROW 4
	var r4_x = 200;
	for(var l4=0; l4<2; l4++)
	{
		logs_r4[l4] = new log(r4_x,210,-1.75,"med",116,21);
		r4_x+=300;
	}
	log_row4 = new Log_Row(logs_r4,300,300,"left");
	
	
	//LOG ROW 5
	var r5_x = 250;
	for(var l5=0; l5<4; l5++)
	{
		logs_r5[l5] = new log(r5_x,241,4,"small",84,21);
		r5_x-=150;
	}
	log_row5 = new Log_Row(logs_r5,150,150,"right");
	
}
	
function cars_init()
{
	cars_r1 = new Array();
	cars_r2 = new Array();
	cars_r3 = new Array();
	cars_r4 = new Array();
	cars_r5 = new Array();
	
	//CAR ROW 1
	var rc1_x = 300;
	for(var c1=0; c1<3; c1++)
	{
		cars_r1[c1] = new car(rc1_x,313,-2,"yellow",27,27);
		rc1_x+=100;
	}
	car_row1 = new Car_Row(cars_r1,100,350,"left");
	
	
	//CAR ROW 2
	var rc2_x = 200;
	for(var c2=0; c2<4; c2++)
	{
		cars_r2[c2] = new car(rc2_x,344,3,"green",25,26);
		rc2_x-=200;
	}
	car_row2 = new Car_Row(cars_r2,200,250,"right");
	
	//CAR ROW 3
	var rc3_x = 100;
	for(var c3=0; c3<5; c3++)
	{
		cars_r3[c3] = new car(rc3_x,375,-1.25,"truck",49,21);
		rc3_x+=100;
	}
	car_row3 = new Car_Row(cars_r3,100,200,"left");
	
	//CAR ROW 4
	var rc4_x = 225;
	for(var c4=0; c4<8; c4++)
	{
		cars_r4[c4] = new car(rc4_x,406,.5,"tractor",26,23);
		rc4_x-=100;
	}
	car_row4 = new Car_Row(cars_r4,100,100,"right");
	
	//CAR ROW 5
	var rc5_x = 350;
	for(var c5=0; c5<3; c5++)
	{
		cars_r5[c5] = new car(rc5_x,437,-6,"purple",31,22);
		rc5_x+=200;
	}
	car_row5 = new Car_Row(cars_r5,200,250,"left");
}

function score_init()
{

	rowScore = new Array();
	num_rows = 11;
	
	for(var i=0; i<num_rows; i++)
	{
		rowScore[i] = false;
	}
	
}

function frog(x_pos,y_pos,x_vel,y_vel,state)
{
	this.x_pos = x_pos;
	this.y_pos = y_pos;
	this.x_vel = x_vel;
	this.y_vel = y_vel;
	this.state = state;
	this.box = new boundBox(x_pos,y_pos,28,24);
	this.isSafe = false;
	this.onLog = false;
}

//class for a log
function log(x_pos,y_pos,vel,flavor,width,height)
{
	this.x_pos = x_pos;
	this.y_pos = y_pos;
	this.vel = vel;
	this.flavor = flavor;
	this.width = width;
	this.height = height;
	this.box = new boundBox(x_pos,y_pos,width,height);
	
}

//class for a car
function car(x_pos,y_pos,vel,flavor,width,height)
{
	this.x_pos = x_pos;
	this.y_pos = y_pos;
	this.vel = vel;
	this.flavor = flavor;
	this.width = width;
	this.height = height;
	this.box = new boundBox(x_pos,y_pos,width,height);
}

function boundBox(x,y,w,h)
{
	this.center_x = (x+(.5*w));
	this.center_y = (y+(.5*h));
	this.w = w;
	this.h = h;
}

function Car_Row(cars,inter_space,line_space,dir)
{
	this.cars = cars;
	this.inter_space = inter_space;
	this.line_space = line_space;
	this.dir = dir;
}

function Log_Row(logs,inter_space,line_space,dir)
{
	this.logs = logs;
	this.inter_space = inter_space;
	this.line_space = line_space;
	this.dir = dir;
}

function home(x,y,w,h)
{
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.hasFrog = false;
}

function update()
{
	updateFrogger();
	
	frogger.onLog = false;
	
	updateLogs(log_row1);
	updateLogs(log_row2);
	updateLogs(log_row3);
	updateLogs(log_row4);
	updateLogs(log_row5);
	
	
	if(frogger.y_pos < 277 && frogger.y_pos > 107 && frogger.onLog == false)
	{
		lost_life();
	}
	
	
	updateCars(car_row1);
	updateCars(car_row2);
	updateCars(car_row3);
	updateCars(car_row4);
	updateCars(car_row5);
	
	updateFly();
	
	updateHome();
	updateScore();
	
}


function updateFrogger()
{

	if(isDead == false)
	{
		if(frogger.y_pos < 100 && frogger.isSafe == false)
		{
			lost_life();
		}
		
		if(prev_pressed == false)
		{
			if(pressed['LEFT'] == true)
			{
				frogger.x_pos -= frogger.x_vel;
				prev_pressed = true;
				jump_sound.play();
			}
			else if(pressed['RIGHT'] == true)
			{
				frogger.x_pos += frogger.x_vel;
				prev_pressed = true;
				jump_sound.play();
			}
			else if(pressed['UP'] == true)
			{
				frogger.y_pos -= frogger.y_vel;
				prev_pressed = true;
				current_row+=1;
				jump_sound.play();
			}
			else if(pressed['DOWN'] == true)
			{
				frogger.y_pos += frogger.y_vel;
				prev_pressed = true;
				current_row-=1;
				jump_sound.play();
			}
		}
		
		frogger.box.center_x = (frogger.x_pos + (.5*frogger.box.w));
		frogger.box.center_y = (frogger.y_pos + (.5*frogger.box.h));
		
		if(frogger.x_pos > 399 || frogger.x_pos < 0 || frogger.y_pos > 500)
		{
			lost_life();
		}
		
		if(frogCollide(fly.box) == true)
		{
			score+=200;
			fly.hidden = true;
			FLY_S_TIMER = 0;
			fly.show = false;
			FLY_H_TIMER = 0;
		}
			
	}
	else
	{
		if(TIMER<DEAD_TIMER)
		{
			TIMER+=1;
		}
		else
		{
			TIMER = 0;
			isDead = false;
		}

	}
	
}
		
function updateLogs(log_row)
{
	
	var len = log_row.logs.length
	for(var i = 0; i<len; i++)
	{
		if(log_row.dir == "right")
		{
			if(log_row.logs[i].x_pos < 400)
			{
				log_row.logs[i].x_pos += log_row.logs[i].vel;
			}
			else {
				if(i == 0)
				{
					log_row.logs[i].x_pos = log_row.logs[len-1].x_pos - log_row.line_space;
				}
				else{
					log_row.logs[i].x_pos = log_row.logs[i-1].x_pos - log_row.inter_space;
				}
			}
		}
		else
		{
			if((log_row.logs[i].x_pos + log_row.logs[i].width) > 0)
			{
				log_row.logs[i].x_pos += log_row.logs[i].vel;
			}
			else {
				if(i == 0)
				{
					log_row.logs[i].x_pos = log_row.logs[len-1].x_pos + log_row.line_space;
				}
				else{
					log_row.logs[i].x_pos = log_row.logs[i-1].x_pos + log_row.inter_space;
				}
			}
		}
		
		
		log_row.logs[i].box.center_x = (log_row.logs[i].x_pos + (.5*log_row.logs[i].box.w));
	
		if(frogCollide(log_row.logs[i].box) == true)
		{
			frogger.x_pos+=log_row.logs[i].vel;
			frogger.onLog = true;
		}
	
	}
	
}


function updateCars(car_row)
{
	var len = car_row.cars.length
	for(var i = 0; i<len; i++)
	{
		if(car_row.dir == "right")
		{
			if(car_row.cars[i].x_pos < 400)
			{
				car_row.cars[i].x_pos += car_row.cars[i].vel;
			}
			else {
				if(i == 0)
				{
					car_row.cars[i].x_pos = car_row.cars[len-1].x_pos - car_row.line_space;
				}
				else{
					car_row.cars[i].x_pos = car_row.cars[i-1].x_pos - car_row.inter_space;
				}
			}
		}
		else
		{
			if((car_row.cars[i].x_pos + car_row.cars[i].width) > 0)
			{
				car_row.cars[i].x_pos += car_row.cars[i].vel;
			}
			
			else {
				if(i == 0)
				{
					car_row.cars[i].x_pos = car_row.cars[len-1].x_pos + car_row.line_space;
				}
				else{
					car_row.cars[i].x_pos = car_row.cars[i-1].x_pos + car_row.inter_space;
				}
			}
			
		}
		
		
		car_row.cars[i].box.center_x = (car_row.cars[i].x_pos + (.5*car_row.cars[i].box.w));
		
		if(frogCollide(car_row.cars[i].box) == true)
		{
			lost_life();
			
		}
		
	}
		
}

function updateScore()
{
	if(current_row >=0 && current_row <=10)
	{
		if(rowScore[current_row] == false)
		{
			score+=10;
			rowScore[current_row] = true;
		}
	}
	
	if(homeLoc[0].hasFrog == true && homeLoc[1].hasFrog == true && homeLoc[2].hasFrog == true && homeLoc[3].hasFrog == true && homeLoc[4].hasFrog == true)
	{
		score+=1000;
		
		for(var i=0; i<5; i++)
		{
			homeLoc[i].hasFrog = false;
		}
		
		if(lives < 5)
		{
			lives+=1;
		}
		
		win_game();
		
	}
	
}

function updateHome()
{
	for(var i=0; i<5; i++)
	{
		if(isHome(homeLoc[i]) == true)
		{
			home_sound.play();
			homeLoc[i].hasFrog = true;
			score+=50;
			frogger.x_pos = 100;
			frogger.y_pos = 475;
			for(var r=0; r<11; r++)
			{
				rowScore[r] = false;
			}
			current_row = -1;
		}
		
		//if there is already a frog in a home position, kill the newly jumped one
		if(isHome(homeLoc[i]) == true && homeLoc[i].hasFrog == true)
		{
			lost_life();
		}
	}
		
}


function hideFly()
{
	if(fly.hidden == true && FLY_H_TIMER == 0)
	{
		raw_hide = (Math.floor(Math.random()*1000)+1);
		if(raw_hide < 500)
		{
			FLY_HIDE_TIMER = raw_hide + 200;
		}
		else
		{
			FLY_HIDE_TIMER = raw_hide;
		}
	}
}
	

function showFly()
{
	raw_dur = Math.floor((Math.random()*500)+1);
	if(raw_dur < 500)
	{
		FLY_DURATION = raw_dur + 200;
	}
	else
	{
		FLY_DURATION = raw_dur;
	}
	
	fly.x = Math.floor((Math.random()*383)+1);
	fly.box.center_x = fly.x + (.5*fly.box.w);
	
	var good_y_pos = false;
	
	while(good_y_pos == false)
	{
		y_pos = (Math.floor(Math.random()*565)+1);
		
		if(y_pos > 109 && y_pos < 475)
		{
			fly.y = y_pos;
			fly.box.center_y = fly.y + (.5*fly.box.h);
			good_y_pos = true;
		}
	}
}

function updateFly()
{
	hideFly();
	if(fly.hidden == true && (FLY_H_TIMER<FLY_HIDE_TIMER))
	{
		FLY_H_TIMER+=1;
		fly.x = -20;
		fly.y = -20;
		fly.box.center_x = fly.x + (.5*fly.box.w);
		fly.box.center_y = fly.y + (.5*fly.box.h);
	}
	else if(fly.hidden == true && (FLY_H_TIMER >= FLY_HIDE_TIMER))
	{
		fly.hidden = false;
		showFly();
	}
	else if(fly.hidden == false && (FLY_S_TIMER < FLY_DURATION))
	{
		fly.show = true;
		FLY_S_TIMER+=1;
	}
	else if(fly.hidden == false && (FLY_S_TIMER >= FLY_DURATION))
	{
		fly.hidden = true;
		FLY_S_TIMER = 0;
		fly.show = false;
		FLY_H_TIMER = 0;
	}
	
}


function collision(A,B)
{
	var inWidth;
	var inHeight;
	
	inWidth = (Math.abs(A.center_x - B.center_x)*2) < (A.w + B.w);
	inHeight = (Math.abs(A.center_y - B.center_y)*2) < (A.h + B.h);
	
	return (inWidth && inHeight);
	
}

function frogCollide(object_box)
{
	return (collision(frogger.box,object_box));	
}

function isHome(home)
{
	var inWidth;
	var inHeight;
	
	inWidth = ((frogger.x_pos >= home.x) && ((frogger.x_pos + frogger.box.w) <= (home.x+home.w)));
	inHeight = ((frogger.y_pos >= home.y) && ((frogger.y_pos + frogger.box.h) <= (home.y+home.h)));
	
	return (inWidth && inHeight);
}
	
	
function lost_life()
{
	dead_sound.play();
	lives-=1;
	isDead = true;
	deadX = frogger.x_pos;
	deadY = frogger.y_pos;
	frogger.x_pos = 100;
	frogger.y_pos = 475;
	frogger.box.center_x = (frogger.x_pos + (.5*frogger.box.w));
	frogger.box.center_y = (frogger.y_pos + (.5*frogger.box.h));
	
}

function draw()
{
	// Check if canvas is supported on browser
   if (canvas.getContext) {
	   ctx = canvas.getContext('2d');
	   
	   //fill in water
	   ctx.fillStyle = "#191970";
	   ctx.fillRect (0,0, 399, 283);
	   
	   //fill in road
	   ctx.fillStyle = "#000000";
	   ctx.fillRect (0, 283, 399, 282);
	   
	   //level text
	   ctx.font = "30px Calibri";
	   ctx.fillStyle = "rgb(0,255,0)";
	   ctx.fillText("Level " + level, 100, 530);
	   
	   //score text
	   ctx.font = "17px Calibri";
	   ctx.fillStyle = "rgb(0,255,0)";
	   ctx.fillText("Score: " + score, 5, 560);
	   
	   //high score text
	   ctx.font = "17px Calibri";
	   ctx.fillStyle = "rgb(0,255,0)";
	   ctx.fillText("Highscore: " + high_score, 100, 560);
	   
	   //frogger title
	   ctx.drawImage(image,0,0,399,55,0,0,399,55);
	   
	   //grass
	   ctx.drawImage(image,0,55,399,54,0,55,399,54);
	   
	   //purple edges
	   ctx.drawImage(image,0,119,399,34,0,274,399,34);
	   ctx.drawImage(image,0,119,399,34,0,470,399,34);
	  
	   //LOGS
	   drawLogs(log_row1.logs);
	   drawLogs(log_row2.logs);
	   drawLogs(log_row3.logs);
	   drawLogs(log_row4.logs);
	   drawLogs(log_row5.logs);
	   
	   //CARS
	   drawCars(car_row1.cars);
	   drawCars(car_row2.cars);
	   drawCars(car_row3.cars);
	   drawCars(car_row4.cars);
	   drawCars(car_row5.cars);
	   
	   //FROGGER
	   drawFrogger();
	   
	   //HOME LOCATION FROGS
	   drawHomeFrogs();
	   
	   drawFly();
	   
	   //update number of lives graphic
	   lives_x = 5;
	   lives_y = 510;
	   for(x=0; x<lives; x++){
			ctx.drawImage(image,13,334,17,22,lives_x,lives_y,17,22);
			lives_x = lives_x + 20;
		}
   }
   else {
	   alert('Sorry, canvas is not supported on your browser!');
   }
}

function drawFrogger()
{
	if(isDead == false)
	{
		if(frogger.state == "TF")
		{
			ctx.drawImage(image,10,366,28,24,frogger.x_pos,frogger.y_pos,28,24);
		}
		else if(frogger.state == "BF")
		{
			ctx.drawImage(image,80,369,23,17,frogger.x_pos,frogger.y_pos,23,17);
		}
		else if(frogger.state == "RF")
		{
			ctx.drawImage(image,13,334,17,23,frogger.x_pos,frogger.y_pos,17,23);
		}
		else if(frogger.state == "LF")
		{
			ctx.drawImage(image,82,335,18,23,frogger.x_pos,frogger.y_pos,18,23);
		}
		else if(frogger.state == "TG")
		{
			ctx.drawImage(image,46,366,22,25,frogger.x_pos,frogger.y_pos,22,25);
		}
		else if(frogger.state == "BG")
		{
			ctx.drawImage(image,114,366,22,25,frogger.x_pos,frogger.y_pos,22,25);
		}
		else if(frogger.state == "LG")
		{
			ctx.drawImage(image,112,338,25,22,frogger.x_pos,frogger.y_pos,25,22);
		}
		else if(frogger.state == "RG")
		{
			ctx.drawImage(image,43,335,25,22,frogger.x_pos,frogger.y_pos,25,22);
		}
	}
	else
	{
		ctx.drawImage(death_image,0,0,30,30,deadX,deadY,30,30);
	}
	
}

function drawCars(cars_row)
{
	var len = cars_row.length;
	for(var i=0; i<len; i++)
	{
		if(cars_row[i].flavor == "green")
		{
			ctx.drawImage(image,46,264,25,26,cars_row[i].x_pos, cars_row[i].y_pos,25,26);
		}
		else if(cars_row[i].flavor == "yellow")
		{
			ctx.drawImage(image,81,263,27,27,cars_row[i].x_pos, cars_row[i].y_pos,27,27);
		}
		else if(cars_row[i].flavor == "truck")
		{
			ctx.drawImage(image,104,301,49,21,cars_row[i].x_pos, cars_row[i].y_pos,49,21);
		}
		else if(cars_row[i].flavor == "tractor")
		{
			ctx.drawImage(image,71,300,26,23,cars_row[i].x_pos, cars_row[i].y_pos,26,23);
		}
		else if(cars_row[i].flavor == "purple")
		{
			ctx.drawImage(image,9,266,31,22,cars_row[i].x_pos, cars_row[i].y_pos,31,22);
		}
	}
}

function drawLogs(logs_row)
{
	var len = logs_row.length;
	for(var i=0; i<len; i++)
	{
		if(logs_row[i].flavor == "med")
		{
			ctx.drawImage(image,7,198,116,21,logs_row[i].x_pos, logs_row[i].y_pos,116,21);
		}
		else if(logs_row[i].flavor == "big")
		{
			ctx.drawImage(image,7,166,177,21,logs_row[i].x_pos, logs_row[i].y_pos,177,21);
		}
		else if(logs_row[i].flavor == "small")
		{
			ctx.drawImage(image,7,230,84,21,logs_row[i].x_pos, logs_row[i].y_pos,84,21);
		}
	}
	
}

function drawHomeFrogs()
{
	for(var i=0; i<5; i++)
	{
		if(homeLoc[i].hasFrog == true)
		{
			ctx.drawImage(image,80,369,23,17,(homeLoc[i].x+(homeLoc[i].w/4)),(homeLoc[i].y+(homeLoc[i].h/3)),23,17);
		}
	}
}

function drawFly()
{
	if(fly.show == true)
	{
		//(140,236) 16x16
		ctx.drawImage(image,140,236,16,16,fly.x,fly.y,fly.w,fly.h);
	}
}


function game_over()
{
	window.alert("GAME OVAH!\n Your score was: " + score + "!\n\n Press Ok to play more Frogger!");
	location.reload();
}	

function win_game()
{
	frogger.x_pos = 100;
	frogger.y_pos = 475;
	window.alert("Winnah!");
}
	

function start_game()
{
	
	image = new Image();
	image.src = "assets/frogger_sprites.png";
	death_image = new Image();
	death_image.src = "assets/dead_frog.png";
	canvas = document.getElementById('game');
	jump_sound = document.getElementById('jump');
	dead_sound = document.getElementById('dead');
	home_sound = document.getElementById('splash');
	
	image.onload = function(){
		init()
		
		//main game loop
		setInterval(gameLoop,30);
	}
}

function checkDown(key) {

	//left = 37
	//up = 38
	//right = 39
	//down = 40
	
	if(key.keyCode == '39'){
		pressed['RIGHT'] = true;
		frogger.state = "RG";
	}
	else if(key.keyCode == '37') {
		pressed['LEFT'] = true;
		frogger.state = "LG";
	}
	else if(key.keyCode == '38'){
		pressed['UP'] = true;
		frogger.state = "TG";
	}
	else if(key.keyCode == '40'){
		pressed['DOWN'] = true;
		frogger.state = "BG";
	}

}

function checkUp(key) {

	if(key.keyCode == '39'){
		pressed['RIGHT'] = false;
		frogger.state = "RF";
	}
	else if(key.keyCode == '37') {
		pressed['LEFT'] = false;
		frogger.state = "LF";
	}
	else if(key.keyCode == '38'){
		pressed['UP'] = false;
		frogger.state = "TF";
	}
	else if(key.keyCode == '40'){
		pressed['DOWN'] = false;
		frogger.state = "BF";
	}
	
	if(pressed['RIGHT'] == false && pressed['LEFT'] == false && pressed['UP'] == false && pressed['DOWN'] == false)
	{
		prev_pressed = false;
	}
}

function gameLoop()
{
	if(lives > 0)
	{	
		document.onkeydown = checkDown;
		document.onkeyup = checkUp;			   
		update()
		draw()
		
	}
	else
	{
		game_over()
	}	
}