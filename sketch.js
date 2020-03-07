var currentElement = "";
var totalScore = 0;
var baseValue = 0.0;
var elementScore = 0.0;
var numElmInTable = 0;

// basic element variables (universal)
var elmType = "jump";
var type = "";
var lod = '0';
var goe = '0';
// jump info
var under = false;
var downgrade = false;
var edgeCall = false;
// spin info
var fly = false;
var change = false;
var invalid = false;
var bonus = false;


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
    this.currentElement = "";
    var lodText = "";
    if (this.lod != "0") {
        lodText = this.lod;
    }

    if (this.elmType == "jump") {
        this.currentElement += lodText + this.type;
        // underrotated and downgraded (mutually exclusive)
        if (this.under) {
            this.currentElement += "<";
        } else if (this.downgrade) {
            this.currentElement += "<<";
        }
        // edge call
        if (this.edgeCall) {
            this.currentElement += "e";
        }

    } else if (this.elmType == "spin") {
        // flying spin
        if (this.fly) {
            this.currentElement += "F";
        }
        // change of foot
        if (this.change) {
            this.currentElement += "C";
        }
        this.currentElement += this.type + lodText;
        // invalid element
        if (this.invalid) {
            this.currentElement += "V";
        }
    } else if (this.elmType == "sequence") {
        this.currentElement += this.type + lodText;
    }

    document.getElementById("selected-element").innerText = this.currentElement;
    document.getElementById("selected-goe").innerText = this.goe;


}

// called when clear element button is clicked
function clearElement() {
    // reset variables
    this.currentElement = "";
    this.type = "";
    this.lod = 0;
    this.goe = 0;
    this.under = false;
    this.downgrade = false;
    this.edgeCall = false;
    this.fly = false;
    this.change = false;
    this.invalid = false;
    this.bonus = false;

    // reset display
    document.getElementById("selected-element").innerText = "Element";
    document.getElementById("selected-goe").innerText = "GOE";
}

// called when add element button is clicked
function addElement() {
    this.calculateScore();
    this.totalScore += this.elementScore;
    this.addToTable();
    document.getElementById("tes-score").innerText = (this.totalScore * 100) / 100;
    this.clearElement();
}

// returns the score of the current element
function calculateScore() {
    var info = '';
    if (this.elmType == "jump") { // jumps: LOD, Underrotated, Downgraded, EdgeCall
        info += this.lod;
        if (this.under) {
            info += '<';
        } else if (this.downgrade) {
            info += '<<';
        }
        if (this.edgeCall) {
            info += 'e';
        }
    } else if (this.elmType == "spin") { // spins: Fly, Change, LOD, Invalid
        if (this.fly) {
            info += 'F';
        }
        if (this.change) {
            info += 'C';
        }
        info += this.lod;
        if (this.invalid) {
            info += 'V';
        }
    } else if (this.elmType == "sequence") { // sequence: just LOD
        info += this.lod;
    }

    if (this.lod == '0') {
        this.baseValue = 0.0;
    } else {
        this.baseValue = basevalues[this.type][info];
    }

    var scale = 0;
    switch (this.goe) {
        case '-5':
            scale = -0.5;
            break;
        case '-4':
            scale = -0.4;
            break;
        case '-3':
            scale = -0.3;
            break;
        case '-2':
            scale = -0.2;
            break;
        case '-1':
            scale = -0.1;
            break;
        case '1':
            scale = 0.1;
            break;
        case '2':
            scale = 0.2;
            break;
        case '3':
            scale = 0.3;
            break;
        case '4':
            scale = 0.4;
            break;
        case '5':
            scale = 0.5;
            break;
        default:
            scale = 0.0;
    }
    
    this.elementScore = baseValue + (baseValue * scale);
}

function addToTable() {
    this.numElmInTable ++;
    var row = "<tr>";
    row += "<td>" + this.numElmInTable + "</td>";
    row += "<td>" + this.currentElement + "</td>";
    row += "<td>" + this.baseValue + "</td>";
    row += "<td>" + this.goe + "</td>";
    row += "<td>" + (this.elementScore - this.baseValue).toFixed(2) + "</td>";
    row += "<td>" + this.elementScore + "</td>";
    row += "</tr>";
    
    document.getElementById("elm-table").insertRow(this.numElmInTable - 1).innerHTML = row;
}

// called when < button is clicked
function addUnder() {
    if (this.elmType == "jump") {
        this.under = !this.under;
        this.downgrade = false;
    }
    this.displayElement();
}

// called when << button is clicked
function addDowngrade() {
    if (this.elmType == "jump") {
        this.downgrade = !this.downgrade;
        this.under = false;
    }
    this.displayElement();
}

// called when e button is clicked
function addEdgeCall() {
    if (this.elmType == "jump" && (this.type == 'F' || this.type == 'Lz')) {
        this.edgeCall = !this.edgeCall;
    }
    this.displayElement();
}

// called when F button is clicked
function addFly() {
    if (this.elmType == "spin") {
        // if turning off fly, also turn off invalid
        if (this.fly) {
            this.invalid = false;
        }
        this.fly = !this.fly;
    }
    this.displayElement();
}

// called when C button is clicked
function addChange() {
    if (this.elmType == "spin") {
        // if turning off change, also turn off invalid
        if (this.change) {
            this.invalid = false;
        }
        this.change = !this.change;
    }
    this.displayElement();
}

// called when V button is clicked
function addInvalid() {
    // only flying spins and change of foot spins can have invalid elements
    if (this.elmType == "spin" && (this.fly || this.change)) {
        this.invalid = !this.invalid;
    }
    this.displayElement();
}

// called when x button is clicked
function addBonus() {
    this.bonus = !this.bonus;
    this.displayElement();
}