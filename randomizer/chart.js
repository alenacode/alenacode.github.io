window.onload = change(10, 1, "Middle-square method");
var scatterChart;

function change(x, num, label) {
    function defaultMethod() {
      var data = [];
      for (var i = 0; i <= x; i++) {
        data.push({
          x: i,
          y: Math.random()
        });
      }
      return data;
    }

    let numDigits = x => {
        return Math.floor(Math.log10(Math.abs(x))) + 1;
    };

    let middle = (x, n) => {
        if (numDigits(x) % 2 != 0) 
          x = Math.floor(x/10);

        while (numDigits(x) > n) {
          x = x % 10**(numDigits(x)-1);
          x = Math.floor(x/10);
        }

        return x;
    };

    function midSquareMethod() {
        let Random = seed => {
            if(seed <= 1)
                seed = (Math.random() * (10000 - 1 + 1)) + 1;

            let n = numDigits(seed);
            seed = middle(seed*seed, n);
            return seed / 10**(n);
        };

        var data = [];
        var tmp = Random((Math.random() * (10000 - 1 + 1)) + 1);

        for (var i = 0; i <= x; i++) {
            data.push({
              x: i,
              y: tmp
            });
            
            tmp = Random(tmp);
        }
        return data;
    }

    function medianMethod() {
        let Random = (seed1, seed2) => {
            if(seed1*seed2 <= 1){
                seed1 = (Math.random() * (10000 - 1 + 1)) + 1;
                seed2 = (Math.random() * (10000 - 1 + 1)) + 1;
            }

            let n = numDigits(seed1*seed2);
            var seed = middle(seed1*seed2, n);
            return seed / 10**(n);
        };

        var data = [];

        var s1 = (Math.random() * (10000 - 1 + 1)) + 1, s2 = (Math.random() * (10000 - 1 + 1)) + 1;
        var tmp = Random(s1, s2);
        for (var i = 0; i <= x; i++) {
            data.push({
              x: i,
              y: tmp
            });

            s1 = s2;
            s2 = tmp;
            tmp = Random(s1, s2);
        }

        return data;
    }

    function getFractional(num) {
        num = num.toFixed(8);
        num = num - Math.trunc(num); // получили дробную часть числа
        num = num.toFixed(8) * 10**8; // Xi
        return num;
    }

    function summ(num) {
        var fs = num.toString().substring(0, 2);
        var num1 = num.toString() + fs;
        num1 = parseInt(num1.replace(fs, ""));

        var lp = num.toString().substring(6);
        var num2 = lp + num.toString();
        num2 = parseInt(num2.substring(0, 8));
        return num1 + num2;
    }

    function mixingMethod() {
        var data = [];
        var num = getFractional(Math.random() * (10000 - 1 + 1) + 1);

        for (var i = 0; i <= x; i++) {
          num = parseInt(summ(num).toString().substring(0, 8));
          console.log(num);
          data.push({
            x: i,
            y: num / 10**8
          });
        }

      return data;
    }


    function linearCongruentMethod() {
      var a = 16807, b = 12345, m = 1073741823, r = 2;
      var data = [];

      for (var i = 0; i <= x; i++) {
        r = (a * r + b) % m;
        data.push({
          x: i,
          y: r / m
        });
      }

      return data;
    }

    var ctx = document.getElementById('shared').getContext('2d'); 
    scatterChart = new Chart(ctx, { 
        type: 'scatter',
        data: {
          datasets: [{
            label: 'Default method',
            backgroundColor: 'rgb(255, 159, 64)',
            data: defaultMethod()
          }, {
            label: label,
            backgroundColor: 'rgb(255, 99, 132)',
            data: num == 1 ? midSquareMethod() : num == 2 ? medianMethod() : num == 3 ? mixingMethod() : linearCongruentMethod()
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

    if(value == "1"){
        num = 1;
        label = "Middle-square method";
    }

    else if(value == "2"){
        num = 2;
        label = "Median method";
    }

    else if(value == "3"){
        num = 3;
        label = "Mixing method";
    }

    else if(value == "4"){
        num = 4;
        label = "Linear congruent method";
    }

  change(dots, num, label);
});

