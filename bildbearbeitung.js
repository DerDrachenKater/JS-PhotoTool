/*Funktion zum Laden eines Bildes in den Canvas*/

var imageLoader = document.getElementById('imageLoader');
imageLoader.addEventListener('change', handleImage, false);

/* Funktion zum Laden eines individuellen Bildes in den Canvas*/
function handleImage(e)
{
	var reader    = new FileReader();
	reader.onload = function (event)
	{
		var img    = new Image();
		img.onload = function ()
		{
			draw(this);
		}
		img.src    = event.target.result;
		return img;
	}
	reader.readAsDataURL(e.target.files[0]);
}

/*Überfunktion zum verändern des Canvas, Beim Auswählen einer Funktion innerhalb der draw() Funktion wird das Bild verändert,
 Übergabe der Werte an HTML am Ende der Funktion*/

function draw(img, canvas)
{
	var canvas    = document.getElementById('imageCanvas');
	canvas.width  = img.width;
	canvas.height = img.height;
	var context   = canvas.getContext('2d');
	if (context)
	{
		context.drawImage(img, 0, 0);
	}
	else
	{
		alert("Error: Context not defined!");
	}

	img.style.display = 'none';

	/*Funktion zum Reseten des Bildes im Canvas*/
	function clear()
	{
		draw(img, canvas)
	}

	/*Funktion zum Umwandeln der Farbwerte in Helligkeitswerte*/
	function grayscale()
	{
		var w = canvas.width;
		var h = canvas.height;
		if (canvas.getContext)
		{
			var context = canvas.getContext("2d");
			var pix     = context.getImageData(0, 0, w, h);
			for (var i = 0; i < w * h * 4; i += 4)
			{
				pix.data[i + 0] = 0.299 * pix.data[i + 0] + 0.587 * pix.data[i + 1] + 0.114 * pix.data[i + 2]; //Rot
				pix.data[i + 1] = 0.299 * pix.data[i + 0] + 0.587 * pix.data[i + 1] + 0.114 * pix.data[i + 2]; //Grün
				pix.data[i + 2] = 0.299 * pix.data[i + 0] + 0.587 * pix.data[i + 1] + 0.114 * pix.data[i + 2]; //Blau
			}
			context.putImageData(pix, 0, 0);
		}
		else
		{
			alert("Error: Context not defined!");
		}
	}

	/*Funktion zum Umkehren der Farbwerte*/
	function negative()
	{
		var w = canvas.width;
		var h = canvas.height;
		if (canvas.getContext)
		{
			var context = canvas.getContext("2d");
			var pix     = context.getImageData(0, 0, w, h);
			for (var i = 0; i < w * h * 4; i += 4)
			{
				pix.data[i + 0] = 255 - pix.data[i + 0]; //Rot (255-R)
				pix.data[i + 1] = 255 - pix.data[i + 1]; //Grün (255-G)
				pix.data[i + 2] = 255 - pix.data[i + 2]; //Blau (255-B)
			}
			context.putImageData(pix, 0, 0);
		}
		else
		{
			alert("Error: Context not defined!");
		}
	}

	/*Hilfsfunktion zum Ermitteln der Pixelpositionen*/
	function getPosition(x, y, w)
	{
		return (y * w + x) * 4;
	}

	/*Funktion zum horizontalen Spiegeln des Bildes im Canvas*/
	function flipHorizontal()
	{
		var w = canvas.width;
		var h = canvas.height;
		if (canvas.getContext)
		{
			var context = canvas.getContext("2d");
			var pix     = context.getImageData(0, 0, w, h);
			var pix2    = context.createImageData(w, h);
			for (var x = 0; x < w; x++)
			{
				for (var y = 0; y < h; y++)
				{
					pix2.data[getPosition(x, y, w) + 0] = pix.data[getPosition(w - x - 1, y, w) + 0]; //Rot
					pix2.data[getPosition(x, y, w) + 1] = pix.data[getPosition(w - x - 1, y, w) + 1]; //Grün
					pix2.data[getPosition(x, y, w) + 2] = pix.data[getPosition(w - x - 1, y, w) + 2]; //Blau
					pix2.data[getPosition(x, y, w) + 3] = pix.data[getPosition(w - x - 1, y, w) + 3]; //Alpha
				}
			}
			canvas.width  = w;
			canvas.height = h;
			context.putImageData(pix2, 0, 0);
		}
		else
		{
			alert("Error: Context not defined!");
		}
	}

	/* Funktion zum vertikalen Spiegeln des Bildes im Canvas*/
	function flipVertical()
	{
		var w = canvas.width;
		var h = canvas.height;
		if (canvas.getContext)
		{
			var context = canvas.getContext("2d");
			var pix     = context.getImageData(0, 0, w, h);
			var pix2    = context.createImageData(w, h);
			for (var x = 0; x < w; x++)
			{
				for (var y = 0; y < h; y++)
				{
					pix2.data[getPosition(x, y, w) + 0] = pix.data[getPosition(x, h - y - 1, w) + 0]; 								//Rot
					pix2.data[getPosition(x, y, w) + 1] = pix.data[getPosition(x, h - y - 1, w) + 1];								//Grün
					pix2.data[getPosition(x, y, w) + 2] = pix.data[getPosition(x, h - y - 1, w) + 2]; 								//Blau
					pix2.data[getPosition(x, y, w) + 3] = pix.data[getPosition(x, h - y - 1, w) + 3];								//Alpha
				}
			}
			canvas.width  = w;
			canvas.height = h;
			context.putImageData(pix2, 0, 0);
		}
		else
		{
			alert("Error: Context not defined!");
		}
	}

	/* Funktion zum Rotieren im Uhrzeigersinn*/
	function rotateRight()
	{
		var w = canvas.width;
		var h = canvas.height;
		if (canvas.getContext)
		{
			var context = canvas.getContext("2d");
			var pix     = context.getImageData(0, 0, w, h);
			var pix2    = context.createImageData(h, w);
			for (var x = 0; x <= h; x++)
			{
				for (var y = 0; y <= w; y++)
				{
					pix2.data[getPosition(x, y, h) + 0] = pix.data[getPosition(y, h - x - 1, w) + 0]; 								//Rot
					pix2.data[getPosition(x, y, h) + 1] = pix.data[getPosition(y, h - x - 1, w) + 1]; 								//Grün
					pix2.data[getPosition(x, y, h) + 2] = pix.data[getPosition(y, h - x - 1, w) + 2]; 								//Blau
					pix2.data[getPosition(x, y, h) + 3] = pix.data[getPosition(y, h - x - 1, w) + 3]; 								//Alpha
				}
			}
			canvas.width  = h;
			canvas.height = w;
			context.putImageData(pix2, 0, 0);
		}
		else
		{
			alert("Error: Context not defined!");
		}
	}

	/*Funktion zum rotieren gegen den Uhrzeigersinn*/
	function rotateLeft()
	{
		var w = canvas.width;
		var h = canvas.height;
		if (canvas.getContext)
		{
			var context = canvas.getContext("2d");
			var pix     = context.getImageData(0, 0, w, h);
			var pix2    = context.createImageData(h, w);
			for (var x = 0; x <= h; x++)
			{
				for (var y = 0; y <= w; y++)
				{
					pix2.data[getPosition(x, y, h) + 0] = pix.data[getPosition(w - y - 1, x, w) + 0];								//Rot
					pix2.data[getPosition(x, y, h) + 1] = pix.data[getPosition(w - y - 1, x, w) + 1]; 								//Grün
					pix2.data[getPosition(x, y, h) + 2] = pix.data[getPosition(w - y - 1, x, w) + 2]; 								//Blau
					pix2.data[getPosition(x, y, h) + 3] = pix.data[getPosition(w - y - 1, x, w) + 3]; 								//Alpha
				}
			}
			canvas.width  = h;
			canvas.height = w;
			context.putImageData(pix2, 0, 0);
		}
		else
		{
			alert("Error: Context not defined!");
		}
	}

	/* Funktion zum Verdoppeln des Bildes im Canvas*/
	function doubleImg()
	{
		var w = canvas.width;
		var h = canvas.height;
		if (canvas.getContext)
		{
			var context = canvas.getContext("2d");
			var pix     = context.getImageData(0, 0, w, h);
			var pix2    = context.createImageData(w * 2, h * 2);
			for (var x = 0; x < w * 2; x++)
			{
				for (var y = 0; y < h * 2; y++)
				{
					pix2.data[getPosition(x, y, w * 2) + 0] =
						pix.data[getPosition(Math.floor(x / 2), Math.floor(y / 2), w) + 0]; 	//Rot
					pix2.data[getPosition(x, y, w * 2) + 1] =
						pix.data[getPosition(Math.floor(x / 2), Math.floor(y / 2), w) + 1]; 	//Grün
					pix2.data[getPosition(x, y, w * 2) + 2] =
						pix.data[getPosition(Math.floor(x / 2), Math.floor(y / 2), w) + 2]; 	//Blau
					pix2.data[getPosition(x, y, w * 2) + 3] =
						pix.data[getPosition(Math.floor(x / 2), Math.floor(y / 2), w) + 3]; 	//Alpha
				}
			}
			canvas.width  = w * 2;
			canvas.height = h * 2;
			context.putImageData(pix2, 0, 0);
		}
		else
		{
			alert("Error: Context not defined!");
		}
	}

	/*Funktion zum Halbieren des Bildes im Canvas*/
	function halveImg()
	{
		var breite     = canvas.width / 2;
		var hoehe      = canvas.height / 2;
		var breite_alt = canvas.width;
		var hoehe_alt  = canvas.height;
		var hilfe      = 0;
		var context    = canvas.getContext("2d");
		var pix        = context.getImageData(0, 0, breite_alt, hoehe_alt);
		var pix2       = context.createImageData(breite, hoehe);
		for (var j = 0; j < hoehe_alt; j += 2)
		{
			for (var i = 0; i < breite_alt * 4; i += 8)
			{
				pix2.data[4 * hilfe]     = pix.data[i + breite_alt * (j - 1) * 4];
				pix2.data[4 * hilfe + 1] = pix.data[1 + i + breite_alt * (j - 1) * 4];
				pix2.data[4 * hilfe + 2] = pix.data[2 + i + breite_alt * (j - 1) * 4];
				pix2.data[4 * hilfe + 3] = pix.data[3 + i + breite_alt * (j - 1) * 4];
				hilfe++;
			}
		}
		canvas.width  = breite;
		canvas.height = hoehe;
		context.putImageData(pix2, 0, 0);
	}

	/* Funktion zur Kantenerkennung mit Sobel-Operator*/
	function edges()
	{
		var w = canvas.width;
		var h = canvas.height;
		if (canvas.getContext)
		{
			var context = canvas.getContext("2d");
			var pix     = context.getImageData(0, 0, w, h);
			var pix2    = context.createImageData(w, h);
			for (var x = 1; x < w - 1; x++)
			{
				for (var y = 1; y < h - 1; y++)
				{
					var newValue = (-1 * pix.data[getPosition(x - 1, y - 1, w)] +
					                0 * pix.data[getPosition(x, y - 1, w)] +
					                1 * pix.data[getPosition(x + 1, y - 1, w)] +
					                -2 * pix.data[getPosition(x - 1, y, w)] +
					                0 * pix.data[getPosition(x, y, w)] +
					                2 * pix.data[getPosition(x + 1, y, w)] +
					                -1 * pix.data[getPosition(x - 1, y + 1, w)] +
					                0 * pix.data[getPosition(x, y + 1, w)] +
					                1 * pix.data[getPosition(x + 1, y + 1, w)]);
					if (newValue >= 30)
					{
						pix2.data[getPosition(x, y, w) + 0] = 127;
						pix2.data[getPosition(x, y, w) + 1] = 127;
						pix2.data[getPosition(x, y, w) + 2] = 127;
						pix2.data[getPosition(x, y, w) + 3] = pix.data[getPosition(x, y, w) + 3];
					}
					else
					{
						pix2.data[getPosition(x, y, w) + 0] = 0;
						pix2.data[getPosition(x, y, w) + 1] = 0;
						pix2.data[getPosition(x, y, w) + 2] = 0;
						pix2.data[getPosition(x, y, w) + 3] = pix.data[getPosition(x, y, w) + 3];
					}

				}
			}
			for (var x = 1; x < w - 1; x++)
			{
				for (var y = 1; y < h - 1; y++)
				{
					var newValue = (-1 * pix.data[getPosition(x - 1, y - 1, w)] +
					                -2 * pix.data[getPosition(x, y - 1, w)] +
					                -1 * pix.data[getPosition(x + 1, y - 1, w)] +
					                0 * pix.data[getPosition(x - 1, y, w)] +
					                0 * pix.data[getPosition(x, y, w)] +
					                0 * pix.data[getPosition(x + 1, y, w)] +
					                1 * pix.data[getPosition(x - 1, y + 1, w)] +
					                2 * pix.data[getPosition(x, y + 1, w)] +
					                1 * pix.data[getPosition(x + 1, y + 1, w)]);

					if (newValue >= 30)
					{
						pix2.data[getPosition(x, y, w) + 0] = pix2.data[getPosition(x, y, w) + 0] + 127;
						pix2.data[getPosition(x, y, w) + 1] = pix2.data[getPosition(x, y, w) + 1] + 127;
						pix2.data[getPosition(x, y, w) + 2] = pix2.data[getPosition(x, y, w) + 2] + 127;
						pix2.data[getPosition(x, y, w) + 3] = pix.data[getPosition(x, y, w) + 3];
					}
					else
					{
						pix2.data[getPosition(x, y, w) + 0] = 0;
						pix2.data[getPosition(x, y, w) + 1] = 0;
						pix2.data[getPosition(x, y, w) + 2] = 0;
						pix2.data[getPosition(x, y, w) + 3] = pix.data[getPosition(x, y, w) + 3];
					}
				}
				context.putImageData(pix2, 0, 0);
			}
		}
		else
		{
			alert("Error: Context not defined!");
		}
	}

	/*Funktion zur Rauschunterdrückung mit Gauss-Algorithmus*/
	function supressor()
	{
		var w        = canvas.width;
		var h        = canvas.height;
		var position = 1;
		var pixelr;
		var pixelg;
		var pixelb;
		var context  = canvas.getContext("2d");
		var pix      = context.getImageData(0, 0, w, h);
		var pix2     = context.createImageData(w, h);
		for (var x = 1; x < h - 1; x++)
		{
			for (var y = 4; y < 4 + (w * 4); y += 4)
			{
				pixelr =
					1 * pix.data[(y - 4) + w * (x - 2) * 4] + 2 * pix.data[(y) + w * (x - 2) * 4] + 1 * pix.data[(y + 4) + w * (x - 2) * 4] +
					2 * pix.data[(y - 4) + w * (x - 1) * 4] + 4 * pix.data[(y) + w * (x - 1) * 4] + 2 * pix.data[(y + 4) + w * (x - 1) * 4] +
					1 * pix.data[(y - 4) + w * (x) * 4] + 2 * pix.data[(y) + w * (x) * 4] + 1 * pix.data[(y + 4) + w * (x) * 4];

				pixelg =
					1 * pix.data[1 + (y - 4) + w * (x - 2) * 4] + 2 * pix.data[1 + (y) + w * (x - 2) * 4] + 1 * pix.data[1 + (y + 4) + w * (x - 2) * 4] +
					2 * pix.data[1 + (y - 4) + w * (x - 1) * 4] + 4 * pix.data[1 + (y) + w * (x - 1) * 4] + 2 * pix.data[1 + (y + 4) + w * (x - 1) * 4] +
					1 * pix.data[1 + (y - 4) + w * (x) * 4] + 2 * pix.data[1 + (y) + w * (x) * 4] + 1 * pix.data[1 + (y + 4) + w * (x) * 4];

				pixelb =
					1 * pix.data[2 + (y - 4) + w * (x - 2) * 4] + 2 * pix.data[2 + (y) + w * (x - 2) * 4] + 1 * pix.data[2 + (y + 4) + w * (x - 2) * 4] +
					2 * pix.data[2 + (y - 4) + w * (x - 1) * 4] + 4 * pix.data[2 + (y) + w * (x - 1) * 4] + 2 * pix.data[2 + (y + 4) + w * (x - 1) * 4] +
					1 * pix.data[2 + (y - 4) + w * (x) * 4] + 2 * pix.data[2 + (y) + w * (x) * 4] + 1 * pix.data[2 + (y + 4) + w * (x) * 4];

				pix2.data[4 * position]     = pixelr / 16;
				pix2.data[4 * position + 1] = pixelg / 16;
				pix2.data[4 * position + 2] = pixelb / 16;
				pix2.data[4 * position + 3] = 255;
				position++;
			}
		}
		canvas.width  = w;
		canvas.height = h;
		context.putImageData(pix2, 0, 0);
	}

	/*Hilfsfunktion zur Erstellung des Kontrastes und der Helligkeit*/
	function brighter(value)
	{
		if (value > 255)
		{
			return 255;
		}
		else if (value < 0)
		{
			return 0;
		}
		else
		{
			return value;
		}
	}

	/*Funktion zur Kontraständerung*/
	function contrast()
	{
		var w = canvas.width;
		var h = canvas.height;
		if (canvas.getContext)
		{
			var context   = canvas.getContext('2d');
			var pixel     = context.getImageData(0, 0, w, h);
			var threshold = (parseInt(document.getElementById("contrastrng").value) + 127) / 128;
			for (var i = 0; i < canvas.width * canvas.height * 4; i += 4)
			{
				pixel.data[i]     = brighter(pixel.data[i] * threshold);
				pixel.data[i + 1] = brighter(pixel.data[i + 1] * threshold);
				pixel.data[i + 2] = brighter(pixel.data[i + 2] * threshold);
			}
			context.putImageData(pixel, 0, 0);
		}
		else
		{
			alert("Error: Context not defined");
		}
	}

	/*Funktion zur Änderung der Helligkeit*/
	function brightness()
	{
		var w = canvas.width;
		var h = canvas.height;
		if (canvas.getContext)
		{
			var context   = canvas.getContext('2d');
			var pixel     = context.getImageData(0, 0, w, h);
			var threshold = parseInt(document.getElementById('brightnessrng').value);
			for (var i = 0; i < w * h * 4; i += 4)
			{
				pixel.data[i]     = brighter(pixel.data[i] + threshold);
				pixel.data[i + 1] = brighter(pixel.data[i + 1] + threshold);
				pixel.data[i + 2] = brighter(pixel.data[i + 2] + threshold);
			}
			context.putImageData(pixel, 0, 0);
		}
		else
		{
			alert("Error: Context not defined");
		}
	}

	/*Hilfsfunktion zur Erstellung von Schwarz-Weiß-Bild*/
	function decision_bw(hue, border)
	{
		if (hue >= border)
		{
			return hue = 255;
		}
		else
		{
			return hue = 0;
		}
	}

	/*Funktion zur Erzeugung eines Binärbildes*/
	function blackwhite()
	{
		var w = canvas.width;
		var h = canvas.height;
		if (canvas.getContext)
		{
			var context   = canvas.getContext('2d');
			var pixel     = context.getImageData(0, 0, w, h);
			var threshold = parseInt(document.getElementById('blackwhiterng').value) + 127;
			for (var i = 0; i < w * h * 4; i += 4)
			{
				pixel.data[i]     =
					decision_bw((pixel.data[i] * 0.299 + pixel.data[i + 1] * 0.587 + pixel.data[i + 2] * 0.114),
					            threshold);
				pixel.data[i + 1] =
					decision_bw((pixel.data[i] * 0.299 + pixel.data[i + 1] * 0.587 + pixel.data[i + 2] * 0.114),
					            threshold);
				pixel.data[i + 2] =
					decision_bw((pixel.data[i] * 0.299 + pixel.data[i + 1] * 0.587 + pixel.data[i + 2] * 0.114),
					            threshold);
			}
			context.putImageData(pixel, 0, 0);
		}
		else
		{
			alert("Error: Context not defined");
		}
	}

	/*Funktion zur Manipulation der Farbwerte*/
	function colors()
	{
		redRng   = parseInt(document.getElementById("redRng").value);
		greenRng = parseInt(document.getElementById("greenRng").value);
		blueRng  = parseInt(document.getElementById("blueRng").value);
		var w    = canvas.width;
		var h    = canvas.height;
		if (canvas.getContext)
		{
			var context = canvas.getContext("2d");
			var pix     = context.getImageData(0, 0, w, h);
			for (var i = 0; i < w * h * 4; i += 4)
			{
				if (pix.data[i + 0] + redRng > 255)
				{
					pix.data[i + 0] = 255;
				}
				else if (pix.data[i + 0] + redRng < 0)
				{
					pix.data[i + 0] = 0;
				}
				else
				{
					pix.data[i + 0] += redRng;
				}
				if (pix.data[i + 1] + greenRng > 255)
				{
					pix.data[i + 1] = 255;
				}
				else if (pix.data[i + 1] + greenRng < 0)
				{
					pix.data[i + 1] = 0;
				}
				else
				{
					pix.data[i + 1] += greenRng;
				}
				if (pix.data[i + 2] + blueRng > 255)
				{
					pix.data[i + 2] = 255;
				}
				else if (pix.data[i + 2] + blueRng < 0)
				{
					pix.data[i + 2] = 0;
				}
				else
				{
					pix.data[i + 2] += blueRng;
				}
			}
			context.putImageData(pix, 0, 0);
		}
		else
		{
			alert("Error: Context not defined!");
		}
	}

	/*Übergabe Werte an HTML*/

	/*Übergabe grayscale() an grayscalebtn */
	var grayscalebtn = document.getElementById('grayscalebtn');
	grayscalebtn.addEventListener('click', grayscale, false);

	/*Übergabe negative() an negativebtn*/
	var negativebtn = document.getElementById('negativebtn');
	negativebtn.addEventListener('click', negative);

	/*Übergabe flipHorizontal() an flipHbtn*/
	var flipHbtn = document.getElementById('flipHbtn');
	flipHbtn.addEventListener('click', flipHorizontal, false);

	/*Übergabe flipVertical() an flipVbtn*/
	var flipVbtn = document.getElementById('flipVbtn');
	flipVbtn.addEventListener('click', flipVertical, false);

	/*Übergabe doubleImg() an doubleImgbtn*/
	var doubleImgbtn = document.getElementById('doubleImgbtn');
	doubleImgbtn.addEventListener('click', doubleImg);

	/*Übergabe halveImg() an halveImgbtn*/
	var halveImgbtn = document.getElementById('halveImgbtn');
	halveImgbtn.addEventListener('click', halveImg, false);

	/*Übergabe rotateRight() an rotateRbtn*/
	var rotateRbtn = document.getElementById('rotateRbtn');
	rotateRbtn.addEventListener('click', rotateRight, false);

	/*Übergabe rotateLeft() an rotateLbtn*/
	var rotateLbtn = document.getElementById('rotateLbtn');
	rotateLbtn.addEventListener('click', rotateLeft, false);

	/*Übergabe edges() an edgesbtn*/
	var edgesbtn = document.getElementById('edgesbtn');
	edgesbtn.addEventListener('click', edges, false);

	/*Übergabe contrast() an contrastbtn*/
	var contrastrng = document.getElementById('contrastrng')
	contrastrng.addEventListener('change', contrast, false);

	/*Übergabe brightness() an brightnessbtn*/
	var brightnessrng = document.getElementById('brightnessrng');
	brightnessrng.addEventListener('change', brightness, false);

	/*Übergabe blackwhite() an blackwhitebtn*/
	var blackwhiterng = document.getElementById('blackwhiterng');
	blackwhiterng.addEventListener('change', blackwhite, false);

	/*Übergabe colors() an redRngb*/
	var redRng = document.getElementById('redRng');
	redRng.addEventListener('input', colors, false);

	/*Übergabe colors() an greenRng*/
	var greenRng = document.getElementById('greenRng');
	greenRng.addEventListener('input', colors, false);

	/*Übergabe colors() an blueRng*/
	var blueRng = document.getElementById('blueRng');
	blueRng.addEventListener('input', colors, false);

	/*Übergabe supressor() an supressbtn*/
	var supressbtn = document.getElementById('supressbtn');
	supressbtn.addEventListener('click', supressor, false);

	/*Übergabe clear() an clearbtn*/
	var clearbtn = document.getElementById('clearbtn');
	clearbtn.addEventListener('click', clear, false);
}
