window.onload = change(5, 1);

function change(M, D) {
	var gaussianConstant = 1 / Math.sqrt(2 * Math.PI);

	function normal(x) {
	    x = (x - M) / D;
	    return gaussianConstant * Math.exp(-0.5 * x * x) / D;
	}

	function getDataForNormal(labels, data) {
	    for (var i = -4; i <= 4; ++i) {
	    	var x = M + i*D;
	    	labels.push(x);
	    	data.push(normal(x));
		}
	}

	var labels = [], data = [];
	getDataForNormal(labels, data);

	var ctx1 = document.getElementById('myChart1').getContext('2d');
    var scatterChart1 = new Chart(ctx1, { 
        type: 'line',
          data: {
            labels: labels,
            datasets: [{ 
                data: data,
                label: "Normal distribution",
                borderColor: "rgb(153, 102, 255)" ,
                fill: true
              }]
          },
          options: {
            title: {
              display: true
            },
            scales: {
                yAxes: [{ 
                  scaleLabel: {
                    display: true,
                    labelString: "f(x)"
                  }
                }],

                xAxes: [{ 
                  scaleLabel: {
                    display: true,
                    labelString: "x"
                  }
                }]
            }
        }
    });
	
	function factorial(i){
        if (i === 0)
            return 1;
        else
           return i * factorial(i - 1);
    }

   	function poisson(i) {
   		return (Math.pow(M, i) / factorial(i)) * Math.exp(-M);
	}

	function getDataForPoisson(labels, data) {
	    for (var i = 0; i <= M + 15; ++i) {
	    	labels.push(i);
	    	data.push(poisson(i));
	    	console.log("dfdfgbrtrt");
		}
	}

	var labels1 = [], data1 = [];
	getDataForPoisson(labels1, data1);


    var ctx2 = document.getElementById('myChart2').getContext('2d');
    var scatterChart2 = new Chart(ctx2, { 
        type: 'line',
          data: {
            labels: labels1,
            datasets: [{ 
                data: data1,
                label: "Poisson distribution",
                borderColor: "rgb(255, 159, 64)" ,
                fill: true
              }]
          },
          options: {
            title: {
              display: true
            },
            scales: {
                yAxes: [{ 
                  scaleLabel: {
                    display: true,
                    labelString: "f(x)"
                  }
                }],

                xAxes: [{ 
                  scaleLabel: {
                    display: true,
                    labelString: "x"
                  }
                }]
            }
        }
    });
}

document.getElementById('analysis').addEventListener('click', function() {
	M = document.getElementById('M').value;
	D = document.getElementById('D').value;	
	change(Number(M), Number(D));
});