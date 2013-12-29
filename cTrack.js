var cTrack = function(targ, params, userPrefs) {
	if (!params) {
		var params = {};
	}
	this.displayBoxId = targ;
	this.cTrackId = params.cTrackId;
	this.elems = {};
	this.mandat = new cTrack.comManDAT("v0.1");
	this.Manager = new cTrack.comManSVC(this.mandat,this.displayBoxId);
	this.UI = this.Manager.UI;

	if ( userPrefs && userPrefs.saveData) {
		this.userPrefs = userPrefs;
	} else {
//		this.userPrefs = new cTrackPrefs("combatTrackerDefault");
	}
	this.logger = logger;
	this.initialize();

}

	cTrack.cssName = "cTrack";

	cTrack.prototype.initialize = function() {
		this.log("CALL cTrack.prototype.initialize = function()");

		this.log("FINISH cTrack.prototype.initialize = function()");
	}





	cTrack.prototype.updateUserPrefs = function(inpObj, inpDef) {
		this.log ("CALL cTrack.prototype.updateUserPrefs = function(inpObj, inpDef)");

		if (inpDef.map) {
			if (inpDef.map.substring(0,6) === "global" ) {
				this.userPrefs.spellKeys["globalVar"][inpDef.map] = this.v[inpDef.map];
			} else if (this.userPrefs.spellKeys[this.cTrackId] && usefulTypeOf(this.userPrefs.spellKeys[this.cTrackId]) === "[object Object]") {
				this.userPrefs.spellKeys[this.cTrackId][inpDef.map] = this.v[inpDef.map];
			} else {
				this.userPrefs.spellKeys[this.cTrackId] = {};
				this.userPrefs.spellKeys[this.cTrackId][inpDef.map] = this.v[inpDef.map];
			}
			this.userPrefs.saveData();
		}

		this.log("FINISH cTrack.prototype.updateUserPrefs = function(inpObj, inpDef)");
	}




	cTrack.prototype.setUserDefault = function(inpObj) {
		this.log("CALL cTrack.prototype.setUserDefault = function(cellDef)");

		if (inpObj.inpDef && inpObj.inpDef.map) {
			if ( this.userPrefs.spellKeys["globalVar"][inpObj.inpDef.map] ) {
				inpObj.value = this.userPrefs.spellKeys["globalVar"][inpObj.inpDef.map];
				this.v[inpObj.inpDef.map] = this.userPrefs.spellKeys["globalVar"][inpObj.inpDef.map];
			} else if ( this.userPrefs.spellKeys[this.cTrackId] && this.userPrefs.spellKeys[this.cTrackId][inpObj.inpDef.map] ) {
				inpObj.value = this.userPrefs.spellKeys[this.cTrackId][inpObj.inpDef.map];
				this.v[inpObj.inpDef.map] = this.userPrefs.spellKeys[this.cTrackId][inpObj.inpDef.map];
			}
		}
		this.log("FINISH cTrack.prototype.setUserDefault = function(cellDef)");
	}


	cTrack.prototype.log = function(msg) {
		if (this.logger && this.logger.log) {
			this.logger.log(msg);
		}
	}

	cTrack.prototype.clearLog = function() {
		this.traceLog = "";
	}
	
	cTrack.prototype.eval = function(cmd) {
		this.log(cmd);
		try {
			eval(cmd);
		} 
		catch (exception) {
			this.log(exception);
		}
	}





	cTrack.nodeRemoveSelf = function (node ) {
		if (node && node.parentNode && node.parentNode.removeChild ) {
			node.parentNode.removeChild(node);
		}
	}

	cTrack.removeDescendents = function(node) {
		if (node && node.hasChildNodes() ) {
			while ( node.hasChildNodes() ) {
				cTrack.removeDescendents(node.firstChild);
				node.removeChild(node.firstChild);
			}
		}
	}
	
	cTrack.removeElement = function(node) {
		if (node && node.parentNode) {
		    node.parentNode.removeChild(node);
		}
	}

	/*
	Service cleanup functions
	*/
	cTrack.prototype.destroy = function() {
		if (cTrack.debug) cTrack.log("[DESTROY]" + this.jsCLASSNAME + " " + this.jsOBJNAME);
		this.destroyFlag = 1;
		for (var svc in this) {
			if (this[svc].destroy && typeof this[svc].destroy == "function" && !this[svc].destroyFlag) {
				this[svc].destroy();
				delete this[svc];
			}
		}	
	}

	cTrack.prototype.extend = function(child, parent) {
		var f = function() {};
		f.prototype = parent.prototype
		child.prototype = new f();
	}

	cTrack.prototype.shallowMerge = function(p, c) {
		if (typeof c === "object") {
			for (var i in p) {
				if (typeof p[i] !== "object") {
					c[i] = p[i];
				}
			}
		}
	}

	cTrack.prototype.deepCopy = function(p, c) {
		var c = c || {};
		for (var i in p) {
			if (p[i] === null) {
				c[i] = p[i];
			}
			else if (typeof p[i] === 'object') {
				c[i] = (p[i].constructor === Array) ? [] : {}; // array or object
				cTrack.deepCopy(p[i], c[i]);
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
	if (stringToTrim.replace) {
		return stringToTrim.replace(/^\s+|\s+$/g,"");
	} else {
		return stringToTrim;
	}
}
function ltrim(stringToTrim) {
	if (stringToTrim.replace) {
		return stringToTrim.replace(/^\s+/,"");
	} else {
		return stringToTrim;
	}
}
function rtrim(stringToTrim) {
	if (stringToTrim.replace) {
		return stringToTrim.replace(/\s+$/,"");
	} else {
		return stringToTrim;
	}
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


cTrack.updateStyleSheet = function(sheetName,ruleName, detail) {
	var sheet = undefined;
	for(var i=0; i<document.styleSheets.length; i++) {
		var sh = document.styleSheets[i];
		if(sh.title == sheetName) {
			sheet = sh;
			break;
		}
	}

	var rule = undefined;
	if (sheet && sheet.cssRules) {
		for (var i = 0; i<sheet.cssRules.length; i++) {
			if (sheet.cssRules[i].selectorText == ruleName) {
				rule = sheet.cssRules[i];
				break;
			}
		}
		if (!rule) {
			return;
		}

		if (detail) {
			for (var key in detail) {
				var stop = detail[key];
				rule.style.setProperty(key,detail[key]);
			 stop = detail[key];
			}
		}

	} else {
		return;
	}


}


/*
function changeText() {
	if(!e3_style_on) {
		rule_sheet.insertRule("p { color: red;}", 2);
	}
	e3_style_on = true;
	showRules();
}
function resetText() {
	if(e3_style_on) {
		rule_sheet.deleteRule(2);
	}
	e3_style_on = false;
	showRules();
}*/