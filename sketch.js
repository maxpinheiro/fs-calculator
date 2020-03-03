var currentElement = "";
var currentGOE = 0;
var totalScore = 0;

function log(message) {
    console.log(message);
}

// called when a navigation tab is clicked: hides all tabs, displays the tab with the id tabName
function setPage(tabName) {
    // only swap pages if currently not selecting anything
    if (this.currentElement == "") {
        var i;
        var x = document.getElementsByClassName("tab-content");
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }
        document.getElementById(tabName).style.display = "block";
    }
}

// called when GOE button is clicked: sets the current GOE
function setGOE(goe) {
    this.currentGOE = goe;
    document.getElementById("selected-goe").innerText = "";
    if (goe > 0) {
        document.getElementById("selected-goe").innerText = "+ ";
    }
    document.getElementById("selected-goe").innerText += this.currentGOE;
}