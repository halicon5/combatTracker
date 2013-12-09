var sCalc = function(targ, sCalcId, defv, f, c, r, tovr, tovrCalc, userPrefs, horiz, logger) {
	this.displayBox = document.getElementById(targ);
	this.sCalcId = sCalcId;
	this.elems = {};

	this.layout = (horiz !== "horiz") ? "vert" : "horiz";

	this.defVariables = defv;
	this.templateVarOverrides = tovr;
	this.formStruc = f;
	this.calculator = c;
	this.templateCalcOverride = tovrCalc;
	this.report = r;

	this.reportFields = {};

	if ( userPrefs && userPrefs.saveData) {
		this.userPrefs = userPrefs;
	} else {
		this.userPrefs = new sCalcPrefs("spellCalcDefault");
	}
	this.logger = logger;
	this.initialize();

}
	

	sCalc.prototype.initialize = function() {
		this.log("CALL sCalc.prototype.initialize = function()");
		if (this.defVariables) {
			this.v = JSON.parse(this.defVariables);
		} else {
			this.v = {};
		}
		this.f = JSON.parse(this.formStruc);
		this.r = JSON.parse(this.report);

		if (this.templateVarOverrides) {
			this.tovr = JSON.parse(this.templateVarOverrides);
		} else {
			this.tovr = {};
		}
		this.templateOveride();
		this.setLayout();
		this.buildForm();
		this.buildReport();
		this.update();
		this.log("FINISH sCalc.prototype.initialize = function()");
	}

	sCalc.prototype.templateOveride = function() {
		if (usefulTypeOf(this.tovr) === "[object Object]") {
			for (var key in this.tovr) {
				this.v[key] = this.tovr[key];
			}
		}
	}

	sCalc.prototype.setLayout = function() {
		var layoutTable = createSuperElement("table", ["class","spellCalcFormReport"]);
		if (this.layout === "horiz") {
			var tr = createSuperElement("tr");
			var formTD = createSuperElement("td");
			var repTD = createSuperElement("td");
			appendChildren(this.displayBox, layoutTable);
			appendChildren(layoutTable, tr);
			appendChildren(tr,formTD,repTD);
			this.elems.formTD= formTD;
			this.elems.repTD=repTD;
		} else {
			var tr1 = createSuperElement("tr");
			var tr2 = createSuperElement("tr");
			var formTD = createSuperElement("td");
			var repTD = createSuperElement("td");
			appendChildren(this.displayBox, layoutTable);
			appendChildren(layoutTable, tr1, tr2);
			appendChildren(tr1,formTD);
			appendChildren(tr2,formTD);
			this.elems.formTD= formTD;
			this.elems.repTD=repTD;			
		}
	}

	sCalc.prototype.update = function(inputObj) {
		this.log ("CALL sCalc.prototype.update = function(inputObj, inpDef)");
		if (inputObj) {
			if (inputObj.inpDef && inputObj.inpDef.inpType === "text") {
				this.v[inputObj.inpDef.map] = inputObj.value;
			} else {
				if ( isNaN(inputObj.value) ) {
					inputObj.value = this.v[inputObj.inpDef.map];
				}
				else {
					this.v[inputObj.inpDef.map] = parseInt(inputObj.value,10);
				}
			}
		}
		this.calculate();
		this.updateReport();
		this.log("FINISH sCalc.prototype.update = function(inputObj, inpDef)");
	}

	sCalc.prototype.updateUserPrefs = function(inpObj, inpDef) {
		this.log ("CALL sCalc.prototype.updateUserPrefs = function(inpObj, inpDef)");

		if (inpDef.map) {
			if (inpDef.map.substring(0,6) === "global" ) {
				this.userPrefs.spellKeys["globalVar"][inpDef.map] = this.v[inpDef.map];
			} else if (this.userPrefs.spellKeys[this.sCalcId] && usefulTypeOf(this.userPrefs.spellKeys[this.sCalcId]) === "[object Object]") {
				this.userPrefs.spellKeys[this.sCalcId][inpDef.map] = this.v[inpDef.map];
			} else {
				this.userPrefs.spellKeys[this.sCalcId] = {};
				this.userPrefs.spellKeys[this.sCalcId][inpDef.map] = this.v[inpDef.map];
			}
			this.userPrefs.saveData();
		}

		this.log("FINISH sCalc.prototype.updateUserPrefs = function(inpObj, inpDef)");
	}

	sCalc.prototype.updateReport = function(inputObj) {
		for (var k in this.reportFields) {
			this.reportFields[k].innerHTML = this.v[k];
		}
	}

	sCalc.prototype.calculate = function() {
		this.log("CALL sCalc.prototype.calculate = function() ");
		if (this.v.OVERRIDETEMPLATE && this.templateCalcOverride) {
			// run the local spell override only
			try {
				eval ("var v = this.v; " + this.templateCalcOverride);
			} 
			catch (exception) {
				alert(exception + ": " + "var v = this.v; " + this.templateCalcOverride);
			}			
		} else {
			// run the template
			if (this.calculator) {
				try {
					eval ("var v = this.v; " + this.calculator);
				} 
				catch (exception) {
					alert(exception + ": " + "var v = this.v; " + this.calculator);
				}
			}

			// run local spell calculations as supplemental calculations
			if (this.templateCalcOverride) {
				try {
					eval ("var v = this.v; " + this.templateCalcOverride);
				} 
				catch (exception) {
					alert(exception + ": " + "var v = this.v; " + this.templateCalcOverride);
				}
			}
		}

		this.log("FINISH sCalc.prototype.calculate = function() ");
	}


	sCalc.prototype.buildForm = function() {
		this.log("CALL sCalc.prototype.buildForm = function()");
		var formBox = createSuperElement("div", ["class", "spellCalcForm"]);

		appendChildren(this.elems.formTD,formBox);

		if (usefulTypeOf(this.f) === "[object Array]") {
			var formTable = createSuperElement("table", ["class", "spellCalcForm"]);
			appendChildren(formBox, formTable);
			for(var i = 0; i < this.f.length; i++) {
				this.buildFormRow(this.f[i], formTable)
			}
		}
		this.log("FINISH sCalc.prototype.buildForm = function()");
	}


	sCalc.prototype.buildFormRow = function(rdef, table) {
		this.log("CALL sCalc.prototype.buildFormRow = function(rdef, table)");
		var tr;
		var td;

		tr = createSuperElement("tr");

		if (usefulTypeOf(rdef) === "[object Array]" ) {
			for (var j = 0; j < rdef.length; j++) {
				this.buildFormCell(rdef[j], tr);
			}
		}

		appendChildren(table, tr);
		this.log("FINISH sCalc.prototype.buildFormRow = function(rdef, table)");
	}


	sCalc.prototype.buildFormCell = function(cellDef, row) {
		this.log("CALL sCalc.prototype.buildFormCell = function(cellDef, row)");
		var tdH;
		var tdI;
		var inp;

		if (usefulTypeOf(cellDef) === "[object Object]" ) {
			tdH = createSuperElement("td", ["innerHTML",cellDef.label], ["class","spellCalcHead"], ["colspan", (cellDef.hCol) ? cellDef.hCol : 1]);
			tdI = createSuperElement("td", ["colspan", (cellDef.fCol) ? cellDef.fCol : 1]);
			inp = createSuperElement("input", 
				["size", (cellDef.size) ? cellDef.size : 2 ],
				["maxlength", (cellDef.maxlength) ? cellDef.maxlength : 4], 
				["value", (this.v[cellDef.map]) ? this.v[cellDef.map] : 0 ],
				["onchange", "this.SCobj.update(this); this.SCobj.updateUserPrefs(this, inpDef);"]);
			inp.inpDef = cellDef;
			inp.SCobj = this;
			appendChildren(tdI,inp);

			appendChildren(row, tdH,tdI);

			this.setUserDefault( inp );
		}
		this.log("FINISH sCalc.prototype.buildFormCell = function(cellDef, row)");
	}


	sCalc.prototype.setUserDefault = function(inpObj) {
		this.log("CALL sCalc.prototype.setUserDefault = function(cellDef)");

		if (inpObj.inpDef && inpObj.inpDef.map) {
			if ( this.userPrefs.spellKeys["globalVar"][inpObj.inpDef.map] ) {
				inpObj.value = this.userPrefs.spellKeys["globalVar"][inpObj.inpDef.map];
				this.v[inpObj.inpDef.map] = this.userPrefs.spellKeys["globalVar"][inpObj.inpDef.map];
			} else if ( this.userPrefs.spellKeys[this.sCalcId] && this.userPrefs.spellKeys[this.sCalcId][inpObj.inpDef.map] ) {
				inpObj.value = this.userPrefs.spellKeys[this.sCalcId][inpObj.inpDef.map];
				this.v[inpObj.inpDef.map] = this.userPrefs.spellKeys[this.sCalcId][inpObj.inpDef.map];
			}
		}
		this.log("FINISH sCalc.prototype.setUserDefault = function(cellDef)");
	}



	sCalc.prototype.buildReport = function() {
		this.log("CALL sCalc.prototype.buildReport = function()");
		var repBox = createSuperElement("div", ["class", "spellCalcRep"]);

		appendChildren(this.elems.repTD,repBox);

		if (usefulTypeOf(this.r) === "[object Array]") {
			var repTable = createSuperElement("table", ["class", "spellCalcRep"]);
			appendChildren(repBox, repTable);
			for(var i = 0; i < this.r.length; i++) {
				this.buildReportRow(this.r[i], repTable);
			}
		}		
		this.log("FINISH sCalc.prototype.buildReport = function()");
	}

	sCalc.prototype.buildReportRow = function(rdef, table) {
		this.log("CALL sCalc.prototype.buildReportRow = function(rdef, table)");
		var tr;
		var td;

		tr = createSuperElement("tr");

		if (usefulTypeOf(rdef) === "[object Array]" ) {
			for (var j = 0; j < rdef.length; j++) {
				this.buildReportCell(rdef[j], tr);
			}
		}

		appendChildren(table, tr);
		this.log("FINISH sCalc.prototype.buildReportRow = function(rdef, table)");
	}

	sCalc.prototype.buildReportCell = function(cellDef, row) {
		this.log("CALL sCalc.prototype.buildReportCell = function(cellDef, row)");
		var cell;
		if (usefulTypeOf(cellDef) === "[object String]") {
			if (cellDef.charAt(0) === "$") {
				cell = createSuperElement("td");
				appendChildren(cell,this.buildReportDynamicSpan(cellDef));
			} else {
				cell = createSuperElement("td", ["class", "spellCalcRep"], ["innerHTML",cellDef]);
			}
		} 
		else if (usefulTypeOf(cellDef) === "[object Object]") {
			if (cellDef.text && usefulTypeOf(cellDef.text) === "[object String]") {
				if (cellDef.text.charAt(0) === "$") {
					cell = createSuperElement("td", ["class", "spellCalcRep" + cellDef["class"] ],
						["colspan", (cellDef.cols) ? cellDef.cols : 1] );
					appendChildren(cell,this.buildReportDynamicSpan(cellDef.text));
				} else {
				cell = createSuperElement("td", 
						["class", "spellCalcRep" + cellDef["class"] ],
						["colspan", (cellDef.cols) ? cellDef.cols : 1],
						["innerHTML", cellDef.text]);
				}
			}
			else if (cellDef.text && usefulTypeOf(cellDef.text) === "[object Array]") {
				cell = createSuperElement("td",["class", "spellCalcRep" + cellDef["class"] ], ["colspan", (cellDef.cols) ? cellDef.cols : 1] );
				this.concatDynamicSpans(cellDef.text,cell);
			}
		}


		if (!cell) {
			cell = createSuperElement("td",["innerHTML",usefulTypeOf(cellDef)] );
		}
		appendChildren(row, cell);

		this.log("FINISH sCalc.prototype.buildReportCell = function(cellDef, row)");
	}

	sCalc.prototype.buildReportDynamicSpan = function(varName) {
		this.log("CALL sCalc.prototype.buildReportDynamicSpan = function(" + varName + ")");
		var fieldName = varName.substring(1,varName.length);
		this.reportFields[fieldName] = createSuperElement("span", ["innerHTML", this.v[fieldName] ]);
		this.log("FINISH sCalc.prototype.buildReportDynamicSpan = function(" + fieldName + ")");
		return this.reportFields[fieldName];
	}

	sCalc.prototype.concatDynamicSpans = function(textDef, cell) {
		this.log("CALL sCalc.prototype.concatDynamicSpans = function(textDef, cell)");
		if (usefulTypeOf(textDef) === "[object Array]") {
			for (var i = 0; i < textDef.length; i++) {
				if (textDef[i].charAt(0) === "$") {
					appendChildren(cell,this.buildReportDynamicSpan(textDef[i]));
				}
				else {
					appendChildren(cell, createSuperElement("span", ["innerHTML", textDef[i] ] ) );
				}
			}
		}
		this.log("FINISH sCalc.prototype.concatDynamicSpans = function(textDef, cell)");
	}

	sCalc.prototype.calc_adjust = function(rank, limit) {
		this.log("CALL sCalc.prototype.calc_adjust = function(rank, limit)");

		limit = (isNaN(limit)) ? 100 : parseInt(limit);
		var adj = 0;
		if (!isNaN(rank)) {
			if ( rank > 10) {
				adj = (parseInt(rank) - 10) * 2;
				adj = (adj > limit) ? limit : adj;
				return adj;
			} else {
				for (var i = rank - 10; i < 0; i++) {
					adj = adj + i;
				}
				return adj;
			}
		} else {
			return 0;
		}
	}


	sCalc.prototype.log = function(msg) {
		if (this.logger && this.logger.log) {
			this.logger.log(msg);
		}
	}

	sCalc.prototype.clearLog = function() {
		this.traceLog = "";
	}
	
	sCalc.prototype.eval = function(cmd) {
		this.log(cmd);
		try {
			eval(cmd);
		} 
		catch (exception) {
			this.log(exception);
		}
	}
	




	

	/*
	Service cleanup functions
	*/
	sCalc.prototype.destroy = function() {
		if (sCalc.debug) sCalc.log("[DESTROY]" + this.jsCLASSNAME + " " + this.jsOBJNAME);
		this.destroyFlag = 1;
		for (var svc in this) {
			if (this[svc].destroy && typeof this[svc].destroy == "function" && !this[svc].destroyFlag) {
				this[svc].destroy();
				delete this[svc];
			}
		}	
	}

	sCalc.prototype.extend = function(child, parent) {
		var f = function() {};
		f.prototype = parent.prototype
		child.prototype = new f();
	}

	sCalc.prototype.shallowMerge = function(p, c) {
		if (typeof c === "object") {
			for (var i in p) {
				if (typeof p[i] !== "object") {
					c[i] = p[i];
				}
			}
		}
	}

	sCalc.prototype.deepCopy = function(p, c) {
		var c = c || {};
		for (var i in p) {
			if (p[i] === null) {
				c[i] = p[i];
			}
			else if (typeof p[i] === 'object') {
				c[i] = (p[i].constructor === Array) ? [] : {}; // array or object
				sCalc.deepCopy(p[i], c[i]);
			} else {
				c[i] = p[i];
			}
		}
		return c;
	}
	
	
	
function addSlashes(str) {
str=str.replace(/\\/g,'\\\\');
str=str.replace(/\'/g,'\\\'');
str=str.replace(/\"/g,'\\"');
str=str.replace(/\0/g,'\\0');
return str;
}
function stripSlashes(str) {
str=str.replace(/\\'/g,'\'');
str=str.replace(/\\"/g,'"');
str=str.replace(/\\0/g,'\0');
str=str.replace(/\\\\/g,'\\');
return str;
}	
function trim(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}
function ltrim(stringToTrim) {
	return stringToTrim.replace(/^\s+/,"");
}
function rtrim(stringToTrim) {
	return stringToTrim.replace(/\s+$/,"");
}

function appendChildren() {
	if (arguments[0] && arguments[0].appendChild) {
		var n = undefined;
		for (i = 1; i < arguments.length; i++) {
			if (arguments[i] === "\n") {
				n = document.createElement("br");
				arguments[0].appendChild(n);
				n = undefined;
			}
			else if (typeof arguments[i] == "string" || typeof arguments[i] == "number") {
				n = document.createTextNode(arguments[i]);
				arguments[0].appendChild(n);
				n = undefined;
			} else {
				arguments[0].appendChild(arguments[i]);
			}
		}
	}
}

function createSuperElement () {
	if (typeof arguments[0] === "string") {
		var el = document.createElement(arguments[0]);
		for (var i = 1; i < arguments.length; i++) {
			if (arguments[i].constructor == Array && arguments[i].length > 1) {
				if (arguments[i][0] == "innerHTML") {
					el.innerHTML = arguments[i][1];
				}
				else {
					el.setAttribute(arguments[i][0], arguments[i][1]);				
				}
			}
		}
		return el;
	}
}

function usefulTypeOf (obj) {
	return Object.prototype.toString.call(obj);
}