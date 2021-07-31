var data = [
    {
        "name": "Total",
        "num": "0",
        "display": "Treat/¬Treat",
        "parent": "null",
        "children": [
            {
                "name": "Treat",
                "decisionNode": "True",
                "num": "1",
                "display": "Treat",
                "parentTree": "Treat",
                "children": [
                    {
                        "name": "Treat&Cure",
                        "num": "3",
                        "display": "Cure",
                        "givenName": "P(Cure|Treat)",
                        "given": ".30",
                        "parentTree": "Treat",
                        "children": [
                            {
                                "name": "Treat&Cure&Symptoms",
                                "display": "Symptoms",
                                "num": "7",
                                "display": "Symptoms",
                                "givenName": "P(Symptoms|TC)",
                                "given": ".40",
                                "parentTree": "Treat",
                                "value": "0"
                            },
                            {
                                "name": "Treat&Cure&¬Symptoms",
                                "display": "¬Symptoms",
                                "num": "8",
                                "givenName": "P(¬Symptoms|TC)",
                                "parentTree": "Treat",
                                "value": "0"
                            }
                        ]
                    },
                    {
                        "name": "Treat&¬Cure",
                        "num": "4",
                        "display": "¬Cure",
                        "givenName": "P(¬Cure|Treat)",
                        "parentTree": "Treat",
                        "children": [
                            {
                                "name": "Treat&¬Cure&Symptoms",
                                "display": "P(Symptoms|T¬C)",
                                "num": "9",
                                "display": "Symptoms",
                                "givenName": "P(Symptoms|T¬C)",
                                "given": ".40",
                                "parentTree": "Treat",
                                "value": "0"
                            },
                            {
                                "name": "Treat&¬Cure&¬Symptoms",
                                "display": "¬Symptoms",
                                "num": "10",
                                "givenName": "P(¬Symptoms|T¬C)",
                                "parentTree": "Treat",
                                "value": "0"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "¬Treat",
                "decisionNode": "True",
                "display": "¬Treat",
                "num": "2",
                "parentTree": "NoTreat",
                "children": [
                    {
                        "name": "¬Treat&Cure",
                        "display": "Cure",
                        "num": "5",
                        "given": ".20",
                        "givenName": "P(Cure|¬Treat)",
                        "parentTree": "NoTreat",
                        "children": [
                            {
                                "name": "¬Treat&Cure&Symptoms",
                                "display": "Symptoms",
                                "num": "11",
                                "givenName": "P(Symptoms|¬TC)",
                                "given": ".10",
                                "parentTree": "NoTreat",
                                "value": "10"
                            },
                            {
                                "name": "¬Treat&Cure&¬Symptoms",
                                "display": "¬Symptoms",
                                "num": "12",
                                "givenName": "P(¬Symptoms|¬TC)",
                                "parentTree": "NoTreat",
                                "value": "10"
                            }
                        ]
                    },
                    {
                        "name": "¬Treat&¬Cure",
                        "display": "¬Cure",
                        "num": "6",
                        "given": ".9",
                        "givenName": "P(¬Treat|¬Cure)",
                        "parentTree": "NoTreat",
                        "children": [
                            {
                                "name": "¬Treat&¬Cure&Symptoms",
                                "display": "Symptoms",
                                "num": "13",
                                "givenName": "P(Symptoms|¬T¬C)",
                                "given": ".10",
                                "parentTree": "NoTreat",
                                "value": "10"
                            },
                            {
                                "name": "¬Treat&¬Cure&¬Symptoms",
                                "display": "¬Symptoms",
                                "num": "14",
                                "givenName": "P(¬Symptoms|¬T¬C)",
                                "parentTree": "NoTreat",
                                "value": "10"
                            }
                        ]
                    }

                ]
            }

        ]
    }
];

var grandChildSpacing = 0;

var margin = { top: 00, right: 140, bottom: 0, left: 90 },
    width = 1400 - margin.right - margin.left,
    height = 1000 - margin.top - margin.bottom + (grandChildSpacing * 4);

var i = 0;
var radius = 40;

var tree = d3.layout.tree()
    .nodeSize([80, 100])
    .separation(function (a, b) {
        if (a.depth == 3) {
            return 1.4
        } else {
            return 1
        }
    });

var svg = d3.select(".svgHolder").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("id", "topg")
    .attr("class", "topg")
    .attr("transform", "translate(90,500)")
    ;

root = data[0];

// Assign variables to different parts of data structure
// layer 1
var treat = root.children[0];
var notTreat = root.children[1];

// layer 2
var treatCure = treat.children[0];
var treatNotCure = treat.children[1];

var notTreatCure = notTreat.children[0];
var notTreatNotCure = notTreat.children[1];

// layer 3
var treatCureSymptoms = treatCure.children[0];
var treatCureNotSymptoms = treatCure.children[1];

var treatNotCureSymptoms = treatNotCure.children[0];
var treatNotCureNotSymptoms = treatNotCure.children[1];

var notTreatCureSymptoms = notTreatCure.children[0];
var notTreatCureNotSymptoms = notTreatCure.children[1];

var notTreatNotCureSymptoms = notTreatNotCure.children[0];
var notTreatNotCureNotSymptoms = notTreatNotCure.children[1];

// populate fields with initial values for probabilities
d3.select("#treatCure").attr("value", treatCure.given);
d3.select("#treatCureSymp").attr("value", treatCureSymptoms.given);
d3.select("#treatNotCureSymp").attr("value", treatNotCureSymptoms.given);

d3.select("#notTreatCure").attr("value", notTreatCure.given);
d3.select("#notTreatCureSymptoms").attr("value", notTreatCureSymptoms.given);
d3.select("#notTreatNotCureSymptoms").attr("value", notTreatNotCureSymptoms.given);

d3.select("#notTreatCure").attr("value", notTreatCure.given);
d3.select("#notTreatCureSymptoms").attr("value", notTreatCureSymptoms.given);
d3.select("#notTreatNotCureSymptoms").attr("value", notTreatNotCureSymptoms.given);

// cure symptoms
d3.select("#cureSymptoms").attr("value", treatCureSymptoms.value);

// cure no symptoms
d3.select("#cureNoSymptoms").attr("value", treatCureNotSymptoms.value);

// no cure and symptoms
d3.select("#noCureSymptoms").attr("value", treatNotCureSymptoms.value);

// no cure no symptoms
d3.select("#noCureNoSymptoms").attr("value", treatNotCureNotSymptoms.value);



d3.select("#treatmentForm").on("submit", function() {
    updateAll();
})


d3.select("#noTreatmentForm").on("submit", function() {
    updateAll();
})


d3.select("#assignedValsForm").on("submit", function() {
    updateAll();
})



updateAll();

function updateConditionalProbabilities() {
    var treat_cure_prob = d3.select("#treatCure").property("value");
    treatCure.given = Number(treat_cure_prob).toFixed(2);

    var symp_tc_prob = d3.select("#treatCureSymp").property("value");
    treatCureSymptoms.given = Number(symp_tc_prob).toFixed(2);

    var symp_tnc_prob = d3.select("#treatNotCureSymp").property("value");
    treatNotCureSymptoms.given = Number(symp_tnc_prob).toFixed(2);

    var ntc_prob = d3.select("#notTreatCure").property("value");
    notTreatCure.given = Number(ntc_prob).toFixed(2);

    var symp_ntc_prob = d3.select("#notTreatCureSymptoms").property("value");
    notTreatCureSymptoms.given = Number(symp_ntc_prob).toFixed(2);

    var symp_ntnc_prob = d3.select("#notTreatNotCureSymptoms").property("value");
    notTreatNotCureSymptoms.given = Number(symp_ntnc_prob).toFixed(2);

    // Use conditional probability to compute the various values

    // layer 1 probabilities
    treatNotCure.given = (1 - treatCure.given).toFixed(2);
    notTreatNotCure.given = (1 - notTreatCure.given).toFixed(2);

    // layer 2 probabilities
    treatCureNotSymptoms.given = (1 - treatCureSymptoms.given).toFixed(2);
    treatNotCureNotSymptoms.given = (1 - treatNotCureSymptoms.given).toFixed(2);

    notTreatCureNotSymptoms.given = (1 - notTreatCureSymptoms.given).toFixed(2);
    notTreatNotCureNotSymptoms.given = (1 - notTreatNotCureSymptoms.given).toFixed(2);
}

// joint probabilities
function updateProbabilities() {
    // layer 3 probailities
    treatCureSymptoms.probability = (treatCure.given * treatCureSymptoms.given).toFixed(2);
    treatCureNotSymptoms.probability = (treatCure.given * treatCureNotSymptoms.given).toFixed(2);

    treatNotCureSymptoms.probability = (treatNotCure.given * treatNotCureSymptoms.given).toFixed(2);
    treatNotCureNotSymptoms.probability = (treatNotCure.given * treatNotCureNotSymptoms.given).toFixed(2);

    notTreatCureSymptoms.probability = (notTreatCure.given * notTreatCureSymptoms.given).toFixed(2);
    notTreatCureNotSymptoms.probability = (notTreatCure.given * notTreatCureNotSymptoms.given).toFixed(2);

    notTreatNotCureSymptoms.probability = (notTreatNotCure.given * notTreatNotCureSymptoms.given).toFixed(2);
    notTreatNotCureNotSymptoms.probability = (notTreatNotCure.given * notTreatNotCureNotSymptoms.given).toFixed(2);
}

function updateExpectedValues() {
    // update values from user input
    var cure_symptoms_value = d3.select("#cureSymptoms").property("value");
    cure_symptoms_value = Number(cure_symptoms_value).toFixed(2);
    treatCureSymptoms.value = cure_symptoms_value
    notTreatCureSymptoms.value = cure_symptoms_value

    var cure_no_symptoms_val = d3.select("#cureNoSymptoms").property("value");
    cure_no_symptoms_val = Number(cure_no_symptoms_val).toFixed(2);
    treatCureNotSymptoms.value = cure_no_symptoms_val
    notTreatCureNotSymptoms.value = cure_no_symptoms_val

    var no_cure_symptoms_val = d3.select("#noCureSymptoms").property("value");
    no_cure_symptoms_val = Number(no_cure_symptoms_val).toFixed(2);
    treatNotCureSymptoms.value = no_cure_symptoms_val
    notTreatNotCureSymptoms.value = no_cure_symptoms_val

    var no_cure_no_symptoms_val = d3.select("#noCureNoSymptoms").property("value");
    no_cure_no_symptoms_val = Number(no_cure_no_symptoms_val).toFixed(2);
    treatNotCureNotSymptoms.value = no_cure_no_symptoms_val
    notTreatNotCureNotSymptoms.value = no_cure_no_symptoms_val


    // expected values
    // layer 2
    treatCure.value = ((treatCureSymptoms.given * treatCureSymptoms.value) +
        (treatCureNotSymptoms.given * treatCureNotSymptoms.value)).toFixed(2);

    treatNotCure.value = ((treatNotCureSymptoms.given * treatNotCureSymptoms.value) +
        (treatNotCureNotSymptoms.given * treatNotCureNotSymptoms.value)).toFixed(2);


    notTreatCure.value = ((notTreatCureSymptoms.given * notTreatCureSymptoms.value) +
        (notTreatCureNotSymptoms.given * notTreatCureNotSymptoms.value)).toFixed(2);

    notTreatNotCure.value = ((notTreatNotCureSymptoms.given * notTreatNotCureSymptoms.value) +
        (notTreatNotCureNotSymptoms.given * notTreatNotCureNotSymptoms.value)).toFixed(2);

    // layer 1
    treat.value = ((treatCure.given * treatCure.value) +
        (treatNotCure.given * treatNotCure.value)).toFixed(2);

    notTreat.value = ((notTreatCure.given * notTreatCure.value) +
        (notTreatNotCure.given * notTreatNotCure.value)).toFixed(2);
}

function updateAll() {
    updateConditionalProbabilities();
    updateProbabilities();
    updateExpectedValues();
    update(root);
}


function update(source) {
    // Pass in the data structure "data"
    // d3 creates a visual tree layout using that data
    // Links are the source and target locations for the lines between the circles
    var nodes = tree.nodes(root).reverse(),
        links = tree.links(nodes);

    // This tree will be evenly spaced fixed depth
    // with each level 250px from the previous
    // To compress or enlarge the tree, change this number

    nodes.forEach(function (d) {
        d.y = d.depth * 325;
    });

    // Create the invdidual Nodes on the on the tree
    // and bind/join them to you data structure
    // Each element in your data structure "data" is assigned to a
    // Node
    var node = svg.selectAll("g.node")
        .data(nodes, function (d) {
            if (d.id) {
                return d.id;
            } else {
                d.id = i++;
                return d.id;
            }
        });

    var grandChildCount = 0;

    //        // Declare and append the links (the lines between nodes)
    // Links go first so they are in front of circles in display

    var topg = d3.select("#topg");

    var link = topg.selectAll(".link")
        .data(links, function (d) {
            return d.target.id;
        });


    let minBlue = "#e2edf8";
    let maxBlue = "#08306b";


    var blueColor = d3.scale.linear()
        .domain([0,100])
        .range([minBlue, maxBlue]);

    let minOrange = "#fee8d1";
    let maxOrange = "#7f2704";

    var orangeColor = d3.scale.linear()
        .domain([0,100])
        .range([minOrange, maxOrange]);

    var baseBlue = "#f5f9fe"
    var baseOrange = "#fff4e8"
    var baseStrokeColor = "#cbcbcb"

    //=================================================================
    // Legends
    // ================================================================
    var ordinal = d3.scale.ordinal()
        .domain(["Treatment Tree", "No Treatment Tree"])
        .range([minBlue, minOrange]);
    
    svg.append("g")
        .attr("class", "legendOrdinal")
        .attr("transform", "translate(-60,-370)");
      
    var legendColor = d3.legendColor()
        //d3 symbol creates a path-string, for example
        //"M0,-8.059274488676564L9.306048591020996,
        //8.059274488676564 -9.306048591020996,8.059274488676564Z"
        .shape("path", d3.symbol().type(d3.symbolCircle).size(150)())
        .shapePadding(10)
        //use cellFilter to hide the "e" cell
        .scale(ordinal);
      
    svg.select(".legendOrdinal")
        .call(legendColor);


    var square = d3.symbol().type(d3.symbolSquare).size(150)(),
        circle = d3.symbol().type(d3.symbolCircle).size(150)();
      
      
    var symbolScale =  d3.scaleOrdinal()
        .domain(['Decision','Uncertainty'])
        .range([square, circle]);
    
    svg.append("g")
        .attr("class", "legendSymbol")
        .attr("transform", "translate(-60, -315)");
    
    var legendPath = d3.legendSymbol()
        .scale(symbolScale)
        .labelWrap(200);

    svg.select(".legendSymbol")
        .call(legendPath);
    
    d3.selectAll(".legendSymbol path").each(function (d) {
        d3.select(this).style("fill", baseStrokeColor)
    })

    

    var linkEnter = link.enter().insert("line")
        .attr("class", "link")
        .attr("x1", function (d) {
            return d.source.y;
        })
        .attr("y1", function (d) {
            return d.source.x;
        })
        .attr("x2", function (d) {
            return d.target.y;
        })
        .attr("y2", function (d) {
            return d.target.x;
        })
        .attr("stroke", function (d) {
            if (d.target.parentTree == "Treat") {
                return blueColor(0);
            }
            return orangeColor(0);
        })
        .attr("marker-end","url(#arrow)");
   
    
    

    // Enter the nodes.
    var nodeEnter = node.
        enter().append("g")
        .attr("class", "node")
        .attr("transform", function (d) {
            // This is to make the vertical spacing more pleasant
            // for the last column of no
            var y = d.y;
            var x = d.x;
            d.shiftX = x;
            if (d.depth == 3) {
                if (grandChildCount % 3) {
                    x = x - grandChildSpacing;
                    d.shiftX = x;
                } else {
                    x = x + grandChildSpacing;
                    d.shiftX = x;
                }
                grandChildCount++;
            }
            d.dy = y;
            d.dx = x;
            return "translate(" + y + "," + x + ")";
        });


    
    // Add a circle around the node
    nodeEnter.append("rect")
        .attr("rx", function (d) {
            if (d.decisionNode == "True") { //only decision nodes are square
                return 0
            }
            if (d == root) {
                return 15
            }
            return 100
        })
        .attr("ry", function (d) {
            if (d.decisionNode == "True") { //only decision nodes are square
                return 0
            }
            if (d == root) {
                return 15
            }
            return 100
        })
        .attr("width", function(d) {
            if (d == root) {
                return 280
            }
            return 90
        })
            
        .attr("height", function(d) {
            if (d == root) {
                return 150
            }
            return 90
        })
        .attr("x", function(d) {
            if (d == root) {
                return -85
            }
            return -45
        })
        .attr("y", function(d) {
            if (d == root) {
                return -75
            }
            return -45
        })
        .style("stroke", function(d) {
            if (d == root) {
                return baseStrokeColor
                // return baseStrokeColor
            } else {
                if (d.parentTree == "Treat") {
                    return blueColor(d.value)
                }
                return orangeColor(d.value)
            }
        })
        .style("stroke-width", function(d) {
            if (d == root) {
                return 1.5;
            } 
        })
        .attr("fill", function(d) {
            if (d == root) {
                // return baseFill
                return "white"
            }
            
            if (d.parentTree == "Treat") {
                return baseBlue;
            }
            return baseOrange;
        })
        .style('stroke-dasharray', function(d) {
            if (d == root) {
                return ('2,3')
            }
        })

    // Add the name of the node
    nodeEnter.append("text")
        .text(function (d) {
            return d.display;
        })
        .attr("class", function(d) {
            if (d == root) {
                return "rootResults"
            }
        })
        .attr("id", function(d) {
            if (d == root) {
                return "rootResultsDecision"
            }
        })

        .attr("text-anchor", function(d) {
            if (d == root) {
                return "top"
            }
            return "middle"
        })
        .style("fill-opacity", 1)
        .attr("x", function(d) {
            if (d == root) {
                return "-60"
            }
        })
        .attr("y", function(d) {
            if (d == root) {
                return "-45"
            }
        })
        .attr("class", "nodeText")

    // Add the probability of the node below that
    nodeEnter.append("text")
        .text(function (d) {
            if (d.probability) {
                return d.probability

            } else { return "" }
        })
        .attr("y", "20")
        .attr("text-anchor", "middle")
        .attr("class", function (d) {
            if (d.depth == 3) {
                return "probabilityText"
            } else { return "expValue" }
        })
        .attr("x", function (d) {
            // For the last column, shift the values to the right
            // of the circle rather than inside it
            if (d.depth == 3) {
                return 75;
            } else { return 0 }

        })
        .attr("id", "jointProb");

    nodeEnter.append("text")
        .attr("class", function(d) {
            if (d == root) {
                return "rootResults"
            }
        })
        .attr("id", function(d) {
            if (d == root) {
                return "rootDiffText"
            }
        })
    
    nodeEnter.append("text")
        .attr("class", function(d) {
            if (d == root) {
                return "rootResults"
            }
        })
        .attr("id", function(d) {
            if (d == root) {
                return "rootContribCureSymp"
            }
        })
    
    nodeEnter.append("text")
        .attr("class", function(d) {
            if (d == root) {
                return "rootResults"
            }
        })
        .attr("id", function(d) {
            if (d == root) {
                return "rootContribCureNoSymp"
            }
        })
    
    nodeEnter.append("text")
        .attr("class", function(d) {
            if (d == root) {
                return "rootResults"
            }
        })
        .attr("id", function(d) {
            if (d == root) {
                return "rootContribNoCureSymp"
            }
        })
    nodeEnter.append("text")
        .attr("class", function(d) {
            if (d == root) {
                return "rootResults"
            }
        })
        .attr("id", function(d) {
            if (d == root) {
                return "rootContribNoCureNoSymp"
            }
        })

    // Add the exp val of the node
    nodeEnter.append("text")
        .text(function (d) {
            if (d.value) {
                return d.value

            } else { return "" }
        })
        .attr("y", "20")
        .attr("text-anchor", "middle")
        .attr("class", "expValue");


    //  last layer probability text
    nodeEnter.append("text")
        .text(function (d) {
            var text = "";
            if (d.depth == 3) {
                var set1 = d.parent.parent.display;
                var set2 = d.parent.display;
                var set3 = d.display;
                text = "P(" + set2 + " & " + set3 + "|" + set1 + ")";
            }
            return text;
        })
        .attr("class", "jointProbText")
        .attr("transform", "translate(65)")
        ;

        
    // Label the links with the "Given" values
    // For example: B|A (B given A)
    var gGiven = nodeEnter.filter(function (d) {
        if (d.depth != 0) {
            return true;
        } else {
            return false;
        }
    })
        .append("g")

        .attr("transform", "translate(-230)")

    gGiven.append("text")
        .attr("class", "branchText")
        .text(function (d) {
            if (d.givenName) {
                // console.log(d.givenName)
                return d.givenName
            } else {
                return "";
            }
        });

    // Label the Links;
    gGiven.append("text")
        .attr("class", "probabilityText")
        .attr("id", "condProbText")
        .text(function (d) {
            if (d.given) {
                // console.log(d.given)
                return d.given;
            } else {
                return "";
            }
        })
        .attr("y", "20");
    
    
    // hide probabilities check box
    d3.select("#hideProbCheckBox").on("change", update);
    checkBoxListen();
    function checkBoxListen(){
        if (d3.select("#hideProbCheckBox").property("checked")) {
            hideProbabilities();
        } else {
            showProbabilities();
        }
    }

    function hideProbabilities() {
        d3.selectAll('.branchText')
            .attr("opacity", 0)
        d3.selectAll('.probabilityText')
            .attr("opacity", 0)
        d3.selectAll('.jointProbText')
            .attr("opacity", 0)
        
    }

    function showProbabilities() {
        d3.selectAll('.branchText')
            .attr("opacity", 100)
        d3.selectAll('.probabilityText')
            .attr("opacity", 100)
        d3.selectAll('.jointProbText')
            .attr("opacity", 100)
    }
    //============================================================
    // UPDATE TREE AFTER USER INPUT CHANGE
    //============================================================
    
    function higherExpVal() {
        var treatExpVal = root.children[0].value
        var noTreatExpVal = root.children[1].value
        if (treatExpVal > noTreatExpVal) {
            return "Treat"
        }
        if (treatExpVal < noTreatExpVal) {
            return "NoTreat"
        }
        return "Equal"
    }
    
    function colorHigherExpVal() {
        var higherEV = higherExpVal(root)
        var treatExpVal = root.children[0].value
        var noTreatExpVal = root.children[1].value

        if (higherEV == "Treat") {
            return blueColor(treatExpVal);
        }
        if (higherEV == "NoTreat") {
            return orangeColor(noTreatExpVal)
        }
        return baseStrokeColor
    }

    // update conditional probabilities
    d3.selectAll(".condProbText")
    .text(function (d) {
        if (d.given) {
            return d.given;
        } else {
            return "";
        }
    })

    // update joint probabilities
    d3.selectAll("#jointProb")
        .text(function (d) {
            if (d.probability) {
                return d.probability

            } else { return "" }
        })

    // update exp values
    d3.selectAll(".expValue")
        .text(function (d) {
            if (d.value) {
                return d.value

            } else { return "" }
        })


    // update nodes stroke and root text    
    d3.selectAll("rect")
        .style("stroke", function(d) {
            if (d == root) {
                return colorHigherExpVal()
            } else {
                if (d.parentTree == "Treat") {
                    return blueColor(d.value)
                }
                return orangeColor(d.value)
            }
        })
        .attr("fill", function(d) {
            if (d == root) {
                var higherEV = higherExpVal()
                if (higherEV == "Treat") {
                    return baseBlue;
                }
                if (higherEV == "NoTreat") {
                    return baseOrange
                }
                return "white"
            }
            
            if (d.parentTree == "Treat") {
                return baseBlue;
            }
            return baseOrange;
            
        })
        

    // update link colors
    d3.selectAll(".link")
        .attr("stroke", function (d) {
            if (d.source == root) {
                var treatExpVal = root.children[0].value
                var noTreatExpVal = root.children[1].value
                // treat tree
                if (d.target.parentTree == "Treat") {
                    // treat EV is higher
                    if (treatExpVal >= noTreatExpVal) {
                        return blueColor(treatExpVal);
                    }
                    return "white" // hide link
                }
                // no treat tree
                 // treat tree
                 if (d.target.parentTree == "NoTreat") {
                    // no treat EV is higher
                    if (noTreatExpVal >= treatExpVal) {
                        return orangeColor(noTreatExpVal);
                    }
                    return "white" // hide link
                }

            } 
            var scale = d.target.given * d.target.value
            if (d.target.parentTree == "Treat") {
                return blueColor(scale);
            }
            return orangeColor(scale);
        });

    d3.select("#rootResultsDecision")
        .text(function (d) {
            if (d == root) {
                var treatExpVal = d.children[0].value
                var noTreatExpVal = d.children[1].value
                if (treatExpVal > noTreatExpVal) {
                    return "Treatment > No Treatment "
                }
                if (treatExpVal < noTreatExpVal) {
                    return "No Treatment > Treatment "
                }
                return "Equal Expected Return"
            }
        })
        .attr("font-weight", 900)

    d3.select("#rootDiffText")
        .text(function (d) {
            if (d.children[0].value == d.children[1].value) {
                return ""
            }
            var diff = Math.abs(d.children[0].value -  d.children[1].value).toFixed(2);
            return "Difference = " + diff
        })
        .attr("x", -60)
        .attr("y", -25)


    d3.select("#rootContribCureSymp")
        .text(function (d) {
            if (d.children[0].value == d.children[1].value) {
                return ""
            }
            var cure_symptoms_value = d3.select("#cureSymptoms").property("value");
            cure_symptoms_value = Number(cure_symptoms_value).toFixed(2);
            var higherEVBranch = higherExpVal()
            if (higherEVBranch == "Treat") {
                var jointProb = (treatCure.given * treatCureSymptoms.given).toFixed(2);
                var contribution = (jointProb * cure_symptoms_value).toFixed(2)
                return "Cure and Symptoms = " + contribution
            }
            var jointProb = (notTreatCure.given * notTreatCureSymptoms.given).toFixed(2)
            var contribution = (jointProb * cure_symptoms_value).toFixed(2)
            return "Cure and Symptoms = " + contribution
        })
        .attr("x", -60)
        .attr("y", -5)

    d3.select("#rootContribCureNoSymp")
        .text(function (d) {
            if (d.children[0].value == d.children[1].value) {
                return ""
            }
            var cure_no_symptoms_val = d3.select("#cureNoSymptoms").property("value");
            cure_no_symptoms_val = Number(cure_no_symptoms_val).toFixed(2);
            var higherEVBranch = higherExpVal()
            if (higherEVBranch == "Treat") {
                var jointProb = (treatCure.given * treatCureNotSymptoms.given).toFixed(2);
                var contribution = (jointProb * cure_no_symptoms_val).toFixed(2);
                return "Cure and No Symptoms = " + contribution
            }
            var jointProb = (notTreatCure.given * notTreatCureNotSymptoms.given).toFixed(2)
            var contribution = (jointProb * cure_no_symptoms_val).toFixed(2)
            return "Cure and No Symptoms = " + contribution
        })
        .attr("x", -60)
        .attr("y", 15)
    
    d3.select("#rootContribNoCureSymp")
        .text(function (d) {
            if (d.children[0].value == d.children[1].value) {
                return ""
            }
            var no_cure_symptoms_val = d3.select("#noCureSymptoms").property("value");
            no_cure_symptoms_val = Number(no_cure_symptoms_val).toFixed(2);
            var higherEVBranch = higherExpVal()
            if (higherEVBranch == "Treat") {
                var jointProb = (treatNotCure.given * treatNotCureSymptoms.given).toFixed(2);
                var contribution = (jointProb * no_cure_symptoms_val).toFixed(2);
                return "No Cure and Symptoms = " + contribution
            }
            var jointProb = (notTreatNotCure.given * notTreatNotCureSymptoms.given).toFixed(2)
            var contribution = (jointProb * no_cure_symptoms_val).toFixed(2)
            return "No Cure and Symptoms = " + contribution
        })
        .attr("x", -60)
        .attr("y", 35)

    d3.select("#rootContribNoCureNoSymp")
        .text(function (d) {
            if (d.children[0].value == d.children[1].value) {
                return ""
            }
            var no_cure_no_symptoms_val = d3.select("#noCureNoSymptoms").property("value");
            no_cure_no_symptoms_val = Number(no_cure_no_symptoms_val).toFixed(2);
            var higherEVBranch = higherExpVal()
            if (higherEVBranch == "Treat") {
                var jointProb = (treatNotCure.given * treatNotCureNotSymptoms.given).toFixed(2);
                var contribution = (jointProb * no_cure_no_symptoms_val).toFixed(2);
                return "No Cure and No Symptoms = " + contribution
            }
            var jointProb = (notTreatNotCure.given * notTreatNotCureNotSymptoms.given).toFixed(2)
            var contribution = (jointProb * no_cure_no_symptoms_val).toFixed(2)
            return "No Cure and No Symptoms = " + contribution
        })
        .attr("x", -60)
        .attr("y", 55)


   	
}