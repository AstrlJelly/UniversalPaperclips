let tourneyCost = 1000;
let tourneyLvl = 1;
let choiceANames = [
    "cooperate",
    "swerve",
    "macro",
    "fight",
    "bet",
    "raise_price",
    "opera",
    "go",
    "heads",
    "particle",
    "discrete",
    "peace",
    "search",
    "lead",
    "accept",
    "accept",
    "attack",
];
let choiceBNames = [
    "defect",
    "straight",
    "micro",
    "back_down",
    "fold",
    "lower_price",
    "football",
    "stay",
    "tails",
    "wave",
    "continuous",
    "war",
    "evaluate",
    "follow",
    "reject",
    "deny",
    "decay",
];
let stratCounter = 0;
let roundNum = 0;
let hMove = 1;
let vMove = 1;
let hMovePrev = 1;
let vMovePrev = 1;
let aa = 0;
let ab = 0;
let ba = 0;
let bb = 0;
let rounds = 0;
let currentRound = 0;
let rCounter = 0;
let tourneyInProg = 0;
let winnerPtr = 0;
let placeScore = 0;
let showScore = 0;
let high = 0;
let pick = 10;
let yomi = 0;
let yomiBoost = 1;

let allStrats = [];
let strats = [];

let resultsTimer = 0;
let results = [];
let resultsFlag = 0;

let payoffGrid = {
    valueAA: 0,
    valueAB: 0,
    valueBA: 0,
    valueBB: 0,
};

let stratRandom = {
    name: "RANDOM",
    active: 1,
    currentScore: 0,
    currentPos: 1,
    pickMove: function () {
        let r = Math.random();
        if (r < 0.5) {
            return 1;
        } else {
            return 2;
        }
    },
};

allStrats.push(stratRandom);
strats.push(stratRandom);

let stratA100 = {
    name: "A100",
    active: 0,
    currentScore: 0,
    currentPos: 1,
    pickMove: function () {
        return 1;
    },
};

allStrats.push(stratA100);

let stratB100 = {
    name: "B100",
    active: 0,
    currentScore: 0,
    currentPos: 1,
    pickMove: function () {
        return 2;
    },
};

allStrats.push(stratB100);

let stratGreedy = {
    name: "GREEDY",
    active: 0,
    currentScore: 0,
    currentPos: 1,
    pickMove: function () {
        let x = findBiggestPayoff();
        if (x < 3) {
            return 1;
        } else {
            return 2;
        }
    },
};

allStrats.push(stratGreedy);

let stratGenerous = {
    name: "GENEROUS",
    active: 0,
    currentScore: 0,
    currentPos: 1,
    pickMove: function () {
        let x = findBiggestPayoff();
        if (x == 1) {
            return 1;
        } else if (x == 3) {
            return 1;
        } else {
            return 2;
        }
    },
};

allStrats.push(stratGenerous);

let stratMinimax = {
    name: "MINIMAX",
    active: 0,
    currentScore: 0,
    currentPos: 1,
    pickMove: function () {
        let x = findBiggestPayoff();
        if (x == 1) {
            return 2;
        } else if (x == 3) {
            return 2;
        } else {
            return 1;
        }
    },
};

allStrats.push(stratMinimax);

let stratTitfortat = {
    name: "TIT FOR TAT",
    active: 0,
    currentScore: 0,
    currentPos: 1,
    pickMove: function () {
        // WARNING: what the fuck. why is w just an undeclared variable
        // if (this.currentPos == 1) {
        //     w = vMovePrev;
        //     return w;
        // } else {
        //     w = hMovePrev;
        //     return w;
        // }
        return vMovePrev;
    },
};

allStrats.push(stratTitfortat);

let stratBeatlast = {
    name: "BEAT LAST",
    active: 0,
    currentScore: 0,
    currentPos: 1,
    pickMove: function () {
        let w = whatBeatsLast(this.currentPos);
        return w;
    },
};

allStrats.push(stratBeatlast);

let hStrat = strats[0];
let vStrat = strats[0];

(document.getElementById("btnRunTournament") as HTMLButtonElement).disabled = true;

function findBiggestPayoff() {
    if (aa >= ab && aa >= ba && aa >= bb) {
        return 1;
    } else if (ab >= aa && ab >= ba && ab >= bb) {
        return 2;
    } else if (ba >= aa && ba >= ab && ba >= bb) {
        return 3;
    } else {
        return 4;
    }
}

function whatBeatsLast(myPos) {
    let oppsPos = 1;
    if (myPos == 1) {
        oppsPos = 2;
    } else {
        oppsPos = 1;
    }
    if (oppsPos == 1 && hMovePrev == 1) {
        if (aa > ba) {
            return 1;
        } else {
            return 2;
        }
    } else if (oppsPos == 1 && hMovePrev == 2) {
        if (ab > bb) {
            return 1;
        } else {
            return 2;
        }
    } else if (oppsPos == 2 && vMovePrev == 1) {
        if (aa > ba) {
            return 1;
        } else {
            return 2;
        }
    } else {
        if (ab > bb) {
            return 1;
        } else {
            return 2;
        }
    }
}

function pickStrats(roundNum: number) {
    let h: number, v: number;
    if (roundNum < strats.length) {
        h = 0;
        v = roundNum;
    } else {
        stratCounter++;
        if (stratCounter >= strats.length) {
            stratCounter -= strats.length;
        }
        h = Math.floor(roundNum / strats.length);
        v = stratCounter;
    }

    vStrat = strats[v];
    hStrat = strats[h];

    strats[h].currentPos = 1;
    strats[v].currentPos = 2;

    document.getElementById("vertStrat").innerHTML = vStrat.name;
    document.getElementById("horizStrat").innerHTML = hStrat.name;
}

function generateGrid() {
    payoffGrid.valueAA = Math.ceil(Math.random() * 10);
    payoffGrid.valueAB = Math.ceil(Math.random() * 10);
    payoffGrid.valueBA = Math.ceil(Math.random() * 10);
    payoffGrid.valueBB = Math.ceil(Math.random() * 10);

    aa = payoffGrid.valueAA;
    ab = payoffGrid.valueAB;
    ba = payoffGrid.valueBA;
    bb = payoffGrid.valueBB;

    let x = Math.floor(Math.random() * choiceANames.length);

    document.getElementById("vLabela").innerHTML = choiceANames[x];
    document.getElementById("vLabelb").innerHTML = choiceBNames[x];
    document.getElementById("hLabela").innerHTML = choiceANames[x];
    document.getElementById("hLabelb").innerHTML = choiceBNames[x];

    document.getElementById("aaPayoffH").innerHTML = payoffGrid.valueAA.toLocaleString();
    document.getElementById("aaPayoffV").innerHTML = payoffGrid.valueAA.toLocaleString();
    document.getElementById("abPayoffH").innerHTML = payoffGrid.valueAB.toLocaleString();
    document.getElementById("abPayoffV").innerHTML = payoffGrid.valueBA.toLocaleString();
    document.getElementById("baPayoffH").innerHTML = payoffGrid.valueBA.toLocaleString();
    document.getElementById("baPayoffV").innerHTML = payoffGrid.valueAB.toLocaleString();
    document.getElementById("bbPayoffH").innerHTML = payoffGrid.valueBB.toLocaleString();
    document.getElementById("bbPayoffV").innerHTML = payoffGrid.valueBB.toLocaleString();
}

function toggleAutoTourney() {
    if (autoTourneyStatus == 1) {
        autoTourneyStatus = 0;
        document.getElementById("autoTourneyStatus").innerHTML = "OFF";
    } else {
        autoTourneyStatus = 1;
        document.getElementById("autoTourneyStatus").innerHTML = "ON";
    }
}

function newTourney() {
    resultsFlag = 0;

    document.getElementById("tournamentTable").style.display = "";
    document.getElementById("tournamentResultsTable").style.display = "none";

    high = 0;
    tourneyInProg = 1;
    currentRound = 0;
    rounds = strats.length * strats.length;
    for (let i = 0; i < strats.length; i++) {
        strats[i].currentScore = 0;
    }
    stratCounter = 0;
    standardOps -= tourneyCost;
    tourneyLvl++;
    generateGrid();

    (document.getElementById("btnRunTournament") as HTMLButtonElement).disabled = false;

    document.getElementById("vertStrat").innerHTML = "&nbsp";
    document.getElementById("horizStrat").innerHTML = "&nbsp";

    document.getElementById("tourneyDisplay").innerHTML = "Pick strategy, run tournament, gain yomi";
}

function runTourney() {
    (document.getElementById("btnRunTournament") as HTMLButtonElement).disabled = true;
    if (currentRound < rounds) {
        round(currentRound);
    } else {
        tourneyInProg = 0;
        pickWinner();
        calculatePlaceScore();
        calculateShowScore();
        declareWinner();
    }
}

function pickWinner() {
    results = [];

    let temp = [];
    let tempHigh = 0;
    let tempWinnerPtr = 0;

    // 1. Make a temp copy of the strats array

    for (let i = 0; i < strats.length; i++) {
        temp[i] = strats[i];
    }

    for (let n = 0; n < strats.length; n++) {
        tempHigh = 0;
        tempWinnerPtr = 0;

        // 2. Find a high scoring strat in temp

        for (let i = 0; i < temp.length; i++) {
            if (temp[i].currentScore > tempHigh) {
                tempWinnerPtr = i;
                tempHigh = temp[i].currentScore;
            }
        }

        // 3. Move the high scoring strat to slot one in results

        results.push(temp[tempWinnerPtr]);
        temp.splice(tempWinnerPtr, 1);
    }

    for (let i = 0; i < strats.length; i++) {
        if (strats[i].currentScore > high) {
            winnerPtr = i;
            high = strats[i].currentScore;
        }
    }
}

function calculatePlaceScore() {
    placeScore = 0;

    // 1. Find top non-winning score

    for (let i = 1; i < results.length; i++) {
        if (results[i].currentScore < results[i - 1].currentScore) {
            placeScore = results[i].currentScore;
            break;
        }
    }
}

function calculateShowScore() {
    showScore = 0;

    // 1. Find top non-placing score

    for (let i = 1; i < results.length; i++) {
        if (results[i].currentScore < placeScore) {
            showScore = results[i].currentScore;
            break;
        }
    }
}

function declareWinner() {
    if (pick < 10) {
        tourneyReport("TOURNAMENT RESULTS (roll over for payoff grid)");
        yomi += strats[pick].currentScore * yomiBoost;
        document.getElementById("yomiDisplay").innerHTML = yomi.toLocaleString();

        if (milestoneFlag < 15) {
            displayMessage(
                strats[pick].name +
                    " scored " +
                    strats[pick].currentScore +
                    " in the tournament. Yomi increased by " +
                    strats[pick].currentScore * yomiBoost
            );
        }

        if (project128.flag == 1 && strats[winnerPtr].currentScore == strats[pick].currentScore) {
            yomi += 20000;

            if (milestoneFlag < 15) {
                displayMessage("Selected strategy won the tournament (or tied for first). +20,000 yomi");
            }
            document.getElementById("yomiDisplay").innerHTML = yomi.toLocaleString();
        } else if (project128.flag == 1 && placeScore == strats[pick].currentScore) {
            yomi += 15000;
            if (milestoneFlag < 15) {
                displayMessage("Selected strategy finished in (or tied for) second place. +15,000 yomi");
            }
            document.getElementById("yomiDisplay").innerHTML = yomi.toLocaleString();
        } else if (project128.flag == 1 && showScore == strats[pick].currentScore) {
            yomi += 10000;
            if (milestoneFlag < 15) {
                displayMessage("Selected strategy finished in (or tied for) third place. +10,000 yomi");
            }
            document.getElementById("yomiDisplay").innerHTML = yomi.toLocaleString();
        } else {
            tourneyReport("TOURNAMENT RESULTS (roll over for grid)");
        }

        populateTourneyReport();
        displayTourneyReport();
    }
}

function populateTourneyReport() {
    for (let i = 0; i < results.length; i++) {
        document.getElementById("results" + i).innerHTML = i + 1 + ". " + results[i].name + ": " + results[i].currentScore;

        if (pick < 10) {
            if (results[i].name == strats[pick].name) {
                document.getElementById("results" + i).style.fontWeight = "bold";
            } else {
                document.getElementById("results" + i).style.fontWeight = "normal";
            }
        }
    }
}

function displayTourneyReport() {
    resultsFlag = 1;

    document.getElementById("vertStrat").innerHTML = "&nbsp";
    document.getElementById("horizStrat").innerHTML = "&nbsp";

    document.getElementById("tournamentTable").style.display = "none";
    document.getElementById("tournamentResultsTable").style.display = "";
}

function tourneyReport($) {
    document.getElementById("tourneyDisplay").innerHTML = $;
}

function revealGrid() {
    if (resultsFlag == 1) {
        resultsTimer = 0;
        document.getElementById("tournamentTable").style.display = "";
        document.getElementById("tournamentResultsTable").style.display = "none";
    }
}

function revealResults() {
    if (resultsFlag == 1) {
        document.getElementById("tournamentTable").style.display = "none";
        document.getElementById("tournamentResultsTable").style.display = "";
    }
}

function calcPayoff(hm, vm) {
    // WARNING: h and v were not declared. hmmm
    // if (hm == 1 && vm == 1) {
    //     let w = document.getElementById("payoffCellAA");
    //     w.style.backgroundColor = "LightGrey";

    //     strats[h].currentScore += payoffGrid.valueAA;
    //     strats[v].currentScore += payoffGrid.valueAA;
    // } else if (hm == 1 && vm == 2) {
    //     let w = document.getElementById("payoffCellAB");
    //     w.style.backgroundColor = "LightGrey";

    //     strats[h].currentScore += payoffGrid.valueAB;
    //     strats[v].currentScore += payoffGrid.valueBA;
    // } else if (hm == 2 && vm == 1) {
    //     let w = document.getElementById("payoffCellBA");
    //     w.style.backgroundColor = "LightGrey";

    //     strats[h].currentScore += payoffGrid.valueBA;
    //     strats[v].currentScore += payoffGrid.valueAB;
    // } else if (hm == 2 && vm == 2) {
    //     let w = document.getElementById("payoffCellBB");
    //     w.style.backgroundColor = "LightGrey";

    //     strats[h].currentScore += payoffGrid.valueBB;
    //     strats[v].currentScore += payoffGrid.valueBB;
    // }
    if (hm == 1 && vm == 1) {
        let w = document.getElementById("payoffCellAA");
        w.style.backgroundColor = "LightGrey";

        strats[hm].currentScore += payoffGrid.valueAA;
        strats[vm].currentScore += payoffGrid.valueAA;
    } else if (hm == 1 && vm == 2) {
        let w = document.getElementById("payoffCellAB");
        w.style.backgroundColor = "LightGrey";

        strats[hm].currentScore += payoffGrid.valueAB;
        strats[vm].currentScore += payoffGrid.valueBA;
    } else if (hm == 2 && vm == 1) {
        let w = document.getElementById("payoffCellBA");
        w.style.backgroundColor = "LightGrey";

        strats[hm].currentScore += payoffGrid.valueBA;
        strats[vm].currentScore += payoffGrid.valueAB;
    } else if (hm == 2 && vm == 2) {
        let w = document.getElementById("payoffCellBB");
        w.style.backgroundColor = "LightGrey";

        strats[hm].currentScore += payoffGrid.valueBB;
        strats[vm].currentScore += payoffGrid.valueBB;
    }
}

function round(roundNum) {
    roundSetup();
    roundLoop();

    function roundSetup() {
        rCounter = 0;
        pickStrats(roundNum);
        let $ = "Round " + (roundNum + 1);
        tourneyReport($);
    }

    function roundLoop() {
        if (rCounter < 10) {
            runRound();
            setTimeout(function () {
                clearGrid();
            }, 50);
        } else {
            currentRound++;
            runTourney();
        }
    }

    function clearGrid() {
        let w = document.getElementById("payoffCellAA");
        w.style.backgroundColor = "white";

        let x = document.getElementById("payoffCellAB");
        x.style.backgroundColor = "white";

        let y = document.getElementById("payoffCellBA");
        y.style.backgroundColor = "white";

        let z = document.getElementById("payoffCellBB");
        z.style.backgroundColor = "white";

        setTimeout(function () {
            roundLoop();
        }, 50);
    }

    function runRound() {
        rCounter++;

        hMovePrev = hMove;
        vMovePrev = vMove;
        hMove = hStrat.pickMove();
        vMove = vStrat.pickMove();

        calcPayoff(hMove, vMove);
    }
}

window.setInterval(function () {
    // WARNING: parseInt might be wrong. idk
    pick = parseInt((document.getElementById("stratPicker") as HTMLInputElement).value);
}, 100);
