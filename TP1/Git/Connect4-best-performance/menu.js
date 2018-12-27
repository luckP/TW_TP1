function fakeStart() {
    let row_el = document.getElementById("row");
    let col_el = document.getElementById("col");
    if(isNaN(row_el.value) || (row_el.value < 4 && row_el.value > 10)) {
        row_el.style.color = 'red';
    }
    if(isNaN(col_el.value) || (col_el.value < 4 && col_el.value > 10)) {
        col_el.style.color = 'red';
    }
    else
        // row_el.style.color = 'black';
        initField();
}

function flipCard(name) {
    let temp = document.getElementsByClassName("card");

    if(name!='pop-up-card')
        for(let i of temp) {
            i.style.display = "none";
        }
    else {
        room.gameover = true;
    }

    temp[name].style.display = "block";
    temp[name].style.opacity = 1;

}

function topFunction() {
    document.getElementById('btn2').scrollTop = 0;
}
