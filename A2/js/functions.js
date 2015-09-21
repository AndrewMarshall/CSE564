
function drawTrianglePyramid(sideLength){

	var c2 = document.getElementById('c-tr-pyr').getContext('2d');
	c2.save();

	var pixelScaler = 100

	// Clear contents of canvas before drawing
	c2.clearRect(0, 0, 400, 400);
	
	//draw the lines in the front
	c2.beginPath();
	c2.moveTo(0, 3*pixelScaler);
	c2.lineTo(2*pixelScaler, 0);
	c2.lineTo(4*pixelScaler, 2.5*pixelScaler);
	c2.lineTo(3*pixelScaler, 4*pixelScaler);
	c2.lineTo(0, 3*pixelScaler);
	
	c2.moveTo(2*pixelScaler, 0);
	c2.lineTo(3*pixelScaler, 4*pixelScaler);
	c2.closePath();
	c2.stroke();
    
	//draw dotted lines in the back	
	c2.setLineDash([5]);
	c2.moveTo(0, 3*pixelScaler);
	c2.lineTo(4*pixelScaler, 2.5*pixelScaler);
	c2.stroke();

	c2.restore();                 	                                                                
}


function drawSquarePyramid(baseSideLength, topSideLength){

	var c2 = document.getElementById('c-sq-pyr').getContext('2d');
	c2.save();

	var pixelScaler = 100

	// Clear contents of canvas before drawing
	c2.clearRect(0, 0, 500, 400);
	
	//draw the lines in the front
	c2.beginPath();
	c2.moveTo(2.2*pixelScaler, 0);
	c2.lineTo(0, 3.2*pixelScaler);
	c2.lineTo(2.4*pixelScaler, 4*pixelScaler);
	c2.lineTo(2.2*pixelScaler, 0);
	
	c2.moveTo(2.2*pixelScaler, 0);
	c2.lineTo(4.92*pixelScaler, 2.8*pixelScaler);
	c2.lineTo(2.4*pixelScaler, 4*pixelScaler);
	c2.lineTo(2.2*pixelScaler, 0);
	c2.closePath();
	c2.stroke();
    
	//draw dotted lines in the back	
	c2.setLineDash([5]);
	c2.moveTo(0, 3.2*pixelScaler);
	c2.lineTo(2.45*pixelScaler, 2.2*pixelScaler);
	c2.lineTo(2.2*pixelScaler, 0);
	c2.moveTo(2.45*pixelScaler, 2.2*pixelScaler);
	c2.lineTo(4.92*pixelScaler, 2.8*pixelScaler);	
	c2.stroke();

	c2.restore();                             	                                                                
}


function drawCube(sideLength){

	var c2 = document.getElementById('c-cube').getContext('2d');
	c2.save();

	// convert the side length to a scaler between 0 and 100.
	var pixelScaler = 100

	// Clear contents of canvas before drawing
	c2.clearRect(0, 0, 400, 400);

	// draw the front
	c2.beginPath();
	c2.moveTo(0, 4*pixelScaler);
	c2.lineTo(0, 1*pixelScaler);
	c2.lineTo(3*pixelScaler, 1*pixelScaler);
	c2.lineTo(3*pixelScaler, 4*pixelScaler);
	c2.lineTo(0, 4*pixelScaler);
	c2.stroke();

	// draw the top
	c2.beginPath();
	c2.moveTo(0, 1*pixelScaler);
	c2.lineTo(1*pixelScaler, 0);
	c2.lineTo(4*pixelScaler, 0);
	c2.lineTo(3*pixelScaler, 1*pixelScaler);
	c2.stroke();

	// draw the side
	c2.beginPath();
	c2.moveTo(4*pixelScaler, 0);
	c2.lineTo(4*pixelScaler, 3*pixelScaler);
	c2.lineTo(3*pixelScaler, 4*pixelScaler);
	c2.stroke();

	//draw dotted lines in the back	
	c2.setLineDash([5]);
	c2.moveTo(1*pixelScaler, 0);
	c2.lineTo(1*pixelScaler, 3*pixelScaler);
	c2.lineTo(0, 4*pixelScaler);
	c2.moveTo(1*pixelScaler, 3*pixelScaler);
	c2.lineTo(4*pixelScaler, 3*pixelScaler);	
	c2.stroke();

	c2.restore(); 
}

function convertToMeters(val, currentUnit) {
	if (currentUnit == 'cm')
		return val*0.01;
	if (currentUnit == 'meter')
		return val;
	if (currentUnit == 'inch')
		return val*0.0254;
	if (currentUnit == 'yards')
		return val*0.9144
}

function validateInput() {
	var x = $('#search').val();   
	if (isNaN(x) || x==null || x.length==0) {
		alert("Input must be a number");
		return false;
	}
	if ($("input[type=radio]:checked").length == 0) {
		alert("Please select a unit of measurement");
		return false;
	}
	var unit = $("input[type='radio'][name='unit']:checked").val();
	if (x<=0) {
		alert("Input must be greater than 0");
		return false;
	}
	return true
}


function calculate() {
	$('#cube').empty();
	$('#square-pyramid').empty();
	$('#triangle-pyramid').empty();
	$('#ratio').empty();


	if (!validateInput())
		return false;

	var unit = $("input[type='radio'][name='unit']:checked").val();
	var input = $('#search').val();

	// set the ratio of the drawings
	var pixelConversion;
	if (unit == 'cm')
		pixelConversion = 37.795275591;
	if (unit == 'meter')
		pixelConversion = 3779.5275591;
	if (unit == 'inch')
		pixelConversion = 96;
	if (unit == 'yards')
		pixelConversion = 3456;

	var scale = Math.round(input/10*pixelConversion)/100;
	$('#ratio').append('<hr />');
	$('#ratio').append('<h3>Scale: 1 : ' + scale + '</h3>');
	$('#ratio').append('<hr />');
	
	// CUBE
	var sideLength = input/12;
	var volume = sideLength*sideLength*sideLength;
	drawCube(convertToMeters(sideLength, unit));
	$('#cube').append('<p>Side length = ' + sideLength + '</p>');
	$('#cube').append('<p>Max volume = ' + volume + '</p>');

	// SQUARE PYRAMID
	var baseSideLength = 0.1162*input;
	var topSideLength = 0.1338*input;
	var op = baseSideLength*Math.sqrt(2)/2
	var hyp = topSideLength;
	var height = Math.sqrt(hyp*hyp - op*op); 
	var volume = baseSideLength*baseSideLength*height/3;
	drawSquarePyramid(convertToMeters(baseSideLength, unit), convertToMeters(topSideLength, unit))
	$('#square-pyramid').append('<p>Base Side length = ' + baseSideLength + '</p>');
	$('#square-pyramid').append('<p>Diagonal Side length = ' + topSideLength + '</p>');
	$('#square-pyramid').append('<p>Max volume = ' + volume + '</p>');

	// TRIANGLE PYRAMID
	var sideLength = input/6;
	var volume = sideLength*sideLength*sideLength/6*Math.sqrt(2);
	drawTrianglePyramid(sideLength);
	$('#triangle-pyramid').append('<p>Side length = ' + sideLength + '</p>');
	$('#triangle-pyramid').append('<p>Max volume = ' + volume + '</p>');
}



















