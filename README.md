inlineSpellCalc
===============

Used to create an inline spell calculator for kantia system website.


Variables
---------

Variables are simple JSON objects, nothing more than "key":value pairs.
Global variables are used across multiple spells and are prefixed with the word "global".

Example:

		{
			"globalDisciplineRank" : 0,

			"stamMIN": 1,
			"strainBASE": 4,
			"strainEPOT": 3,
			"strainAOE": 0,
			"strainTARG": 4,
			"strainRANGE": 0,
			"strainDUR": 0,
			"diffBASE": 20,
			"diffEPOT": 20,
			"diffAOE": 0,
			"diffTARG": 10,
			"diffRANGE": 0,
			"diffDUR": 0,
			"damageDiceType": "d6",
			"totalTAV": 0,
			"totalStrain": 0,
			
			"power":0 ,
			"staging": 0,
			"damageDice": 0,
			"surge": 0,
			"drain": 0,
			
			"txtDamage": "",
			"txtStaging": "",
			"txtResist": "Some resist",
			"txtDrain": "Some drain",
			"txtSurge": "",

			"EPOT": 1,
			"targets": 1,
			"overpower": 0,
			"attribute": 10,
			"spellRank": 4,
			"disciplineRank": 4
		}

Forms
-----
Forms are defined as an Array of Arrays.  Each sub-array represents one row.
Rows are objects with the followings attributes: {"map": "variableName", "label": "Label Text"}
Optional attributes are "hCol" and "fCol" for the colspan of the header or form field. "inpType":"text" will allow non-numeric input.
Size and maxlength fields are also available. Defaults are 2 and 4 but can be overridden.
When a user updates a field the values are saved in local storage. Some variables, those preficed with the map value of "global" will prefill will with the most recent value input by the user across all spells that use that variable name.

Sample Form Structure: 

		[
			[ {"map": "EPOT", "label": "# EPOT", "hCol": 2}, {"map": "targets", "label": "# of Targets"}],
			[ {"map": "overpower", "label": "Overpower", "fCol":2}, { "map": "damageDiceType", "label": "Damage Die:", "inpType": "text"} ],
			[ {"map": "globalDisciplineRank", "label": "Discipline Rank", "size": 4, "maxlength": 10 } ]
		]

Calculations
------------

Calculation is valid javascript.  Use math and string functions to manipulate variables.  All object variables are accessible with "v."

Sample Calculation: 

		v.totalTAV = v.diffBASE + (v.EPOT * v.diffEPOT) + (v.targets * v.diffTARG);
		v.totalStrain = v.strainBASE + (v.EPOT * v.strainEPOT) + (v.targets * v.strainTARG);

If the following variable is present, the system will default to a local spell calculation instead.
		
		OVERRIDETEMPLATE: 1

Reports
-------

Reports are a sloppy convoluted heirachal mess:

Reports are output defined as an array of arrays. Each sub-array represents one row.
Each element in a sub-array represents a single cell.
If a dynamic variable is mapped, format is "$variableName"
Simple cells can have the following formats: "string", "$variable"
Complex cells are objects with {"text": "textValue", "class": "optionalCSSClass", "cols": integer}
Concatenation of text and dynamic fields are possible by defining a "text" attribute as an array like {"text": ["a", "b", "$variable", "c"]}

Report example

		[
			[ {"text": "Total Strain:", "class": "header"}, "$totalStrain", {"text": "Total TAV:"}, "$totalTAV" ],
			[ { "text": "Damage: ", "class": "header"}, { "text": ["$txtDamage", " per round"]} , {"text": "Resist: ", "class":"header"}, "$txtResist"],
			[ { "text": "Drain: ", "class": "header"}, { "text": "$txtDrain", "cols": 3}, "Yay" ]
		]
