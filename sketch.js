var currentElement = "";
var totalScore = 0;

var elmType = "jump";
var type = "";
var lod = 0;
var goe = 0;


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

    if (tabName == 'jumps') {
        this.elmType = "jump";
    } else if (tabName == 'spins') {
        this.elmType = "spin";
    } else if (tabName == 'sequences') {
        this.elmType = "sequence";
    }
}

// called when GOE button is clicked: sets the current GOE
function setGOE(goe) {
    this.goe = goe;

    document.getElementById("selected-goe").innerText = "";
    if (goe > 0) {
        document.getElementById("selected-goe").innerText = "+ ";
    }
    document.getElementById("selected-goe").innerText += this.goe;

}

// called when jump type button is clicked
function setJump(type) {
    if (this.elmType == "jump") {
        this.type = type;
    }
    this.displayElement();
}

// called when spin type button is clicked
function setSpin(type) {
    if (this.elmType == "spin") {
        this.type = type;
    }
    this.displayElement();
}

// called when sequence type button is clicked
function setSequence(type) {
    if (this.elmType == "sequence") {
        this.type = type;
    }
    this.displayElement();
}

// called when jump rotation or spin/sequence level button is clicked
function setLOD(lod) {
    this.lod = lod;
    this.displayElement();
}

function displayElement() {
    if (this.elmType == "") {
        document.getElementById("selected-element").innerText = "Element";
        document.getElementById("selected-goe").innerText = "GOE";
    } else {
        var lodText = "";
        if (this.lod != "0") {
            lodText = this.lod;
        }
        if (this.elmType == "jump") {
            this.currentElement = lodText + this.type;
        } else if (this.elmType == "spin") {
            this.currentElement = this.type + lodText;
        } else if (this.elmType == "sequence") {
            this.currentElement = this.type + lodText;
        }
    
        document.getElementById("selected-element").innerText = this.currentElement;
        document.getElementById("selected-goe").innerText = this.goe;
    }

}

function clearElement() {
    this.elmType = "";
    this.type = "";
    this.lod = 0;
    this.goe = 0;
    this.currentElement = "";

    this.displayElement();
}

function addElement() {

}