var currentElement = "";
var totalScore = 0;
var baseValue = 0.0;
var elementScore = 0.0;
var numElmInTable = 0;

var elements = [new Element()];
var index = 0;

function Element() {
    // basic element variables (universal)
    this.elmType = "jump";
    this.type = "";
    this.lod = '0';
    this.goe = '0';
    // jump info
    this.under = false;
    this.downgrade = false;
    this.edgeCall = false;
    // spin info
    this.fly = false;
    this.change = false;
    this.invalid = false;
    this.bonus = false;
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
        elements[0].elmType = "jump";
    } else if (tabName == 'spins') {
        elements[0].elmType = "spin";
    } else if (tabName == 'sequences') {
        elements[0].elmType = "sequence";
    }
}

// called when GOE button is clicked: sets the current GOE
function setGOE(goe) {
    elements[0].goe = goe;

    document.getElementById("selected-goe").innerText = "";
    if (goe > 0) {
        document.getElementById("selected-goe").innerText = "+ ";
    }
    document.getElementById("selected-goe").innerText += goe;

}

// called when jump type button is clicked
function setJump(type) {
    if (elements[0].elmType == "jump") {
        elements[index].type = type;
        elements[index].edgeCall = false;
        elements[index].lod = '1';
    }
    this.displayElement();
}

// called when spin type button is clicked
function setSpin(type) {
    if (elements[0].elmType == "spin") {
        elements[index].type = type;
        elements[index].invalid = false;
        elements[index].lod = 'B';
    }
    this.displayElement();
}

// called when sequence type button is clicked
function setSequence(type) {
    if (elements[0].elmType == "sequence") {
        elements[index].type = type;
        elements[index].lod = 'B';
    }
    this.displayElement();
}

// called when jump rotation or spin/sequence level button is clicked
function setLOD(lod) {
    elements[index].lod = lod;
    this.displayElement();
}

function displayElement() {
    this.currentElement = "";
    for (var i = 0; i < elements.length; i++) {
        var lodText = "";
        if (elements[i].lod != "0") {
            lodText = elements[i].lod;
        }

        if (elements[i].elmType == "jump") {
            this.currentElement += lodText + elements[i].type;
            // underrotated and downgraded (mutually exclusive)
            if (elements[i].under) {
                this.currentElement += "<";
            } else if (elements[i].downgrade) {
                this.currentElement += "<<";
            }
            // edge call
            if (elements[i].edgeCall) {
                this.currentElement += "e";
            }

        } else if (elements[i].elmType == "spin") {
            // flying spin
            if (elements[i].fly) {
                this.currentElement += "F";
            }
            // change of foot
            if (elements[i].change) {
                this.currentElement += "C";
            }
            this.currentElement += elements[i].type + lodText;
            // invalid element
            if (elements[i].invalid) {
                this.currentElement += "V";
            }
        } else if (elements[i].elmType == "sequence") {
            this.currentElement += elements[i].type + lodText;
        }
        // if there are more elements: add +
        if (i < elements.length - 1) {
            this.currentElement += "+";
        }
    }

    document.getElementById("selected-element").innerText = this.currentElement;
    document.getElementById("selected-goe").innerText = elements[0].goe;
}

// called when clear element button is clicked
function clearElement() {
    // reset variables
    elements = [new Element()];
    index = 0;

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
    this.baseValue = 0.0;
    for (var i = 0; i < elements.length; i++) {
        var info = '';
        if (elements[i].elmType == "jump") { // jumps: LOD, Underrotated, Downgraded, EdgeCall
            info += elements[i].lod;
            if (elements[i].under) {
                info += '<';
            } else if (elements[i].downgrade) {
                info += '<<';
            }
            if (elements[i].edgeCall) {
                info += 'e';
            }
        } else if (elements[i].elmType == "spin") { // spins: Fly, Change, LOD, Invalid
            if (elements[i].fly) {
                info += 'F';
            }
            if (elements[i].change) {
                info += 'C';
            }
            info += elements[i].lod;
            if (elements[i].invalid) {
                info += 'V';
            }
        } else if (elements[i].elmType == "sequence") { // sequence: just LOD
            info += elements[i].lod;
        }

        if (elements[i].lod == '0') {
            elements[i].baseValue = 0.0;
        } else {
            this.baseValue += basevalues[elements[i].type][info];
        }
    }
    var scale = 0;
    switch (elements[0].goe) {
        case -5:
            scale = -0.5;
            break;
        case -4:
            scale = -0.4;
            break;
        case -3:
            scale = -0.3;
            break;
        case -2:
            scale = -0.2;
            break;
        case -1:
            scale = -0.1;
            break;
        case 1:
            scale = 0.1;
            break;
        case 2:
            scale = 0.2;
            break;
        case 3:
            scale = 0.3;
            break;
        case 4:
            scale = 0.4;
            break;
        case 5:
            scale = 0.5;
            break;
        default:
            scale = 0.0;
    }
    console.log(elements[0].goe);
    this.elementScore = this.baseValue + (this.baseValue * scale);
}

function addToTable() {
    this.numElmInTable++;
    var row = "<tr>";
    row += "<td>" + this.numElmInTable + "</td>";
    row += "<td>" + this.currentElement + "</td>";
    row += "<td>" + this.baseValue + "</td>";
    row += "<td>" + elements[0].goe + "</td>";
    row += "<td>" + (this.elementScore - this.baseValue).toFixed(2) + "</td>";
    row += "<td>" + this.elementScore + "</td>";
    row += "</tr>";

    document.getElementById("elm-table").insertRow(this.numElmInTable - 1).innerHTML = row;
}

// called when + button is clicked
function addCombo() {
    elements.push(new Element());
    index++;
    this.displayElement();
}

// called when < button is clicked
function addUnder() {
    if (elements[0].elmType == "jump") {
        elements[index].under = !elements[index].under;
        elements[index].downgrade = false;
    }
    this.displayElement();
}

// called when << button is clicked
function addDowngrade() {
    if (elements[0].elmType == "jump") {
        elements[index].downgrade = !elements[index].downgrade;
        elements[index].under = false;
    }
    this.displayElement();
}

// called when e button is clicked
function addEdgeCall() {
    if (this.elements[0].elmType == "jump" && (elements[index].type == 'F' || elements[index].type == 'Lz')) {
        elements[index].edgeCall = !elements[index].edgeCall;
    }
    this.displayElement();
}

// called when F button is clicked
function addFly() {
    if (elements[0].elmType == "spin") {
        // if turning off fly, also turn off invalid
        if (elements[index].fly) {
            elements[index].invalid = false;
        }
        elements[index].fly = !elements[index].fly;
    }
    this.displayElement();
}

// called when C button is clicked
function addChange() {
    if (elements[0].elmType == "spin") {
        // if turning off change, also turn off invalid
        if (elements[index].change) {
            elements[index].invalid = false;
        }
        elements[index].change = !elements[index].change;
    }
    this.displayElement();
}

// called when V button is clicked
function addInvalid() {
    // only flying spins and change of foot spins can have invalid elements
    if (elements[0].elmType == "spin" && (elements[index].fly || elements[index].change)) {
        elements[index].invalid = !elements[index].invalid;
    }
    this.displayElement();
}

// called when x button is clicked
function addBonus() {
    elements[index].bonus = !elements[index].bonus;
    this.displayElement();
}