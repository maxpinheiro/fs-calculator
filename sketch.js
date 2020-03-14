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
    this.nullified = false;
    // jump info
    this.under = false;
    this.downgrade = false;
    this.edgeCall = false;
    this.repeated = false;
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
        // hide/display each tab content
        var i;
        var x = document.getElementsByClassName("tab-content");
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }
        document.getElementById(tabName).style = "display:block";

        // activate/deactive navigation buttons
        //document.getElementById("nav-jumps").className = "jump-nav-button-dormant";
        //document.getElementById("nav-spins").className = "spin-nav-button-dormant";
        //document.getElementById("nav-sequences").className = "sequence-nav-button-dormant";

        //document.getElementById("nav-" + tabName).className += "-active";
        if (tabName == 'jumps') {
            elements[0].elmType = "jump";
            document.getElementById("nav-jumps").className = "jump-nav-button-active";
            document.getElementById("nav-spins").className = "spin-nav-button-dormant";
            document.getElementById("nav-sequences").className = "sequence-nav-button-dormant";
            document.getElementById("nav-pcs").className = "pcs-nav-button-dormant";
            document.getElementById("goe-tab").style = "display:block";
            document.getElementById("clear").style = "display:block";
            document.getElementById("add").style = "display:block";
        } else if (tabName == 'spins') {
            elements[0].elmType = "spin";
            document.getElementById("nav-jumps").className = "jump-nav-button-dormant";
            document.getElementById("nav-spins").className = "spin-nav-button-active";
            document.getElementById("nav-sequences").className = "sequence-nav-button-dormant";
            document.getElementById("nav-pcs").className = "pcs-nav-button-dormant";
            document.getElementById("goe-tab").style = "display:block";
            document.getElementById("clear").style = "display:block";
            document.getElementById("add").style = "display:block";
        } else if (tabName == 'sequences') {
            elements[0].elmType = "sequence";
            document.getElementById("nav-jumps").className = "jump-nav-button-dormant";
            document.getElementById("nav-spins").className = "spin-nav-button-dormant";
            document.getElementById("nav-sequences").className = "sequence-nav-button-active";
            document.getElementById("nav-pcs").className = "pcs-nav-button-dormant";
            document.getElementById("goe-tab").style = "display:block";
            document.getElementById("clear").style = "display:block";
            document.getElementById("add").style = "display:block";
        } else if (tabName == 'pcs') {
            document.getElementById("nav-jumps").className = "jump-nav-button-dormant";
            document.getElementById("nav-spins").className = "spin-nav-button-dormant";
            document.getElementById("nav-sequences").className = "sequence-nav-button-dormant";
            document.getElementById("nav-pcs").className = "pcs-nav-button-active";
            document.getElementById("goe-tab").style = "display:none";
            document.getElementById("clear").style = "display:none";
            document.getElementById("add").style = "display:none";
        }
    }

    document.getElementById("body").className = tabName + "-tab";


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
        elements[index].nullified = false;
        if (elements[index].lod == '0') {
            elements[index].lod = '1';
        }
    }
    this.displayElement();
    this.enableButtons();
}

// called when spin type button is clicked
function setSpin(type) {
    if (elements[0].elmType == "spin") {
        elements[index].type = type;
        elements[index].invalid = false;
        elements[index].nullified = false;
        if (elements[index].lod == '0') {
            elements[index].lod = 'B';
        }
    }
    this.displayElement();
    this.enableButtons();
}

// called when sequence type button is clicked
function setSequence(type) {
    if (elements[0].elmType == "sequence") {
        elements[index].type = type;
        elements[index].nullified = false;
        if (elements[index].lod == '0') {
            elements[index].lod = 'B';
        }
    }
    this.displayElement();
    this.enableButtons();
}

// called when jump rotation or spin/sequence level button is clicked
function setLOD(lod) {
    elements[index].lod = lod;
    this.displayElement();
}

function displayElement() {
    this.currentElement = "";
    var currentGOE = "";
    if (elements[0].type == "") {
        this.currentElement = "Element";
        currentGOE = "GOE";
    } else {
        currentGOE = elements[0].goe;
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
                // repeated element
                if (elements[i].repeated) {
                    this.currentElement += "+REP";
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
            if (elements[i].nullified) {
                this.currentElement += "*";
            }
            // if there are more elements: add +
            if (i < elements.length - 1) {
                this.currentElement += "+";
            }
        }
        if (elements[0].bonus) {
            this.currentElement += " x";
        }
    }

    document.getElementById("selected-element").innerText = this.currentElement;
    document.getElementById("selected-goe").innerText = currentGOE;
    document.getElementById("tes-score").innerText = Math.round(this.totalScore * 100) / 100;
}

// called when clear element button is clicked
function clearElement() {
    // reset variables
    var elementType = elements[0].elmType;
    this.elements = [new Element()];
    elements[0].elmType = elementType;
    this.index = 0;
    this.currentElement = ""

    // reset display
    document.getElementById("selected-element").innerText = "Element";
    document.getElementById("selected-goe").innerText = "GOE";
    this.enableButtons();
}

// called when add element button is clicked
function addElement() {
    this.calculateScore();
    this.totalScore += this.elementScore;
    this.addToTable();
    this.clearElement();
    this.displayElement();
}

// returns the score of the current element
function calculateScore() {
    this.baseValue = 0.0;
    for (var i = 0; i < elements.length; i++) {
        var info = '';
        if (elements[i].elmType == "jump") { // jumps: LOD, Underrotated, Downgraded, EdgeCall
            var lod = elements[i].lod;
            if (elements[i].downgrade) {
                lod = downgradeLevel(lod, elements[i].elmType);
            }
            info += lod;
            if (elements[i].under) {
                info += '<';
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

        if (elements[i].lod == '0' || elements[i].nullified) {
            elements[i].baseValue = 0.0;
        } else {
            var bv = basevalues[elements[i].type][info];
            if (elements[i].elmType == "jump" && elements[i].repeated) {
                bv *= 0.7;
            }
            if (elements[i].elmType == "jump" && elements[i].bonus) {
                bv *= 1.1;
            }
            this.baseValue += bv;
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

    this.elementScore = this.baseValue + (this.baseValue * scale);
}

function addToTable() {
    this.numElmInTable++;
    var row = "<tr>";
    row += "<td>" + this.numElmInTable + "</td>";
    row += "<td>" + this.currentElement + "</td>";
    row += "<td>" + this.getInfo() + "</td>";
    row += "<td>" + this.baseValue + "</td>";
    row += "<td>" + this.getBonus() + "</td>";
    row += "<td>" + elements[0].goe + "</td>";
    row += "<td>" + Math.round((this.elementScore - this.baseValue) * 100) / 100 + "</td>";
    row += "<td>" + Math.round(this.elementScore * 100) / 100 + "</td>";
    row += "</tr>";

    document.getElementById("elm-table").insertRow(this.numElmInTable - 1).innerHTML = row;
}

function getInfo() {
    var info = "";
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].elmType == "jump") {
            if (elements[i].under) {
                info += "<";
            } else if (elements[i].downgrade) {
                info += "<<";
            }
            // edge call
            if (elements[i].edgeCall) {
                info += "e";
            }

        } else if (elements[i].elmType == "spin") {
            // invalid element
            if (elements[i].invalid) {
                info += "V";
            }
        }
        if (elements[i].nullified) {
            //this.currentElement += "*";
        }
    }
    return info;
}

// called when + button is clicked
function addCombo() {
    elements.push(new Element());
    index++;
    this.displayElement();
    this.enableButtons();
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

// called when * button is clicked
function nullifyElement() {
    elements[index].nullified = !elements[index].nullified
    this.displayElement();
}

// called when x button is clicked
function addBonus() {
    if (elements[0].elmType == "jump") {
        elements[0].bonus = !elements[0].bonus;
        this.displayElement();
    }
}

function enableButtons() {
    // disable nav tables
    var nav_name = "nav-" + elements[0].elmType + "s";
    if (this.currentElement == "") {
        document.getElementById("nav-jumps").disabled = false;
        document.getElementById("nav-spins").disabled = false;
        document.getElementById("nav-sequences").disabled = false;
    } else {
        document.getElementById("nav-jumps").disabled = true;
        document.getElementById("nav-spins").disabled = true;
        document.getElementById("nav-sequences").disabled = true;
        document.getElementById(nav_name).disabled = false;
    }

    // clear element button
    if (this.currentElement != "" && this.currentElement.substring(this.currentElement.length - 1) != '+') {
        document.getElementById("add").disabled = false;
    } else {
        document.getElementById("add").disabled = true;
    }

    if (elements[index].type == 'Eu') {
        document.getElementById("rot2").disabled = true;
        document.getElementById("rot3").disabled = true;
        document.getElementById("rot4").disabled = true;
    } else {
        document.getElementById("rot2").disabled = false;
        document.getElementById("rot3").disabled = false;
        document.getElementById("rot4").disabled = false;
    }

    if (elements[index].type == 'ChSq') {
        document.getElementById("sq-lv-1").disabled = true;
        document.getElementById("sq-lv-2").disabled = true;
        document.getElementById("sq-lv-3").disabled = true;
        document.getElementById("sq-lv-4").disabled = true;
    } else {
        document.getElementById("sq-lv-1").disabled = false;
        document.getElementById("sq-lv-2").disabled = false;
        document.getElementById("sq-lv-3").disabled = false;
        document.getElementById("sq-lv-4").disabled = false;
    }

}

function resetTable() {
    document.getElementById("elm-table").innerHTML = "";
    this.numElmInTable = 0;
    this.totalScore = 0.0;
    this.clearElement();
    this.displayElement();
}

function downgradeLevel(lod, type) {
    if (type == "jump") {
        switch (lod) {
            case '0':
                return '0';
            case '1':
                return '0';
            case '2':
                return '1';
            case '3':
                return '2';
            case '4':
                return '3';
        }
    } else {
        switch (lod) {
            case 'B':
                return 'B';
            case '1':
                return 'B';
            case '2':
                return '1';
            case '3':
                return '2';
            case '4':
                return '3';
        }
    }
}

function addRepeated() {
    if (elements[0].elmType == "jump") {
        elements[index].repeated = true;
        this.enableButtons();
    }
}

function getBonus() {
    if (elements[0].bonus) {
        return "x";
    } else {
        return "";
    }
}

function updatePCS() {
    
}