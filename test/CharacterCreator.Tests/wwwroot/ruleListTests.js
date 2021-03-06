﻿QUnit.module("RuleList", {
    beforeEach: function () {
        this.app = {};
        this.localStorage = {};
        this.location = {};
        CharacterCreator.call(this.app, $, this.localStorage, this.location);
    }
});
QUnit.test("Creation", function () {
    //Setup
    var ruleList1 = new this.app.RuleList();
    var ruleList2 = new this.app.RuleList({ Selector1: { Property1: "Value1", Property2: "Value2" }, Selector2: { Property3: "Value3" } })

    //Test
    QUnit.assert.equal(ruleList1.Rules.length, 0, "should pupulate the selector");
    QUnit.assert.equal(ruleList2.Rules.length, 2, "should accept an object constructor");

    //Cleanup
});

QUnit.test("Add Rules", function () {
    //Initialize
    var ruleList1 = new this.app.RuleList();
    var ruleList2 = new this.app.RuleList();
    var ruleList3 = new this.app.RuleList();
    var rule1 = new this.app.Rule("hi");
    var rule2 = new this.app.Rule("hello");
    var invalidRule = {
        rabble: "rabble"
    };

    ruleList1.addRule();
    ruleList2.addRule(invalidRule);
    ruleList3.addRule(rule1);
    ruleList3.addRule(rule2);

    //Test
    QUnit.assert.equal(ruleList1.Rules.length, 0, "should not add undefined rule");
    QUnit.assert.equal(ruleList2.Rules.length, 0, "should not add invalid rule");
    QUnit.assert.equal(ruleList3.Rules[0], rule1, "should add valid rule");
    QUnit.assert.equal(ruleList3.Rules[1], rule2, "should add valid rule");

    //Cleanup
});

QUnit.test("Clear Rules", function () {
    //Setup
    var ruleList = new this.app.RuleList();
    var rule = new this.app.Rule("hi");

    ruleList.addRule(rule);
    ruleList.clear();

    //Test
    QUnit.assert.equal(ruleList.Rules.length, 0, "should clear the rule list");

    //Cleanup
});

QUnit.test("Submit Rules", function () {
    //Setup
    var ruleList = new this.app.RuleList({ Selector1: { Property1: "Value1", Property2: "Value2" }, Selector2: { Property3: "Value3" } });

    var sentData = {}
    $.ajax = function (options) {
        sentData = options.data;
    };

    ruleList.submit();

    //Test
    QUnit.assert.equal(sentData, "{\"Rules\":[{\"Selector\":\"Selector1\",\"Styles\":[{\"Property\":\"Property1\",\"Value\":\"Value1\"},{\"Property\":\"Property2\",\"Value\":\"Value2\"}]},{\"Selector\":\"Selector2\",\"Styles\":[{\"Property\":\"Property3\",\"Value\":\"Value3\"}]}]}", "should match expected sent data");

    //Cleanup
});