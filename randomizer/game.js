var secretNum;
var count = 12;
var nums = 0;
document.getElementById('attempts').innerHTML = count;

window.onload = () => {
	secretNum = getRand();
    console.log("СЕКРЕТНОЕ ЧИСЛО: " + secretNum);
}

function playing() {
	if(count <= 0) {
        alert("GAME OVER! SECRET NUMBER IS " + secretNum + "\nLET'S START A NEW GAME - PUSH 'OK'");
  		location.reload(); 
	}
    
	var number = document.getElementById('num').value;
	var position = document.getElementById('pos').value - 1;
	var numInSecret = Number(String(secretNum).substring(position, position+1));

	if(number == numInSecret && document.getElementById('a' + position).innerHTML != number) {
		document.getElementById('a' + position).innerHTML = number;
		document.getElementById('a' + position).setAttribute("style", "font-size: 220%;");
        ++nums;
        ++count;
	}

    document.getElementById('attempts').innerHTML = --count;
    document.getElementById('num').value = "";
    document.getElementById('pos').value = "";
    
    if(nums == 4) {
        alert("YOU WON! CONGRATS.\nYOU GUESSED THE NUMBER FROM THE " + count + " ATTEMPT\nLET'S START A NEW GAME - PUSH 'OK'");
        location.reload(); 
    }
}

function getRand() {
    let Random = seed => {
        if(seed < 1)
            seed = Math.floor((Math.random() * (9000 - 1000 + 1000)) + 1000);
        seed = middle(seed*seed);
        return seed;
    };

    var val = Math.floor((Math.random() * (9000 - 1000 + 1000)) + 1000);
    for (var i = 0; i < 10; i++) {
        val = Random(val);
    }

    return val;
}

function middle(x) {
    if(String(x).length%2 < 4)
        return Math.floor((Math.random() * (9000 - 1000 + 1000)) + 1000);

    if (String(x).length%2 != 0) 
        x = Math.floor(x/10);

    while(String(x).length != 4){
        x = String(x).substr(1);
        x = x.substr(0, x.length - 1); 
    }

    return Number(x);
}

