window.onload = change(10, 1, "Middle-square method");

function change(x, num, label) {
    //  Дефолтный метод
    function defaultMethod() {
      var data = [];
      for (var i = 0; i <= x; i++) {
        data.push({
          x: Math.random(),
          y: Math.random()
        });
      }
      return data;
    }

    //  Метод срединных квадратов
    function midSquareMethod() {
        var data = [];
        let Random = seed => {
            if(seed < 1)
                seed = getRand();
            seed = middle(seed*seed);
            return seed;
        };
        var tmp1 = getRand(), tmp2 = getRand();
        document.getElementById('initVals').innerHTML = 'x = ' + tmp1 + '<br>y = ' + tmp2;
        for (var i = 0; i <= x; i++) {
            data.push({
              x: tmp1 / 10**(String(tmp1).length),
              y: tmp2 / 10**(String(tmp2).length)
            });
            tmp1 = Random(tmp1);
            tmp2 = Random(tmp2);
        }
        getElemets (data);
        return data;
    }

    //  Метод срединных произведений
    function medianMethod() {
        var data = [];
        let Random = (seed) => {
            if(seed < 1)
                seed = getRand()*getRand();
            seed = middle(seed);
            return seed;
        };
        var s1 = getRand(),     s2 = getRand(),     tmp1 = Random(s1*s2);
        var s11 = getRand(),    s22 = getRand(),    tmp2 = Random(s11*s22);
        document.getElementById('initVals').innerHTML = 'x = ' + tmp1 + '<br>y = ' + tmp2;
        for (var i = 0; i <= x; i++) {
            data.push({
              x: tmp1 / 10**(String(tmp1).length),
              y: tmp2 / 10**(String(tmp2).length)
            });
            s1 = s2;    s2 = tmp1;  tmp1 = Random(s1*s2);
            s11 = s22;  s22 = tmp2; tmp2 = Random(s11*s22);
        }
        getElemets (data);
        return data;
    }

    //  Метод перемешивания
    function mixingMethod() {
        var data = [];
        let Random = (seed) => {
            if(String(seed).length % 2 < 4)
                seed = getRand();
            seed = String(seed);
            x1 = Number(seed.substr(2) + seed.substr(0, 2));
            x2 = Number(seed.substr(-2) + seed.substr(0, -2));
            return x1 + x2;
        };  
        var tmp1 = getRand(), tmp2 = getRand();
        document.getElementById('initVals').innerHTML = 'x = ' + tmp1 + '<br>y = ' + tmp2;
        for (var i = 0; i <= x; i++) {
            data.push({
                x: tmp1 / 10**(String(tmp1).length),
                y: tmp2 / 10**(String(tmp2).length)
            });
            tmp1 = Random(tmp1);
            tmp2 = Random(tmp2);
        }
        getElemets (data);
        return data;
    }

    //  Линейный конгруэнтный метод
    function linearCongruentMethod() {
        var data = [];
        var a = 16807,  b = 12345,  m = 1073741823,  r = 2;
        var a1 = 15805, b1 = 12345, m1 = 1048576823, r1 = 2;
        document.getElementById('initVals').innerHTML = 'a = ' + a + '<br>b = ' + b + '<br>m = ' + m + '<br>r = ' + r;

        for (var i = 0; i <= x; i++) {
            r = (a * r + b) % m;
            r1 = (a1 * r1 + b1) % m1;
            data.push({
              x: r1 / m,
              y: r / m
            });
        }
        getElemets (data);
        return data;
    }

    function getRand() {
        return Math.floor((Math.random() * (100000 - 1 + 1)) + 1);
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

    function getElemets(data) {
        var str = "";
        for (var i = 0; i < data.length; ++i)
            if (data[i] !== undefined) 
                str += "x = " + data[i].x.toFixed(5)*1 + "\t\ty = " + data[i].y.toFixed(5)*1 +'\n';

        document.getElementById('results').innerHTML = str;
    }

    var ctx1 = document.getElementById('myChart1').getContext('2d'); // Default method
    var scatterChart1 = new Chart(ctx1, { 
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Default method',
                backgroundColor: 'rgb(255, 159, 64)',
                data: defaultMethod(),
            }]
        },    

        options: {
            scales: {
                xAxes: [{
                    type: 'linear',
                    position: 'bottom'
                }]
            }
        }
    });

    var ctx2 = document.getElementById('myChart2').getContext('2d'); // My methods
    var scatterChart2 = new Chart(ctx2, {
        type: 'scatter',
        data: {
            datasets: [{
                label: label,
                backgroundColor: 'rgb(255, 205, 86)',
                data: num == 1 ? midSquareMethod() : 
                      num == 2 ? medianMethod() : 
                      num == 3 ? mixingMethod() : 
                                 linearCongruentMethod()
            }]
        },

        options: {
            scales: {
                xAxes: [{
                    type: 'linear',
                    position: 'bottom'
                }]
            }
        }
    });
};

document.getElementById('randomizeData').addEventListener('click', function() {
    var dots = document.getElementById('number').value;
    var select = document.getElementById("sel");
    var value = select.value;
    var num, label;

    switch (value) {
      case "1":
        num = 1;
        label = "Middle-square method";        
        break;
      
      case "2":
        num = 2;
        label = "Median method";        
        break;
      
      case "3":
        num = 3;
        label = "Mixing method";
        break;
      
      case "4":
        num = 4;
        label = "Linear congruent method";
        break;
    }

    change(dots, num, label);
});

