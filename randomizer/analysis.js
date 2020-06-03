window.onload = change(10, 1);

function change(intervals, method) {
    //  Метод срединных квадратов
    function midSquareMethod(amount) {
        var S1 = [];
        let Random = seed => {
            if(seed < 1)
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
            if(seed < 1)
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
        var a = 16807,  b = 12345,  m = 1073741823,  r = 2;
        var a1 = 15805, b1 = 12345, m1 = 1048576823, r1 = 2;

        for (var i = 0; i < amount; i++) {
            S1.push(r1 / m);
            r = (a * r + b) % m;
            r1 = (a1 * r1 + b1) % m1;
        }

        return S1;
    }

    function intervalMap (data) {
        var map = new Map();
        var mapForOutput = new Map();

        for(var j = (1/intervals).toFixed(3)/1; j < 1; j += (1/intervals).toFixed(3)/1){
            map.set(j, 0);
            for(var i = 0; i < data.length; ++i) {
                if(data[i] < j && data[i] > (j - 1/intervals)){
                    var val = map.get(j);
                    map.set(j, val+1);
                }
            }
        }

        return map;
    }

    function getRand() {
        return Math.floor((Math.random() * (100000 - 1 + 1)) + 1);
    }

    function getSum (data, num) {
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
        return getSum(data, num);
    }

    function getDx (data, num, Mx) {
        return getSum(getDoubleData(data), num) - Mx*Mx;
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

    function getDataForChart(amount) {
        var sequence = getDataForAnalysis(amount);      
        var map = intervalMap(sequence); 
        var data = [];
        var i = 0;
        for (let val of map.values()) {
            data.push(val);
            ++i;
        }

        return data;
    }

    function getDataForAnalysis(amount) {
        var sequence = [];
        switch (method) {
          case 1:
            sequence = midSquareMethod(amount);       
            break;
          
          case 2:
            sequence = medianMethod(amount);       
            break;
          
          case 3:
            sequence = mixingMethod(amount);       
            break;
          
          case 4:
            sequence = linearCongruentMethod(amount);       
            break;
        }  

        return sequence;
    }

    function getLabels() {
        var labels = [];
        for (var i = 0; i < intervals; ++i)
            labels[i] = i;
        
        return labels;
    }

    function output() {
        var sequence1 = getDataForAnalysis(100), sequence2 = getDataForAnalysis(10000);
        document.getElementById('Mx100').innerHTML = getMx(sequence1, 100).toFixed(5)/1;
        document.getElementById('Dx100').innerHTML = getDx(sequence1, 100, getMx(sequence1, 100)).toFixed(5)/1;
        document.getElementById('Mx10000').innerHTML = getMx(sequence2, 10000).toFixed(5)/1;
        document.getElementById('Dx10000').innerHTML = getDx(sequence2, 10000, getMx(sequence2, 10000)).toFixed(5)/1;
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

    function getElemets (amount) {
        var data = getDataForAnalysis(amount);
        var str = "";
        var map = new Map();

        for(var j = 0; j < 1; j += (1/intervals).toFixed(3)/1)
            for(var i = 0; i < data.length; ++i)
                if(data[i] < j && data[i] > j - (1/intervals))
                    str += 'Interval = ' + String(j.toFixed(3)/1 - 0.1).substr(2, 1) + '\tNumber = ' + data[i] + '\n';
                
        return str;
    }

    document.getElementById('out1').innerHTML = getElemets(100);
    document.getElementById('out2').innerHTML = getElemets(10000);
    output();

    var ctx3 = document.getElementById('myChart3').getContext('2d');
    var scatterChart3 = new Chart(ctx3, { 
        type: 'line',
          data: {
            labels: getLabels(),
            datasets: [{ 
                data: getDataForChart(100),
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
                data: getDataForChart(10000),
                label: "Frequency test (N=10000)",
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

