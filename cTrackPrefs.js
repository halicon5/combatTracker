var sCalcPrefs = function(storageName) {
    this.storageName = storageName;
    this.spellKeys = {};
    this.savePossible = true;
    this.saveCount = 0;
    this.initialize();

    if (!this.spellKeys["globalVar"]) {
        this.spellKeys["globalVar"] = {};
    }
};

    sCalcPrefs.prototype.initialize = function() {
        this.loadData();
    }

    sCalcPrefs.prototype.saveData = function() {
        if (this.savePossible) {
            if(this.savePossible && JSON && localStorage) {
                localStorage.setItem(this.storageName,JSON.stringify(this.spellKeys));
                console.log("sCalcPrefs.prototype.saveData = function(" + this.storageName + ") = SAVE SUCCESSFUL");
            }
            else {
                this.savePossible = false
                alert("[ERROR] (sCalcPrefs.prototype.saveData not possible. LocalStorage or JSON not available.");
                console.log("sCalcPrefs.prototype.saveData = function(" + this.storageName + ") = SAVE NOT POSSIBLE");
            }
        }
        this.saveCount++;
    }

    sCalcPrefs.prototype.loadData = function() {
        if(this.savePossible && JSON && localStorage) {
            if( localStorage.getItem(this.storageName) ) {
                this.spellKeys = JSON.parse( localStorage.getItem(this.storageName) );
                console.log("sCalcPrefs.prototype.loadData = function() = LOAD SUCCESSFUL");
            }
        }
        else {
            alert("ERROR sCalcPrefs.prototype.loadManagerData: JSON or localStorage is not available.");
            console.log("sCalcPrefs.prototype.loadData = function() = LOAD FAILED");
        }
    }