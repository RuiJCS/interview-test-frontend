
var filler = ["Frontend","developer","Challenge"]

function fill(array) {
    var list = document.getElementById("list");
    var i = 0;

    for (let index = 0; index < array.length*50; index++) {
        const element = array[index];
        var item = document.createElement('li');
        item.appendChild(document.createTextNode(array[i]))
        list.appendChild(item)
        if(index % 3 == 0) {
            i = 0;
        }
        else 
        i++;
    }
}

fill(filler);

window.onscroll = function () {backgroundTranparency()};

var header = document.getElementById('myHeader');

function backgroundTranparency(params) {
    if (window.pageYOffset > 150) {
        header.style.backgroundColor= 'transparent';
    }
    else {
        header.style.backgroundColor = '#d8d8d8';
    }
}