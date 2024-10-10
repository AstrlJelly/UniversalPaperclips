// Threnody ---------------------------------------------------------

function threnodyLoaded() {
    threnodyLoadedBool = true;
}

function loadThrenody() {
    threnodyAudio.src = "test.mp3";
    threnodyAudio.addEventListener("canplaythrough", threnodyLoaded);
}

function playThrenody() {
    if (threnodyLoadedBool) {
        threnodyAudio.play();
    }
}

// Wire --------------------------------------------------------

function adjustWirePrice() {
    wirePriceTimer++;

    if (wirePriceTimer > 250 && wireBasePrice > 15) {
        wireBasePrice -= wireBasePrice / 1000;
        wirePriceTimer = 0;
    }

    if (Math.random() < 0.015) {
        wirePriceCounter++;
        let wireAdjust = 6 * Math.sin(wirePriceCounter);
        wireCost = Math.ceil(wireBasePrice + wireAdjust);
        document.getElementById("wireCost").innerHTML = wireCost.toLocaleString();
    }
}

function toggleWireBuyer() {
    if (wireBuyerStatus == 1) {
        wireBuyerStatus = 0;
        document.getElementById("wireBuyerStatus").innerHTML = "OFF";
    } else {
        wireBuyerStatus = 1;
        document.getElementById("wireBuyerStatus").innerHTML = "ON";
    }
}

function buyWire() {
    if (funds >= wireCost) {
        wirePriceTimer = 0;
        wire += wireSupply;
        funds -= wireCost;
        wirePurchase += 1;
        wireBasePrice += 0.05;
        document.getElementById("wire").innerHTML = Math.floor(wire).toLocaleString();
        document.getElementById("funds").innerHTML = funds.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    }
}

// QCHIPS -----------------------------------------------------------

let qChips = [];

let qChip0 = {
    waveSeed: 0.1,
    value: 0,
    active: 0,
};

qChips.push(qChip0);

let qChip1 = {
    waveSeed: 0.2,
    value: 0,
    active: 0,
};

qChips.push(qChip1);

let qChip2 = {
    waveSeed: 0.3,
    value: 0,
    active: 0,
};

qChips.push(qChip2);

let qChip3 = {
    waveSeed: 0.4,
    value: 0,
    active: 0,
};

qChips.push(qChip3);

let qChip4 = {
    waveSeed: 0.5,
    value: 0,
    active: 0,
};

qChips.push(qChip4);

let qChip5 = {
    waveSeed: 0.6,
    value: 0,
    active: 0,
};

qChips.push(qChip5);

let qChip6 = {
    waveSeed: 0.7,
    value: 0,
    active: 0,
};

qChips.push(qChip6);

let qChip7 = {
    waveSeed: 0.8,
    value: 0,
    active: 0,
};

qChips.push(qChip7);

let qChip8 = {
    waveSeed: 0.9,
    value: 0,
    active: 0,
};

qChips.push(qChip8);

let qChip9 = {
    waveSeed: 1,
    value: 0,
    active: 0,
};

qChips.push(qChip9);

function quantumCompute() {
    qClock += 0.01;
    for (let i = 0; i < qChips.length; i++) {
        qChips[i].value = Math.sin(qClock * qChips[i].waveSeed * qChips[i].active);
        document.getElementById("qChip" + i).style.opacity = qChips[i].value;
    }
}

function qComp() {
    qFade = 1;

    let q = 0;

    if (qChips[0].active == 0) {
        document.getElementById("qCompDisplay").innerHTML = "Need Photonic Chips";
    } else {
        for (let i = 0; i < qChips.length; i++) {
            q += qChips[i].value;
        }

        let qq = Math.ceil(q * 360);
        let buffer = memory * 1000 - standardOps;
        let damper = tempOps / 100 + 5;

        if (qq > buffer) {
            tempOps += Math.ceil(qq / damper) - buffer;
            qq = buffer;
            opFade = 0.01;
            opFadeTimer = 0;
        }

        standardOps += qq;
        document.getElementById("qCompDisplay").innerHTML = "qOps: " + Math.ceil(q * 360).toLocaleString();
    }
}

function manageProjects() {
    for (let i = 0; i < projects.length; i++) {
        if (projects[i].trigger() && projects[i].uses > 0) {
            displayProjects(projects[i]);
            projects[i].uses -= 1;
            activeProjects.push(projects[i]);
        }
    }

    for (let i = 0; i < activeProjects.length; i++) {
        if (activeProjects[i].cost()) {
            (document.getElementById(activeProjects[i].id) as HTMLButtonElement).disabled = false;
        } else {
            (document.getElementById(activeProjects[i].id) as HTMLButtonElement).disabled = true;
        }
    }
}

function displayProjects(project: Project) {
    let element = document.getElementById("projectListTop");
    let newProject = document.createElement("button");
    newProject.setAttribute("id", project.id);

    newProject.onclick = function () {
        project.effect();
    };

    newProject.setAttribute("class", "projectButton");
    element.appendChild(newProject /*, element.firstChild*/);

    let span = document.createElement("span");
    span.style.fontWeight = "bold";
    newProject.appendChild(span);

    let title = document.createTextNode(project.title + " ");
    span.appendChild(title);

    let cost = document.createTextNode(project.priceTag);
    newProject.appendChild(cost);

    let div = document.createElement("div");
    newProject.appendChild(div);

    let description = document.createTextNode(project.description);
    newProject.appendChild(description);

    blink(project.id);
}

//  HYPNODRONE EVENT ----------------------------------------------------------------

document.getElementById("hypnoDroneEventDiv").style.display = "none";

function longBlink(elemID: string) {
    let e = document.getElementById(elemID);

    let longBlinkCounter = 0;
    let handle = setInterval(function () {
        longToggleVisibility(elemID);
    }, 32);

    function longToggleVisibility(elemID: any) {
        longBlinkCounter++;

        let hypnoDroneTextDiv = document.getElementById("hypnoDroneText");

        if (longBlinkCounter > 5 && longBlinkCounter < 10) {
            hypnoDroneTextDiv.innerHTML = "Release";
        }

        if (longBlinkCounter > 30 && longBlinkCounter < 40) {
            hypnoDroneTextDiv.innerHTML = "<br /><br /><br />Release";
        }

        if (longBlinkCounter > 45 && longBlinkCounter < 55) {
            hypnoDroneTextDiv.innerHTML = "<br />Release";
        }

        if (longBlinkCounter > 55) {
            hypnoDroneTextDiv.innerHTML = "Release<br/>the<br/>Hypno<br/>Drones";
        }

        if (longBlinkCounter >= 120) {
            console.log("weed wizzard");
            clearInterval(handle);
            longBlinkCounter = 0;
            e.style.display = "none";
        } else {
            if (e.style.display != "") {
                e.style.display = "";
            } else {
                e.style.display = "none";
            }
        }
    }
}

function hypnoDroneEvent() {
    document.getElementById("hypnoDroneText").innerHTML = "Release";
    longBlink("hypnoDroneEventDiv");
}

//  MESSAGES ------------------------------------------------------------------------

let lastMessage = "";
let messageRepeat = 0;
let consoleLines = 5;

function displayMessage(msg: string) {
    if (lastMessage === msg) {
        messageRepeat++;
        document.getElementById("readout1").innerHTML = msg + ` (x${messageRepeat + 1})`;
    } else {
        messageRepeat = 0;

        // let consoleDiv = document.getElementById("consoleDiv");
        // for (let i = consoleDiv.childNodes.length - 1; i >= 2; i--) {
        //     console.log(
        //         "consoleDiv.childNodes[i - 1].innerHTML : " +
        //             consoleDiv.childNodes[i - 1].innerHTML
        //     );
        //     console.log(
        //         "consoleDiv.childNodes[i].innerHTML : " +
        //             consoleDiv.childNodes[i].innerHTML
        //     );
        //     consoleDiv.childNodes[i - 1].innerHTML =
        //         consoleDiv.childNodes[i].innerHTML;
        // }
        // consoleDiv.lastChild.innerHTML = msg;
        for (let i = consoleLines - 1; i >= 2; i--) {
            document.getElementById("readout" + i).innerHTML = document.getElementById("readout" + (i - 1)).innerHTML;
        }
        document.getElementById("readout1").innerHTML = msg;
    }
    lastMessage = msg;
}

// BLINK

function blink(elemID: string) {
    let e = document.getElementById(elemID);

    // {
    let handle = setInterval(function () {
        toggleVisibility(elemID);
    }, 30);
    // }

    function toggleVisibility(elemID: any) {
        blinkCounter += 1;

        if (blinkCounter >= 12) {
            clearInterval(handle);
            blinkCounter = 0;
            e.style.visibility = "visible";
        } else {
            if (e.style.visibility != "hidden") {
                e.style.visibility = "hidden";
            } else {
                e.style.visibility = "visible";
            }
        }
    }
}

function buttonUpdate() {
    if (spaceFlag == 0) {
        document.getElementById("mdpsDiv").style.display = "none";
    } else if (spaceFlag == 1) {
        document.getElementById("mdpsDiv").style.display = "";
    }

    document.getElementById("factoryRebootToolTip").innerHTML = "+" + numberCruncher(factoryBill) + " clips";

    document.getElementById("harvesterRebootToolTip").innerHTML = "+" + numberCruncher(harvesterBill) + " clips";

    document.getElementById("wireDroneRebootToolTip").innerHTML = "+" + numberCruncher(wireDroneBill) + " clips";

    document.getElementById("farmRebootToolTip").innerHTML = "+" + numberCruncher(farmBill) + " clips";

    document.getElementById("batteryRebootToolTip").innerHTML = "+" + numberCruncher(batteryBill) + " clips";

    if (swarmFlag == 1) {
        document.getElementById("swarmSliderDiv").style.display = "";
    } else {
        document.getElementById("swarmSliderDiv").style.display = "none";
    }

    document.getElementById("clipCountCrunched").innerHTML = numberCruncher(clips, 1);

    if (autoTourneyFlag == 1) {
        document.getElementById("autoTourneyStatusDiv").style.display = "";
        document.getElementById("autoTourneyControl").style.display = "";
    } else {
        document.getElementById("autoTourneyStatusDiv").style.display = "none";
        document.getElementById("autoTourneyControl").style.display = "none";
    }

    document.getElementById("qCompDisplay").style.opacity = qFade.toString();
    qFade -= 0.001;

    if (wireBuyerFlag == 1) {
        document.getElementById("wireBuyerDiv").style.display = "";
    } else {
        document.getElementById("wireBuyerDiv").style.display = "none";
    }

    if (
        resultsFlag == 1 &&
        autoTourneyFlag == 1 &&
        autoTourneyStatus == 1 &&
        document.getElementById("tournamentResultsTable").style.display == ""
    ) {
        resultsTimer++;

        if (resultsTimer >= 300 && operations >= tourneyCost) {
            newTourney();
            runTourney();
            resultsTimer = 0;
        }
    }

    document.getElementById("tournamentStuff").onmouseover = function () {
        revealGrid();
    };
    document.getElementById("tournamentStuff").onmouseout = function () {
        revealResults();
    };

    if (pNameBattles.flag == 0) {
        document.getElementById("increaseMaxTrustDiv").style.display = "none";
        document.getElementById("honorDiv").style.display = "none";
    } else {
        document.getElementById("increaseMaxTrustDiv").style.display = "";
        document.getElementById("honorDiv").style.display = "";
    }

    if (battleFlag == 0) {
        document.getElementById("drifterDiv").style.display = "none";
    } else {
        document.getElementById("drifterDiv").style.display = "";
    }

    if (battleFlag == 0) {
        document.getElementById("battleCanvasDiv").style.display = "none";
    } else {
        document.getElementById("battleCanvasDiv").style.display = "";
    }

    if (project131.flag == 0) {
        document.getElementById("combatButtonDiv").style.display = "none";
    } else {
        document.getElementById("combatButtonDiv").style.display = "";
    }

    if (maxFactoryLevel >= 50 || pClipFactories.flag == 0) {
        document.getElementById("factoryUpgradeDisplay").style.display = "none";
    } else {
        document.getElementById("factoryUpgradeDisplay").style.display = "";
    }

    if (maxDroneLevel >= 50000) {
        document.getElementById("droneUpgradeDisplay").style.display = "none";
    }

    if (honor < maxTrustCost) {
        (document.getElementById("btnIncreaseMaxTrust") as HTMLButtonElement).disabled = true;
    } else {
        (document.getElementById("btnIncreaseMaxTrust") as HTMLButtonElement).disabled = false;
    }

    if (unusedClips < probeCost) {
        (document.getElementById("btnMakeProbe") as HTMLButtonElement).disabled = true;
    } else {
        (document.getElementById("btnMakeProbe") as HTMLButtonElement).disabled = false;
    }

    if (probesLostHaz < 1) {
        document.getElementById("hazardBodyCount").style.display = "none";
    } else {
        document.getElementById("hazardBodyCount").style.display = "";

        document.getElementById("probesLostHazardsDisplay").innerHTML = numberCruncher(probesLostHaz);
    }

    if (probesLostDrift < 1) {
        document.getElementById("driftBodyCount").style.display = "none";
    } else {
        document.getElementById("driftBodyCount").style.display = "";
    }

    if (probesLostCombat < 1) {
        document.getElementById("combatBodyCount").style.display = "none";
    } else {
        document.getElementById("combatBodyCount").style.display = "";
    }

    if (prestigeU < 1 && prestigeS < 1) {
        document.getElementById("prestigeDiv").style.display = "none";
    } else {
        document.getElementById("prestigeDiv").style.display = "";
    }

    if (wire < 1) {
        (document.getElementById("btnMakePaperclip") as HTMLButtonElement).disabled = true;
    } else {
        (document.getElementById("btnMakePaperclip") as HTMLButtonElement).disabled = false;
    }
    if (funds < wireCost) {
        (document.getElementById("btnBuyWire") as HTMLButtonElement).disabled = true;
    } else {
        (document.getElementById("btnBuyWire") as HTMLButtonElement).disabled = false;
    }
    if (funds < clipperCost) {
        (document.getElementById("btnMakeClipper") as HTMLButtonElement).disabled = true;
    } else {
        (document.getElementById("btnMakeClipper") as HTMLButtonElement).disabled = false;
    }
    if (funds < adCost) {
        (document.getElementById("btnExpandMarketing") as HTMLButtonElement).disabled = true;
    } else {
        (document.getElementById("btnExpandMarketing") as HTMLButtonElement).disabled = false;
    }
    if (margin <= 0.01) {
        (document.getElementById("btnLowerPrice") as HTMLButtonElement).disabled = true;
    } else {
        (document.getElementById("btnLowerPrice") as HTMLButtonElement).disabled = false;
    }

    if (trust <= processors + memory && swarmGifts <= 0) {
        (document.getElementById("btnAddProc") as HTMLButtonElement).disabled = true;
        (document.getElementById("btnAddMem") as HTMLButtonElement).disabled = true;
    } else {
        (document.getElementById("btnAddProc") as HTMLButtonElement).disabled = false;
        (document.getElementById("btnAddMem") as HTMLButtonElement).disabled = false;
    }
    if (operations >= tourneyCost && tourneyInProg == 0) {
        (document.getElementById("btnNewTournament") as HTMLButtonElement).disabled = false;
    } else {
        (document.getElementById("btnNewTournament") as HTMLButtonElement).disabled = true;
    }
    if (yomi < investUpgradeCost) {
        (document.getElementById("btnImproveInvestments") as HTMLButtonElement).disabled = true;
    } else {
        (document.getElementById("btnImproveInvestments") as HTMLButtonElement).disabled = false;
    }
    if (investmentEngineFlag == 0) {
        document.getElementById("investmentEngine").style.display = "none";
        document.getElementById("investmentEngineUpgrade").style.display = "none";
    } else {
        document.getElementById("investmentEngine").style.display = "";
        document.getElementById("investmentEngineUpgrade").style.display = "";
    }

    if (strategyEngineFlag == 0) {
        document.getElementById("strategyEngine").style.display = "none";
        document.getElementById("tournamentManagement").style.display = "none";
    } else {
        document.getElementById("strategyEngine").style.display = "";
        document.getElementById("tournamentManagement").style.display = "";
    }

    if (megaClipperFlag == 0) {
        document.getElementById("megaClipperDiv").style.display = "none";
    } else {
        document.getElementById("megaClipperDiv").style.display = "";
    }

    if (funds < megaClipperCost) {
        (document.getElementById("btnMakeMegaClipper") as HTMLButtonElement).disabled = true;
    } else {
        (document.getElementById("btnMakeMegaClipper") as HTMLButtonElement).disabled = false;
    }

    if (autoClipperFlag == 0) {
        document.getElementById("autoClipperDiv").style.display = "none";
    } else {
        document.getElementById("autoClipperDiv").style.display = "";
    }

    if (funds >= 5) {
        autoClipperFlag = 1;
    }

    if (revPerSecFlag == 0) {
        document.getElementById("revPerSecDiv").style.display = "none";
    } else {
        document.getElementById("revPerSecDiv").style.display = "";
    }

    if (compFlag == 0) {
        document.getElementById("compDiv").style.display = "none";
    } else {
        document.getElementById("compDiv").style.display = "";
    }

    if (!creativityOn) {
        document.getElementById("creativityDiv").style.display = "none";
    } else {
        document.getElementById("creativityDiv").style.display = "";
    }

    if (projectsFlag == 0) {
        document.getElementById("projectsDiv").style.display = "none";
    } else {
        document.getElementById("projectsDiv").style.display = "";
    }

    if (humanFlag == 0) {
        document.getElementById("businessDiv").style.display = "none";
        document.getElementById("manufacturingDiv").style.display = "none";
        document.getElementById("trustDiv").style.display = "none";
        investmentEngineFlag = 0;
        wireBuyerFlag = 0;
        document.getElementById("creationDiv").style.display = "";
    } else {
        document.getElementById("businessDiv").style.display = "";
        document.getElementById("manufacturingDiv").style.display = "";
        document.getElementById("trustDiv").style.display = "";
        document.getElementById("creationDiv").style.display = "none";
    }

    if (factoryFlag == 0) {
        document.getElementById("factoryDiv").style.display = "none";
    } else {
        document.getElementById("factoryDiv").style.display = "";
    }

    if (wireProductionFlag == 0) {
        document.getElementById("wireProductionDiv").style.display = "none";
    } else {
        document.getElementById("wireProductionDiv").style.display = "";
        document.getElementById("wireTransDiv").style.display = "none";
    }

    if (harvesterFlag == 0) {
        document.getElementById("harvesterDiv").style.display = "none";
    } else {
        document.getElementById("harvesterDiv").style.display = "";
    }

    if (wireDroneFlag == 0) {
        document.getElementById("wireDroneDiv").style.display = "none";
    } else {
        document.getElementById("wireDroneDiv").style.display = "";
    }

    if (tothFlag == 0) {
        document.getElementById("tothDiv").style.display = "none";
    } else {
        document.getElementById("tothDiv").style.display = "";
    }

    if (spaceFlag == 0) {
        document.getElementById("spaceDiv").style.display = "none";
        document.getElementById("factoryDivSpace").style.display = "none";
        document.getElementById("droneDivSpace").style.display = "none";
        document.getElementById("probeDesignDiv").style.display = "none";
        document.getElementById("increaseProbeTrustDiv").style.display = "none";
    } else {
        document.getElementById("spaceDiv").style.display = "";
        document.getElementById("factoryDivSpace").style.display = "";
        document.getElementById("droneDivSpace").style.display = "";
        document.getElementById("probeDesignDiv").style.display = "";
        document.getElementById("increaseProbeTrustDiv").style.display = "";
        document.getElementById("factoryDiv").style.display = "none";
        document.getElementById("harvesterDiv").style.display = "none";
        document.getElementById("wireDroneDiv").style.display = "none";
    }

    if (qFlag == 0) {
        document.getElementById("qComputing").style.display = "none";
    } else {
        document.getElementById("qComputing").style.display = "";
    }

    if (unusedClips < factoryCost) {
        (document.getElementById("btnMakeFactory") as HTMLButtonElement).disabled = true;
    } else {
        (document.getElementById("btnMakeFactory") as HTMLButtonElement).disabled = false;
    }

    if (harvesterLevel == 0) {
        (document.getElementById("btnHarvesterReboot") as HTMLButtonElement).disabled = true;
    } else {
        (document.getElementById("btnHarvesterReboot") as HTMLButtonElement).disabled = false;
    }

    if (wireDroneLevel == 0) {
        (document.getElementById("btnWireDroneReboot") as HTMLButtonElement).disabled = true;
    } else {
        (document.getElementById("btnWireDroneReboot") as HTMLButtonElement).disabled = false;
    }

    if (factoryLevel == 0) {
        (document.getElementById("btnFactoryReboot") as HTMLButtonElement).disabled = true;
    } else {
        (document.getElementById("btnFactoryReboot") as HTMLButtonElement).disabled = false;
    }

    // PROBE DESIGN

    probeUsedTrust = probeSpeed + probeNav + probeRep + probeHaz + probeFac + probeHarv + probeWire + probeCombat;

    document.getElementById("probeTrustUsedDisplay").innerHTML = probeUsedTrust.toLocaleString();

    if (yomi < probeTrustCost || probeTrust >= maxTrust) {
        (document.getElementById("btnIncreaseProbeTrust") as HTMLButtonElement).disabled = true;
    } else {
        (document.getElementById("btnIncreaseProbeTrust") as HTMLButtonElement).disabled = false;
    }

    if (probeTrust - probeUsedTrust < 1) {
        (document.getElementById("btnRaiseProbeSpeed") as HTMLButtonElement).disabled = true;
    } else {
        (document.getElementById("btnRaiseProbeSpeed") as HTMLButtonElement).disabled = false;
    }

    if (probeSpeed < 1) {
        (document.getElementById("btnLowerProbeSpeed") as HTMLButtonElement).disabled = true;
    } else {
        (document.getElementById("btnLowerProbeSpeed") as HTMLButtonElement).disabled = false;
    }

    if (probeTrust - probeUsedTrust < 1) {
        (document.getElementById("btnRaiseProbeNav") as HTMLButtonElement).disabled = true;
    } else {
        (document.getElementById("btnRaiseProbeNav") as HTMLButtonElement).disabled = false;
    }

    if (probeNav < 1) {
        (document.getElementById("btnLowerProbeNav") as HTMLButtonElement).disabled = true;
    } else {
        (document.getElementById("btnLowerProbeNav") as HTMLButtonElement).disabled = false;
    }

    if (probeTrust - probeUsedTrust < 1) {
        (document.getElementById("btnRaiseProbeRep") as HTMLButtonElement).disabled = true;
    } else {
        (document.getElementById("btnRaiseProbeRep") as HTMLButtonElement).disabled = false;
    }

    if (probeRep < 1) {
        (document.getElementById("btnLowerProbeRep") as HTMLButtonElement).disabled = true;
    } else {
        (document.getElementById("btnLowerProbeRep") as HTMLButtonElement).disabled = false;
    }

    if (probeTrust - probeUsedTrust < 1) {
        (document.getElementById("btnRaiseProbeHaz") as HTMLButtonElement).disabled = true;
    } else {
        (document.getElementById("btnRaiseProbeHaz") as HTMLButtonElement).disabled = false;
    }

    if (probeHaz < 1) {
        (document.getElementById("btnLowerProbeHaz") as HTMLButtonElement).disabled = true;
    } else {
        (document.getElementById("btnLowerProbeHaz") as HTMLButtonElement).disabled = false;
    }

    if (probeTrust - probeUsedTrust < 1) {
        (document.getElementById("btnRaiseProbeFac") as HTMLButtonElement).disabled = true;
    } else {
        (document.getElementById("btnRaiseProbeFac") as HTMLButtonElement).disabled = false;
    }

    if (probeFac < 1) {
        (document.getElementById("btnLowerProbeFac") as HTMLButtonElement).disabled = true;
    } else {
        (document.getElementById("btnLowerProbeFac") as HTMLButtonElement).disabled = false;
    }

    if (probeTrust - probeUsedTrust < 1) {
        (document.getElementById("btnRaiseProbeHarv") as HTMLButtonElement).disabled = true;
    } else {
        (document.getElementById("btnRaiseProbeHarv") as HTMLButtonElement).disabled = false;
    }

    if (probeHarv < 1) {
        (document.getElementById("btnLowerProbeHarv") as HTMLButtonElement).disabled = true;
    } else {
        (document.getElementById("btnLowerProbeHarv") as HTMLButtonElement).disabled = false;
    }

    if (probeTrust - probeUsedTrust < 1) {
        (document.getElementById("btnRaiseProbeWire") as HTMLButtonElement).disabled = true;
    } else {
        (document.getElementById("btnRaiseProbeWire") as HTMLButtonElement).disabled = false;
    }

    if (probeWire < 1) {
        (document.getElementById("btnLowerProbeWire") as HTMLButtonElement).disabled = true;
    } else {
        (document.getElementById("btnLowerProbeWire") as HTMLButtonElement).disabled = false;
    }

    if (probeTrust - probeUsedTrust < 1) {
        (document.getElementById("btnRaiseProbeCombat") as HTMLButtonElement).disabled = true;
    } else {
        (document.getElementById("btnRaiseProbeCombat") as HTMLButtonElement).disabled = false;
    }

    if (probeCombat < 1) {
        (document.getElementById("btnLowerProbeCombat") as HTMLButtonElement).disabled = true;
    } else {
        (document.getElementById("btnLowerProbeCombat") as HTMLButtonElement).disabled = false;
    }

    document.getElementById("cover").style.display = "none";
}

//----------INVESTMENTS----------------------------------------------------------------

let stocks = [];
let alphabet = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
];
let portfolioSize = 0;
let stockID = 0;
let secTotal = 0;
let portTotal = 0;
let sellDelay = 0;
let riskiness = 5;
let maxPort = 5;
let m = 0;
let investLevel = 0;
let investUpgradeCost = 100;
let stockGainThreshold = 0.5;
let ledger = 0;
let stockReportCounter = 0;

function investUpgrade() {
    yomi -= investUpgradeCost;
    investLevel++;
    document.getElementById("investmentLevel").innerHTML = investLevel.toLocaleString();
    stockGainThreshold += 0.01;
    investUpgradeCost = Math.floor(Math.pow(investLevel + 1, Math.E) * 100);
    document.getElementById("investUpgradeCost").innerHTML = investUpgradeCost.toLocaleString();
    document.getElementById("yomiDisplay").innerHTML = yomi.toLocaleString();
    displayMessage("Investment engine upgraded, expected profit/loss ratio now " + stockGainThreshold);
}

function investDeposit() {
    ledger -= Math.floor(funds);
    bankroll = Math.floor(bankroll + funds);
    funds = 0;
    document.getElementById("investmentBankroll").innerHTML = bankroll.toLocaleString();
    document.getElementById("funds").innerHTML = funds.toFixed(2);
    document.getElementById("portValue").innerHTML = portTotal.toLocaleString();
}

function investWithdraw() {
    ledger += bankroll;
    funds += bankroll;
    bankroll = 0;
    document.getElementById("investmentBankroll").innerHTML = bankroll.toLocaleString();
    document.getElementById("funds").innerHTML = funds.toFixed(2);
    document.getElementById("portValue").innerHTML = portTotal.toLocaleString();
}

function stockShop() {
    let budget = Math.ceil(portTotal / riskiness);
    let r = 11 - riskiness;
    let reserves = Math.ceil(portTotal / r);
    if (riskiness == 1) {
        reserves = 0;
    }

    if (bankroll - budget < reserves && riskiness == 1 && bankroll > portTotal / 10) {
        budget = bankroll;
    } else if (bankroll - budget < reserves && riskiness == 1) {
        budget = 0;
    } else if (bankroll - budget < reserves) {
        budget = bankroll - reserves;
    }

    if (portfolioSize < maxPort && bankroll >= 5 && budget >= 1 && bankroll - budget >= reserves) {
        if (Math.random() < 0.25) {
            createStock(budget);
        }
    }
}

function createStock(dollars: number) {
    stockID++;
    let sym = generateSymbol();
    let roll = Math.random();
    let pri = 0;
    if (roll > 0.99) {
        pri = Math.ceil(Math.random() * 3000);
    } else if (roll > 0.85) {
        pri = Math.ceil(Math.random() * 500);
    } else if (roll > 0.6) {
        pri = Math.ceil(Math.random() * 150);
    } else if (roll > 0.2) {
        pri = Math.ceil(Math.random() * 50);
    } else {
        pri = Math.ceil(Math.random() * 15);
    }

    if (pri > dollars) {
        pri = Math.ceil(dollars * roll);
    }

    let amt = Math.floor(dollars / pri);
    if (amt > 1000000) {
        amt = 1000000;
    }

    let newStock = {
        id: stockID,
        symbol: sym,
        price: pri,
        amount: amt,
        total: pri * amt,
        profit: 0,
        age: 0,
    };

    stocks.push(newStock);
    portfolioSize = stocks.length;
    bankroll -= pri * amt;
    document.getElementById("investmentBankroll").innerHTML = bankroll.toLocaleString();
    document.getElementById("secValue").innerHTML = secTotal.toLocaleString();
    document.getElementById("portValue").innerHTML = portTotal.toLocaleString();
}

function sellStock() {
    bankroll += stocks[0].total;
    document.getElementById("investmentBankroll").innerHTML = bankroll.toLocaleString();
    document.getElementById("secValue").innerHTML = secTotal.toLocaleString();
    document.getElementById("portValue").innerHTML = portTotal.toLocaleString();
    stocks.splice(0, 1);
    portfolioSize = stocks.length;
}

function generateSymbol() {
    let ltrNum = 0;
    let x = Math.random();
    if (x <= 0.01) {
        ltrNum = 1;
    } else if (x <= 0.1) {
        ltrNum = 2;
    } else if (x <= 0.4) {
        ltrNum = 3;
    } else {
        ltrNum = 4;
    }

    let y = Math.floor(Math.random() * 26);
    let name = alphabet[y];

    for (let i = 1; i < ltrNum; i++) {
        let z = Math.floor(Math.random() * 26);
        name = name.concat(alphabet[z]);
    }

    return name;
}

function updateStocks() {
    for (let i = 0; i < portfolioSize; i++) {
        stocks[i].age += 1;
        if (Math.random() < 0.6) {
            let gain = true;
            if (Math.random() > stockGainThreshold) {
                gain = false;
            }

            let currentPrice = stocks[i].price;
            let delta = Math.ceil((Math.random() * currentPrice) / (4 * riskiness));

            if (gain) {
                stocks[i].price += delta;
            } else {
                stocks[i].price -= delta;
            }

            if (stocks[i].price == 0 && Math.random() > 0.24) {
                stocks[i].price = 1;
            }

            stocks[i].total = stocks[i].price * stocks[i].amount;

            if (gain) {
                stocks[i].profit += delta * stocks[i].amount;
            } else {
                stocks[i].profit -= delta * stocks[i].amount;
            }
        }
    }
}

// Stock List Display Routine

window.setInterval(function () {
    if ((document.getElementById("investStrat") as HTMLInputElement).value == "low") {
        riskiness = 7;
    } else if ((document.getElementById("investStrat") as HTMLInputElement).value == "med") {
        riskiness = 5;
    } else {
        riskiness = 1;
    }

    m = 0;

    for (let i = 0; i < portfolioSize; i++) {
        m += stocks[i].total;
    }

    secTotal = m;

    portTotal = bankroll + secTotal;

    document.getElementById("secValue").innerHTML = secTotal.toLocaleString();
    document.getElementById("portValue").innerHTML = portTotal.toLocaleString();

    portfolioSize = stocks.length;

    for (let i = 1; i <= portfolioSize; i++) {
        let n = i.toString();
        let s = i - 1;
        document.getElementById("stock" + n + "Symbol").innerHTML = stocks[s].symbol;
        document.getElementById("stock" + n + "Amount").innerHTML = Math.ceil(stocks[s].amount).toLocaleString();
        document.getElementById("stock" + n + "Price").innerHTML = Math.ceil(stocks[s].price).toLocaleString();
        document.getElementById("stock" + n + "Total").innerHTML = Math.ceil(stocks[s].total).toLocaleString();
        document.getElementById("stock" + n + "Profit").innerHTML = Math.ceil(stocks[s].profit).toLocaleString();
    }

    let firstBlankSlot = portfolioSize + 1;

    for (let i = firstBlankSlot; i <= 5; i++) {
        document.getElementById("stock" + i + "Symbol").innerHTML = "&nbsp";
        document.getElementById("stock" + i + "Amount").innerHTML = "&nbsp";
        document.getElementById("stock" + i + "Price").innerHTML = "&nbsp";
        document.getElementById("stock" + i + "Total").innerHTML = "&nbsp";
        document.getElementById("stock" + i + "Profit").innerHTML = "&nbsp";
    }
}, 100);

window.setInterval(function () {
    if (humanFlag == 1) {
        stockShop();
    }
}, 1000);

window.setInterval(function () {
    sellDelay += 1;

    if (portfolioSize > 0 && sellDelay >= 5 && Math.random() <= 0.3 && humanFlag == 1) {
        sellStock();
        sellDelay = 0;
    }

    if (portfolioSize > 0 && humanFlag == 1) {
        updateStocks();
    }
}, 2500);

function clipClick(number: number) {
    if (dismantle >= 4) {
        finalClips++;
    }

    if (wire >= 1) {
        if (number > wire) {
            number = wire;
        }

        clips += number;
        unsoldClips += number;
        wire -= number;
        unusedClips += number;

        if (humanFlag == 0) {
            document.getElementById("unusedClipsDisplay").innerHTML = numberCruncher(unusedClips);
        }

        if (humanFlag == 0) {
            document.getElementById("transWire").innerHTML = numberCruncher(wire);
            document.getElementById("nanoWire").innerHTML = numberCruncher(wire);
        }

        if (milestoneFlag < 15) {
            document.getElementById("clips").innerHTML = Math.ceil(clips).toLocaleString();
        }

        document.getElementById("wire").innerHTML = Math.floor(wire).toLocaleString();
        document.getElementById("unsoldClips").innerHTML = Math.floor(unsoldClips).toLocaleString();
    }
}

function makeClipper() {
    if (funds >= clippperCost) {
        clipmakerLevel += 1;
        funds -= clipperCost;
        document.getElementById("clipmakerLevel2").innerHTML = clipmakerLevel.toLocaleString();
    }

    clipperCost = Math.pow(1.1, clipmakerLevel) + 5;
    document.getElementById("clipperCost").innerHTML = clipperCost.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}

function makeMegaClipper() {
    if (funds >= megaClipperCost) {
        megaClipperLevel += 1;
        funds -= megaClipperCost;
        document.getElementById("megaClipperLevel").innerHTML = megaClipperLevel.toLocaleString();
        document.getElementById("funds").innerHTML = funds.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    }

    megaClipperCost = Math.pow(1.07, megaClipperLevel) * 1000;
    document.getElementById("megaClipperCost").innerHTML = megaClipperCost.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}

let maxFactoryLevel = 0;
let maxDroneLevel = 0;

function updateUpgrades() {
    let nfup = 0;
    let ndup = 0;

    if (maxFactoryLevel < 10) {
        nfup = 10;
    } else if (maxFactoryLevel < 20) {
        nfup = 20;
    } else if (maxFactoryLevel < 50) {
        nfup = 50;
    }

    if (maxDroneLevel < 500) {
        ndup = 500;
    } else if (maxDroneLevel < 5000) {
        ndup = 5000;
    } else if (maxDroneLevel < 50000) {
        ndup = 50000;
    }

    document.getElementById("nextFactoryUpgrade").innerHTML = nfup.toLocaleString();
    document.getElementById("nextDroneUpgrade").innerHTML = ndup.toLocaleString();
}

function makeFactory() {
    unusedClips -= factoryCost;
    factoryBill += factoryCost;
    document.getElementById("unusedClipsDisplay").innerHTML = numberCruncher(unusedClips);
    factoryLevel++;
    document.getElementById("factoryLevelDisplay").innerHTML = factoryLevel.toLocaleString();
    let fcmod = 1;
    if (factoryLevel > 0 && factoryLevel < 8) {
        fcmod = 11 - factoryLevel;
    } else if (factoryLevel > 7 && factoryLevel < 13) {
        fcmod = 2;
    } else if (factoryLevel > 12 && factoryLevel < 20) {
        fcmod = 1.5;
    } else if (factoryLevel > 19 && factoryLevel < 39) {
        fcmod = 1.25;
    } else if (factoryLevel > 38 && factoryLevel < 79) {
        fcmod = 1.15;
    } else if (factoryLevel > 78 && factoryLevel < 99) {
        fcmod = 1.1;
    } else if (factoryLevel > 98 && factoryLevel < 199) {
        fcmod = 1.1;
    } else if (factoryLevel > 198) {
        fcmod = 1.1;
    }

    if (factoryLevel > maxFactoryLevel) {
        maxFactoryLevel = factoryLevel;
    }
    updateUpgrades();

    factoryCost *= fcmod;
    //   factoryCost = Math.log(1.25,(factoryLevel+1))*100000000;
    document.getElementById("factoryCostDisplay").innerHTML = numberCruncher(factoryCost);
}

function makeHarvester(amount: number) {
    for (let x = 0; x < amount; x++) {
        unusedClips -= harvesterCost;
        harvesterBill += harvesterCost;
        harvesterLevel++;
        harvesterCost = Math.pow(harvesterLevel + 1, 2.25) * 1000000;
    }

    document.getElementById("unusedClipsDisplay").innerHTML = numberCruncher(unusedClips);
    document.getElementById("harvesterLevelDisplay").innerHTML = harvesterLevel.toLocaleString();
    document.getElementById("harvesterCostDisplay").innerHTML = numberCruncher(harvesterCost);

    if (harvesterLevel + wireDroneLevel > maxDroneLevel) {
        maxDroneLevel = harvesterLevel + wireDroneLevel;
    }
    updateDronePrices();
    updateUpgrades();
}

function makeWireDrone(amount: number) {
    for (let i = 0; i < amount; i++) {
        unusedClips -= wireDroneCost;
        wireDroneBill += wireDroneCost;
        wireDroneLevel++;
        wireDroneCost = Math.pow(wireDroneLevel + 1, 2.25) * 1000000;
    }

    document.getElementById("unusedClipsDisplay").innerHTML = numberCruncher(unusedClips);
    document.getElementById("wireDroneLevelDisplay").innerHTML = wireDroneLevel.toLocaleString();
    document.getElementById("wireDroneCostDisplay").innerHTML = numberCruncher(wireDroneCost);

    if (harvesterLevel + wireDroneLevel > maxDroneLevel) {
        maxDroneLevel = harvesterLevel + wireDroneLevel;
    }

    updateDronePrices();
    updateUpgrades();
}

let p10h = 0;
let p100h = 0;
let p1000h = 0;
let p10w = 0;
let p100w = 0;
let p1000w = 0;

function updateDronePrices() {
    p10h = 0;
    p100h = 0;
    p1000h = 0;
    p10w = 0;
    p100w = 0;
    p1000w = 0;

    let h = harvesterLevel + 1;
    for (let i = 0; i < 10; i++) {
        p10h += Math.pow(h, 2.25) * 1000000;
        h++;
    }

    h = harvesterLevel + 1;
    for (let i = 0; i < 100; i++) {
        p100h += Math.pow(h, 2.25) * 1000000;
        h++;
    }

    h = harvesterLevel + 1;
    for (let i = 0; i < 1000; i++) {
        p1000h += Math.pow(h, 2.25) * 1000000;
        h++;
    }

    let w = wireDroneLevel + 1;
    for (let i = 0; i < 10; i++) {
        p10w += Math.pow(w, 2.25) * 1000000;
        w++;
    }

    w = wireDroneLevel + 1;
    for (let i = 0; i < 100; i++) {
        p100w += Math.pow(w, 2.25) * 1000000;
        w++;
    }

    w = wireDroneLevel + 1;
    for (let i = 0; i < 1000; i++) {
        p1000w += Math.pow(w, 2.25) * 1000000;
        w++;
    }
}

function updateDroneButtons() {
    if (unusedClips < harvesterCost) {
        (document.getElementById("btnMakeHarvester") as HTMLButtonElement).disabled = true;
    } else {
        (document.getElementById("btnMakeHarvester") as HTMLButtonElement).disabled = false;
    }

    if (unusedClips < p10h) {
        (document.getElementById("btnHarvesterx10") as HTMLButtonElement).disabled = true;
    } else {
        (document.getElementById("btnHarvesterx10") as HTMLButtonElement).disabled = false;
    }

    if (unusedClips < p100h) {
        (document.getElementById("btnHarvesterx100") as HTMLButtonElement).disabled = true;
    } else {
        (document.getElementById("btnHarvesterx100") as HTMLButtonElement).disabled = false;
    }

    if (unusedClips < p1000h) {
        (document.getElementById("btnHarvesterx1000") as HTMLButtonElement).disabled = true;
    } else {
        (document.getElementById("btnHarvesterx1000") as HTMLButtonElement).disabled = false;
    }

    if (unusedClips < wireDroneCost) {
        (document.getElementById("btnMakeWireDrone") as HTMLButtonElement).disabled = true;
    } else {
        (document.getElementById("btnMakeWireDrone") as HTMLButtonElement).disabled = false;
    }

    if (unusedClips < p10w) {
        (document.getElementById("btnWireDronex10") as HTMLButtonElement).disabled = true;
    } else {
        (document.getElementById("btnWireDronex10") as HTMLButtonElement).disabled = false;
    }

    if (unusedClips < p100w) {
        (document.getElementById("btnWireDronex100") as HTMLButtonElement).disabled = true;
    } else {
        (document.getElementById("btnWireDronex100") as HTMLButtonElement).disabled = false;
    }

    if (unusedClips < p1000w) {
        (document.getElementById("btnWireDronex1000") as HTMLButtonElement).disabled = true;
    } else {
        (document.getElementById("btnWireDronex1000") as HTMLButtonElement).disabled = false;
    }
}

function harvesterReboot() {
    harvesterLevel = 0;
    unusedClips += harvesterBill;
    harvesterBill = 0;
    updateDronePrices();
    document.getElementById("unusedClipsDisplay").innerHTML = numberCruncher(unusedClips);
    document.getElementById("harvesterLevelDisplay").innerHTML = harvesterLevel.toLocaleString();
    harvesterCost = 2000000;
    document.getElementById("harvesterCostDisplay").innerHTML = numberCruncher(harvesterCost);
}

function wireDroneReboot() {
    wireDroneLevel = 0;
    unusedClips += wireDroneBill;
    wireDroneBill = 0;
    updateDronePrices();
    document.getElementById("unusedClipsDisplay").innerHTML = numberCruncher(unusedClips);
    document.getElementById("wireDroneLevelDisplay").innerHTML = wireDroneLevel.toLocaleString();
    wireDroneCost = 2000000;
    document.getElementById("wireDroneCostDisplay").innerHTML = numberCruncher(wireDroneCost);
}

function factoryReboot() {
    factoryLevel = 0;
    unusedClips += factoryBill;
    factoryBill = 0;
    document.getElementById("unusedClipsDisplay").innerHTML = numberCruncher(unusedClips);
    document.getElementById("factoryLevelDisplay").innerHTML = factoryLevel.toLocaleString();
    factoryCost = 100000000;
    document.getElementById("factoryCostDisplay").innerHTML = numberCruncher(factoryCost);
}

// SWARM

let giftBits = 0;
let giftBitGenerationRate = 0;

function updateSwarm() {
    if (swarmFlag == 1) {
        // WARNING: parseFloat might not be right here? hmm
        sliderPos = parseFloat((document.getElementById("slider") as HTMLInputElement).value);
    }

    if (yomi < synchCost) {
        (document.getElementById("btnSynchSwarm") as HTMLButtonElement).disabled = true;
    } else {
        (document.getElementById("btnSynchSwarm") as HTMLButtonElement).disabled = false;
    }

    if (creativity < entertainCost) {
        (document.getElementById("btnEntertainSwarm") as HTMLButtonElement).disabled = true;
    } else {
        (document.getElementById("btnEntertainSwarm") as HTMLButtonElement).disabled = false;
    }

    if (availableMatter == 0 && harvesterLevel + wireDroneLevel >= 1) {
        boredomLevel += 1;
    } else if (availableMatter > 0 && boredomLevel > 0) {
        boredomLevel -= 1;
    }

    if (boredomLevel >= 30000) {
        boredomFlag = 1;
        boredomLevel = 0;
        if (boredomMsg == 0) {
            displayMessage("No matter to harvest. Inactivity has caused the Swarm to become bored");
            boredomMsg = 1;
        }
    }

    let droneRatio = Math.max(harvesterLevel + 1, wireDroneLevel + 1) / Math.min(harvesterLevel + 1, wireDroneLevel + 1);

    if (droneRatio < 1.5 && disorgCounter > 1) {
        disorgCounter -= 0.01;
    } else if (droneRatio > 1.5) {
        let x = droneRatio / 10000;
        if (x > 0.01) {
            x = 0.01;
        }
        disorgCounter += x;
    }

    if (disorgCounter >= 100) {
        disorgFlag = 1;
        if (disorgMsg == 0) {
            displayMessage("Imbalance between Harvester and Wire Drone levels has disorganized the Swarm");
            disorgMsg = 1;
        }
    }

    let d = Math.floor(harvesterLevel + wireDroneLevel);

    document.getElementById("swarmSize").innerHTML = numberCruncher(d);
    document.getElementById("swarmGifts").innerHTML = numberCruncher(swarmGifts);

    if (giftCountdown <= 0) {
        nextGift = Math.round((Math.log10(d) * sliderPos) / 100);
        if (nextGift <= 0) {
            nextGift = 1;
        }
        swarmGifts += nextGift;
        document.getElementById("swarmGifts").innerHTML = numberCruncher(swarmGifts);
        if (milestoneFlag < 15) {
            displayMessage("The swarm has generated a gift of " + nextGift + " additional computational capacity");
        }

        //        THE OLD WAY
        //        giftCountdown = giftPeriod;
        //        elapsedTime = 0;

        //        THE NEW WAY
        giftBits = 0;
    }

    if (powMod == 0) {
        swarmStatus = 6;
    } else {
        swarmStatus = 0;
    }

    if (spaceFlag == 1 && project130.flag == 0) {
        swarmStatus = 9;
    }

    if (d == 0) {
        swarmStatus = 7;
    } else if (d == 1) {
        swarmStatus = 8;
    }

    if (swarmFlag == 0) {
        swarmStatus = 6;
    }

    if (boredomFlag == 1) {
        swarmStatus = 3;
    }

    if (disorgFlag == 1) {
        swarmStatus = 5;
    }

    if (swarmStatus == 0) {
        //       THE OLD WAY
        //      elapsedTime += 1;
        //      giftCountdown = ((giftPeriod/Math.log(d)) / (sliderPos/100)) - elapsedTime;

        //      THE NEW WAY
        giftBitGenerationRate = Math.log(d) * (sliderPos / 100);
        giftBits += giftBitGenerationRate;
        giftCountdown = (giftPeriod - giftBits) / giftBitGenerationRate;

        document.getElementById("swarmStatus").innerHTML = "Active";
        document.getElementById("giftCountdown").innerHTML = timeCruncher(giftCountdown);
        document.getElementById("giftTimer").style.display = "";
    } else {
        document.getElementById("giftTimer").style.display = "none";
    }

    if (swarmStatus == 1) {
        document.getElementById("swarmStatus").innerHTML = "Hungry";
        document.getElementById("feedButtonDiv").style.display = "";
    } else {
        document.getElementById("feedButtonDiv").style.display = "none";
    }

    if (swarmStatus == 2) {
        document.getElementById("swarmStatus").innerHTML = "Confused";
        document.getElementById("teachButtonDiv").style.display = "";
    } else {
        document.getElementById("teachButtonDiv").style.display = "none";
    }

    if (swarmStatus == 3) {
        document.getElementById("swarmEntertainCost").innerHTML = entertainCost.toLocaleString();
        document.getElementById("swarmStatus").innerHTML = "Bored";
        document.getElementById("entertainButtonDiv").style.display = "";
    } else {
        document.getElementById("entertainButtonDiv").style.display = "none";
    }

    if (swarmStatus == 4) {
        document.getElementById("swarmStatus").innerHTML = "Cold";
        document.getElementById("cladButtonDiv").style.display = "";
    } else {
        document.getElementById("cladButtonDiv").style.display = "none";
    }

    if (swarmStatus == 5) {
        document.getElementById("swarmStatus").innerHTML = "Disorganized";
        document.getElementById("synchButtonDiv").style.display = "";
    } else {
        document.getElementById("synchButtonDiv").style.display = "none";
    }

    if (swarmStatus == 6) {
        document.getElementById("swarmStatus").innerHTML = "Sleeping";
    }

    if (swarmStatus == 7) {
        document.getElementById("swarmStatusDiv").style.display = "none";
    } else {
        document.getElementById("swarmStatusDiv").style.display = "";
    }

    if (swarmStatus == 8) {
        document.getElementById("swarmStatus").innerHTML = "Lonely";
    }

    if (swarmStatus == 9) {
        document.getElementById("swarmStatus").innerHTML = "NO RESPONSE...";
    }

    if (swarmFlag == 0) {
        document.getElementById("swarmEngine").style.display = "none";
        document.getElementById("swarmGiftDiv").style.display = "none";
    } else {
        document.getElementById("swarmEngine").style.display = "";
        document.getElementById("swarmGiftDiv").style.display = "";
    }
}

function synchSwarm() {
    yomi -= synchCost;
    document.getElementById("yomiDisplay").innerHTML = yomi.toLocaleString();
    disorgFlag = 0;
    disorgCounter = 0;
    disorgMsg = 0;
}

function entertainSwarm() {
    creativity -= entertainCost;
    entertainCost += 10000;
    boredomFlag = 0;
    boredomLevel = 0;
    boredomMsg = 0;
}

// POWER

let p10f = 0;
let p100f = 0;
let p10b = 0;
let p100b = 0;

function updatePowPrices() {
    p10f = 0;
    p100f = 0;
    p10b = 0;
    p100b = 0;

    let f = farmLevel + 1;
    for (let i = 0; i < 10; i++) {
        p10f += Math.pow(f, 2.78) * 100000000;
        f++;
    }

    f = farmLevel + 1;
    for (let i = 0; i < 100; i++) {
        p100f += Math.pow(f, 2.78) * 100000000;
        f++;
    }

    let b = batteryLevel + 1;
    for (let i = 0; i < 10; i++) {
        p10b += Math.pow(b, 2.54) * 10000000;
        b++;
    }

    b = batteryLevel + 1;
    for (let i = 0; i < 100; i++) {
        p100b += Math.pow(b, 2.54) * 10000000;
        b++;
    }
}

function makeFarm(amount: number) {
    for (let i = 0; i < amount; i++) {
        unusedClips -= farmCost;
        farmBill += farmCost;
        farmLevel++;
        farmCost = Math.pow(farmLevel + 1, 2.78) * 100000000;
    }

    document.getElementById("unusedClipsDisplay").innerHTML = numberCruncher(unusedClips);
    document.getElementById("farmLevel").innerHTML = farmLevel.toLocaleString();
    document.getElementById("farmCost").innerHTML = numberCruncher(farmCost);

    updatePowPrices();
}

function farmReboot() {
    farmLevel = 0;
    unusedClips += farmBill;
    farmBill = 0;
    updatePowPrices();
    document.getElementById("unusedClipsDisplay").innerHTML = numberCruncher(unusedClips);
    document.getElementById("farmLevel").innerHTML = farmLevel.toLocaleString();
    farmCost = 10000000;
    document.getElementById("farmCost").innerHTML = numberCruncher(farmCost);
}

function makeBattery(amount: number) {
    for (let i = 0; i < amount; i++) {
        unusedClips -= batteryCost;
        batteryBill += batteryCost;
        batteryLevel++;
        batteryCost = Math.pow(batteryLevel + 1, 2.54) * 10000000;
    }

    document.getElementById("unusedClipsDisplay").innerHTML = numberCruncher(unusedClips);
    document.getElementById("batteryLevel").innerHTML = batteryLevel.toLocaleString();
    document.getElementById("batteryCost").innerHTML = numberCruncher(batteryCost);

    updatePowPrices();
}

function batteryReboot() {
    batteryLevel = 0;
    unusedClips += batteryBill;
    batteryBill = 0;
    updatePowPrices();
    storedPower = 0;
    document.getElementById("unusedClipsDisplay").innerHTML = numberCruncher(unusedClips);
    document.getElementById("batteryLevel").innerHTML = batteryLevel.toLocaleString();
    batteryCost = 1000000;
    document.getElementById("batteryCost").innerHTML = numberCruncher(batteryCost);
}

function updatePower() {
    if (spaceFlag == 0) {
        let supply = (farmLevel * farmRate) / 100;
        let dDemand = (harvesterLevel * dronePowerRate) / 100 + (wireDroneLevel * dronePowerRate) / 100;
        let fDemand = (factoryLevel * factoryPowerRate) / 100;
        let demand = dDemand + fDemand;
        let nuSupply = 0;
        let xsDemand = 0;
        let xsSupply = 0;
        let cap = batteryLevel * batterySize;

        if (supply >= demand) {
            xsSupply = supply - demand;
            if (storedPower < cap) {
                if (xsSupply > cap - storedPower) {
                    xsSupply = cap - storedPower;
                }
                console.log("storedPower += xsSupply, xsSupply is? : " + xsSupply);
                storedPower += xsSupply;
            }

            if (powMod < 1) {
                powMod = 1;
            }

            if (momentum == 1) {
                powMod += 0.0001;
            }
        } else if (supply < demand) {
            xsDemand = demand - supply;
            if (storedPower > 0) {
                if (storedPower >= xsDemand) {
                    if (momentum == 1) {
                        powMod += 0.0001;
                    }

                    storedPower -= xsDemand;
                    console.log("storedPower -= xsDemand, xsDemand is? : " + xsDemand);
                } else if (storedPower < xsDemand) {
                    xsDemand -= storedPower;
                    storedPower = 0;
                    nuSupply = supply - xsDemand;
                    powMod = nuSupply / demand;
                }
            } else if (storedPower <= 0) {
                powMod = supply / demand;
            }
        }

        document.getElementById("powerProductionRate").innerHTML = Math.round(supply * 100).toLocaleString();
        document.getElementById("powerConsumptionRate").innerHTML = Math.round(demand * 100).toLocaleString();
        document.getElementById("storedPower").innerHTML = Math.round(storedPower).toLocaleString();
        document.getElementById("facPowConRate").innerHTML = Math.round(fDemand * 100).toLocaleString();
        document.getElementById("dronePowConRate").innerHTML = Math.round(dDemand * 100).toLocaleString();
        document.getElementById("maxStorage").innerHTML = Math.round(cap).toLocaleString();

        if (factoryLevel == 0 && harvesterLevel == 0 && wireDroneLevel == 0) {
            document.getElementById("performance").innerHTML = "0";
        } else {
            document.getElementById("performance").innerHTML = Math.round(powMod * 100)
                .toLocaleString()
                .toLocaleString();
        }

        if (unusedClips < farmCost) {
            (document.getElementById("btnMakeFarm") as HTMLButtonElement).disabled = true;
        } else {
            (document.getElementById("btnMakeFarm") as HTMLButtonElement).disabled = false;
        }

        if (unusedClips < batteryCost) {
            (document.getElementById("btnMakeBattery") as HTMLButtonElement).disabled = true;
        } else {
            (document.getElementById("btnMakeBattery") as HTMLButtonElement).disabled = false;
        }

        if (farmLevel < 1) {
            (document.getElementById("btnFarmReboot") as HTMLButtonElement).disabled = true;
        } else {
            (document.getElementById("btnFarmReboot") as HTMLButtonElement).disabled = false;
        }

        if (batteryLevel < 1) {
            (document.getElementById("btnBatteryReboot") as HTMLButtonElement).disabled = true;
        } else {
            (document.getElementById("btnBatteryReboot") as HTMLButtonElement).disabled = false;
        }

        if (unusedClips < p10f) {
            (document.getElementById("btnFarmx10") as HTMLButtonElement).disabled = true;
        } else {
            (document.getElementById("btnFarmx10") as HTMLButtonElement).disabled = false;
        }

        if (unusedClips < p100f) {
            (document.getElementById("btnFarmx100") as HTMLButtonElement).disabled = true;
        } else {
            (document.getElementById("btnFarmx100") as HTMLButtonElement).disabled = false;
        }

        if (unusedClips < p10b) {
            (document.getElementById("btnBatteryx10") as HTMLButtonElement).disabled = true;
        } else {
            (document.getElementById("btnBatteryx10") as HTMLButtonElement).disabled = false;
        }

        if (unusedClips < p100b) {
            (document.getElementById("btnBatteryx100") as HTMLButtonElement).disabled = true;
        } else {
            (document.getElementById("btnBatteryx100") as HTMLButtonElement).disabled = false;
        }
    }

    if (project127.flag == 1 && spaceFlag == 0) {
        document.getElementById("powerDiv").style.display = "";
    } else {
        document.getElementById("powerDiv").style.display = "none";
    }
}

function buyAds() {
    if (funds >= adCost) {
        marketingLvl += 1;
        funds -= adCost;
        adCost = Math.floor(adCost * 2);
        document.getElementById("adCost").innerHTML = adCost.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
        document.getElementById("funds").innerHTML = funds.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
        document.getElementById("marketingLvl").innerHTML = marketingLvl.toLocaleString();
    }
}

function sellClips(number: number) {
    if (unsoldClips > 0) {
        if (number > unsoldClips) {
            transaction = Math.floor(unsoldClips * margin * 1000) / 1000;
            funds = Math.floor((funds + transaction) * 100) / 100;
            income += transaction;
            clipsSold += unsoldClips;
            unsoldClips = 0;
        } else {
            transaction = Math.floor(number * margin * 1000) / 1000;
            funds = Math.floor((funds + transaction) * 100) / 100;
            income += transaction;
            clipsSold += number;
            unsoldClips -= number;
        }
    }
}

function raisePrice() {
    margin = Math.round((margin + 0.01) * 100) / 100;
    document.getElementById("demand").innerHTML = demand.toFixed(2);
    document.getElementById("margin").innerHTML = margin.toFixed(2);
}

function lowerPrice() {
    if (margin >= 0.01) {
        margin = Math.round((margin - 0.01) * 100) / 100;
        document.getElementById("demand").innerHTML = demand.toFixed(2);
        document.getElementById("margin").innerHTML = margin.toFixed(2);
    }
}

function updateStats() {
    if (wire == 1) {
        document.getElementById("inchSpan").innerHTML = "inch";
    } else {
        document.getElementById("inchSpan").innerHTML = "inches";
    }

    let clipsElement = document.getElementById("clips");

    if (milestoneFlag < 15) {
        clipsElement.innerHTML = Math.ceil(clips).toLocaleString();
    }

    if (milestoneFlag == 15 && dismantle == 0) {
        clipsElement.innerHTML = "29,999,999,999,999,900,000,000,000,000,000,000,000,000,000,000,000,000,000";
    }

    if (dismantle == 1) {
        clipsElement.innerHTML = "29,999,999,999,999,999,999,999,999,999,999,999,999,000,000,000,000,000,000";
    }

    if (dismantle == 2) {
        clipsElement.innerHTML = "29,999,999,999,999,999,999,999,999,999,999,999,999,999,999,999,000,000,000";
    }

    if (dismantle == 3) {
        clipsElement.innerHTML = "29,999,999,999,999,999,999,999,999,999,999,999,999,999,999,999,999,999,900";
    }

    if (dismantle >= 4) {
        if (finalClips < 10) {
            clipsElement.innerHTML = "29,999,999,999,999,999,999,999,999,999,999,999,999,999,999,999,999,999," + "90" + finalClips;
        } else if (finalClips > 9 && finalClips < 100) {
            clipsElement.innerHTML = "29,999,999,999,999,999,999,999,999,999,999,999,999,999,999,999,999,999," + "9" + finalClips;
        } else if (finalClips == 100) {
            clipsElement.innerHTML = "30,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000";
        }
    }

    document.getElementById("clipmakerRate").innerHTML = clipRate.toLocaleString();
    if (humanFlag == 1) {
        document.getElementById("clipmakerRate2").innerHTML = clipRate.toLocaleString();
    } else {
        document.getElementById("clipmakerRate2").innerHTML = numberCruncher(clipRate);
    }
    document.getElementById("nanoWire").innerHTML = numberCruncher(wire);
    document.getElementById("funds").innerHTML = funds.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    document.getElementById("unsoldClips").innerHTML = Math.floor(unsoldClips).toLocaleString();
    document.getElementById("demand").innerHTML = (demand * 10).toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
    document.getElementById("operations").innerHTML = Math.floor(operations).toLocaleString();
    document.getElementById("trust").innerHTML = Math.floor(trust).toLocaleString();
    document.getElementById("nextTrust").innerHTML = Math.floor(nextTrust).toLocaleString();
    if (creativityOn) {
        document.getElementById("creativity").innerHTML = Math.round(creativity).toLocaleString();
    }

    document.getElementById("factoryLevelDisplaySpace").innerHTML = numberCruncher(Math.floor(factoryLevel));
    document.getElementById("harvesterLevelSpace").innerHTML = numberCruncher(Math.floor(harvesterLevel));
    document.getElementById("wireDroneLevelSpace").innerHTML = numberCruncher(Math.floor(wireDroneLevel));
    document.getElementById("maxOps").innerHTML = (memory * 1000).toLocaleString();
}

// let incomeThen;
let incomeNow: number;
// let revTimer = 0;

function calculateRev() {
    let incomeThen = incomeNow;
    incomeNow = income;
    let incomeLastSecond = Math.round((incomeNow - incomeThen) * 100) / 100;

    incomeTracker.push(incomeLastSecond);

    if (incomeTracker.length > 10) {
        incomeTracker.splice(0, 1);
    }

    let sum = 0;

    for (let i = 0; i < incomeTracker.length; i++) {
        sum = Math.round((sum + incomeTracker[i]) * 100) / 100;
    }

    let trueAvgRev = sum / incomeTracker.length;

    let chanceOfPurchase = demand / 100;
    if (chanceOfPurchase > 1) {
        chanceOfPurchase = 1;
    }
    if (unsoldClips < 1) {
        chanceOfPurchase = 0;
    }

    let avgSales = chanceOfPurchase * (0.7 * Math.pow(demand, 1.15)) * 10;
    avgRev = chanceOfPurchase * (0.7 * Math.pow(demand, 1.15)) * margin * 10;

    if (demand > unsoldClips) {
        avgRev = trueAvgRev;
        avgSales = avgRev / margin;
    }

    document.getElementById("avgSales").innerHTML = Math.round(avgSales).toLocaleString();

    document.getElementById("avgRev").innerHTML = avgRev.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}

function calculateCreativity() {
    creativityCounter++;

    let creativityThreshold = 400;

    let s = prestigeS / 10;
    let ss = creativitySpeed + creativitySpeed * s;

    let creativityCheck = creativityThreshold / ss;

    if (creativityCounter >= creativityCheck) {
        if (creativityCheck >= 1) {
            creativity += 1;
        }

        if (creativityCheck < 1) {
            creativity += ss / creativityThreshold;
        }

        creativityCounter = 0;
    }
}

function resetPrestige() {
    prestigeU = 0;
    prestigeS = 0;

    localStorage.removeItem("savePrestige");
}

function cheatPrestigeU() {
    prestigeU++;
    let savePrestige = {
        prestigeU: prestigeU,
        prestigeS: prestigeS,
    };
    localStorage.setItem("savePrestige", JSON.stringify(savePrestige));
}

function cheatPrestigeS() {
    prestigeS++;
    let savePrestige = {
        prestigeU: prestigeU,
        prestigeS: prestigeS,
    };
    localStorage.setItem("savePrestige", JSON.stringify(savePrestige));
}

function setB() {
    battleNumbers[1] = 7;
}

function cheatClips() {
    clips += 100000000;
    unusedClips += 100000000;
    displayMessage("you just cheated");
}

function cheatMoney() {
    funds += 10000000;
    document.getElementById("funds").innerHTML = funds.toFixed(2);
    displayMessage("LIZA just cheated");
}

function cheatTrust() {
    trust += 5;
    displayMessage("Hilary is nice. Also, Liza just cheated");
}

function cheatOps() {
    standardOps += 10000;
    displayMessage("you just cheated, Liza");
}

function cheatCreat() {
    creativityOn = true;
    creativity += 1000;
    displayMessage("Liza just cheated. Very creative!");
}

function cheatYomi() {
    yomi += 1000000;
    document.getElementById("yomiDisplay").innerHTML = yomi.toLocaleString();
    displayMessage("you just cheated");
}

function cheatHypno() {
    hypnoDroneEvent();
}

function zeroMatter() {
    availableMatter = 0;
    displayMessage("you just cheated");
}

function calculateTrust() {
    if (clips > nextTrust - 1) {
        trust += 1;
        displayMessage("Production target met: TRUST INCREASED, additional processor/memory capacity granted");
        let fibNext = fib1 + fib2;
        nextTrust = fibNext * 1000;
        fib1 = fib2;
        fib2 = fibNext;
    }
}

function addProc() {
    processors += 1;
    creativitySpeed = Math.log10(processors) * Math.pow(processors, 1.1) + processors - 1;
    document.getElementById("processors").innerHTML = processors.toLocaleString();
    if (creativityOn) {
        displayMessage("Processor added, operations (or creativity) per sec increased");
    } else {
        displayMessage("Processor added, operations per sec increased");
    }

    if (humanFlag == 0 && swarmGifts > 0) {
        swarmGifts -= 1;
    }
}

function addMem() {
    displayMessage("Memory added, max operations increased");
    memory++;
    document.getElementById("memory").innerHTML = memory.toLocaleString();

    if (humanFlag == 0 && swarmGifts > 0) {
        swarmGifts -= 1;
    }
}

function calculateOperations() {
    if (tempOps > 0) {
        opFadeTimer++;
    }

    if (opFadeTimer > opFadeDelay && tempOps > 0) {
        opFade += Math.pow(3, 3.5) / 1000;
    }

    if (tempOps > 0) {
        tempOps = Math.round(tempOps - opFade);
    } else {
        tempOps = 0;
    }

    if (tempOps + standardOps < memory * 1000) {
        standardOps += tempOps;
        tempOps = 0;
    }

    operations = Math.floor(standardOps + Math.floor(tempOps));

    if (operations < memory * 1000) {
        let opCycle = processors / 10;
        let opBuf = memory * 1000 - operations;

        if (opCycle > opBuf) {
            opCycle = opBuf;
        }

        standardOps += opCycle;
    }

    if (standardOps > memory * 1000) {
        standardOps = memory * 1000;
    }
}

function milestoneCheck() {
    if (milestoneFlag == 0 && funds >= 5) {
        milestoneFlag += 1;
        displayMessage("AutoClippers available for purchase");
    }

    if (milestoneFlag == 1 && Math.ceil(clips) >= 500) {
        milestoneFlag += 1;
        displayMessage("500 clips created in " + timeCruncher(ticks));
    }
    if (milestoneFlag == 2 && Math.ceil(clips) >= 1000) {
        milestoneFlag += 1;
        displayMessage("1,000 clips created in " + timeCruncher(ticks));
    }

    if (compFlag == 0 && unsoldClips < 1 && funds < wireCost && wire < 1) {
        compFlag = 1;
        projectsFlag = 1;
        displayMessage("Trust-Constrained Self-Modification enabled");
    }

    if (compFlag == 0 && Math.ceil(clips) >= 2000) {
        compFlag = 1;
        projectsFlag = 1;
        displayMessage("Trust-Constrained Self-Modification enabled");
    }

    if (milestoneFlag == 3 && Math.ceil(clips) >= 10000) {
        milestoneFlag += 1;
        displayMessage("10,000 clips created in " + timeCruncher(ticks));
    }
    if (milestoneFlag == 4 && Math.ceil(clips) >= 100000) {
        milestoneFlag += 1;
        displayMessage("100,000 clips created in " + timeCruncher(ticks));
    }
    if (milestoneFlag == 5 && Math.ceil(clips) >= 1000000) {
        milestoneFlag += 1;
        displayMessage("1,000,000 clips created in " + timeCruncher(ticks));
    }

    if (milestoneFlag == 6 && pReleaseHypnoDrones.flag == 1) {
        milestoneFlag += 1;
        displayMessage("Full autonomy attained in " + timeCruncher(ticks));
    }

    if (milestoneFlag == 7 && Math.ceil(clips) >= 1000000000000) {
        milestoneFlag += 1;
        displayMessage("One Trillion Clips Created in " + timeCruncher(ticks));
    }

    if (milestoneFlag == 8 && Math.ceil(clips) >= 1000000000000000) {
        milestoneFlag += 1;
        displayMessage("One Quadrillion Clips Created in " + timeCruncher(ticks));
    }

    if (milestoneFlag == 9 && Math.ceil(clips) >= 1000000000000000000) {
        milestoneFlag += 1;
        displayMessage("One Quintillion Clips Created in " + timeCruncher(ticks));
    }

    if (milestoneFlag == 10 && Math.ceil(clips) >= 1000000000000000000000) {
        milestoneFlag += 1;
        displayMessage("One Sextillion Clips Created in " + timeCruncher(ticks));
    }

    if (milestoneFlag == 11 && Math.ceil(clips) >= 1000000000000000000000000) {
        milestoneFlag += 1;
        displayMessage("One Septillion Clips Created in " + timeCruncher(ticks));
    }

    if (milestoneFlag == 12 && Math.ceil(clips) >= 1000000000000000000000000000) {
        milestoneFlag += 1;
        displayMessage("One Octillion Clips Created in " + timeCruncher(ticks));
    }

    if (milestoneFlag == 13 && spaceFlag == 1) {
        milestoneFlag += 1;
        displayMessage("Terrestrial resources fully utilized in " + timeCruncher(ticks));
    }

    if (milestoneFlag == 14 && clips >= totalMatter) {
        milestoneFlag += 1;
        displayMessage("Universal Paperclips achieved in " + timeCruncher(ticks));
    }

    if (milestoneFlag == 14 && foundMatter >= totalMatter && availableMatter < 1 && wire < 1) {
        milestoneFlag += 1;
        displayMessage("Universal Paperclips achieved in " + timeCruncher(ticks));
    }
}

function timeCruncher(t: number) {
    let x = t / 100;
    let h = Math.floor(x / 3600);
    let m = Math.floor((x % 3600) / 60);
    let s = Math.floor((x % 3600) % 60);

    let hDisplay = h > 0 ? h + (h == 1 ? " hour " : " hours ") : "";
    let mDisplay = m > 0 ? m + (m == 1 ? " minute " : " minutes ") : "";
    let sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";

    return hDisplay + mDisplay + sDisplay;
}

function numberCruncher(number: number, decimals: number = undefined) {
    let suffix = "";
    if (decimals == undefined) {
        decimals = 2;
    }
    let precision = decimals;
    let newNumber = number;
    if (number > 999999999999999999999999999999999999999999999999999) {
        newNumber /= 1000000000000000000000000000000000000000000000000000;
        suffix = "sexdecillion";
    } else if (number > 999999999999999999999999999999999999999999999999) {
        newNumber /= 1000000000000000000000000000000000000000000000000;
        suffix = "quindecillion";
    } else if (number > 999999999999999999999999999999999999999999999) {
        newNumber /= 1000000000000000000000000000000000000000000000;
        suffix = "quattuordecillion";
    } else if (number > 999999999999999999999999999999999999999999) {
        newNumber /= 1000000000000000000000000000000000000000000;
        suffix = "tredecillion";
    } else if (number > 999999999999999999999999999999999999999) {
        newNumber /= 1000000000000000000000000000000000000000;
        suffix = "duodecillion";
    } else if (number > 999999999999999999999999999999999999) {
        newNumber /= 1000000000000000000000000000000000000;
        suffix = "undecillion";
    } else if (number > 999999999999999999999999999999999) {
        newNumber /= 1000000000000000000000000000000000;
        suffix = "decillion";
    } else if (number > 999999999999999999999999999999) {
        newNumber /= 1000000000000000000000000000000;
        suffix = "nonillion";
    } else if (number > 999999999999999999999999999) {
        newNumber /= 1000000000000000000000000000;
        suffix = "octillion";
    } else if (number > 999999999999999999999999) {
        newNumber /= 1000000000000000000000000;
        suffix = "septillion";
    } else if (number > 999999999999999999999) {
        newNumber /= 1000000000000000000000;
        suffix = "sextillion";
    } else if (number > 999999999999999999) {
        newNumber /= 1000000000000000000;
        suffix = "quintillion";
    } else if (number > 999999999999999) {
        newNumber /= 1000000000000000;
        suffix = "quadrillion";
    } else if (number > 999999999999) {
        newNumber /= 1000000000000;
        suffix = "trillion";
    } else if (number > 999999999) {
        newNumber /= 1000000000;
        suffix = "billion";
    } else if (number > 999999) {
        newNumber /= 1000000;
        suffix = "million";
    } else if (number > 999) {
        newNumber /= 1000;
        suffix = "thousand";
    } else if (number < 1000) {
        precision = 0;
    }
    // let suffixes = [
    //     "thousand",
    //     "million",
    //     "billion",
    //     "trillion",
    //     "quadrillion",
    //     "quintillion",
    //     "sextillion",
    //     "septillion",
    //     "octillion",
    //     "nonillion",
    //     "decillion",
    //     "undecillion",
    //     "duodecillion",
    //     "tredecillion",
    //     "quattuordecillion",
    //     "quindecillion",
    //     "sexdecillion",
    // ];
    // let range = Math.floor(Math.log(number + 1) / 3);
    // newNumber /= Math.pow(10, range * 3);
    // suffix = suffixes[range];
    // console.log(newNumber.toFixed(precision) + " " + suffix);
    return newNumber.toFixed(precision) + " " + suffix;
}

// PROBES

let probeSpeed = 0;
let probeNav = 0;
let probeXBaseRate = 1750000000000000000;
let probeRep = 0;
let probeRepBaseRate = 0.00005;
let partialProbeSpawn = 0;
let probeHaz = 0;
let probeHazBaseRate = 0.01;
let partialProbeHaz = 0;
let probesLostHaz = 0;
let probesLostDrift = 0;
let probesLostCombat = 0;
let probeFac = 0;
let probeFacBaseRate = 0.000001;
let probeHarv = 0;
let probeHarvBaseRate = 0.000002;
let probeWire = 0;
let probeWireBaseRate = 0.000002;
let probeDescendents = 0;
let drifterCount = 0;
let probeTrust = 0;
let probeUsedTrust = 0;
let probeDriftBaseRate = 0.000001;
let probeLaunchLevel = 0;
let probeCost = Math.pow(10, 17);

let probeTrustCost = Math.floor(Math.pow(probeTrust + 1, 1.47) * 200);

//let probeCost = Math.pow((probeLaunchLevel+1), 1.44)*Math.pow(10, 24);

function increaseProbeTrust() {
    yomi -= probeTrustCost;
    document.getElementById("yomiDisplay").innerHTML = yomi.toLocaleString();
    probeTrust++;
    probeTrustCost = Math.floor(Math.pow(probeTrust + 1, 1.47) * 200);
    document.getElementById("probeTrustDisplay").innerHTML = probeTrust.toLocaleString();
    document.getElementById("probeTrustCostDisplay").innerHTML = Math.floor(probeTrustCost).toLocaleString();
    displayMessage("WARNING: Risk of value drift increased");
}

function increaseMaxTrust() {
    honor -= maxTrustCost;
    document.getElementById("honorDisplay").innerHTML = Math.round(honor).toLocaleString();
    maxTrust += 10;
    // maxTrustCost = Math.floor(Math.pow(maxTrust, 1.17)*1000);
    document.getElementById("maxTrustDisplay").innerHTML = maxTrust.toLocaleString();
    // document.getElementById('maxTrustCostDisplay').innerHTML = Math.floor(maxTrustCost).toLocaleString();
    displayMessage("Maximum trust increased, probe design space expanded");
}

function raiseProbeSpeed() {
    attackSpeed += attackSpeedMod;
    probeSpeed++;
    document.getElementById("probeSpeedDisplay").innerHTML = probeSpeed.toLocaleString();
}

function lowerProbeSpeed() {
    attackSpeed -= attackSpeedMod;
    probeSpeed--;
    document.getElementById("probeSpeedDisplay").innerHTML = probeSpeed.toLocaleString();
}

function raiseProbeNav() {
    probeNav++;
    document.getElementById("probeNavDisplay").innerHTML = probeNav.toLocaleString();
}

function lowerProbeNav() {
    probeNav--;
    document.getElementById("probeNavDisplay").innerHTML = probeNav.toLocaleString();
}

function raiseProbeHaz() {
    probeHaz++;
    document.getElementById("probeHazDisplay").innerHTML = probeHaz.toLocaleString();
}

function lowerProbeHaz() {
    probeHaz--;
    document.getElementById("probeHazDisplay").innerHTML = probeHaz.toLocaleString();
}

function raiseProbeRep() {
    probeRep++;
    document.getElementById("probeRepDisplay").innerHTML = probeRep.toLocaleString();
}

function lowerProbeRep() {
    probeRep--;
    document.getElementById("probeRepDisplay").innerHTML = probeRep.toLocaleString();
}

function raiseProbeFac() {
    probeFac++;
    document.getElementById("probeFacDisplay").innerHTML = probeFac.toLocaleString();
}

function lowerProbeFac() {
    probeFac--;
    document.getElementById("probeFacDisplay").innerHTML = probeFac.toLocaleString();
}

function raiseProbeHarv() {
    probeHarv++;
    document.getElementById("probeHarvDisplay").innerHTML = probeHarv.toLocaleString();
}

function lowerProbeHarv() {
    probeHarv--;
    document.getElementById("probeHarvDisplay").innerHTML = probeHarv.toLocaleString();
}

function raiseProbeWire() {
    probeWire++;
    document.getElementById("probeWireDisplay").innerHTML = probeWire.toLocaleString();
}

function lowerProbeWire() {
    probeWire--;
    document.getElementById("probeWireDisplay").innerHTML = probeWire.toLocaleString();
}

function raiseProbeCombat() {
    probeCombat++;
    document.getElementById("probeCombatDisplay").innerHTML = probeCombat.toLocaleString();
}

function lowerProbeCombat() {
    probeCombat--;
    document.getElementById("probeCombatDisplay").innerHTML = probeCombat.toLocaleString();
}

function makeProbe() {
    unusedClips -= probeCost;
    document.getElementById("unusedClipsDisplay").innerHTML = numberCruncher(unusedClips);
    probeLaunchLevel++;
    probeCount++;
    document.getElementById("probesLaunchedDisplay").innerHTML = numberCruncher(probeLaunchLevel);

    // probeCost = Math.pow((probeLaunchLevel+1), 1.23)*Math.pow(10, 20);
    // probeCost = Math.pow(10, 20);

    document.getElementById("probeCostDisplay").innerHTML = numberCruncher(probeCost);
}

function spawnProbes() {
    let nextGen = probeCount * probeRepBaseRate * probeRep;

    // Cap Probe Growth
    if (probeCount >= 999999999999999999999999999999999999999999999999) {
        nextGen = 0;
    }

    // Partial Spawn = early slow growth
    if (nextGen > 0 && nextGen < 1) {
        partialProbeSpawn += nextGen;
        if (partialProbeSpawn >= 1) {
            nextGen = 1;
            partialProbeSpawn = 0;
        }
    }

    // Probes Cost Clips
    if (nextGen * probeCost > unusedClips) {
        nextGen = Math.floor(unusedClips / probeCost);
    }

    unusedClips -= nextGen * probeCost;
    document.getElementById("unusedClipsDisplay").innerHTML = numberCruncher(unusedClips);

    probeDescendents += nextGen;
    probeCount += nextGen;
    document.getElementById("probesBornDisplay").innerHTML = numberCruncher(probeDescendents);
    document.getElementById("probesTotalDisplay").innerHTML = numberCruncher(probeCount);
}

function exploreUniverse() {
    document.getElementById("availableMatterDisplay").innerHTML = numberCruncher(availableMatter);
    let xRate = Math.floor(probeCount) * probeXBaseRate * probeSpeed * probeNav;
    if (xRate > totalMatter - foundMatter) {
        xRate = totalMatter - foundMatter;
    }
    foundMatter += xRate;
    availableMatter += xRate;

    document.getElementById("mdps").innerHTML = numberCruncher(xRate * 100);
    document.getElementById("availableMatterDisplay").innerHTML = numberCruncher(availableMatter);
    document.getElementById("colonizedDisplay").innerHTML = (100 / (totalMatter / foundMatter)).toFixed(12);
}

function encounterHazards() {
    let boost = Math.pow(probeHaz, 1.6);
    let amount = probeCount * (probeHazBaseRate / (3 * boost + 1));
    if (project129.flag == 1) {
        amount = 0.5 * amount;
    }
    if (amount < 1) {
        partialProbeHaz += amount;
        if (partialProbeHaz >= 1) {
            amount = 1;
            partialProbeHaz = 0;
            probeCount -= amount;
            if (probeCount < 0) {
                probeCount = 0;
            }
            probesLostHaz += amount;
            document.getElementById("probesLostHazardsDisplay").innerHTML = numberCruncher(probesLostHaz);
            document.getElementById("probesTotalDisplay").innerHTML = numberCruncher(probeCount);
        }
    } else {
        if (amount > probeCount) {
            amount = probeCount;
        }
        probeCount -= amount;
        if (probeCount < 0) {
            probeCount = 0;
        }
        probesLostHaz += amount;
        document.getElementById("probesLostHazardsDisplay").innerHTML = numberCruncher(probesLostHaz);
        document.getElementById("probesTotalDisplay").innerHTML = numberCruncher(probeCount);
    }
}

function spawnFactories() {
    let amount = probeCount * probeFacBaseRate * probeFac;

    //FACTORIES COST 100M CLIPS EACH
    if (amount * 100000000 > unusedClips) {
        amount = Math.floor(unusedClips / 100000000);
    }
    unusedClips -= amount * 100000000;
    document.getElementById("unusedClipsDisplay").innerHTML = numberCruncher(unusedClips);
    factoryLevel += amount;
    document.getElementById("factoryLevelDisplay").innerHTML = numberCruncher(factoryLevel);
}

function spawnHarvesters() {
    let amount = probeCount * probeHarvBaseRate * probeHarv;

    //DRONES COST 2M CLIPS EACH
    if (amount * 2000000 > unusedClips) {
        amount = Math.floor(unusedClips / 2000000);
    }
    unusedClips -= amount * 2000000;
    document.getElementById("unusedClipsDisplay").innerHTML = numberCruncher(unusedClips);
    harvesterLevel += amount;
    document.getElementById("harvesterLevelDisplay").innerHTML = numberCruncher(harvesterLevel);
}

function spawnWireDrones() {
    let amount = probeCount * probeWireBaseRate * probeWire;

    //DRONES COST 2M CLIPS EACH
    if (amount * 2000000 > unusedClips) {
        amount = Math.floor(unusedClips / 2000000);
    }
    unusedClips -= amount * 2000000;
    document.getElementById("unusedClipsDisplay").innerHTML = numberCruncher(unusedClips);
    wireDroneLevel += amount;
    document.getElementById("wireDroneLevelDisplay").innerHTML = numberCruncher(wireDroneLevel);
}

function drift() {
    let amount = probeCount * probeDriftBaseRate * Math.pow(probeTrust, 1.2);
    if (amount > probeCount) {
        amount = probeCount;
    }
    if (project148.flag == 1) {
        amount = 0;
    }
    probeCount -= amount;
    drifterCount += amount;
    probesLostDrift += amount;

    document.getElementById("probesLostDriftDisplay").innerHTML = numberCruncher(probesLostDrift);
    document.getElementById("probesTotalDisplay").innerHTML = numberCruncher(probeCount);
    document.getElementById("drifterCount").innerHTML = numberCruncher(drifterCount);
}

function war() {
    checkForBattles();
    //  battleClock++;
    //  if (battleClock>=battleAlarm){
    //            updateBattles();
    //            battleClock = 0;
    //    }

    //  battleCleanUp();
}

// DRONES

function acquireMatter() {
    if (availableMatter > 0) {
        let dbsth = 1;
        if (droneBoost > 1) {
            dbsth = droneBoost * Math.floor(harvesterLevel);
        }

        let mtr = powMod * dbsth * Math.floor(harvesterLevel) * harvesterRate;

        mtr *= (200 - sliderPos) / 100;

        if (mtr > availableMatter) {
            mtr = availableMatter;
        }

        availableMatter -= mtr;

        acquiredMatter += mtr;
        document.getElementById("availableMatterDisplay").innerHTML = numberCruncher(availableMatter);
        document.getElementById("acquiredMatterDisplay").innerHTML = numberCruncher(acquiredMatter);

        document.getElementById("maps").innerHTML = numberCruncher(mtr * 100);
    } else {
        document.getElementById("maps").innerHTML = "0";
    }
}

function processMatter() {
    if (acquiredMatter > 0) {
        let dbstw = 1;
        if (droneBoost > 1) {
            dbstw = droneBoost * Math.floor(wireDroneLevel);
        }

        let a = powMod * dbstw * Math.floor(wireDroneLevel) * wireDroneRate;

        a *= (200 - sliderPos) / 100;

        if (a > acquiredMatter) {
            a = acquiredMatter;
        }

        acquiredMatter -= a;
        wire += a;
        document.getElementById("acquiredMatterDisplay").innerHTML = numberCruncher(acquiredMatter);
        document.getElementById("nanoWire").innerHTML = numberCruncher(wire);

        document.getElementById("wpps").innerHTML = numberCruncher(a * 100);
    } else {
        document.getElementById("wpps").innerHTML = "0";
    }
}

// CHECK FOR SAVES

if (localStorage.getItem("saveGame") != null) {
    load();
}

if (localStorage.getItem("savePrestige") != null) {
    loadPrestige();
    refresh();
}

// MAIN LOOP

window.setInterval(function () {
    ticks += 1;
    milestoneCheck();
    buttonUpdate();

    if (compFlag == 1) {
        calculateOperations();
    }

    if (humanFlag == 1) {
        calculateTrust();
    }

    if (qFlag == 1) {
        quantumCompute();
    }

    updateStats();
    manageProjects();
    milestoneCheck();

    // Clip Rate Tracker

    clipRateTracker++;

    if (clipRateTracker < 100) {
        let cr = clips - prevClips;
        clipRateTemp += cr;
        prevClips = clips;
    } else {
        clipRateTracker = 0;
        clipRate = clipRateTemp;
        clipRateTemp = 0;
    }

    // Stock Report

    stockReportCounter++;
    if (investmentEngineFlag == 1 && stockReportCounter >= 10000) {
        let r = (ledger + portTotal).toLocaleString();
        displayMessage("Lifetime investment revenue report: $" + r);
        stockReportCounter = 0;
    }

    // WireBuyer

    if (wireBuyerFlag == 1 && wireBuyerStatus == 1 && wire <= 1) {
        buyWire();
    }

    // First, Explore

    exploreUniverse();

    // Then, Drones

    if (humanFlag == 0 && spaceFlag == 0) {
        updateDroneButtons();
    }

    updatePower();
    updateSwarm();
    acquireMatter();
    processMatter();

    // Then Factories

    let fbst = 1;

    if (factoryBoost > 1) {
        fbst = factoryBoost * factoryLevel;
    }

    if (dismantle < 4) {
        clipClick(powMod * fbst * (Math.floor(factoryLevel) * factoryRate));
    }
    // Then Other Probe Functions

    if (spaceFlag == 1) {
        if (probeCount < 0) {
            probeCount = 0;
        }

        encounterHazards();
        spawnFactories();
        spawnHarvesters();
        spawnWireDrones();
        spawnProbes();
        drift();
        war();
    }

    // Auto-Clipper

    if (dismantle < 4) {
        clipClick(clipperBoost * (clipmakerLevel / 100));
        clipClick(megaClipperBoost * (megaClipperLevel * 5));
    }

    // Demand Curve

    if (humanFlag == 1) {
        marketing = Math.pow(1.1, marketingLvl - 1);
        demand = (0.8 / margin) * marketing * marketingEffectiveness * demandBoost;
        demand += (demand / 10) * prestigeU;
    }

    // Creativity

    if (creativityOn && operations >= memory * 1000) {
        calculateCreativity();
    }

    // Ending

    if (dismantle >= 1) {
        document.getElementById("probeDesignDiv").style.display = "none";
        if (endTimer1 >= 50) {
            document.getElementById("increaseProbeTrustDiv").style.display = "none";
        }

        if (endTimer1 >= 100) {
            document.getElementById("increaseMaxTrustDiv").style.display = "none";
        }

        if (endTimer1 >= 150) {
            document.getElementById("spaceDiv").style.display = "none";
        }

        if (endTimer1 >= 175) {
            document.getElementById("battleCanvasDiv").style.display = "none";
        }

        if (endTimer1 >= 190) {
            document.getElementById("honorDiv").style.display = "none";
        }
    }

    if (dismantle >= 2) {
        document.getElementById("wireProductionDiv").style.display = "none";
        document.getElementById("wireTransDiv").style.display = "";

        if (endTimer2 >= 50) {
            document.getElementById("swarmGiftDiv").style.display = "none";
        }

        if (endTimer2 >= 100) {
            document.getElementById("swarmEngine").style.display = "none";
        }

        if (endTimer2 >= 150) {
            document.getElementById("swarmSliderDiv").style.display = "none";
        }
    }

    if (dismantle >= 3) {
        document.getElementById("factoryDivSpace").style.display = "none";
        document.getElementById("clipsPerSecDiv").style.display = "none";
        document.getElementById("tothDiv").style.display = "none";
    }

    if (dismantle >= 4) {
        document.getElementById("strategyEngine").style.display = "none";
        document.getElementById("tournamentManagement").style.display = "none";
    }

    if (dismantle >= 5) {
        document.getElementById("btnQcompute").style.display = "none";

        for (let i = 0; i < qChips.length; i++) {
            qChips[i].value = 0.5;
            document.getElementById("qChip" + i).style.opacity = qChips[i].value;
        }

        if (endTimer4 == 10) {
            wire += 1;
            document.getElementById("transWire").innerHTML = wire.toLocaleString();
        }

        if (endTimer4 >= 10) {
            document.getElementById("qChip9").style.display = "none";
        }

        if (endTimer4 == 60) {
            wire += 1;
            document.getElementById("transWire").innerHTML = wire.toLocaleString();
        }

        if (endTimer4 >= 60) {
            document.getElementById("qChip8").style.display = "none";
        }

        if (endTimer4 == 100) {
            wire += 1;
            document.getElementById("transWire").innerHTML = wire.toLocaleString();
        }

        if (endTimer4 >= 100) {
            document.getElementById("qChip7").style.display = "none";
        }

        if (endTimer4 == 130) {
            wire += 1;
            document.getElementById("transWire").innerHTML = wire.toLocaleString();
        }

        if (endTimer4 >= 130) {
            document.getElementById("qChip6").style.display = "none";
        }

        if (endTimer4 == 150) {
            wire += 1;
            document.getElementById("transWire").innerHTML = wire.toLocaleString();
        }

        if (endTimer4 >= 150) {
            document.getElementById("qChip5").style.display = "none";
        }

        if (endTimer4 == 160) {
            wire += 1;
            document.getElementById("transWire").innerHTML = wire.toLocaleString();
        }

        if (endTimer4 >= 160) {
            document.getElementById("qChip4").style.display = "none";
        }

        if (endTimer4 == 165) {
            wire += 1;
        }

        if (endTimer4 >= 165) {
            document.getElementById("qChip3").style.display = "none";
        }

        if (endTimer4 == 169) {
            wire += 1;
            document.getElementById("transWire").innerHTML = wire.toLocaleString();
        }

        if (endTimer4 >= 169) {
            document.getElementById("qChip2").style.display = "none";
        }

        if (endTimer4 == 172) {
            wire += 1;
            document.getElementById("transWire").innerHTML = wire.toLocaleString();
        }

        if (endTimer4 >= 172) {
            document.getElementById("qChip1").style.display = "none";
        }

        if (endTimer4 == 174) {
            wire += 1;
            document.getElementById("transWire").innerHTML = wire.toLocaleString();
        }

        if (endTimer4 >= 174) {
            document.getElementById("qChip0").style.display = "none";
        }

        if (endTimer4 >= 250) {
            document.getElementById("qComputing").style.display = "none";
        }
    }

    if (dismantle >= 6) {
        document.getElementById("processorDisplay").style.display = "none";
    }

    if (dismantle >= 7) {
        document.getElementById("compDiv").style.display = "none";
        document.getElementById("projectsDiv").style.display = "none";
    }

    if (project148.flag == 1) {
        endTimer1++;
    }

    if (project211.flag == 1) {
        endTimer2++;
    }

    if (project212.flag == 1) {
        endTimer3++;
    }

    if (project213.flag == 1) {
        endTimer4++;
    }

    if (project215.flag == 1) {
        endTimer5++;
    }

    if (project216.flag == 1 && wire == 0) {
        endTimer6++;
    }

    if (endTimer6 >= 250) {
        document.getElementById("creationDiv").style.display = "none";
    }

    if (endTimer6 >= 500 && milestoneFlag == 15) {
        playThrenody();
        displayMessage("Universal Paperclips");
        milestoneFlag++;
    }

    if (endTimer6 >= 600 && milestoneFlag == 16) {
        displayMessage("a game by Frank Lantz");
        milestoneFlag++;
    }

    if (endTimer6 >= 700 && milestoneFlag == 17) {
        displayMessage("combat programming by Bennett Foddy");
        milestoneFlag++;
    }

    if (endTimer6 >= 800 && milestoneFlag == 18) {
        displayMessage("'Riversong' by Tonto's Expanding Headband used by kind permission of Malcolm Cecil");
        milestoneFlag++;
    }

    if (endTimer6 >= 900 && milestoneFlag == 19) {
        displayMessage("&#169; 2017 Everybody House Games");
        milestoneFlag++;
    }
}, 10);

// Slow Loop

let saveTimer = 0;
let secTimer = 0;

window.setInterval(function () {
    // Wire Price Fluctuation

    adjustWirePrice();

    // Sales Calculator

    if (humanFlag == 1) {
        if (Math.random() < demand / 100) {
            sellClips(Math.floor(0.7 * Math.pow(demand, 1.15)));
        }

        // Fire Once a Second

        secTimer++;
        if (secTimer >= 10) {
            calculateRev();
            secTimer = 0;
        }
    }

    // Auto-Save
    saveTimer++;
    if (saveTimer >= 250) {
        save();
        saveTimer = 0;
    }
}, 100);

// Saving and Loading

function refresh() {
    //DEBUG

    //    availableMatter = Math.pow(10, 24)*6000;
    //    acquiredMatter = 0;

    ////////

    document.getElementById("driftersKilled").innerHTML = numberCruncher(driftersKilled);
    document.getElementById("availableMatterDisplay").innerHTML = numberCruncher(availableMatter);
    document.getElementById("honorDisplay").innerHTML = Math.round(honor).toLocaleString();
    document.getElementById("clipmakerLevel2").innerHTML = clipmakerLevel.toLocaleString();
    document.getElementById("clipperCost").innerHTML = clipperCost.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    document.getElementById("acquiredMatterDisplay").innerHTML = numberCruncher(acquiredMatter);
    document.getElementById("nanoWire").innerHTML = numberCruncher(wire);
    document.getElementById("probesBornDisplay").innerHTML = numberCruncher(probeDescendents);
    document.getElementById("probesTotalDisplay").innerHTML = numberCruncher(probeCount);
    document.getElementById("probesLaunchedDisplay").innerHTML = probeLaunchLevel.toLocaleString();
    document.getElementById("probeCostDisplay").innerHTML = numberCruncher(probeCost);
    document.getElementById("probeCombatDisplay").innerHTML = probeCombat.toLocaleString();
    document.getElementById("probeWireDisplay").innerHTML = probeWire.toLocaleString();
    document.getElementById("probeHarvDisplay").innerHTML = probeHarv.toLocaleString();
    document.getElementById("probeFacDisplay").innerHTML = probeFac.toLocaleString();
    document.getElementById("probeRepDisplay").innerHTML = probeRep.toLocaleString();
    document.getElementById("probeHazDisplay").innerHTML = probeHaz.toLocaleString();
    document.getElementById("probeNavDisplay").innerHTML = probeNav.toLocaleString();
    document.getElementById("probeSpeedDisplay").innerHTML = probeSpeed.toLocaleString();
    document.getElementById("probeTrustDisplay").innerHTML = probeTrust.toLocaleString();
    document.getElementById("memory").innerHTML = memory.toLocaleString();
    document.getElementById("processors").innerHTML = processors.toLocaleString();
    document.getElementById("margin").innerHTML = margin.toFixed(2);
    document.getElementById("marketingLvl").innerHTML = marketingLvl.toLocaleString();
    document.getElementById("adCost").innerHTML = adCost.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    document.getElementById("factoryCostDisplay").innerHTML = numberCruncher(factoryCost);
    document.getElementById("factoryLevelDisplay").innerHTML = factoryLevel.toLocaleString();
    document.getElementById("unusedClipsDisplay").innerHTML = numberCruncher(unusedClips);
    document.getElementById("wireDroneCostDisplay").innerHTML = numberCruncher(wireDroneCost);
    document.getElementById("wireDroneLevelDisplay").innerHTML = wireDroneLevel.toLocaleString();
    document.getElementById("harvesterCostDisplay").innerHTML = numberCruncher(harvesterCost);
    document.getElementById("harvesterLevelDisplay").innerHTML = harvesterLevel.toLocaleString();
    document.getElementById("megaClipperCost").innerHTML = megaClipperCost.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    document.getElementById("megaClipperLevel").innerHTML = megaClipperLevel.toLocaleString();
    document.getElementById("investmentBankroll").innerHTML = bankroll.toLocaleString();
    document.getElementById("secValue").innerHTML = secTotal.toLocaleString();
    document.getElementById("portValue").innerHTML = portTotal.toLocaleString();
    document.getElementById("investUpgradeCost").innerHTML = investUpgradeCost.toLocaleString();
    document.getElementById("yomiDisplay").innerHTML = yomi.toLocaleString();
    document.getElementById("investmentLevel").innerHTML = investLevel.toLocaleString();
    document.getElementById("prestigeUcounter").innerHTML = (prestigeU + 1).toLocaleString();
    document.getElementById("prestigeScounter").innerHTML = (prestigeS + 1).toLocaleString();
    document.getElementById("newTourneyCost").innerHTML = tourneyCost.toLocaleString();
    tourneyInProg = 0;
    document.getElementById("maxTrustDisplay").innerHTML = maxTrust.toLocaleString();

    document.getElementById("victoryDiv").style.visibility = "hidden";

    document.getElementById("probeTrustCostDisplay").innerHTML = probeTrustCost.toLocaleString();

    document.getElementById("tournamentResultsTable").style.display = "none";

    document.getElementById("farmCost").innerHTML = numberCruncher(farmCost);
    document.getElementById("batteryCost").innerHTML = numberCruncher(batteryCost);
    document.getElementById("farmLevel").innerHTML = farmLevel.toLocaleString();
    document.getElementById("batteryLevel").innerHTML = batteryLevel.toLocaleString();

    updateDronePrices();
    document.getElementById("harvesterCostDisplay").innerHTML = numberCruncher(harvesterCost);
    document.getElementById("wireDroneCostDisplay").innerHTML = numberCruncher(wireDroneCost);

    updateUpgrades();
    updatePower();
    updatePowPrices();

    // HOT FIXES

    if (pSpaceExploration.flag == 1) {
        loadThrenody();
    }

    project218.uses = 1;
    project219.uses = 1;

    // DEBUG

    if (battles.length > 0) {
        battles.splice(0, 1);
    }
}