var logger = function(debugBox, frequency) {
	this.debugBox = debugBox;
	this.stopBtn = undefined;
	this.output = undefined;
	this.frequency = frequency;
	this.currentIndent = 0;
	this.refreshes = 0;
	this.logCalls = 0;
	this.traceLog = "";
	this.intervalId = undefined;
	this.maxIndent = 100;
	this.initialize();

}

	logger.prototype.initialize = function() {
		if (this.debugBox && this.debugBox.appendChild && this.frequency > 100) {
			this.output = createSuperElement("div");
			this.stopBtn = createSuperElement("input",["value","Stop logger"],["type","button"], ["onclick","this.SCobj.stopUpdate();"]);
			this.stopBtn.SCobj =  this;
			appendChildren(this.debugBox, this.stopBtn, this.output);
			var self = this;
			this.intervalId = setInterval( function() {self.updateDisplay();}, this.frequency );
		}
	}

	logger.prototype.updateDisplay = function() {
		this.output.innerHTML = this.traceLog;
		this.refreshes++;
		this.stopBtn.value = ("Stop Logger: "+this.refreshes);
	}

	logger.prototype.stopUpdate = function() {
		clearInterval(this.intervalId);
	}

	logger.prototype.log = function(msg,indent) {
		if (!isNaN(indent)) {
			indent = parseInt(indent,10);
		} else {
			indent = 0;
		}
		this.logCalls++;
		var bracket = "";
		if (indent > 0) {
			bracket = String.fromCharCode(9598) + String.fromCharCode(9583) + " ";
		} else if (indent < 0 ) {
			bracket = String.fromCharCode(9598) + String.fromCharCode(9582) + " ";
		} else {
			bracket = " " + String.fromCharCode(9500) + " ";
		}

		if (indent < 0) {
			this.currentIndent += indent;
		}
		var line = this.createPadding(indent) + bracket + this.logCalls.toString() + ": " + msg + "\n";
		if (indent > 0) {
			this.currentIndent += indent;
		}

		if (this.currentIndent > this.maxIndent) {
			alert("really, we have a problem. Aborting");
			AbortJavaScript();
		}

		this.traceLog = line + this.traceLog;
	}

	logger.prototype.createPadding = function(indent) {
		var pad = "";
		var offset = 0;
		if (indent == 0) {
			var offset = -1;
		}
		for (var i = 0; i < this.currentIndent + offset; i++) {
			pad = pad + "..";
		}
		return pad;
	}
	
	logger.prototype.clearLog = function() {
		this.traceLog = "";
	}