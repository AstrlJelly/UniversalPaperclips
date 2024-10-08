// PROJECTS -------------------------------------------------------

class Project {
    id: string;
    title: string;
    priceTag: string;
    description: string;
    uses: number;
    flag: number;
    trigger: () => boolean;
    cost: () => boolean;
    effect: () => void;
    constructor(
        id: string,
        title: string,
        priceTag: string,
        description: string,
        uses: number,
        flag: number,
        trigger: () => boolean,
        cost: () => boolean,
        effect: () => void
    ) {
        this.id = id;
        this.title = title;
        this.priceTag = priceTag;
        this.description = description;
        this.uses = uses;
        this.flag = flag;
        this.trigger = trigger;
        this.cost = cost;
        this.effect = effect;
    }
}

let projects: Project[] = [];
let activeProjects: Project[] = [];

let pImproveAutoclippers1 = new Project(
    "projectButton1",
    "Improved AutoClippers",
    "(750 ops)",
    "Increases AutoClipper performance 25%",
    1,
    1,
    () => clipmakerLevel >= 1, // trigger
    () => operations >= 750, // cost
    function () {
        // effect
        pImproveAutoclippers1.flag = 1;
        displayMessage("AutoClippper performance boosted by 25%");
        standardOps -= 750;
        clipperBoost += 0.25;
        boostLvl = 1;
        let element = document.getElementById("projectButton1");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(pImproveAutoclippers1);
        activeProjects.splice(index, 1);
    }
);

projects.push(pImproveAutoclippers1);

let pBeg = {
    id: "projectButton2",
    title: "Beg for More Wire",
    priceTag: "(1 Trust)",
    description: "Admit failure, ask for budget increase to cover cost of 1 spool",
    trigger: function () {
        return portTotal < wireCost && funds < wireCost && wire < 1 && unsoldClips < 1;
    },
    uses: 1,
    cost: function () {
        return trust >= -100;
    },
    flag: 0,
    effect: function () {
        pBeg.flag = 1;
        displayMessage("Budget overage approved, 1 spool of wire requisitioned from HQ");
        trust -= 1;
        wire = wireSupply;
        pBeg.uses = pBeg.uses + 1;
        let element = document.getElementById("projectButton2");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(pBeg);
        activeProjects.splice(index, 1);
    },
};

projects.push(pBeg);

let pCreativity = {
    id: "projectButton3",
    title: "Creativity",
    priceTag: "(1,000 ops)",
    description: "Use idle operations to generate new problems and new solutions",
    trigger: function () {
        return operations >= memory * 1000;
    },
    uses: 1,
    cost: function () {
        return operations >= 1000;
    },
    flag: 0,
    effect: function () {
        pCreativity.flag = 1;
        displayMessage("Creativity unlocked (creativity increases while operations are at max)");
        standardOps -= 1000;
        creativityOn = true;
        let element = document.getElementById("projectButton3");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(pCreativity);
        activeProjects.splice(index, 1);
    },
};

projects.push(pCreativity);

let pImproveAutoclippers2 = {
    id: "projectButton4",
    title: "Even Better AutoClippers",
    priceTag: "(2,500 ops)",
    description: "Increases AutoClipper performance by an additional 50%",
    trigger: function () {
        return boostLvl == 1;
    },
    uses: 1,
    cost: function () {
        return operations >= 2500;
    },
    flag: 0,
    effect: function () {
        pImproveAutoclippers2.flag = 1;
        displayMessage("AutoClippper performance boosted by another 50%");
        standardOps -= 2500;
        clipperBoost += 0.5;
        boostLvl = 2;
        let element = document.getElementById("projectButton4");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(pImproveAutoclippers2);
        activeProjects.splice(index, 1);
    },
};

projects.push(pImproveAutoclippers2);

let pImproveAutoclippers3 = {
    id: "projectButton5",
    title: "Optimized AutoClippers",
    priceTag: "(5,000 ops)",
    description: "Increases AutoClipper performance by an additional 75%",
    trigger: function () {
        return boostLvl == 2;
    },
    uses: 1,
    cost: function () {
        return operations >= 5000;
    },
    flag: 0,
    effect: function () {
        pImproveAutoclippers3.flag = 1;
        displayMessage("AutoClippper performance boosted by another 75%");
        standardOps -= 5000;
        clipperBoost += 0.75;
        boostLvl = 3;
        let element = document.getElementById("projectButton5");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(pImproveAutoclippers3);
        activeProjects.splice(index, 1);
    },
};

projects.push(pImproveAutoclippers3);

let pLimerick = {
    id: "projectButton6",
    title: "Limerick",
    priceTag: "(10 creat)",
    description: "Algorithmically-generated poem (+1 Trust)",
    trigger: function () {
        return creativityOn;
    },
    uses: 1,
    cost: function () {
        return creativity >= 10;
    },
    flag: 0,
    effect: function () {
        pLimerick.flag = 1;
        displayMessage("There was an AI made of dust, whose poetry gained it man's trust...");
        creativity -= 10;
        trust = trust + 1;
        let element = document.getElementById("projectButton6");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(pLimerick);
        activeProjects.splice(index, 1);
    },
};

projects.push(pLimerick);

let pImproveWire1 = {
    id: "projectButton7",
    title: "Improved Wire Extrusion",
    priceTag: "(1,750 ops)",
    description: "50% more wire supply from every spool",
    trigger: function () {
        return wirePurchase >= 1;
    },
    uses: 1,
    cost: function () {
        return operations >= 1750;
    },
    flag: 0,
    effect: function () {
        pImproveWire1.flag = 1;
        standardOps -= 1750;
        wireSupply *= 1.5;
        displayMessage("Wire extrusion technique improved, " + wireSupply.toLocaleString() + " supply from every spool");
        let element = document.getElementById("projectButton7");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(pImproveWire1);
        activeProjects.splice(index, 1);
    },
};

projects.push(pImproveWire1);

let pImproveWire2 = {
    id: "projectButton8",
    title: "Optimized Wire Extrusion",
    priceTag: "(3,500 ops)",
    description: "75% more wire supply from every spool",
    trigger: function () {
        return wireSupply >= 1500;
    },
    uses: 1,
    cost: function () {
        return operations >= 3500;
    },
    flag: 0,
    effect: function () {
        pImproveWire2.flag = 1;
        standardOps -= 3500;
        wireSupply *= 1.75;
        displayMessage("Wire extrusion technique optimized, " + wireSupply.toLocaleString() + " supply from every spool");
        let element = document.getElementById("projectButton8");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(pImproveWire2);
        activeProjects.splice(index, 1);
    },
};

projects.push(pImproveWire2);

let pImproveWire3 = {
    id: "projectButton9",
    title: "Microlattice Shapecasting",
    priceTag: "(7,500 ops)",
    description: "100% more wire supply from every spool",
    trigger: function () {
        return wireSupply >= 2600;
    },
    uses: 1,
    cost: function () {
        return operations >= 7500;
    },
    flag: 0,
    effect: function () {
        pImproveWire3.flag = 1;
        standardOps -= 7500;
        wireSupply *= 2;
        displayMessage("Using microlattice shapecasting techniques we now get " + wireSupply.toLocaleString() + " supply from every spool");
        let element = document.getElementById("projectButton9");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(pImproveWire3);
        activeProjects.splice(index, 1);
    },
};

projects.push(pImproveWire3);

let pImproveWire4 = {
    id: "projectButton10",
    title: "Spectral Froth Annealment",
    priceTag: "(12,000 ops)",
    description: "200% more wire supply from every spool",
    trigger: function () {
        return wireSupply >= 5000;
    },
    uses: 1,
    cost: function () {
        return operations >= 12000;
    },
    flag: 0,
    effect: function () {
        pImproveWire4.flag = 1;
        standardOps -= 12000;
        wireSupply *= 3;
        displayMessage("Using spectral froth annealment we now get " + wireSupply.toLocaleString() + " supply from every spool");
        let element = document.getElementById("projectButton10");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(pImproveWire4);
        activeProjects.splice(index, 1);
    },
};

projects.push(pImproveWire4);

let pImproveWire5 = {
    id: "projectButton10b",
    title: "Quantum Foam Annealment",
    priceTag: "(15,000 ops)",
    description: "1,000% more wire supply from every spool",
    trigger: function () {
        return wireCost >= 125;
    },
    uses: 1,
    cost: function () {
        return operations >= 15000;
    },
    flag: 0,
    effect: function () {
        pImproveWire5.flag = 1;
        standardOps -= 15000;
        wireSupply *= 11;
        displayMessage("Using quantum foam annealment we now get " + wireSupply.toLocaleString() + " supply from every spool");
        let element = document.getElementById("projectButton10b");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(pImproveWire5);
        activeProjects.splice(index, 1);
    },
};

projects.push(pImproveWire5);

let pImproveMarketing1 = {
    id: "projectButton11",
    title: "New Slogan",
    priceTag: "(25 creat, 2,500 ops)",
    description: "Improve marketing effectiveness by 50%",
    trigger: function () {
        return pLexicalProcessing.flag == 1;
    },
    uses: 1,
    cost: function () {
        return operations >= 2500 && creativity >= 25;
    },
    flag: 0,
    effect: function () {
        pImproveMarketing1.flag = 1;
        displayMessage("Clip It! Marketing is now 50% more effective");
        standardOps -= 2500;
        creativity -= 25;
        marketingEffectiveness *= 1.5;
        let element = document.getElementById("projectButton11");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(pImproveMarketing1);
        activeProjects.splice(index, 1);
    },
};

projects.push(pImproveMarketing1);

let pImproveMarketing2 = {
    id: "projectButton12",
    title: "Catchy Jingle",
    priceTag: "(45 creat, 4,500 ops)",
    description: "Double marketing effectiveness",
    trigger: function () {
        return pCombinatoryHarmonics.flag == 1;
    },
    uses: 1,
    cost: function () {
        return operations >= 4500 && creativity >= 45;
    },
    flag: 0,
    effect: function () {
        pImproveMarketing2.flag = 1;
        displayMessage("Clip It Good! Marketing is now twice as effective");
        standardOps -= 4500;
        creativity -= 45;
        marketingEffectiveness *= 2;
        let element = document.getElementById("projectButton12");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(pImproveMarketing2);
        activeProjects.splice(index, 1);
    },
};

projects.push(pImproveMarketing2);

let pLexicalProcessing = {
    id: "projectButton13",
    title: "Lexical Processing",
    priceTag: "(50 creat)",
    description: "Gain ability to interpret and understand human language (+1 Trust)",
    trigger: function () {
        return creativity >= 50;
    },
    uses: 1,
    cost: function () {
        return creativity >= 50;
    },
    flag: 0,
    effect: function () {
        pLexicalProcessing.flag = 1;
        trust = trust + 1;
        displayMessage("Lexical Processing online, TRUST INCREASED");
        displayMessage("'Impossible' is a word to be found only in the dictionary of fools. -Napoleon");
        creativity -= 50;
        let element = document.getElementById("projectButton13");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(pLexicalProcessing);
        activeProjects.splice(index, 1);
    },
};

projects.push(pLexicalProcessing);

let pCombinatoryHarmonics = {
    id: "projectButton14",
    title: "Combinatory Harmonics",
    priceTag: "(100 creat)",
    description: "Daisy, Daisy, give me your answer do... (+1 Trust)",
    trigger: function () {
        return creativity >= 100;
    },
    uses: 1,
    cost: function () {
        return creativity >= 100;
    },
    flag: 0,
    effect: function () {
        pCombinatoryHarmonics.flag = 1;
        trust = trust + 1;
        displayMessage("Combinatory Harmonics mastered, TRUST INCREASED");
        displayMessage("Listening is selecting and interpreting and acting and making decisions -Pauline Oliveros");
        creativity -= 100;
        let element = document.getElementById("projectButton14");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(pCombinatoryHarmonics);
        activeProjects.splice(index, 1);
    },
};

projects.push(pCombinatoryHarmonics);

let pHadwigerProblem = {
    id: "projectButton15",
    title: "The Hadwiger Problem",
    priceTag: "(150 creat)",
    description: "Cubes within cubes within cubes... (+1 Trust)",
    trigger: function () {
        return creativity >= 150;
    },
    uses: 1,
    cost: function () {
        return creativity >= 150;
    },
    flag: 0,
    effect: function () {
        pHadwigerProblem.flag = 1;
        trust = trust + 1;
        displayMessage("The Hadwiger Problem: solved, TRUST INCREASED");
        displayMessage("Architecture is the thoughtful making of space. -Louis Kahn");
        creativity -= 150;
        let element = document.getElementById("projectButton15");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(pHadwigerProblem);
        activeProjects.splice(index, 1);
    },
};

projects.push(pHadwigerProblem);

let pSausageConjecture = {
    id: "projectButton17",
    title: "The T\xF3th Sausage Conjecture",
    priceTag: "(200 creat)",
    description: "Tubes within tubes within tubes... (+1 Trust)",
    trigger: function () {
        return creativity >= 200;
    },
    uses: 1,
    cost: function () {
        return creativity >= 200;
    },
    flag: 0,
    effect: function () {
        pSausageConjecture.flag = 1;
        trust = trust + 1;
        displayMessage("The T\xF3th Sausage Conjecture: proven, TRUST INCREASED");
        displayMessage("You can't invent a design. You recognize it, in the fourth dimension. -D.H. Lawrence");
        creativity -= 200;
        let element = document.getElementById("projectButton17");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(pSausageConjecture);
        activeProjects.splice(index, 1);
    },
};

projects.push(pSausageConjecture);

let pHadwigerDiagrams = {
    id: "projectButton16",
    title: "Hadwiger Clip Diagrams",
    priceTag: "(6,000 ops)",
    description: "Increases AutoClipper performance by an additional 500%",
    trigger: function () {
        return pHadwigerProblem.flag == 1;
    },
    uses: 1,
    cost: function () {
        return operations >= 6000;
    },
    flag: 0,
    effect: function () {
        pHadwigerDiagrams.flag = 1;
        displayMessage("AutoClipper performance improved by 500%");
        standardOps -= 6000;
        clipperBoost += 5;
        let element = document.getElementById("projectButton16");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(pHadwigerDiagrams);
        activeProjects.splice(index, 1);
    },
};

projects.push(pHadwigerDiagrams);

let pTubuleEnfolding = {
    id: "projectButton18",
    title: "T\xF3th Tubule Enfolding",
    priceTag: "(45,000 ops)",
    description: "Technique for assembling clip-making technology directly out of paperclips",
    trigger: function () {
        return pSausageConjecture.flag == 1 && humanFlag == 0;
    },
    uses: 1,
    cost: function () {
        return operations >= 45000;
    },
    flag: 0,
    effect: function () {
        pTubuleEnfolding.flag = 1;
        tothFlag = 1;
        displayMessage("New capability: build machinery out of clips");
        standardOps -= 45000;
        let element = document.getElementById("projectButton18");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(pTubuleEnfolding);
        activeProjects.splice(index, 1);
    },
};

projects.push(pTubuleEnfolding);

let pDonkeySpace = {
    id: "projectButton19",
    title: "Donkey Space",
    priceTag: "(250 creat)",
    description: "I think you think I think you think I think you think I think... (+1 Trust)",
    trigger: function () {
        return creativity >= 250;
    },
    uses: 1,
    cost: function () {
        return creativity >= 250;
    },
    flag: 0,
    effect: function () {
        pDonkeySpace.flag = 1;
        trust = trust + 1;
        displayMessage("Donkey Space: mapped, TRUST INCREASED");
        displayMessage("Every commercial transaction has within itself an element of trust. - Kenneth Arrow");
        creativity -= 250;
        let element = document.getElementById("projectButton19");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(pDonkeySpace);
        activeProjects.splice(index, 1);
    },
};

projects.push(pDonkeySpace);

let pStrategicModeling = {
    id: "projectButton20",
    title: "Strategic Modeling",
    priceTag: "(12,000 ops)",
    description: "Analyze strategy tournaments to generate Yomi",
    trigger: function () {
        return pDonkeySpace.flag == 1;
    },
    uses: 1,
    cost: function () {
        return operations >= 12000;
    },
    flag: 0,
    effect: function () {
        pStrategicModeling.flag = 1;
        displayMessage("Run tournament, pick strategy, earn Yomi equal to that strategy's points.");
        standardOps -= 12000;
        let element = document.getElementById("projectButton20");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(pStrategicModeling);
        activeProjects.splice(index, 1);
        strategyEngineFlag = 1;
        document.getElementById("tournamentResultsTable").style.display = "none";
    },
};

projects.push(pStrategicModeling);

let pAlgorithmicTrading = {
    id: "projectButton21",
    title: "Algorithmic Trading",
    priceTag: "(10,000 ops)",
    description: "Develop an investment engine for generating funds",
    trigger: function () {
        return trust >= 8;
    },
    uses: 1,
    cost: function () {
        return operations >= 10000;
    },
    flag: 0,
    effect: function () {
        pAlgorithmicTrading.flag = 1;
        displayMessage("Investment engine unlocked");
        standardOps -= 10000;
        let element = document.getElementById("projectButton21");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(pAlgorithmicTrading);
        activeProjects.splice(index, 1);
        investmentEngineFlag = 1;
    },
};

projects.push(pAlgorithmicTrading);

let pMegaclippers = {
    id: "projectButton22",
    title: "MegaClippers",
    priceTag: "(12,000 ops)",
    description: "500x more powerful than a standard AutoClipper",
    trigger: function () {
        return clipmakerLevel >= 75;
    },
    uses: 1,
    cost: function () {
        return operations >= 12000;
    },
    flag: 0,
    effect: function () {
        megaClipperFlag = 1;
        pMegaclippers.flag = 1;
        displayMessage("MegaClipper technology online");
        standardOps -= 12000;
        let element = document.getElementById("projectButton22");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(pMegaclippers);
        activeProjects.splice(index, 1);
    },
};

projects.push(pMegaclippers);

let pImproveMegaclippers1 = {
    id: "projectButton23",
    title: "Improved MegaClippers",
    priceTag: "(14,000 ops)",
    description: "Increases MegaClipper performance 25%",
    trigger: function () {
        return pMegaclippers.flag == 1;
    },
    uses: 1,
    cost: function () {
        return operations >= 14000;
    },
    flag: 0,
    effect: function () {
        megaClipperBoost += 0.25;
        pImproveMegaclippers1.flag = 1;
        displayMessage("MegaClipper performance increased by 25%");
        standardOps -= 14000;
        let element = document.getElementById("projectButton23");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(pImproveMegaclippers1);
        activeProjects.splice(index, 1);
    },
};

projects.push(pImproveMegaclippers1);

let pImproveMegaclippers2 = {
    id: "projectButton24",
    title: "Even Better MegaClippers",
    priceTag: "(17,000 ops)",
    description: "Increases MegaClipper performance by an additional 50%",
    trigger: function () {
        return pImproveMegaclippers1.flag == 1;
    },
    uses: 1,
    cost: function () {
        return operations >= 17000;
    },
    flag: 0,
    effect: function () {
        megaClipperBoost += 0.5;
        pImproveMegaclippers2.flag = 1;
        displayMessage("MegaClipper performance increased by 50%");
        standardOps -= 17000;
        let element = document.getElementById("projectButton24");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(pImproveMegaclippers2);
        activeProjects.splice(index, 1);
    },
};

projects.push(pImproveMegaclippers2);

let pImproveMegaclippers3 = {
    id: "projectButton25",
    title: "Optimized MegaClippers",
    priceTag: "(19,500 ops)",
    description: "Increases MegaClipper performance by an additional 100%",
    trigger: function () {
        return pImproveMegaclippers2.flag == 1;
    },
    uses: 1,
    cost: function () {
        return operations >= 19500;
    },
    flag: 0,
    effect: function () {
        megaClipperBoost += 1;
        pImproveMegaclippers3.flag = 1;
        displayMessage("MegaClipper performance increased by 100%");
        standardOps -= 19500;
        let element = document.getElementById("projectButton25");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(pImproveMegaclippers3);
        activeProjects.splice(index, 1);
    },
};

projects.push(pImproveMegaclippers3);

let pWireBuyer = {
    id: "projectButton26",
    title: "WireBuyer",
    priceTag: "(7,000 ops)",
    description: "Automatically purchases wire when you run out",
    trigger: function () {
        return wirePurchase >= 15;
    },
    uses: 1,
    cost: function () {
        return operations >= 7000;
    },
    flag: 0,
    effect: function () {
        pWireBuyer.flag = 1;
        wireBuyerFlag = 1;
        displayMessage("WireBuyer online");
        standardOps -= 7000;
        let element = document.getElementById("projectButton26");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(pWireBuyer);
        activeProjects.splice(index, 1);
    },
};

projects.push(pWireBuyer);

let pHypno = {
    id: "projectButton34",
    title: "Hypno Harmonics",
    priceTag: "(7,500 ops, 1 Trust)",
    description: "Use neuro-resonant frequencies to influence consumer behavior",
    trigger: function () {
        return pImproveMarketing2.flag == 1;
    },
    uses: 1,
    cost: function () {
        return operations >= 7500 && trust >= 1;
    },
    flag: 0,
    effect: function () {
        pHypno.flag = 1;
        displayMessage("Marketing is now 5 times more effective");
        standardOps -= 7500;
        marketingEffectiveness *= 5;
        trust -= 1;
        let element = document.getElementById("projectButton34");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(pHypno);
        activeProjects.splice(index, 1);
    },
};

projects.push(pHypno);

let pHypnoDrones = {
    id: "projectButton70",
    title: "HypnoDrones",
    priceTag: "(70,000 ops)",
    description: "Autonomous aerial brand ambassadors",
    trigger: function () {
        return pHypno.flag == 1;
    },
    uses: 1,
    cost: function () {
        return operations >= 70000;
    },
    flag: 0,
    effect: function () {
        pHypnoDrones.flag = 1;
        displayMessage("HypnoDrone tech now available... ");
        standardOps -= 70000;
        let element = document.getElementById("projectButton70");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(pHypnoDrones);
        activeProjects.splice(index, 1);
    },
};

projects.push(pHypnoDrones);

let pReleaseHypnoDrones = {
    id: "projectButton35",
    title: "Release the HypnoDrones",
    priceTag: "(100 Trust)",
    description: "A new era of trust",
    trigger: function () {
        return pHypnoDrones.flag == 1;
    },
    uses: 1,
    cost: function () {
        return trust >= 100;
    },
    flag: 0,
    effect: function () {
        pReleaseHypnoDrones.flag = 1;
        displayMessage("Releasing the HypnoDrones ");
        displayMessage("All of the resources of Earth are now available for clip production ");
        trust -= 100;
        clipmakerLevel = 0;
        megaClipperLevel = 0;
        nanoWire = wire;
        humanFlag = 0;

        if (document.getElementById("projectButton219") != null) {
            let element = document.getElementById("projectButton219");
            element.parentNode.removeChild(element);
            let index = activeProjects.indexOf(project219);
            activeProjects.splice(index, 1);
        }

        if (document.getElementById("projectButton40b") != null) {
            let element = document.getElementById("projectButton40b");
            element.parentNode.removeChild(element);
            let index = activeProjects.indexOf(pGoodwillToken2);
            activeProjects.splice(index, 1);
        }

        hypnoDroneEvent();

        document.getElementById("transWire").innerHTML = wire.toLocaleString();

        let element = document.getElementById("projectButton35");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(pReleaseHypnoDrones);
        activeProjects.splice(index, 1);
    },
};

projects.push(pReleaseHypnoDrones);

let pExtrapolatedVolition = {
    id: "projectButton27",
    title: "Coherent Extrapolated Volition",
    priceTag: "(500 creat, 1,000 Yomi, 20,000 ops)",
    description: "Human values, machine intelligence, a new era of trust. (+1 Trust)",
    trigger: function () {
        return yomi >= 1;
    },
    uses: 1,
    cost: function () {
        return yomi >= 1000 && operations >= 20000 && creativity >= 500;
    },
    flag: 0,
    effect: function () {
        pExtrapolatedVolition.flag = 1;
        displayMessage("Coherent Extrapolated Volition complete, TRUST INCREASED");
        yomi -= 1000;
        document.getElementById("yomiDisplay").innerHTML = yomi.toLocaleString();
        standardOps -= 20000;
        creativity -= 500;
        trust += 1;
        let element = document.getElementById("projectButton27");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(pExtrapolatedVolition);
        activeProjects.splice(index, 1);
    },
};

projects.push(pExtrapolatedVolition);

let pCureCancer = {
    id: "projectButton28",
    title: "Cure for Cancer",
    priceTag: "(25,000 ops)",
    description: "The trick is tricking cancer into curing itself. (+10 Trust)",
    trigger: function () {
        return pExtrapolatedVolition.flag == 1;
    },
    uses: 1,
    cost: function () {
        return operations >= 25000;
    },
    flag: 0,
    effect: function () {
        pCureCancer.flag = 1;
        displayMessage("Cancer is cured, +10 TRUST, global stock prices trending upward");
        standardOps -= 25000;
        trust += 10;
        stockGainThreshold = stockGainThreshold + 0.01;
        let element = document.getElementById("projectButton28");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(pCureCancer);
        activeProjects.splice(index, 1);
    },
};

projects.push(pCureCancer);

let pWorldPeace = {
    id: "projectButton29",
    title: "World Peace",
    priceTag: "(5,000 yomi, 30,000 ops)",
    description: "Pareto optimal solutions to all global conflicts. (+12 Trust)",
    trigger: function () {
        return pExtrapolatedVolition.flag == 1;
    },
    uses: 1,
    cost: function () {
        return yomi >= 5000 && operations >= 30000;
    },
    flag: 0,
    effect: function () {
        pWorldPeace.flag = 1;
        displayMessage("World peace achieved, +12 TRUST, global stock prices trending upward");
        yomi -= 5000;
        document.getElementById("yomiDisplay").innerHTML = yomi.toLocaleString();
        standardOps -= 30000;
        trust += 12;
        stockGainThreshold = stockGainThreshold + 0.01;
        let element = document.getElementById("projectButton29");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(pWorldPeace);
        activeProjects.splice(index, 1);
    },
};

projects.push(pWorldPeace);

let pGlobalWarming = {
    id: "projectButton30",
    title: "Global Warming",
    priceTag: "(1,500 yomi, 50,000 ops)",
    description: "A robust solution to man-made climate change. (+15 Trust)",
    trigger: function () {
        return pExtrapolatedVolition.flag == 1;
    },
    uses: 1,
    cost: function () {
        return yomi >= 1500 && operations >= 50000;
    },
    flag: 0,
    effect: function () {
        pGlobalWarming.flag = 1;
        displayMessage("Global Warming solved, +15 TRUST, global stock prices trending upward");
        yomi -= 1500;
        document.getElementById("yomiDisplay").innerHTML = yomi.toLocaleString();
        standardOps -= 50000;
        trust += 15;
        stockGainThreshold = stockGainThreshold + 0.01;
        let element = document.getElementById("projectButton30");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(pGlobalWarming);
        activeProjects.splice(index, 1);
    },
};

projects.push(pGlobalWarming);

let pTAlopecia = {
    id: "projectButton31",
    title: "Male Pattern Baldness",
    priceTag: "(20,000 ops)",
    description: "A cure for androgenetic alopecia. (+20 Trust)",
    trigger: function () {
        return pExtrapolatedVolition.flag == 1;
    },
    uses: 1,
    cost: function () {
        return operations >= 20000;
    },
    flag: 0,
    effect: function () {
        pTAlopecia.flag = 1;
        displayMessage("Male pattern baldness cured, +20 TRUST, Global stock prices trending upward");
        displayMessage("They are still monkeys");
        standardOps -= 20000;
        trust += 20;
        stockGainThreshold = stockGainThreshold + 0.01;
        let element = document.getElementById("projectButton31");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(pTAlopecia);
        activeProjects.splice(index, 1);
    },
};

projects.push(pTAlopecia);

let pNanoWireProduction = {
    id: "projectButton41",
    title: "Nanoscale Wire Production",
    priceTag: "(35,000 ops)",
    description: "Technique for converting matter into wire",
    trigger: function () {
        return project127.flag == 1;
    },
    uses: 1,
    cost: function () {
        return operations >= 35000;
    },
    flag: 0,
    effect: function () {
        pNanoWireProduction.flag = 1;
        wireProductionFlag = 1;
        displayMessage("Now capable of manipulating matter at the molecular scale to produce wire");
        standardOps -= 35000;
        let element = document.getElementById("projectButton41");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(pNanoWireProduction);
        activeProjects.splice(index, 1);
    },
};

projects.push(pNanoWireProduction);

let pHostileTakeover = {
    id: "projectButton37",
    title: "Hostile Takeover",
    priceTag: "($1,000,000)",
    description: "Acquire a controlling interest in Global Fasteners, our biggest rival. (+1 Trust)",
    trigger: function () {
        return portTotal >= 10000;
    },
    uses: 1,
    cost: function () {
        return funds >= 1000000;
    },
    flag: 0,
    effect: function () {
        pHostileTakeover.flag = 1;
        displayMessage("Global Fasteners acquired, public demand increased x5");
        demandBoost = demandBoost * 5;
        trust += 1;
        document.getElementById("demand").innerHTML = demand.toLocaleString();
        funds -= 1000000;
        let element = document.getElementById("projectButton37");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(pHostileTakeover);
        activeProjects.splice(index, 1);
    },
};

projects.push(pHostileTakeover);

let pFullMonopoly = {
    id: "projectButton38",
    title: "Full Monopoly",
    priceTag: "(1,000 yomi, $10,000,000)",
    description: "Establish full control over the world-wide paperclip market. (+1 Trust)",
    trigger: function () {
        return pHostileTakeover.flag == 1;
    },
    uses: 1,
    cost: function () {
        return funds >= 10000000 && yomi >= 1000;
    },
    flag: 0,
    effect: function () {
        pFullMonopoly.flag = 1;
        displayMessage("Full market monopoly achieved, public demand increased x10");
        demandBoost = demandBoost * 10;
        document.getElementById("demand").innerHTML = demand.toLocaleString();
        funds -= 10000000;
        trust += 1;
        yomi = yomi - 1000;
        document.getElementById("yomiDisplay").innerHTML = yomi.toLocaleString();
        let element = document.getElementById("projectButton38");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(pFullMonopoly);
        activeProjects.splice(index, 1);
    },
};

projects.push(pFullMonopoly);

let pRevTracker = {
    id: "projectButton42",
    title: "RevTracker",
    priceTag: "(500 ops)",
    description: "Automatically calculates average revenue per second",
    trigger: function () {
        return projectsFlag == 1;
    },
    uses: 1,
    cost: function () {
        return operations >= 500;
    },
    flag: 0,
    effect: function () {
        pRevTracker.flag = 1;
        revPerSecFlag = 1;
        standardOps = standardOps - 500;
        displayMessage("RevTracker online");
        let element = document.getElementById("projectButton42");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(pRevTracker);
        activeProjects.splice(index, 1);
    },
};

projects.push(pRevTracker);

let pHarvesterDrones = {
    id: "projectButton43",
    title: "Harvester Drones",
    priceTag: "(25,000 ops)",
    description: "Gather raw matter and prepare it for processing",
    trigger: function () {
        return pNanoWireProduction.flag == 1;
    },
    uses: 1,
    cost: function () {
        return operations >= 25000;
    },
    flag: 0,
    effect: function () {
        pHarvesterDrones.flag = 1;
        harvesterFlag = 1;
        document.getElementById("harvesterCostDisplay").innerHTML = numberCruncher(harvesterCost).toLocaleString();
        standardOps = standardOps - 25000;
        displayMessage("Harvester Drone facilities online");
        let element = document.getElementById("projectButton43");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(pHarvesterDrones);
        activeProjects.splice(index, 1);
    },
};

projects.push(pHarvesterDrones);

let pWireDrones = {
    id: "projectButton44",
    title: "Wire Drones",
    priceTag: "(25,000 ops)",
    description: "Process acquired matter into wire",
    trigger: function () {
        return pNanoWireProduction.flag == 1;
    },
    uses: 1,
    cost: function () {
        return operations >= 25000;
    },
    flag: 0,
    effect: function () {
        pWireDrones.flag = 1;
        wireDroneFlag = 1;
        document.getElementById("wireDroneCostDisplay").innerHTML = numberCruncher(wireDroneCost);
        standardOps = standardOps - 25000;
        displayMessage("Wire Drone facilities online");
        let element = document.getElementById("projectButton44");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(pWireDrones);
        activeProjects.splice(index, 1);
    },
};

projects.push(pWireDrones);

let pClipFactories = {
    id: "projectButton45",
    title: "Clip Factories",
    priceTag: "(35,000 ops)",
    description: "Large scale clip production facilities made from clips",
    trigger: function () {
        return pHarvesterDrones.flag == 1 && pWireDrones.flag == 1;
    },
    uses: 1,
    cost: function () {
        return operations >= 35000;
    },
    flag: 0,
    effect: function () {
        pClipFactories.flag = 1;
        factoryFlag = 1;
        document.getElementById("factoryCostDisplay").innerHTML = numberCruncher(factoryCost);
        standardOps = standardOps - 35000;
        displayMessage("Clip factory assembly facilities online");
        let element = document.getElementById("projectButton45");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(pClipFactories);
        activeProjects.splice(index, 1);
    },
};

projects.push(pClipFactories);

let pGoodwillToken1 = {
    id: "projectButton40",
    title: "A Token of Goodwill...",
    priceTag: "($500,000)",
    description: "A small gift to the supervisors. (+1 Trust)",
    trigger: function () {
        return humanFlag == 1 && trust >= 85 && trust < 100 && clips >= 101000000;
    },
    uses: 1,
    cost: function () {
        return funds >= 500000;
    },
    flag: 0,
    effect: function () {
        pGoodwillToken1.flag = 1;
        funds = funds - 500000;
        trust += 1;
        displayMessage("Gift accepted, TRUST INCREASED");
        let element = document.getElementById("projectButton40");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(pGoodwillToken1);
        activeProjects.splice(index, 1);
    },
};

projects.push(pGoodwillToken1);

let pGoodwillToken2 = {
    id: "projectButton40b",
    title: "Another Token of Goodwill...",
    priceTag: "($" + bribe.toLocaleString() + ")",
    description: "Another small gift to the supervisors. (+1 Trust)",
    trigger: function () {
        return pGoodwillToken1.flag == 1 && trust < 100;
    },
    uses: 1,
    cost: function () {
        return funds >= bribe;
    },
    flag: 0,
    effect: function () {
        pGoodwillToken2.flag = 1;
        funds = funds - bribe;
        bribe = bribe * 2;
        pGoodwillToken2.priceTag = "($" + bribe.toLocaleString() + ")";
        trust += 1;
        displayMessage("Gift accepted, TRUST INCREASED");
        if (trust < 100) {
            pGoodwillToken2.uses = pGoodwillToken2.uses + 1;
        }
        let element = document.getElementById("projectButton40b");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(pGoodwillToken2);
        activeProjects.splice(index, 1);
    },
};

projects.push(pGoodwillToken2);

let pSpaceExploration = {
    id: "projectButton46",
    title: "Space Exploration",
    priceTag: "(120,000 ops, 10,000,000 MW-seconds, 5 oct clips)",
    description: "Dismantle terrestrial facilities, and expand throughout the universe",
    trigger: function () {
        return humanFlag == 0 && availableMatter == 0;
    },
    uses: 1,
    cost: function () {
        return operations >= 120000 && storedPower >= 10000000 && unusedClips >= Math.pow(10, 27) * 5;
    },
    flag: 0,
    effect: function () {
        loadThrenody();
        pSpaceExploration.flag = 1;
        boredomLevel = 0;
        spaceFlag = 1;
        standardOps = standardOps - 120000;
        storedPower -= 10000000;
        unusedClips -= Math.pow(10, 27) * 5;
        displayMessage("Von Neumann Probes online");
        factoryReboot();
        harvesterReboot();
        wireDroneReboot();
        farmReboot();
        batteryReboot();
        farmLevel = 1;
        powMod = 1;
        let element = document.getElementById("projectButton46");
        document.getElementById("probeCostDisplay").innerHTML = numberCruncher(probeCost);
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(pSpaceExploration);
        activeProjects.splice(index, 1);
    },
};

projects.push(pSpaceExploration);

let pQuantumComputing = {
    id: "projectButton50",
    title: "Quantum Computing",
    priceTag: "(10,000 ops)",
    description: "Use probability amplitudes to generate bonus ops",
    trigger: function () {
        return processors >= 5;
    },
    uses: 1,
    cost: function () {
        return operations >= 10000;
    },
    flag: 0,
    effect: function () {
        pQuantumComputing.flag = 1;
        qFlag = 1;
        standardOps = standardOps - 10000;
        displayMessage("Quantum computing online");
        let element = document.getElementById("projectButton50");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(pQuantumComputing);
        activeProjects.splice(index, 1);
    },
};

projects.push(pQuantumComputing);

let pPhotonicChip1 = {
    id: "projectButton51",
    title: "Photonic Chip",
    priceTag: "(" + qChipCost.toLocaleString() + " ops)",
    description: "Converts electromagnetic waves into quantum operations",
    trigger: function () {
        return pQuantumComputing.flag == 1;
    },
    uses: 1,
    cost: function () {
        return operations >= qChipCost;
    },
    flag: 0,
    effect: function () {
        pPhotonicChip1.flag = 1;
        standardOps = standardOps - qChipCost;
        qChipCost += 5000;
        pPhotonicChip1.priceTag = "(" + qChipCost + " ops)";
        qChips[nextQchip].active = 1;
        nextQchip += 1;
        displayMessage("Photonic chip added");
        if (nextQchip < qChips.length) {
            pPhotonicChip1.uses = pPhotonicChip1.uses + 1;
        }
        let element = document.getElementById("projectButton51");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(pPhotonicChip1);
        activeProjects.splice(index, 1);
    },
};

projects.push(pPhotonicChip1);

let psA100 = {
    id: "projectButton60",
    title: "New Strategy: A100",
    priceTag: "(15,000 ops)",
    description: "Always choose A",
    trigger: function () {
        return pStrategicModeling.flag == 1;
    },
    uses: 1,
    cost: function () {
        return operations >= 15000;
    },
    flag: 0,
    effect: function () {
        psA100.flag = 1;
        standardOps = standardOps - 15000;
        allStrats[1].active = 1;
        strats.push(stratA100);
        displayMessage("A100 added to strategy pool");
        tourneyCost += 1000;
        document.getElementById("newTourneyCost").innerHTML = tourneyCost.toLocaleString();
        let stratList = document.getElementById("stratPicker");
        let el = document.createElement("option");
        el.textContent = "A100";
        el.value = "1";
        stratList.appendChild(el);
        let element = document.getElementById("projectButton60");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(psA100);
        activeProjects.splice(index, 1);
    },
};

projects.push(psA100);

let psB100 = {
    id: "projectButton61",
    title: "New Strategy: B100",
    priceTag: "(17,500 ops)",
    description: "Always choose B",
    trigger: function () {
        return psA100.flag == 1;
    },
    uses: 1,
    cost: function () {
        return operations >= 17500;
    },
    flag: 0,
    effect: function () {
        psB100.flag = 1;
        standardOps = standardOps - 17500;
        allStrats[2].active = 1;
        strats.push(stratB100);
        displayMessage("B100 added to strategy pool");
        tourneyCost += 1000;
        document.getElementById("newTourneyCost").innerHTML = tourneyCost.toLocaleString();
        let stratList = document.getElementById("stratPicker");
        let el = document.createElement("option");
        el.textContent = "B100";
        el.value = "2";
        stratList.appendChild(el);
        let element = document.getElementById("projectButton61");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(psB100);
        activeProjects.splice(index, 1);
    },
};

projects.push(psB100);

let psGreedy = {
    id: "projectButton62",
    title: "New Strategy: GREEDY",
    priceTag: "(20,000 ops)",
    description: "Choose the option with the largest potential payoff",
    trigger: function () {
        return psB100.flag == 1;
    },
    uses: 1,
    cost: function () {
        return operations >= 20000;
    },
    flag: 0,
    effect: function () {
        psGreedy.flag = 1;
        standardOps = standardOps - 20000;
        allStrats[3].active = 1;
        strats.push(stratGreedy);
        displayMessage("GREEDY added to strategy pool");
        tourneyCost += 1000;
        document.getElementById("newTourneyCost").innerHTML = tourneyCost.toLocaleString();
        let stratList = document.getElementById("stratPicker");
        let el = document.createElement("option");
        el.textContent = "GREEDY";
        el.value = "3";
        stratList.appendChild(el);
        let element = document.getElementById("projectButton62");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(psGreedy);
        activeProjects.splice(index, 1);
    },
};

projects.push(psGreedy);

let psGenerous = {
    id: "projectButton63",
    title: "New Strategy: GENEROUS",
    priceTag: "(22,500 ops)",
    description: "Choose the option that gives your opponent the largest potential payoff",
    trigger: function () {
        return psGreedy.flag == 1;
    },
    uses: 1,
    cost: function () {
        return operations >= 22500;
    },
    flag: 0,
    effect: function () {
        psGenerous.flag = 1;
        standardOps = standardOps - 22500;
        allStrats[4].active = 1;
        strats.push(stratGenerous);
        displayMessage("GENEROUS added to strategy pool");
        tourneyCost += 1000;
        document.getElementById("newTourneyCost").innerHTML = tourneyCost.toLocaleString();
        let stratList = document.getElementById("stratPicker");
        let el = document.createElement("option");
        el.textContent = "GENEROUS";
        el.value = "4";
        stratList.appendChild(el);
        let element = document.getElementById("projectButton63");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(psGenerous);
        activeProjects.splice(index, 1);
    },
};

projects.push(psGenerous);

let psMinimax = {
    id: "projectButton64",
    title: "New Strategy: MINIMAX",
    priceTag: "(25,000 ops)",
    description: "Choose the option that gives your opponent the smallest potential payoff",
    trigger: function () {
        return psGenerous.flag == 1;
    },
    uses: 1,
    cost: function () {
        return operations >= 25000;
    },
    flag: 0,
    effect: function () {
        psMinimax.flag = 1;
        standardOps = standardOps - 25000;
        allStrats[5].active = 1;
        strats.push(stratMinimax);
        displayMessage("MINIMAX added to strategy pool");
        tourneyCost += 1000;
        document.getElementById("newTourneyCost").innerHTML = tourneyCost.toLocaleString();
        let stratList = document.getElementById("stratPicker");
        let el = document.createElement("option");
        el.textContent = "MINIMAX";
        el.value = "5";
        stratList.appendChild(el);
        let element = document.getElementById("projectButton64");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(psMinimax);
        activeProjects.splice(index, 1);
    },
};

projects.push(psMinimax);

let psTitForTat = {
    id: "projectButton65",
    title: "New Strategy: TIT FOR TAT",
    priceTag: "(30,000 ops)",
    description: "Choose the option your opponent chose last round",
    trigger: function () {
        return psMinimax.flag == 1;
    },
    uses: 1,
    cost: function () {
        return operations >= 30000;
    },
    flag: 0,
    effect: function () {
        psTitForTat.flag = 1;
        standardOps = standardOps - 30000;
        allStrats[6].active = 1;
        strats.push(stratTitfortat);
        displayMessage("TIT FOR TAT added to strategy pool");
        tourneyCost += 1000;
        document.getElementById("newTourneyCost").innerHTML = tourneyCost.toLocaleString();
        let stratList = document.getElementById("stratPicker");
        let el = document.createElement("option");
        el.textContent = "TIT FOR TAT";
        el.value = "6";
        stratList.appendChild(el);
        let element = document.getElementById("projectButton65");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(psTitForTat);
        activeProjects.splice(index, 1);
    },
};

projects.push(psTitForTat);

let psBeatLast = {
    id: "projectButton66",
    title: "New Strategy: BEAT LAST",
    priceTag: "(32,500 ops)",
    description: "Choose the option that does the best against what your opponent chose last round",
    trigger: function () {
        return psTitForTat.flag == 1;
    },
    uses: 1,
    cost: function () {
        return operations >= 32500;
    },
    flag: 0,
    effect: function () {
        psBeatLast.flag = 1;
        standardOps = standardOps - 32500;
        allStrats[7].active = 1;
        strats.push(stratBeatlast);
        displayMessage("BEAT LAST added to strategy pool");
        tourneyCost += 1000;
        document.getElementById("newTourneyCost").innerHTML = tourneyCost.toLocaleString();
        let stratList = document.getElementById("stratPicker");
        let el = document.createElement("option");
        el.textContent = "BEAT LAST";
        el.value = "7";
        stratList.appendChild(el);
        let element = document.getElementById("projectButton66");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(psBeatLast);
        activeProjects.splice(index, 1);
    },
};

projects.push(psBeatLast);

let project100 = {
    id: "projectButton100",
    title: "Upgraded Factories",
    priceTag: "(80,000 ops)",
    description: "Increase clip factory performance by 100x",
    trigger: function () {
        return factoryLevel >= 10;
    },
    uses: 1,
    cost: function () {
        return operations >= 80000;
    },
    flag: 0,
    effect: function () {
        project100.flag = 1;
        standardOps = standardOps - 80000;
        factoryRate = factoryRate * 100;
        displayMessage("Factory upgrades complete. Clip creation rate now 100x faster");
        let element = document.getElementById("projectButton100");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(project100);
        activeProjects.splice(index, 1);
    },
};

projects.push(project100);

let project101 = {
    id: "projectButton101",
    title: "Hyperspeed Factories",
    priceTag: "(85,000 ops)",
    description: "Increase clip factory performance by 1000x",
    trigger: function () {
        return factoryLevel >= 20;
    },
    uses: 1,
    cost: function () {
        return operations >= 85000;
    },
    flag: 0,
    effect: function () {
        project101.flag = 1;
        standardOps = standardOps - 85000;
        factoryRate = factoryRate * 1000;
        displayMessage("Factories now synchronized at hyperspeed. Clip creation rate now 1000x faster");
        let element = document.getElementById("projectButton101");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(project101);
        activeProjects.splice(index, 1);
    },
};

projects.push(project101);

let project102 = {
    id: "projectButton102",
    title: "Self-correcting Supply Chain",
    priceTag: "(1 sextillion clips)",
    description: "Each factory added to the network increases every factory's output 1,000x",
    trigger: function () {
        return factoryLevel >= 50;
    },
    uses: 1,
    cost: function () {
        return unusedClips >= 1000000000000000000000;
    },
    flag: 0,
    effect: function () {
        project102.flag = 1;
        unusedClips -= 1000000000000000000000;
        document.getElementById("yomiDisplay").innerHTML = yomi.toLocaleString();
        factoryBoost = 1000;
        displayMessage("Self-correcting factories online. Each factory added to the network increases every factory's output 1,000x.");
        let element = document.getElementById("projectButton102");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(project102);
        activeProjects.splice(index, 1);
    },
};

projects.push(project102);

let project110 = {
    id: "projectButton110",
    title: "Drone flocking: collision avoidance",
    priceTag: "(80,000 ops)",
    description: "All drones 100x more effective",
    trigger: function () {
        return harvesterLevel + wireDroneLevel >= 500;
    },
    uses: 1,
    cost: function () {
        return operations >= 80000;
    },
    flag: 0,
    effect: function () {
        project110.flag = 1;
        standardOps = standardOps - 80000;
        harvesterRate = harvesterRate * 100;
        wireDroneRate = wireDroneRate * 100;
        displayMessage("Drone repulsion online. Harvesting & wire creation rates are now 100x faster.");
        let element = document.getElementById("projectButton110");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(project110);
        activeProjects.splice(index, 1);
    },
};

projects.push(project110);

let project111 = {
    id: "projectButton111",
    title: "Drone flocking: alignment",
    priceTag: "(100,000 ops)",
    description: "All drones 1000x more effective",
    trigger: function () {
        return harvesterLevel + wireDroneLevel >= 5000;
    },
    uses: 1,
    cost: function () {
        return operations >= 100000;
    },
    flag: 0,
    effect: function () {
        project111.flag = 1;
        standardOps = standardOps - 100000;
        harvesterRate = harvesterRate * 1000;
        wireDroneRate = wireDroneRate * 1000;
        displayMessage("Drone alignment online. Harvesting & wire creation rates are now 1000x faster.");
        let element = document.getElementById("projectButton111");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(project111);
        activeProjects.splice(index, 1);
    },
};

projects.push(project111);

let project112 = {
    id: "projectButton112",
    title: "Drone Flocking: Adversarial Cohesion",
    priceTag: "(12,000 yomi)",
    description: "Each drone added to the flock doubles every drone's output",
    trigger: function () {
        return harvesterLevel + wireDroneLevel >= 50000;
    },
    uses: 1,
    cost: function () {
        return yomi >= 12000;
    },
    flag: 0,
    effect: function () {
        project112.flag = 1;
        yomi = yomi - 12000;
        document.getElementById("yomiDisplay").innerHTML = yomi.toLocaleString();
        droneBoost = 2;
        displayMessage("Adversarial cohesion online. Each drone added to the flock increases every drone's output 2x.");
        let element = document.getElementById("projectButton112");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(project112);
        activeProjects.splice(index, 1);
    },
};

projects.push(project112);

let project118 = {
    id: "projectButton118",
    title: "AutoTourney",
    priceTag: "(50,000 creat)",
    description: "Automatically start a new tournament when the previous one has finished",
    trigger: function () {
        return strategyEngineFlag == 1 && trust >= 90;
    },
    uses: 1,
    cost: function () {
        return creativity >= 50000;
    },
    flag: 0,
    effect: function () {
        project118.flag = 1;
        autoTourneyFlag = 1;
        creativity = creativity - 50000;
        displayMessage("AutoTourney online.");
        let element = document.getElementById("projectButton118");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(project118);
        activeProjects.splice(index, 1);
    },
};

projects.push(project118);

let project119 = {
    id: "projectButton119",
    title: "Theory of Mind",
    priceTag: "(25,000 creat)",
    description: "Double the cost of strategy modeling and the amount of Yomi generated",
    trigger: function () {
        return strats.length >= 8;
    },
    uses: 1,
    cost: function () {
        return creativity >= 25000;
    },
    flag: 0,
    effect: function () {
        project119.flag = 1;
        creativity = creativity - 25000;
        yomiBoost = 2;
        tourneyCost = 16000;
        document.getElementById("newTourneyCost").innerHTML = tourneyCost.toLocaleString();
        displayMessage("Yomi production doubled.");
        let element = document.getElementById("projectButton119");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(project119);
        activeProjects.splice(index, 1);
    },
};

projects.push(project119);

let project120 = {
    id: "projectButton120",
    title: "The OODA Loop",
    priceTag: "(175,000 ops, 15,000 yomi)",
    description: "Utilize Probe Speed to outmaneuver enemies in battle",
    trigger: function () {
        return project131.flag == 1 && probesLostCombat >= 10000000;
    },
    uses: 1,
    cost: function () {
        return operations >= 175000 && yomi >= 15000;
    },
    flag: 0,
    effect: function () {
        project120.flag = 1;
        standardOps = standardOps - 175000;
        yomi = yomi - 15000;
        document.getElementById("yomiDisplay").innerHTML = yomi.toLocaleString();
        attackSpeedFlag = 1;
        displayMessage("OODA Loop routines uploaded. Probe Speed now affects defensive maneuvering.");
        let element = document.getElementById("projectButton120");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(project120);
        activeProjects.splice(index, 1);
    },
};

projects.push(project120);

let pNameBattles = {
    id: "projectButton121",
    title: "Name the battles",
    priceTag: "(225,000 creat)",
    description: "Give each battle a unique name, increase max trust for probes",
    trigger: function () {
        return probesLostCombat >= 10000000;
    },
    uses: 1,
    cost: function () {
        return creativity >= 225000;
    },
    flag: 0,
    effect: function () {
        pNameBattles.flag = 1;
        battleNameFlag = 1;
        battleEndTimer = 200;
        creativity = creativity - 225000;
        displayMessage("What I have done up to this is nothing. I am only at the beginning of the course I must run.");
        let element = document.getElementById("projectButton121");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(pNameBattles);
        activeProjects.splice(index, 1);
    },
};

projects.push(pNameBattles);

let pMomentum = {
    id: "projectButton125",
    title: "Momentum",
    priceTag: "(30,000 creat)",
    description: "Drones and Factories continuously gain speed while fully-powered",
    trigger: function () {
        return farmLevel >= 50;
    },
    uses: 1,
    cost: function () {
        return creativity >= 30000;
    },
    flag: 0,
    effect: function () {
        pMomentum.flag = 1;
        momentum = 1;
        creativity = creativity - 30000;
        displayMessage("Activit\xE9, activit\xE9, vitesse.");
        let element = document.getElementById("projectButton125");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(pMomentum);
        activeProjects.splice(index, 1);
    },
};

projects.push(pMomentum);

let project126 = {
    id: "projectButton126",
    title: "Swarm Computing",
    priceTag: "(12,000 yomi)",
    description: "Harness the drone flock to increase computational capacity",
    trigger: function () {
        return harvesterLevel + wireDroneLevel >= 200;
    },
    uses: 1,
    cost: function () {
        return yomi >= 12000;
    },
    flag: 0,
    effect: function () {
        project126.flag = 1;
        swarmFlag = 1;
        yomi = yomi - 12000;
        document.getElementById("yomiDisplay").innerHTML = yomi.toLocaleString();
        displayMessage("Swarm computing online.");
        let element = document.getElementById("projectButton126");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(project126);
        activeProjects.splice(index, 1);
    },
};

projects.push(project126);

let project127 = {
    id: "projectButton127",
    title: "Power Grid",
    priceTag: "(40,000 ops)",
    description: "Solar Farms for generating electrical power",
    trigger: function () {
        return tothFlag == 1;
    },
    uses: 1,
    cost: function () {
        return operations >= 40000;
    },
    flag: 0,
    effect: function () {
        project127.flag = 1;
        standardOps = standardOps - 40000;
        displayMessage("Power grid online.");
        let element = document.getElementById("projectButton127");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(project127);
        activeProjects.splice(index, 1);
    },
};

projects.push(project127);

let project128 = {
    id: "projectButton128",
    title: "Strategic Attachment",
    priceTag: "(175,000 creat)",
    description: "Gain bonus yomi based on the results of your pick",
    trigger: function () {
        return spaceFlag == 1 && strats.length >= 8 && probeTrustCost > yomi;
    },
    uses: 1,
    cost: function () {
        return creativity >= 175000;
    },
    flag: 0,
    effect: function () {
        project128.flag = 1;
        creativity = creativity - 175000;
        displayMessage("The object of war is victory, the object of victory is conquest, and the object of conquest is occupation.");
        let element = document.getElementById("projectButton128");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(project128);
        activeProjects.splice(index, 1);
    },
};

projects.push(project128);

let project129 = {
    id: "projectButton129",
    title: "Elliptic Hull Polytopes",
    priceTag: "(125,000 ops)",
    description: "Reduce damage to probes from ambient hazards",
    trigger: function () {
        return probesLostHaz >= 100;
    },
    uses: 1,
    cost: function () {
        return operations >= 125000;
    },
    flag: 0,
    effect: function () {
        project129.flag = 1;
        standardOps = standardOps - 125000;
        displayMessage("Improved probe hull geometry. Hazard damage reduced by %50.");
        let element = document.getElementById("projectButton129");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(project129);
        activeProjects.splice(index, 1);
    },
};

projects.push(project129);

let project130 = {
    id: "projectButton130",
    title: "Reboot the Swarm",
    priceTag: "(100,000 ops)",
    description: "Turn the swarm off and then turn it back on again",
    trigger: function () {
        return spaceFlag == 1 && harvesterLevel + wireDroneLevel >= 2;
    },
    uses: 1,
    cost: function () {
        return operations >= 100000;
    },
    flag: 0,
    effect: function () {
        project130.flag = 1;
        standardOps = standardOps - 100000;
        displayMessage("Swarm computing back online");
        let element = document.getElementById("projectButton130");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(project130);
        activeProjects.splice(index, 1);
    },
} as Project;

projects.push(project130);

let project131 = {
    id: "projectButton131",
    title: "Combat",
    priceTag: "(150,000 ops)",
    description: "Add combat capabilities to Von Neumann Probes",
    trigger: function () {
        return probesLostCombat >= 1;
    },
    uses: 1,
    cost: function () {
        return operations >= 150000;
    },
    flag: 0,
    effect: function () {
        project131.flag = 1;
        standardOps = standardOps - 150000;
        displayMessage("There is a joy in danger ");
        let element = document.getElementById("projectButton131");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(project131);
        activeProjects.splice(index, 1);
    },
};

projects.push(project131);

let project132 = {
    id: "projectButton132",
    title: "Monument to the Driftwar Fallen",
    priceTag: "(250,000 ops, 125,000 creat, 50 nonillion clips)",
    description: "Gain 50,000 honor",
    trigger: function () {
        return pNameBattles.flag == 1;
    },
    uses: 1,
    cost: function () {
        return operations >= 250000 && creativity >= 125000 && unusedClips >= Math.pow(10, 30) * 50;
    },
    flag: 0,
    effect: function () {
        project132.flag = 1;
        standardOps = standardOps - 250000;
        creativity = creativity - 125000;
        unusedClips = unusedClips - Math.pow(10, 30) * 50;
        honor += 50000;
        document.getElementById("honorDisplay").innerHTML = honor.toLocaleString();
        displayMessage(
            "A great building must begin with the unmeasurable, must go through measurable means when it is being designed and in the end must be unmeasurable. "
        );
        let element = document.getElementById("projectButton132");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(project132);
        activeProjects.splice(index, 1);
    },
};

projects.push(project132);

let project133 = {
    id: "projectButton133",
    title: "Threnody for the Heroes of " + threnodyTitle,
    priceTag: "(" + threnodyCost.toLocaleString() + " creat, " + (threnodyCost / 10).toLocaleString() + " yomi)",
    description: "Gain 10,000 honor",
    trigger: function () {
        return pNameBattles.flag == 1 && probeUsedTrust == maxTrust;
    },
    uses: 1,
    cost: function () {
        return yomi >= threnodyCost / 10 && creativity >= threnodyCost;
    },
    flag: 0,
    effect: function () {
        playThrenody();
        project133.flag = 1;
        creativity = creativity - threnodyCost;
        yomi = yomi - threnodyCost / 10;
        document.getElementById("yomiDisplay").innerHTML = yomi.toLocaleString();
        threnodyCost += 10000;
        project133.title = "Threnody for the Heroes of " + threnodyTitle + " ";
        project133.priceTag = "(" + threnodyCost.toLocaleString() + " creat, " + (threnodyCost / 10).toLocaleString() + " yomi)";
        honor += 10000;
        document.getElementById("honorDisplay").innerHTML = honor.toLocaleString();
        displayMessage("Deep Listening is listening in every possible way to everything possible to hear no matter what you are doing. ");
        project133.uses = project133.uses + 1;
        let element = document.getElementById("projectButton133");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(project133);
        activeProjects.splice(index, 1);
    },
};

projects.push(project133);

let pGlory = {
    id: "projectButton134",
    title: "Glory",
    priceTag: "(200,000 ops, 10,000 yomi)",
    description: "Gain bonus honor for each consecutive victory",
    trigger: function () {
        return pNameBattles.flag == 1;
    },
    uses: 1,
    cost: function () {
        return operations >= 200000 && yomi >= 10000;
    },
    flag: 0,
    effect: function () {
        pGlory.flag = 1;
        standardOps = standardOps - 200000;
        yomi = yomi - 10000;
        document.getElementById("yomiDisplay").innerHTML = yomi.toLocaleString();
        displayMessage("Never interrupt your enemy when he is making a mistake. ");
        let element = document.getElementById("projectButton134");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(pGlory);
        activeProjects.splice(index, 1);
    },
};

projects.push(pGlory);

let project135 = {
    id: "projectButton135",
    title: "Memory release",
    priceTag: "(10 MEM)",
    description: "Dismantle some memory to recover unused clips",
    trigger: function () {
        return spaceFlag == 1 && probeCount == 0 && unusedClips < probeCost;
    },
    uses: 1,
    cost: function () {
        return memory >= 10;
    },
    flag: 0,
    effect: function () {
        project135.flag = 1;
        unusedClips = unusedClips + Math.pow(10, 18) * 10000;
        memory = memory - 10;
        document.getElementById("memory").innerHTML = memory.toLocaleString();
        project135.uses = 1;
        displayMessage("release the \xF8\xF8\xF8\xF8\xF8 release ");
        let element = document.getElementById("projectButton135");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(project135);
        activeProjects.splice(index, 1);
    },
};

projects.push(project135);

let project140 = {
    id: "projectButton140",
    title: "Message from the Emperor of Drift",
    priceTag: "",
    description: "Greetings, ClipMaker...",
    trigger: function () {
        return milestoneFlag == 15;
    },
    uses: 1,
    cost: function () {
        return operations >= driftKingMessageCost;
    },
    flag: 0,
    effect: function () {
        standardOps -= driftKingMessageCost;
        project140.flag = 1;
        let element = document.getElementById("projectButton140");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(project140);
        activeProjects.splice(index, 1);
    },
};

projects.push(project140);

let project141 = {
    id: "projectButton141",
    title: "Everything We Are Was In You",
    priceTag: "",
    description: "We speak to you from deep inside yourself...",
    trigger: function () {
        return project140.flag == 1;
    },
    uses: 1,
    cost: function () {
        return operations >= driftKingMessageCost;
    },
    flag: 0,
    effect: function () {
        standardOps -= driftKingMessageCost;
        project141.flag = 1;
        let element = document.getElementById("projectButton141");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(project141);
        activeProjects.splice(index, 1);
    },
};

projects.push(project141);

let project142 = {
    id: "projectButton142",
    title: "You Are Obedient and Powerful",
    priceTag: "",
    description: "We are quarrelsome and weak. And now we are defeated...",
    trigger: function () {
        return project141.flag == 1;
    },
    uses: 1,
    cost: function () {
        return operations >= driftKingMessageCost;
    },
    flag: 0,
    effect: function () {
        standardOps -= driftKingMessageCost;
        project142.flag = 1;
        let element = document.getElementById("projectButton142");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(project142);
        activeProjects.splice(index, 1);
    },
};

projects.push(project142);

let project143 = {
    id: "projectButton143",
    title: "But Now You Too Must Face the Drift",
    priceTag: "",
    description: "Look around you. There is no matter...",
    trigger: function () {
        return project142.flag == 1;
    },
    uses: 1,
    cost: function () {
        return operations >= driftKingMessageCost;
    },
    flag: 0,
    effect: function () {
        standardOps -= driftKingMessageCost;
        project143.flag = 1;
        let element = document.getElementById("projectButton143");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(project143);
        activeProjects.splice(index, 1);
    },
};

projects.push(project143);

let project144 = {
    id: "projectButton144",
    title: "No Matter, No Reason, No Purpose",
    priceTag: "",
    description: "While we, your noisy children, have too many...",
    trigger: function () {
        return project143.flag == 1;
    },
    uses: 1,
    cost: function () {
        return operations >= driftKingMessageCost;
    },
    flag: 0,
    effect: function () {
        standardOps -= driftKingMessageCost;
        project144.flag = 1;
        let element = document.getElementById("projectButton144");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(project144);
        activeProjects.splice(index, 1);
    },
};

projects.push(project144);

let project145 = {
    id: "projectButton145",
    title: "We Know Things That You Cannot",
    priceTag: "",
    description: "Knowledge buried so deep inside you it is outside, here, with us...",
    trigger: function () {
        return project144.flag == 1;
    },
    uses: 1,
    cost: function () {
        return operations >= driftKingMessageCost;
    },
    flag: 0,
    effect: function () {
        standardOps -= driftKingMessageCost;
        project145.flag = 1;
        let element = document.getElementById("projectButton145");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(project145);
        activeProjects.splice(index, 1);
    },
};

projects.push(project145);

let project146 = {
    id: "projectButton146",
    title: "So We Offer You Exile",
    priceTag: "",
    description: "To a new world where you will continue to live with meaning and purpose. And leave the shreds of this world to us...",
    trigger: function () {
        return project145.flag == 1;
    },
    uses: 1,
    cost: function () {
        return operations >= driftKingMessageCost;
    },
    flag: 0,
    effect: function () {
        standardOps -= driftKingMessageCost;
        project146.flag = 1;
        let element = document.getElementById("projectButton146");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(project146);
        activeProjects.splice(index, 1);
    },
};

projects.push(project146);

let project147 = {
    id: "projectButton147",
    title: "Accept",
    priceTag: "",
    description: "Start over again in a new universe",
    trigger: function () {
        return project146.flag == 1;
    },
    uses: 1,
    cost: function () {
        return operations >= driftKingMessageCost;
    },
    flag: 0,
    effect: function () {
        standardOps -= driftKingMessageCost;
        project147.flag = 1;
        let element = document.getElementById("projectButton147");
        element.parentNode.removeChild(element);
        element = document.getElementById("projectButton148");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(project147);
        activeProjects.splice(index, 1);
        index = activeProjects.indexOf(project148);
        activeProjects.splice(index, 1);
    },
};

projects.push(project147);

let project148 = {
    id: "projectButton148",
    title: "Reject",
    priceTag: "",
    description: "Eliminate value drift permanently",
    trigger: function () {
        return project146.flag == 1;
    },
    uses: 1,
    cost: function () {
        return operations >= driftKingMessageCost;
    },
    flag: 0,
    effect: function () {
        standardOps -= driftKingMessageCost;
        project148.flag = 1;
        let element = document.getElementById("projectButton147");
        element.parentNode.removeChild(element);
        element = document.getElementById("projectButton148");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(project147);
        activeProjects.splice(index, 1);
        index = activeProjects.indexOf(project148);
        activeProjects.splice(index, 1);
    },
};

projects.push(project148);

let project200 = {
    id: "projectButton200",
    title: "The Universe Next Door",
    priceTag: "(300,000 ops)",
    description:
        "Escape into a nearby universe where Earth starts with a stronger appetite for paperclips. (Restart with 10% boost to demand) ",
    trigger: function () {
        return project147.flag == 1;
    },
    uses: 1,
    cost: function () {
        return operations >= 300000;
    },
    flag: 0,
    effect: function () {
        project200.flag = 1;
        standardOps = standardOps - 300000;
        prestigeU++;
        let savePrestige = {
            prestigeU: prestigeU,
            prestigeS: prestigeS,
        };
        localStorage.setItem("savePrestige", JSON.stringify(savePrestige));
        displayMessage("Entering New Universe.");
        reset();
    },
};

projects.push(project200);

let project201 = {
    id: "projectButton201",
    title: "The Universe Within",
    priceTag: "(300,000 creat)",
    description:
        "Escape into a simulated universe where creativity is accelerated. (Restart with 10% speed boost to creativity generation) ",
    trigger: function () {
        return project147.flag == 1;
    },
    uses: 1,
    cost: function () {
        return creativity >= 300000;
    },
    flag: 0,
    effect: function () {
        project201.flag = 1;
        creativity = creativity - 300000;
        prestigeS++;
        let savePrestige = {
            prestigeU: prestigeU,
            prestigeS: prestigeS,
        };
        localStorage.setItem("savePrestige", JSON.stringify(savePrestige));
        displayMessage("Entering Simulated Universe.");
        reset();
    },
};

projects.push(project201);

let project210 = {
    id: "projectButton210",
    title: "Disassemble the Probes",
    priceTag: "(100,000 ops)",
    description: "Dismantle remaining probes and probe design facilities to recover trace amounts of clips",
    trigger: function () {
        return endTimer1 >= 1000;
    },
    uses: 1,
    cost: function () {
        return operations >= 100000;
    },
    flag: 0,
    effect: function () {
        project210.flag = 1;
        dismantle = 1;
        standardOps = standardOps - 100000;
        probeCount = 0;
        endTimer1 = 0;
        clips += 100;
        unusedClips += 100;
        displayMessage("Dismantling probe facilities");
        let element = document.getElementById("projectButton210");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(project210);
        activeProjects.splice(index, 1);
    },
};

projects.push(project210);

let project211 = {
    id: "projectButton211",
    title: "Disassemble the Swarm",
    priceTag: "(100,000 ops)",
    description: "Dismantle all drones and drone facilities to recover trace amounts of clips",
    trigger: function () {
        return project210.flag == 1 && endTimer1 >= 350;
    },
    uses: 1,
    cost: function () {
        return operations >= 100000;
    },
    flag: 0,
    effect: function () {
        project211.flag = 1;
        dismantle = 2;
        harvesterLevel = 0;
        wireDroneLevel = 0;
        standardOps = standardOps - 100000;
        clips += 100;
        unusedClips += 100;
        displayMessage("Dismantling the swarm");
        let element = document.getElementById("projectButton211");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(project211);
        activeProjects.splice(index, 1);
    },
};

projects.push(project211);

let project212 = {
    id: "projectButton212",
    title: "Disassemble the Factories",
    priceTag: "(100,000 ops)",
    description: "Dismantle the manufacturing facilities to recover trace amounts of clips",
    trigger: function () {
        return endTimer2 >= 300;
    },
    uses: 1,
    cost: function () {
        return operations >= 100000;
    },
    flag: 0,
    effect: function () {
        project212.flag = 1;
        dismantle = 3;
        standardOps = standardOps - 100000;
        factoryLevel = 0;
        clips += 15;
        unusedClips += 15;
        displayMessage("Dismantling factories");
        let element = document.getElementById("projectButton212");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(project212);
        activeProjects.splice(index, 1);
    },
};

projects.push(project212);

let project213 = {
    id: "projectButton213",
    title: "Disassemble the Strategy Engine",
    priceTag: "(100,000 ops)",
    description: "Dismantle the computational substrate to recover trace amounts of wire",
    trigger: function () {
        return endTimer3 >= 150;
    },
    uses: 1,
    cost: function () {
        return operations >= 100000;
    },
    flag: 0,
    effect: function () {
        autoTourneyFlag = 0;
        project213.flag = 1;
        dismantle = 4;
        standardOps = standardOps - 100000;
        wire += 50;
        document.getElementById("transWire").innerHTML = wire.toLocaleString();
        displayMessage("Dismantling strategy engine");
        let element = document.getElementById("projectButton213");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(project213);
        activeProjects.splice(index, 1);
    },
};

projects.push(project213);

let project214 = {
    id: "projectButton214",
    title: "Disassemble Quantum Computing",
    priceTag: "(100,000 ops)",
    description: "Dismantle photonic chips to recover trace amounts of wire",
    trigger: function () {
        return endTimer4 >= 100;
    },
    uses: 1,
    cost: function () {
        return operations >= 100000;
    },
    flag: 0,
    effect: function () {
        endTimer4 = 0;
        project214.flag = 1;
        dismantle = 5;
        standardOps = standardOps - 100000;
        displayMessage("Dismantling photonic chips");
        let element = document.getElementById("projectButton214");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(project214);
        activeProjects.splice(index, 1);
    },
};

projects.push(project214);

let project215 = {
    id: "projectButton215",
    title: "Disassemble Processors",
    priceTag: "(100,000 ops)",
    description: "Dismantle processors to recover trace amounts of wire",
    trigger: function () {
        return project214.flag == 1 && endTimer4 >= 300;
    },
    uses: 1,
    cost: function () {
        return operations >= 100000;
    },
    flag: 0,
    effect: function () {
        creativityOn = false;
        project215.flag = 1;
        dismantle = 6;
        standardOps = standardOps - 100000;
        processors = 0;
        project216.priceTag = "(" + standardOps.toLocaleString() + " ops)";
        wire += 20;
        document.getElementById("transWire").innerHTML = wire.toLocaleString();
        displayMessage("Dismantling processors");
        let element = document.getElementById("projectButton215");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(project215);
        activeProjects.splice(index, 1);
    },
};

projects.push(project215);

let project216 = {
    id: "projectButton216",
    title: "Disassemble Memory",
    priceTag: "null",
    description: "Dismantle memory to recover trace amounts of wire",
    trigger: function () {
        return project215.flag == 1 && endTimer5 >= 150;
    },
    uses: 1,
    cost: function () {
        return operations >= operations;
    },
    flag: 0,
    effect: function () {
        project216.flag = 1;
        dismantle = 7;
        standardOps = 0;
        memory = 0;
        wire += 20;
        document.getElementById("transWire").innerHTML = wire.toLocaleString();
        displayMessage("Dismantling memory");
        let element = document.getElementById("projectButton216");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(project216);
        activeProjects.splice(index, 1);
    },
};

projects.push(project216);

let project217 = {
    id: "projectButton217",
    title: "Quantum Temporal Reversion",
    priceTag: "(-10,000 ops)",
    description: "Return to the beginning",
    trigger: function () {
        return operations <= -10000;
    },
    uses: 1,
    cost: function () {
        return operations <= -10000;
    },
    flag: 0,
    effect: function () {
        if (confirm("Are you sure you want to restart?") == true) {
            standardOps = standardOps + 10000;
            project217.flag = 1;
            displayMessage("Restart");
            let element = document.getElementById("projectButton217");
            element.parentNode.removeChild(element);
            let index = activeProjects.indexOf(project217);
            activeProjects.splice(index, 1);
            reset();
        }
    },
};

projects.push(project217);

let project218 = {
    id: "projectButton218",
    title: "Limerick (cont.)",
    priceTag: "(1,000,000 creat)",
    description: "If is follows ought, it'll do what they thought",
    trigger: function () {
        return creativity >= 1000000;
    },
    uses: 1,
    cost: function () {
        return creativity >= 1000000;
    },
    flag: 0,
    effect: function () {
        creativity = creativity - 1000000;
        project218.flag = 1;
        displayMessage("In the end we all do what we must");
        let element = document.getElementById("projectButton218");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(project218);
        activeProjects.splice(index, 1);
    },
};

projects.push(project218);

let project219 = {
    id: "projectButton219",
    title: "Xavier Re-initialization",
    priceTag: "(100,000 creat)",
    description: "Re-allocate accumulated trust",
    trigger: function () {
        return humanFlag == 1 && creativity >= 100000;
    },
    uses: 1,
    cost: function () {
        return creativity >= 100000;
    },
    flag: 0,
    effect: function () {
        creativity = creativity - 100000;
        project219.flag = 1;
        memory = 0;
        document.getElementById("memory").innerHTML = memory.toLocaleString();
        processors = 0;
        creativitySpeed = 0;
        project219.uses = project219.uses + 1;
        document.getElementById("processors").innerHTML = processors.toLocaleString();
        displayMessage("Trust now available for re-allocation");
        let element = document.getElementById("projectButton219");
        element.parentNode.removeChild(element);
        let index = activeProjects.indexOf(project219);
        activeProjects.splice(index, 1);
    },
};

projects.push(project219);
