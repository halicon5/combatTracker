
cTrack.tickStatusConfig = {};
cTrack.tickStatusConfig.Open 	= { descShort: "Open", descLong: "Open", stType: "open"};
cTrack.tickStatusConfig.Eng 	= { descShort: "Eng", descLong: "Engaged but open", stType: "open"};
cTrack.tickStatusConfig.Inter	= { descShort: "Inter", descLong: "Interrupted", stType: "open"};

cTrack.tickStatusConfig.Att 	= { descShort: "Att", descLong: "Attacking", stType: "acting"};
cTrack.tickStatusConfig.Fire	= { descShort: "Fire", descLong: "Firing", stType: "acting"};
cTrack.tickStatusConfig.Cast	= { descShort: "Cast", descLong: "Casting", stType: "acting"};
cTrack.tickStatusConfig.Move	= { descShort: "Move", descLong: "Move", stType: "acting"};

cTrack.tickStatusConfig.Wait	= { descShort: "Wait", descLong: "Waiting", stType: "held"};
cTrack.tickStatusConfig.HAtt 	= { descShort: "HAtt", descLong: "Held - Attacking", stType: "held"};
cTrack.tickStatusConfig.HFire	= { descShort: "HFire", descLong: "Held - Firing", stType: "held"};
cTrack.tickStatusConfig.HCast	= { descShort: "HCast", descLong: "Held - Casting", stType: "held"};
cTrack.tickStatusConfig.HOther	= { descShort: "HOther", descLong: "Held - Other", stType: "held"};

cTrack.tickStatusConfig.Focus	= { descShort: "Focus", descLong: "Re-focusing", stType: "focus"};

var i = 0;
cTrack.tickStatusOpts = [];
cTrack.tickStatusOpts[i++] = cTrack.tickStatusConfig.Open;
cTrack.tickStatusOpts[i++] = cTrack.tickStatusConfig.Eng;
cTrack.tickStatusOpts[i++] = cTrack.tickStatusConfig.Inter;
cTrack.tickStatusOpts[i++] = cTrack.tickStatusConfig.Att;
cTrack.tickStatusOpts[i++] = cTrack.tickStatusConfig.Fire;
cTrack.tickStatusOpts[i++] = cTrack.tickStatusConfig.Cast;
cTrack.tickStatusOpts[i++] = cTrack.tickStatusConfig.Move;
cTrack.tickStatusOpts[i++] = cTrack.tickStatusConfig.Wait;
cTrack.tickStatusOpts[i++] = cTrack.tickStatusConfig.HAtt;
cTrack.tickStatusOpts[i++] = cTrack.tickStatusConfig.HFire;
cTrack.tickStatusOpts[i++] = cTrack.tickStatusConfig.HCast;
cTrack.tickStatusOpts[i++] = cTrack.tickStatusConfig.HOther;
cTrack.tickStatusOpts[i++] = cTrack.tickStatusConfig.Focus;
