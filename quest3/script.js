var b = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

function Random() {
    for (i = 1; i < 26; i++) {
        if (Math.random() > 0.5) {
            Change(i);
            if (i != 1 && i != 2 && i != 3 && i != 4 && i != 5) {
                Change(i - 5);
            }
            if (i != 5 && i != 10 && i != 15 && i != 20 && i != 25) {
                Change(i + 1);
            }
            if (i != 1 && i != 6 && i != 11 && i != 16 && i != 21) {
                Change(i - 1);
            }
            if (i != 21 && i != 22 && i != 23 && i != 24 && i != 25) {
                Change(i + 5);
            }
        }
    }
    document.getElementById("info").innerHTML = b
}

//           for(i=0;i<25;i++){
//               b[i] = Math.round(Math.random());
//               Change(i+1);
//               Change(i+1);
//           }
//           document.getElementById("info").innerHTML = b;}



document.getElementById("info").innerHTML = b;
function Change(i) {
    var button = document.getElementById(i);
    b[i - 1] = (b[i - 1] + 1) % 2;
    if (b[i - 1] == 0) {
        button.style.backgroundColor = "grey";
    }
    else {
        button.style.backgroundColor = "red";
    }
    document.getElementById("info").innerHTML = b;
}

function Click(i) {
    Change(i);
    if (i != 1 && i != 2 && i != 3 && i != 4 && i != 5) {
        Change(i - 5);
    }
    if (i != 5 && i != 10 && i != 15 && i != 20 && i != 25) {
        Change(i + 1);
    }
    if (i != 1 && i != 6 && i != 11 && i != 16 && i != 21) {
        Change(i - 1);
    }
    if (i != 21 && i != 22 && i != 23 && i != 24 && i != 25) {
        Change(i + 5);
    }
    /*You win !*/
    if (win(b)) {
        document.getElementById("info").innerHTML = "YOU WIN ! click random to play again.";
    }
}

function win(b) {
    for (i = 0; i < 25; i++) {
        if (b[i] == 1) {
            return false;
        }
    }
    return true;
}
