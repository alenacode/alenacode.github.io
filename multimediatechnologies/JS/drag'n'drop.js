let elems = [];
let count = 0;
var xPosParent = 0;
var yPosParent = 0;

$(document).ready(function() {
    xPosParent = $(".draggable_tree").offset().left;
    yPosParent = $(".draggable_tree").offset().top;
    function position() { 
        elems.forEach((elem) => {
            var toy = document.getElementById(elem);   
            $("." + elem).position({
                of: $( ".draggable_tree" ),
                using: function() {
                    toy.style.left = parseInt(toy.style.left) + $(".draggable_tree").offset().left - xPosParent + 'px';
                    toy.style.top = parseInt(toy.style.top) + $(".draggable_tree").offset().top - yPosParent + 'px'
                } 
                
            });
        })
        xPosParent = $(".draggable_tree").offset().left;
        yPosParent = $(".draggable_tree").offset().top;
    }   
          
    $( ".draggable_tree" ).draggable({
        drag: position,
    });   
    
    $(".draggable_tree" ).draggable();

    $('.droppable').droppable({
        drop: function(event, ui) {
            elems.push(ui.draggable.context.className.split(' ')[0]);            
        },
        out: function(event, ui) {
            deleteElement(ui.draggable.context.className.split(' ')[0]);            
        }
    });
});

function addToy(num) {
    let created_div = document.createElement('div');
    created_div.setAttribute('id', 'draggable' + count);
    created_div.setAttribute('class', 'draggable' + count + ' draggable_img');

    let src = "images/toy" + num + ".png";
    let active_field = document.querySelector(".dragCotainer");
    let created_img = document.createElement('img');
    let container = active_field.getBoundingClientRect(active_field);
    created_img.style.width = "30px";
    created_img.style.height = "30px";
    created_img.setAttribute('src', src);

    created_div.appendChild(created_img);
    created_div.style.position = 'absolute';
    created_div.style.left= Math.floor(Math.random() * 260) +  container.left + "px";
    created_div.style.top = Math.floor(Math.random() * 600 + 2) + container.top + "px";
    active_field.appendChild(created_div);
    console.log(created_div);
    $(function() {     
        $('.draggable'+count).draggable({

        }); 
    });
    count++;
}

function makeName() {
    let active_field = document.querySelector(".dragCotainer");
    let container = active_field.getBoundingClientRect(active_field);
    let arr = [[0,1,0,0,0,1,0,0,1,1,1,0,1,0,1,0,0,1,0],
               [1,0,1,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,1],
               [1,1,1,0,1,0,1,0,1,1,1,0,1,1,1,0,1,1,1], 
               [1,0,1,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,1], 
               [1,0,1,0,1,0,1,0,1,1,1,0,1,0,1,0,1,0,1]];
    let list = document.querySelectorAll(".draggable_img");
    let k = 0;
    for (let i = 0; i < arr[0].length; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (arr[j][i] == 1) { 
                list.item(k).style.left = (i + 1) * 40 + Math.floor(container.left) + "px";
                list.item(k).style.top = (j + 1) * 40 + Math.floor(container.bottom-100) + "px";
                list.item(k).style.zIndex = "111";
                k++;
            }
            if (k == list.length) break;
        }
        if (k == list.length) break;
    }
}

function deleteElement(elem){
    var i = elems.indexOf(elem);
    if(i >= 0)
        elems.splice(i, 1);
}
