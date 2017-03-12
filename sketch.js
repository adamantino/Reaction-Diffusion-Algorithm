// youtube: https://www.youtube.com/watch?v=BV9ny785UNc
// website: http://karlsims.com/rd.html

var grid;
var next;

//var Da = 1;
//var Db = 0.4;
//var feed = 0.0367;
//var k = 0.0649;

// initial version
var Da = 1;
var Db = 0.5;
var feed = 0.055;
var k = 0.062;

// separating dots
//var Da = 1;
//var Db = 0.5;
//var feed = 0.0367;
//var k = 0.0649;



function setup() {
	createCanvas(200, 200);
	pixelDensity(1);

	grid = [];
	next = [];

	for(var x = 0; x < width; x++){
		grid[x] = [];
		next[x] = [];
		for(var y = 0; y < height; y++){
			grid[x][y] = { a: 1 , b: 0};
			next[x][y] = { a: 1 , b: 0};
		}
	}


	var sizX = random(35);
	var centX = floor((width/2-sizX) + sizX);

	var sizY = random(35);
	var centY = floor((height/2-sizY) + sizY);


	for(var i = centX; i < (centX + sizX); i++){
		for(var j = centY; j < (centY + sizY); j++){
			grid[i][j].a = 0.1;
			grid[i][j].b = 1;
		}
	}

}

function draw(){
	background(52);

	for(var x = 1; x < width-1; x++){
		for(var y = 1; y < height-1; y++){
			var pix = (x + y * width) * 4;
			var a = grid[x][y].a;
			var b = grid[x][y].b;
			next[x][y].a = a + 
						  (Da * laplace(x, y, "a")) - 
						  (a * b * b) + 
						  (feed * (1 - a));
			next[x][y].b = b + 
						  (Db * laplace(x, y, "b")) + 
						  (a * b * b) - 
						  ((k +feed) * b);

			next[x][y].a = constrain(next[x][y].a, 0, 1);
			next[x][y].b = constrain(next[x][y].b, 0, 1);
		}
	}

	loadPixels();

	for(var x = 0; x < width; x++){
		for(var y = 0; y < height; y++){
			var pix = (x + y * width) * 4;
			var a = next[x][y].a;
			var b = next[x][y].b;
			var c = floor((a-b)*255);
			c = constrain(c, 0, 255);
			pixels[pix + 0] = c;
			pixels[pix + 1] = c;
			pixels[pix + 2] = c;
			pixels[pix + 3] = 255;
		}
	}

	updatePixels();

	swap();

}

function swap(){
	var tmp = grid;
	grid = next;
	next = tmp;
}

function laplace(x, y, ab){
	var sum = 0;

	sum += grid[x][y][ab] * -1;
	sum += grid[x-1][y][ab] * 0.2;
	sum += grid[x+1][y][ab] * 0.2;
	sum += grid[x][y+1][ab] * 0.2;
	sum += grid[x][y-1][ab] * 0.2;
	sum += grid[x-1][y-1][ab] * 0.05; 
	sum += grid[x-1][y+1][ab] * 0.05;
	sum += grid[x+1][y-1][ab] * 0.05;
	sum += grid[x+1][y+1][ab] * 0.05; 

return sum;
}




