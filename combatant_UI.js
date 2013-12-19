cTrack.combatantUI = function(params) {
	// aUI, aManager, targ, data, svc

	this.UI = params.UI; // top level UI
	this.dispBox = params.targ; // a div style node 
	this.Manager = params.Manager // the top level svc object
	this.data = params.data;	// current object level data
	this.svc = params.svc;		// current object level svc

	this.elements = {};

	this.jsCLASSNAME = "cTrack.combatantUI";

	this.initialize();
}

	cTrack.combatantUI.prototype.initialize = function() {

	}

	// returns an object with a list of form field inputs.
	cTrack.combatantUI.createNewCombatantFormENG = function(targ, contextUI, contextFunc) {
		var d = createSuperElement("div", ["class","summaryAddCombForm"]);
		var formFields = {};

		var table = createSuperElement("table", ["class","newCombatantForm"]);

		var r1 = createSuperElement("tr");
		var lblCombName = createSuperElement("td", ["innerHTML","Name:"]);
		var tdCombName = createSuperElement("td");
		formFields.inpCombName = createSuperElement("input");
		appendChildren(tdCombName, formFields.inpCombName);

		var lblFactionName = createSuperElement("td", ["innerHTML","Faction:"]);
		var tdFactionName = createSuperElement("td");
		formFields.inpFactionName = createSuperElement("input");
		appendChildren(tdFactionName, formFields.inpFactionName);

		var r2 = createSuperElement("tr");
		var lblInitiative = createSuperElement("td", ["innerHTML","Starting Initiative:"]);
		var tdInitiative = createSuperElement("td");
		formFields.inpInitiative = createSuperElement("input", ["size",3], ["maxlength",3], ["value","0"]);
		appendChildren(tdInitiative, formFields.inpInitiative);

		var lblReaSpeed = createSuperElement("td", ["innerHTML","R. Speed:"]);
		var tdReaSpeed = createSuperElement("td");
		formFields.inpReaSpeed = createSuperElement("input", ["size",1], ["maxlength",2], ["value",5]);
		appendChildren(tdReaSpeed, formFields.inpReaSpeed);

		var r3 = createSuperElement("tr");
		var lblHPType = createSuperElement("td", ["innerHTML","HP Type (S/G):"]);
		var tdHPType = createSuperElement("td");
		formFields.inpHPType = createSuperElement("input", ["size",1], ["maxlength",1], ["value","S"]);
		appendChildren(tdHPType, formFields.inpHPType);

		var lblMaxHP = createSuperElement("td", ["innerHTML","Max HP:"]);
		var tdMaxHP = createSuperElement("td");
		formFields.inpMaxHP = createSuperElement("input", ["size",3], ["maxlength",4], ["value",40], ["onchange", "this.formFields.inpMaxBP.value = Math.floor(this.value/2); this.formFields.inpMaxWP.value = Math.ceil(this.value/2);"]);
		formFields.inpMaxHP.formFields = formFields;
		appendChildren(tdMaxHP, formFields.inpMaxHP);

		var r4 = createSuperElement("tr");
//		var lblMaxBP = createSuperElement("td", ["innerHTML","Max BP:"]);
		var tdMaxBP = createSuperElement("td", ["innerHTML", "Max BP:"]);
		formFields.inpMaxBP = createSuperElement("input", ["size",3], ["maxlength",4], ["value",0]);
		appendChildren(tdMaxBP, formFields.inpMaxBP);

//		var lblMaxWP = createSuperElement("td", ["innerHTML","Max WP:"]);
		var tdMaxWP = createSuperElement("td", ["innerHTML","Max WP:"]);
		formFields.inpMaxWP = createSuperElement("input", ["size",3], ["maxlength",4], ["value",0]);
		appendChildren(tdMaxWP, formFields.inpMaxWP);

//		var lblMaxSTAM = createSuperElement("td", ["innerHTML","Max STAM:"]);
		var tdMaxSTAM = createSuperElement("td", ["innerHTML","Max STAM:"]);
		formFields.inpMaxSTAM = createSuperElement("input", ["size",3], ["maxlength",4], ["value",40]);
		appendChildren(tdMaxSTAM, formFields.inpMaxSTAM);

		var tdBaseDR = createSuperElement("td", ["innerHTML","Base DR:"]);
		formFields.inpBaseDR = createSuperElement("input", ["size",3], ["maxlength",4], ["value",50]);
		appendChildren(tdBaseDR, formFields.inpBaseDR);

		formFields.btnAddComb = createSuperElement("input", ["type","button"], ["onclick","this.SCobj."+contextFunc+";" ], ["value","Add Combatant"]);
		formFields.btnAddComb.SCobj = contextUI;

		appendChildren(targ,d);
		appendChildren(d, table);
		appendChildren(table, r1, r2, r3, r4);
		appendChildren(r1, lblCombName, tdCombName, 	lblFactionName, tdFactionName);
		appendChildren(r2, lblInitiative, tdInitiative,	lblReaSpeed, tdReaSpeed);
		appendChildren(r3, lblHPType, tdHPType, lblMaxHP, tdMaxHP);
		appendChildren(r4, tdMaxBP, tdMaxWP, tdMaxSTAM, tdBaseDR);

		appendChildren(d,formFields.btnAddComb);

		return formFields;
	}


