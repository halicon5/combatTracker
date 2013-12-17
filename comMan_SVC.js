cTrack.comManSVC = function(aComManDAT, aDispBoxId) {
	this.d = aComManDAT;
	this.UI = new cTrack.comManUI (this, aDispBoxId);

	this.engagements = {}; // svc objects only
	this.actorTemplates = {}; // svc object only

	this.jsCLASSNAME = "cTrack.comManSVC";
}


	cTrack.comManSVC.prototype.addNewEngagement = function (engName) {
		if (!engName) {
			return "Engagement name required.";
		}
		if (this.d.engagements[engName]) {
			return "Engagement with that name already exists.";
		}

		var newEng = new cTrack.engagementDAT(engName);
		var newEngSVC = new cTrack.engagementSVC(newEng, engName);

		this.d.engagements[engName] = newEng;
		this.engagements[engName] = newEngSVC;
	}