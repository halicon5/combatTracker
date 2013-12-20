// holds generic validation functions for checking user input.

cTrack.validate = {};

cTrack.validate.newCombatantForm = function (formFields) {
	formFields.inpCombName.value = trim(formFields.inpCombName.value);
	var passflag = true;
	if (trim(formFields.inpCombName.value) == "") {
		alert("A combatant name is required.");
		passflag = false;
	}

	if (!isNaN(formFields.inpInitiative.value) ) {
		formFields.inpInitiative.value = parseInt(formFields.inpInitiative.value,10);
	} else {
		formFields.inpInitiative.value = 0;
	}

	if (!isNaN(formFields.inpReaSpeed.value) ) {
		formFields.inpReaSpeed.value = parseInt(formFields.inpReaSpeed.value,10);
		if (formFields.inpReaSpeed.value < 1) {
			formFields.inpReaSpeed.value = 1;
		}
	} else {
		formFields.inpReaSpeed.value = 5;
	}

	formFields.inpHPType.value = formFields.inpHPType.value.toUpperCase();
	if (formFields.inpHPType.value !== "S" && formFields.inpHPType.value !== "G") {
		formFields.inpHPType.value = "S";
	}

	if (!isNaN(formFields.inpMaxHP.value) ) {
		formFields.inpMaxHP.value = parseInt(formFields.inpMaxHP.value,10);
		if (formFields.inpMaxHP.value < 4) {
			formFields.inpMaxHP.value = 4;
		}
	} else {
		formFields.inpMaxHP.value = 40;
	}

	if (!isNaN(formFields.inpMaxBP.value) ) {
		formFields.inpMaxBP.value = parseInt(formFields.inpMaxBP.value,10);
		if (formFields.inpMaxBP.value < 2) {
			formFields.inpMaxBP.value = 2;
		}
	} else {
		formFields.inpMaxBP.value = Math.floor(formFields.inpMaxHP.value);
	}

	if (!isNaN(formFields.inpMaxWP.value) ) {
		formFields.inpMaxWP.value = parseInt(formFields.inpMaxWP.value,10);
		if (formFields.inpMaxWP.value < 2) {
			formFields.inpMaxWP.value = 2;
		}
	} else {
		formFields.inpMaxWP.value = Math.ceil(formFields.inpMaxHP.value);
	}

	if (!isNaN(formFields.inpMaxSTAM.value) ) {
		formFields.inpMaxSTAM.value = parseInt(formFields.inpMaxSTAM.value,10);
		if (formFields.inpMaxSTAM.value < 1) {
			formFields.inpMaxSTAM.value = 1;
		}
	} else {
		formFields.inpMaxSTAM.value = 40;
	}

	if (!isNaN(formFields.inpBaseDR.value) ) {
		formFields.inpBaseDR.value = parseInt(formFields.inpBaseDR.value,10);
		if (formFields.inpBaseDR.value < 0) {
			formFields.inpBaseDR.value = 0;
		}
	} else {
		formFields.inpBaseDR.value = 50;
	}

	return passflag;
}