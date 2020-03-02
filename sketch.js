window.onload = function() {

};

function log(message) {
    console.log(message);
}

// called when a navigation tab is clicked: hides all tabs, displays the tab with the id tabName
function setPage(tabName) {
    var i;
    var x = document.getElementsByClassName("tab-content");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    document.getElementById(tabName).style.display = "block";
}