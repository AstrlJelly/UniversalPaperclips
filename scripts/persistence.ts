
function save(file: number = 0) {
    let projectsUses = [];
    let projectsFlags = [];
    let projectsActive = [];
    let stratsActive = [];

    for (let i = 0; i < projects.length; i++) {
        projectsUses[i] = projects[i].uses;
        projectsFlags[i] = projects[i].flag;
    }

    for (let i = 0; i < activeProjects.length; i++) {
        projectsActive[i] = activeProjects[i].id;
    }

    for (let i = 0; i < allStrats.length; i++) {
        stratsActive[i] = allStrats[i].active;
    }

    let saveGame = {
        resetFlag: resetFlag,

        dismantle: dismantle,
        endTimer1: endTimer1,
        endTimer2: endTimer2,
        endTimer3: endTimer3,
        endTimer4: endTimer4,
        endTimer5: endTimer5,
        endTimer6: endTimer6,

        testFlag: testFlag,
        finalClips: finalClips,

        wireBuyerStatus: wireBuyerStatus,
        wirePriceTimer: wirePriceTimer,
        qFade: qFade,
        autoTourneyStatus: autoTourneyStatus,
        driftKingMessageCost: driftKingMessageCost,
        sliderPos: sliderPos,
        tempOps: tempOps,
        standardOps: standardOps,
        opFade: opFade,

        entertainCost: entertainCost,
        boredomLevel: boredomLevel,
        boredomFlag: boredomFlag,
        boredomMsg: boredomMsg,

        unitSize: unitSize,
        driftersKilled: driftersKilled,
        battleEndDelay: battleEndDelay,
        battleEndTimer: battleEndTimer,
        masterBattleClock: masterBattleClock,

        honorCount: honorCount,
        threnodyTitle: threnodyTitle,
        bonusHonor: bonusHonor,
        honorReward: honorReward,

        resultsTimer: resultsTimer,
        resultsFlag: resultsFlag,

        honor: honor,
        maxTrust: maxTrust,
        maxTrustCost: maxTrustCost,
        disorgCounter: disorgCounter,
        disorgFlag: disorgFlag,
        synchCost: synchCost,
        disorgMsg: disorgMsg,
        threnodyCost: threnodyCost,

        farmRate: farmRate,
        batterySize: batterySize,
        factoryPowerRate: factoryPowerRate,
        dronePowerRate: dronePowerRate,
        farmLevel: farmLevel,
        batteryLevel: batteryLevel,
        farmCost: farmCost,
        batteryCost: batteryCost,
        storedPower: storedPower,
        powMod: powMod,
        farmBill: farmBill,
        batteryBill: batteryBill,
        momentum: momentum,

        swarmFlag: swarmFlag,
        swarmStatus: swarmStatus,
        swarmGifts: swarmGifts,
        nextGift: nextGift,
        giftPeriod: giftPeriod,
        giftCountdown: giftCountdown,
        elapsedTime: elapsedTime,

        maxFactoryLevel: maxFactoryLevel,
        maxDroneLevel: maxDroneLevel,

        wirePriceCounter: wirePriceCounter,
        wireBasePrice: wireBasePrice,

        egoFlag: egoFlag,
        autoTourneyFlag: autoTourneyFlag,
        tothFlag: tothFlag,

        incomeTracker: incomeTracker.slice(0),
        qChips: qChips.slice(0),
        stocks: stocks.slice(0),
        battles: battles.slice(0),
        battleNumbers: battleNumbers.slice(0),

        clips: clips,
        unusedClips: unusedClips,
        clipRate: clipRate,
        clipRateTemp: clipRateTemp,
        prevClips: prevClips,
        clipRateTracker: clipRateTracker,
        clipmakerRate: clipmakerRate,
        clipmakerLevel: clipmakerLevel,
        clipperCost: clipperCost,
        unsoldClips: unsoldClips,
        funds: funds,
        margin: margin,
        wire: wire,
        wireCost: wireCost,
        adCost: adCost,
        demand: demand,
        clipsSold: clipsSold,
        avgRev: avgRev,
        ticks: ticks,
        marketing: marketing,
        marketingLvl: marketingLvl,
        clippperCost: clippperCost,
        processors: processors,
        memory: memory,
        operations: operations,
        trust: trust,
        nextTrust: nextTrust,
        transaction: transaction,
        clipperBoost: clipperBoost,
        blinkCounter: blinkCounter,
        creativity: creativity,
        creativityOn: creativityOn,
        safetyProjectOn: safetyProjectOn,
        boostLvl: boostLvl,
        wirePurchase: wirePurchase,
        wireSupply: wireSupply,
        marketingEffectiveness: marketingEffectiveness,
        milestoneFlag: milestoneFlag,
        bankroll: bankroll,
        fib1: fib1,
        fib2: fib2,
        strategyEngineFlag: strategyEngineFlag,
        investmentEngineFlag: investmentEngineFlag,
        revPerSecFlag: revPerSecFlag,
        compFlag: compFlag,
        projectsFlag: projectsFlag,
        autoClipperFlag: autoClipperFlag,
        megaClipperFlag: megaClipperFlag,
        megaClipperCost: megaClipperCost,
        megaClipperLevel: megaClipperLevel,
        megaClipperBoost: megaClipperBoost,
        creativitySpeed: creativitySpeed,
        creativityCounter: creativityCounter,
        wireBuyerFlag: wireBuyerFlag,
        demandBoost: demandBoost,
        humanFlag: humanFlag,
        trustFlag: trustFlag,
        nanoWire: nanoWire,
        creationFlag: creationFlag,
        wireProductionFlag: wireProductionFlag,
        spaceFlag: spaceFlag,
        factoryFlag: factoryFlag,
        harvesterFlag: harvesterFlag,
        wireDroneFlag: wireDroneFlag,
        factoryLevel: factoryLevel,
        factoryBoost: factoryBoost,
        droneBoost: droneBoost,
        availableMatter: availableMatter,
        acquiredMatter: acquiredMatter,
        processedMatter: processedMatter,
        harvesterLevel: harvesterLevel,
        wireDroneLevel: wireDroneLevel,
        factoryCost: factoryCost,
        harvesterCost: harvesterCost,
        wireDroneCost: wireDroneCost,
        factoryRate: factoryRate,
        harvesterRate: harvesterRate,
        wireDroneRate: wireDroneRate,
        harvesterBill: harvesterBill,
        wireDroneBill: wireDroneBill,
        factoryBill: factoryBill,
        probeCount: probeCount,
        totalMatter: totalMatter,
        foundMatter: foundMatter,
        qFlag: qFlag,
        qClock: qClock,
        qChipCost: qChipCost,
        nextQchip: nextQchip,
        bribe: bribe,
        battleFlag: battleFlag,

        portfolioSize: portfolioSize,
        stockID: stockID,
        secTotal: secTotal,
        portTotal: portTotal,
        sellDelay: sellDelay,
        riskiness: riskiness,
        maxPort: maxPort,
        m: m,
        investLevel: investLevel,
        investUpgradeCost: investUpgradeCost,
        stockGainThreshold: stockGainThreshold,
        ledger: ledger,
        stockReportCounter: stockReportCounter,

        tourneyCost: tourneyCost,
        tourneyLvl: tourneyLvl,
        stratCounter: stratCounter,
        roundNum: roundNum,
        hMove: hMove,
        vMove: vMove,
        hMovePrev: hMovePrev,
        vMovePrev: vMovePrev,
        aa: aa,
        ab: ab,
        ba: ba,
        bb: bb,
        rounds: rounds,
        currentRound: currentRound,
        rCounter: rCounter,
        tourneyInProg: tourneyInProg,
        winnerPtr: winnerPtr,
        high: high,
        pick: pick,
        yomi: yomi,
        yomiBoost: yomiBoost,

        probeSpeed: probeSpeed,
        probeNav: probeNav,
        probeRep: probeRep,
        partialProbeSpawn: partialProbeSpawn,
        probeHaz: probeHaz,
        partialProbeHaz: partialProbeHaz,
        probesLostHaz: probesLostHaz,
        probesLostDrift: probesLostDrift,
        probesLostCombat: probesLostCombat,
        probeFac: probeFac,
        probeWire: probeWire,
        probeCombat: probeCombat,
        attackSpeed: attackSpeed,
        battleSpeed: battleSpeed,
        attackSpeedFlag: attackSpeedFlag,
        attackSpeedMod: attackSpeedMod,
        probeDescendents: probeDescendents,
        drifterCount: drifterCount,
        warTrigger: warTrigger,
        battleID: battleID,
        battleName: battleName,
        battleNameFlag: battleNameFlag,
        maxBattles: maxBattles,
        battleClock: battleClock,
        battleAlarm: battleAlarm,
        outcomeTimer: outcomeTimer,
        drifterCombat: drifterCombat,
        probeTrust: probeTrust,
        probeUsedTrust: probeUsedTrust,
        probeTrustCost: probeTrustCost,
        probeLaunchLevel: probeLaunchLevel,
        probeCost: probeCost,
    };

    let whichSave = file == 0 ? "" : file.toString();
    localStorage.setItem("saveGame" + whichSave, JSON.stringify(saveGame));
    localStorage.setItem("saveProjectsUses" + whichSave, JSON.stringify(projectsUses));
    localStorage.setItem("saveProjectsFlags" + whichSave, JSON.stringify(projectsFlags));
    localStorage.setItem("saveProjectsActive" + whichSave, JSON.stringify(projectsActive));
    localStorage.setItem("saveStratsActive" + whichSave, JSON.stringify(stratsActive));
}

function load(file: number = 0) {
    let whichSave = file == 0 ? "" : file.toString();
    let loadGame = JSON.parse(localStorage.getItem("saveGame" + whichSave));
    let loadProjectsUses = JSON.parse(localStorage.getItem("saveProjectsUses" + whichSave));
    let loadProjectsFlags = JSON.parse(localStorage.getItem("saveProjectsFlags" + whichSave));
    let loadProjectsActive = JSON.parse(localStorage.getItem("saveProjectsActive" + whichSave));
    let loadStratsActive = JSON.parse(localStorage.getItem("saveStratsActive" + whichSave));

    for (let i = 0; i < allStrats.length; i++) {
        allStrats[i].active = loadStratsActive[i];
    }

    for (let i = 1; i < allStrats.length; i++) {
        if (allStrats[i].active == 1) {
            strats.push(allStrats[i]);

            let stratList = document.getElementById("stratPicker");
            let el = document.createElement("option");
            el.textContent = strats[i].name;
            el.value = i.toLocaleString();
            stratList.appendChild(el);
        }
    }

    resetFlag = loadGame.resetFlag;

    dismantle = loadGame.dismantle;
    endTimer1 = loadGame.endTimer1;
    endTimer2 = loadGame.endTimer2;
    endTimer3 = loadGame.endTimer3;
    endTimer4 = loadGame.endTimer4;
    endTimer5 = loadGame.endTimer5;
    endTimer6 = loadGame.endTimer6;

    testFlag = loadGame.testFlag;
    finalClips = loadGame.finalClips;

    wireBuyerStatus = loadGame.wireBuyerStatus;
    wirePriceTimer = loadGame.wirePriceTimer;
    qFade = loadGame.qFade;
    autoTourneyStatus = loadGame.autoTourneyStatus;
    driftKingMessageCost = loadGame.driftKingMessageCost;
    sliderPos = loadGame.sliderPos;
    tempOps = loadGame.tempOps;
    standardOps = loadGame.standardOps;
    opFade = loadGame.opFade;

    entertainCost = loadGame.entertainCost;
    boredomLevel = loadGame.boredomLevel;
    boredomFlag = loadGame.boredomFlag;
    boredomMsg = loadGame.boredomMsg;

    unitSize = loadGame.unitSize;
    driftersKilled = loadGame.driftersKilled;
    battleEndDelay = loadGame.battleEndDelay;
    battleEndTimer = loadGame.battleEndTimer;
    masterBattleClock = loadGame.masterBattleClock;

    honorCount = loadGame.honorCount;
    threnodyTitle = loadGame.threnodyTitle;
    bonusHonor = loadGame.bonusHonor;
    honorReward = loadGame.honorReward;

    resultsTimer = loadGame.resultsTimer;
    resultsFlag = loadGame.resultsFlag;

    honor = loadGame.honor;
    maxTrust = loadGame.maxTrust;
    maxTrustCost = loadGame.maxTrustCost;
    disorgCounter = loadGame.disorgCounter;
    disorgFlag = loadGame.disorgFlag;
    synchCost = loadGame.synchCost;
    disorgMsg = loadGame.disorgMsg;
    threnodyCost = loadGame.threnodyCost;

    farmRate = loadGame.farmRate;
    batterySize = loadGame.batterySize;
    factoryPowerRate = loadGame.factoryPowerRate;
    dronePowerRate = loadGame.dronePowerRate;
    farmLevel = loadGame.farmLevel;
    batteryLevel = loadGame.batteryLevel;
    farmCost = loadGame.farmCost;
    batteryCost = loadGame.batteryCost;
    storedPower = loadGame.storedPower;
    powMod = loadGame.powMod;
    farmBill = loadGame.farmBill;
    batteryBill = loadGame.batteryBill;
    momentum = loadGame.momentum;

    swarmFlag = loadGame.swarmFlag;
    swarmStatus = loadGame.swarmStatus;
    swarmGifts = loadGame.swarmGifts;
    nextGift = loadGame.nextGift;
    giftPeriod = loadGame.giftPeriod;
    giftCountdown = loadGame.giftCountdown;
    elapsedTime = loadGame.elapsedTime;

    maxFactoryLevel = loadGame.maxFactoryLevel;
    maxDroneLevel = loadGame.maxDroneLevel;

    wirePriceCounter = loadGame.wirePriceCounter;
    wireBasePrice = loadGame.wireBasePrice;

    egoFlag = loadGame.egoFlag;
    autoTourneyFlag = loadGame.autoTourneyFlag;
    tothFlag = loadGame.tothFlag;

    incomeTracker = loadGame.incomeTracker.slice(0);
    qChips = loadGame.qChips.slice(0);
    stocks = loadGame.stocks.slice(0);
    battles = loadGame.battles.slice(0);
    battleNumbers = loadGame.battleNumbers.slice(0);

    clips = loadGame.clips;
    unusedClips = loadGame.unusedClips;
    clipRate = loadGame.clipRate;
    clipRateTemp = loadGame.clipRateTemp;
    prevClips = loadGame.prevClips;
    clipRateTracker = loadGame.clipRateTracker;
    clipmakerRate = loadGame.clipmakerRate;
    clipmakerLevel = loadGame.clipmakerLevel;
    clipperCost = loadGame.clipperCost;
    unsoldClips = loadGame.unsoldClips;
    funds = loadGame.funds;
    margin = loadGame.margin;
    wire = loadGame.wire;
    wireCost = loadGame.wireCost;
    adCost = loadGame.adCost;
    demand = loadGame.demand;
    clipsSold = loadGame.clipsSold;
    avgRev = loadGame.avgRev;
    ticks = loadGame.ticks;
    marketing = loadGame.marketing;
    marketingLvl = loadGame.marketingLvl;
    clippperCost = loadGame.clippperCost;
    processors = loadGame.processors;
    memory = loadGame.memory;
    operations = loadGame.operations;
    trust = loadGame.trust;
    nextTrust = loadGame.nextTrust;
    transaction = loadGame.transaction;
    clipperBoost = loadGame.clipperBoost;
    blinkCounter = loadGame.blinkCounter;
    creativity = loadGame.creativity;
    creativityOn = loadGame.creativityOn;
    safetyProjectOn = loadGame.safetyProjectOn;
    boostLvl = loadGame.boostLvl;
    wirePurchase = loadGame.wirePurchase;
    wireSupply = loadGame.wireSupply;
    marketingEffectiveness = loadGame.marketingEffectiveness;
    milestoneFlag = loadGame.milestoneFlag;
    bankroll = loadGame.bankroll;
    fib1 = loadGame.fib1;
    fib2 = loadGame.fib2;
    strategyEngineFlag = loadGame.strategyEngineFlag;
    investmentEngineFlag = loadGame.investmentEngineFlag;
    revPerSecFlag = loadGame.revPerSecFlag;
    compFlag = loadGame.compFlag;
    projectsFlag = loadGame.projectsFlag;
    autoClipperFlag = loadGame.autoClipperFlag;
    megaClipperFlag = loadGame.megaClipperFlag;
    megaClipperCost = loadGame.megaClipperCost;
    megaClipperLevel = loadGame.megaClipperLevel;
    megaClipperBoost = loadGame.megaClipperBoost;
    creativitySpeed = loadGame.creativitySpeed;
    creativityCounter = loadGame.creativityCounter;
    wireBuyerFlag = loadGame.wireBuyerFlag;
    demandBoost = loadGame.demandBoost;
    humanFlag = loadGame.humanFlag;
    trustFlag = loadGame.trustFlag;
    nanoWire = loadGame.nanoWire;
    creationFlag = loadGame.creationFlag;
    wireProductionFlag = loadGame.wireProductionFlag;
    spaceFlag = loadGame.spaceFlag;
    factoryFlag = loadGame.factoryFlag;
    harvesterFlag = loadGame.harvesterFlag;
    wireDroneFlag = loadGame.wireDroneFlag;
    factoryLevel = loadGame.factoryLevel;
    factoryBoost = loadGame.factoryBoost;
    droneBoost = loadGame.droneBoost;
    availableMatter = loadGame.availableMatter;
    acquiredMatter = loadGame.acquiredMatter;
    processedMatter = loadGame.processedMatter;
    harvesterLevel = loadGame.harvesterLevel;
    wireDroneLevel = loadGame.wireDroneLevel;
    factoryCost = loadGame.factoryCost;
    harvesterCost = loadGame.harvesterCost;
    wireDroneCost = loadGame.wireDroneCost;
    factoryRate = loadGame.factoryRate;
    harvesterRate = loadGame.harvesterRate;
    wireDroneRate = loadGame.wireDroneRate;
    harvesterBill = loadGame.harvesterBill;
    wireDroneBill = loadGame.wireDroneBill;
    factoryBill = loadGame.factoryBill;
    probeCount = loadGame.probeCount;
    totalMatter = loadGame.totalMatter;
    foundMatter = loadGame.foundMatter;
    qFlag = loadGame.qFlag;
    qClock = loadGame.qClock;
    qChipCost = loadGame.qChipCost;
    nextQchip = loadGame.nextQchip;
    bribe = loadGame.bribe;
    battleFlag = loadGame.battleFlag;

    portfolioSize = loadGame.portfolioSize;
    stockID = loadGame.stockID;
    secTotal = loadGame.secTotal;
    portTotal = loadGame.portTotal;
    sellDelay = loadGame.sellDelay;
    riskiness = loadGame.riskiness;
    maxPort = loadGame.maxPort;
    m = loadGame.m;
    investLevel = loadGame.investLevel;
    investUpgradeCost = loadGame.investUpgradeCost;
    stockGainThreshold = loadGame.stockGainThreshold;
    ledger = loadGame.ledger;
    stockReportCounter = loadGame.stockReportCounter;

    tourneyCost = loadGame.tourneyCost;
    tourneyLvl = loadGame.tourneyLvl;
    stratCounter = loadGame.stratCounter;
    roundNum = loadGame.roundNum;
    hMove = loadGame.hMove;
    vMove = loadGame.vMove;
    hMovePrev = loadGame.hMovePrev;
    vMovePrev = loadGame.vMovePrev;
    aa = loadGame.aa;
    ab = loadGame.ab;
    ba = loadGame.ba;
    bb = loadGame.bb;
    rounds = loadGame.rounds;
    currentRound = loadGame.currentRound;
    rCounter = loadGame.rCounter;
    tourneyInProg = loadGame.tourneyInProg;
    winnerPtr = loadGame.winnerPtr;
    high = loadGame.high;
    pick = loadGame.pick;
    yomi = loadGame.yomi;
    yomiBoost = loadGame.yomiBoost;

    probeSpeed = loadGame.probeSpeed;
    probeNav = loadGame.probeNav;
    probeRep = loadGame.probeRep;
    partialProbeSpawn = loadGame.partialProbeSpawn;
    probeHaz = loadGame.probeHaz;
    partialProbeHaz = loadGame.partialProbeHaz;
    probesLostHaz = loadGame.probesLostHaz;
    probesLostDrift = loadGame.probesLostDrift;
    probesLostCombat = loadGame.probesLostCombat;
    probeFac = loadGame.probeFac;
    probeWire = loadGame.probeWire;
    probeCombat = loadGame.probeCombat;
    attackSpeed = loadGame.attackSpeed;
    battleSpeed = loadGame.battleSpeed;
    attackSpeedFlag = loadGame.attackSpeedFlag;
    attackSpeedMod = loadGame.attackSpeedMod;
    probeDescendents = loadGame.probeDescendents;
    drifterCount = loadGame.drifterCount;
    warTrigger = loadGame.warTrigger;
    battleID = loadGame.battleID;
    battleName = loadGame.battleName;
    battleNameFlag = loadGame.battleNameFlag;
    maxBattles = loadGame.maxBattles;
    battleClock = loadGame.battleClock;
    battleAlarm = loadGame.battleAlarm;
    outcomeTimer = loadGame.outcomeTimer;
    drifterCombat = loadGame.drifterCombat;
    probeTrust = loadGame.probeTrust;
    probeUsedTrust = loadGame.probeUsedTrust;
    probeTrustCost = loadGame.probeTrustCost;
    probeLaunchLevel = loadGame.probeLaunchLevel;
    probeCost = loadGame.probeCost;

    pGoodwillToken2.priceTag = "($" + bribe.toLocaleString() + ")";
    pPhotonicChip1.priceTag = "(" + qChipCost + " ops)";

    for (let i = 0; i < projects.length; i++) {
        projects[i].uses = loadProjectsUses[i];
        projects[i].flag = loadProjectsFlags[i];
    }

    for (let i = 0; i < projects.length; i++) {
        if (loadProjectsActive.indexOf(projects[i].id) >= 0) {
            displayProjects(projects[i]);
            activeProjects.push(projects[i]);
        }
    }

    refresh();

    if (resetFlag != 2) {
        reset();
    }
}

function reset() {
    localStorage.removeItem("saveGame");
    localStorage.removeItem("saveProjectsUses");
    localStorage.removeItem("saveProjectsFlags");
    localStorage.removeItem("saveProjectsActive");
    localStorage.removeItem("saveStratsActive");
    location.reload();
}

function loadPrestige() {
    let loadPrestige = JSON.parse(localStorage.getItem("savePrestige"));

    prestigeU = loadPrestige.prestigeU;
    prestigeS = loadPrestige.prestigeS;
}
