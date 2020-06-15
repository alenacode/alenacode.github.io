window.onload = change(10, 1);

function change(intervals, method) {
    var data = [];
    var intervalsArr = [];
    for(var j = 0.; j <= 1; j += (1/intervals).toFixed(2)*1 + 1e-16)
        intervalsArr.push(Number(String(j).substr(0, 3)));
    
    intervalsArr.push(1);

    //  Метод срединных квадратов
    function midSquareMethod(amount) {
        var S1 = [];
        let Random = seed => {
            if(seed < 0.1)
                seed = getRand();
            seed = middle(seed*seed);
            return seed;
        };

        var tmp1 = getRand(), tmp2 = getRand();
        for (var i = 0; i < amount; i++) {
            S1.push(tmp1 / 10**(String(tmp1).length));
            tmp1 = Random(tmp1);
            tmp2 = Random(tmp2);
        }

        return S1;
    }

    //  Метод срединных произведений
    function medianMethod(amount) {
        var S1 = [];
        let Random = (seed) => {
            if(seed < 0.1)
                seed = getRand()*getRand();
            seed = middle(seed);
            return seed;
        };

        var s1 = getRand(),     s2 = getRand(),     tmp1 = Random(s1*s2);
        var s11 = getRand(),    s22 = getRand(),    tmp2 = Random(s11*s22);
        for (var i = 0; i < amount; i++) {
            S1.push(tmp1 / 10**(String(tmp1).length));
            s1 = s2;    s2 = tmp1;   tmp1 = Random(s1*s2);
            s11 = s22;  s22 = tmp2; tmp2 = Random(s11*s22);
        }

        return S1;
    }

    //  Метод перемешивания
    function mixingMethod(amount) {
        var S1 = [];
        let Random = (seed) => {
            if(String(seed).length % 2 < 4)
                seed = getRand();
            seed = String(seed);
            x1 = Number(seed.substr(2) + seed.substr(0, 2));
            x2 = Number(seed.substr(-2) + seed.substr(0, -2));
            return x1 + x2;
        };  

        var tmp1 = getRand(), tmp2 = getRand();
        for (var i = 0; i < amount; i++) {
            S1.push(tmp1 / 10**(String(tmp1).length));
            tmp1 = Random(tmp1);
            tmp2 = Random(tmp2);
        }

        return S1;
    }

    //  Линейный конгруэнтный метод
    function linearCongruentMethod(amount) {
        var S1 = [];
        var a = 16803,  b = 12345,  m = 106371823,  r = 2;
        var a1 = 16801, b1 = 12345, m1 = 106856823, r1 = 2;

        for (var i = 0; i < amount; i++) {
            S1.push(r1 / m);
            r = (a * r + b) % m;
            r1 = (a1 * r1 + b1) % m1;
        }

        return S1;
    }

    function middle(x) {
        if(String(x).length%2 < 4)
            return getRand();

        if (String(x).length%2 != 0) 
            x = Math.floor(x/10);

        while(String(x).length != 4){
            x = String(x).substr(1);
            x = x.substr(0, x.length - 1); 
        }

        return Number(x);
    }

    function getRand() {
        return Math.floor((Math.random() * (100000 - 1 + 1)) + 1);
    }

    function getAvg (data, num) {
        var sum = 0;
        for(var i = 0; i < data.length; ++i)
            sum += data[i];
        return sum / num;
    }

    function getDoubleData (data) {
       for(var i = 0; i < data.length; ++i)
            data[i] = data[i]**2;
        return data; 
    }

    function getMx (data, num) {
        return getAvg(data, num);
    }

    function getDx (data, num, Mx) {
        return getAvg(getDoubleData(data), num) - Mx*Mx;
    }

    function intervalMap (data) {
        var map = new Map();

        for(var j = 0.; j < intervalsArr.length; ++j){
            map.set(intervalsArr[j], 0);
            for(var i = 0; i < data.length; ++i) {
                if(data[i] < intervalsArr[j+1] && data[i] > intervalsArr[j]) {
                    var val = map.get(intervalsArr[j]);
                    map.set(intervalsArr[j], val+1);
                }
            }
        }
       
        return map;
    }

    function getDataForChart(data) {
        var map = intervalMap(data); 
        var result = [];
        var i = 0;

        for (var val of map.values()) {
            result.push(val);
            ++i;
        }

        return result;
    }

    function getDataForAnalysis(amount) {
        var data = [];
        switch (method) {
          case 1:
            data = midSquareMethod(amount);       
            break;
          
          case 2:
            data = medianMethod(amount);       
            break;
          
          case 3:
            data = mixingMethod(amount);       
            break;
          
          case 4:
            data = linearCongruentMethod(amount);       
            break;
        }  

        return data;
    }

    function getLabels() {
        var labels = [];
        for (var i = 0; i < intervals; ++i)
            labels[i] = i;
        
        return labels;
    }

    function output(data1, data2) {
        var dt1 = data1.slice(), dt2 = data2.slice();
        document.getElementById('Mx100').innerHTML = getMx(dt1, 100).toFixed(5)/1;
        document.getElementById('Dx100').innerHTML = getDx(dt1, 100, getMx(dt1, 100)).toFixed(5)/1;
        document.getElementById('Mx10000').innerHTML = getMx(dt2, 1000).toFixed(5)/1;
        document.getElementById('Dx10000').innerHTML = getDx(dt2, 1000, getMx(dt2, 1000)).toFixed(5)/1;
    }

    function getRg() {
        var sequence = [], r = [];
        for(var i = 10; i < 1000; ++i) {
            sequence = getDataForAnalysis(i);
            var sum = 0;
            for(var j = 0; j < sequence.length-1; ++j)
                sum += sequence[j]*sequence[j+1];

            r.push(12 * (sum / (i-1)) - 3.5);
        }

        return r;
    }

    function getCorNums() {
        var labels = [];
        for (var i = 0; i < 1000; ++i)
            labels[i] = i;
        
        return labels;
    }

    function getElemets (amount, data) {
        var str = "";
        for(var j = 0; j < intervalsArr.length; ++j)
            for(var i = 0; i < data.length; ++i)
                if(data[i] < intervalsArr[j+1] && data[i] > intervalsArr[j]) 
                    str += 'Interval = ' + intervalsArr[j] + ' - ' + intervalsArr[j+1] + '\tNumber = ' + data[i].toFixed(5)/1 + '\n';

        return str;
    }

    var data1 = getDataForAnalysis(100), data2 = getDataForAnalysis(1000);
    output(data1, data2);
    document.getElementById('out1').innerHTML = getElemets(100, data1);
    document.getElementById('out2').innerHTML = getElemets(1000, data2);


    var ctx3 = document.getElementById('myChart3').getContext('2d');
    var scatterChart3 = new Chart(ctx3, { 
        type: 'line',
          data: {
            labels: getLabels(),
            datasets: [{ 
                data: getDataForChart(data1),
                label: "Frequency test (N=100)",
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
                    labelString: "Interval frequency"
                  }
                }],

                xAxes: [{ 
                  scaleLabel: {
                    display: true,
                    labelString: "Number of interval"
                  }
                }]
            }
        }
    });

    var ctx4 = document.getElementById('myChart4').getContext('2d'); 
    var scatterChart4 = new Chart(ctx4, {
        type: 'line',
        data: {
            labels: getLabels(),
            datasets: [{ 
                data: getDataForChart(data2),
                label: "Frequency test (N=1000)",
                borderColor: "rgb(255, 99, 132)",
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
                    labelString: "Interval frequency"
                  }
                }],

                xAxes: [{ 
                  scaleLabel: {
                    display: true,
                    labelString: "Number of interval"
                  }
                }]
            }
        }
    });

    var ctx5 = document.getElementById('myChart5').getContext('2d'); 
    var scatterChart5 = new Chart(ctx5, {
        type: 'line',
        data: {
            labels: getCorNums(),
            datasets: [{ 
                data: getRg(),
                label: "Correlation",
                borderColor: "rgb(255, 159, 64)",
                fill: false
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
                    labelString: "Sequence length"
                  }
                }],

                xAxes: [{ 
                  scaleLabel: {
                    display: true,
                    labelString: "Correlation of pairs of numbers"
                  }
                }]
            }
        }
    });
};

document.getElementById('analysis').addEventListener('click', function() {
    var intervals = document.getElementById('intervals').value;
    var select = document.getElementById('sel');    
    change(intervals, Number(select.value));       
});

