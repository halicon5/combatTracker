var logger = function() {
	this.logCalls = 0;
	this.traceLog = "";

}

	logger.prototype.log = function(msg) {
		this.logCalls++;
		this.traceLog = this.logCalls.toString() + ": " + msg + "\n" + this.traceLog;
	}
	
	logger.prototype.clearLog = function() {
		this.traceLog = "";
	}