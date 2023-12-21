$(document).ready(function () {

	//Custom dataset. May be implemented trough ajax call	
	dataset = {
		"_desc": "...",
		"source": "https://people.sc.fsu.edu/~jburkardt/datasets/regression/x03.txt",
		"x_label": "Age",
		"x_values": [39, 47, 45, 47, 65, 46, 67, 42, 67, 56, 64, 56, 59, 34, 42, 48, 45, 17, 20, 19, 36, 50, 39, 21, 44, 53, 63, 29, 25, 69],
		"y_label": "Systolic Blood Pressure",
		"y_values": [144, 220, 138, 145, 162, 142, 170, 124, 158, 154, 162, 150, 140, 110, 128, 130, 135, 114, 116, 124, 136, 142, 120, 120, 160, 158, 144, 130, 125, 175]
	}

	dataset1 = {
		"_desc": "...",
		"source": "https://people.sc.fsu.edu/~jburkardt/datasets/regression/x03.txt",
		"x_label": "Age",
		"x_values": [15, 25, 35, 40],
		"y_label": "Systolic Blood Pressure",
		"y_values": [42.1, 36.0, 31.8, 28.7]
	}



	//Below, I plot out the points
	/* START - PLOTLY*/
	let trace = {
		x: dataset.x_values,
		y: dataset.y_values,
		mode: 'markers',
		type: 'scatter',
	};

	//config for Plotly layout
	let layout = {
		title: dataset.info,
		xaxis: {
			title: dataset.x_label,
			titlefont: {
				family: 'Courier New, monospace',
				size: 18,
			}
		},
		yaxis: {
			title: dataset.y_label,
			titlefont: {
				family: 'Courier New, monospace',
				size: 18,
			}
		}
	};

	//an array of traces
	var data = [trace];
	Plotly.newPlot('div_plot', data, layout);
	/* END - PLOTLY*/


	/* Using Simple Linear Regression client-side , https://github.com/mljs/regression-simple-linear */

	//ML-JS stands for Machine Learning code in javascript	
	/* START - ML-JS */
	var x = dataset.x_values;
	//var x=[14,16,27,42,39,50,83];
	//var x=[15,25,35,40];

	var y = dataset.y_values;
	//var y=[2,5,7,9,10,13,20];
	//var y=[42.1,36.0,31.8,28.7];

	//Creates the model. Receives arrays with x and y values.
	const regression = new ML.SimpleLinearRegression(x, y);
	/* END - ML-JS */

	/*
		To put text, use .text('text')

		If you want to use .html(SomeValue), 
		SomeValue should have html tags that can be 
		inside a div it must work too.
	*/
	$('#info').html(regression.toString());

	$('#button_predict').on('click', function () {
		let x_value = Number($('#x_value').val());
		alert(regression.predict(x_value));//use predict function, to get a y value.
	});
});

/*

//Available functions on regression model

//console.log(regression.predict(6.4)); // 5
//console.log(regression.computeX(3.5)); // 2.25

console.log(regression.slope); // 2
console.log(regression.intercept); // -1
console.log(regression.coefficients); // [-1, 2]
console.log(regression.toString()); // 'f(x) = 2 * x - 1'

regression.score(x, y);
// { r: 1, r2: 1, chi2: 0, rmsd: 0 }

const json = regression.toJSON();
// { name: 'simpleLinearRegression', slope: 2, intercept: -1 }
const loaded = SimpleLinearRegression.load(json);
loaded.predict(5) // 9
*/