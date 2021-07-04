// template for an instrument or effect object
function InstrumentConstructorTemplate(){

	this.output = audioCtx.createGain();

}

InstrumentConstructorTemplate.prototype = {

	output: this.output,

	connect: function(audioNode){
		if (audioNode.hasOwnProperty('input') == 1){
			this.output.connect(audioNode.input);
		}
		else {
			this.output.connect(audioNode);
		}
	},

}

//--------------------------------------------------------------

// EFFECT

//--------------------------------------------------------------

// object within which to design signal-processing chains, which are
// stored as methods
function Effect(){

	this.input = audioCtx.createGain();
	this.filterFade = new FilterFade(0);
	this.output = audioCtx.createGain();
	this.startArray = [];

	this.input.connect(this.filterFade.input);

}

Effect.prototype = {

	input: this.input,
	output: this.output,
	filterFade: this.filterFade,
	startArray: this.startArray,

	// effect preset template
	effectMethod: function(){
		this.startArray = [];
	},

	// preset 1
	thru: function(){

		this.filterFade.connect(this.output);

	},

	// preset 2
	stereoDelay: function(delayL, delayR, fb){

		this.delayL = delayL;
		this.delayR = delayR;
		this.fb = fb;

		this.dly = new MyStereoDelay(this.delayL, this.delayR, this.fb, 1);

		this.filterFade.connect(this.dly);
		this.dly.connect(this.output);

	},

	// preset 3
	noiseAM: function(min, max, rate, lpFreq){

		this.min = min;
		this.max = max;
		this.rate = rate;
		this.lpFreq = lpFreq;

		this.l = new LFO(this.min, this.max, this.rate);
		this.l.buffer.makeUnipolarNoise();
		this.lp = new MyBiquad("lowpass", this.lpFreq, 1);
		this.g = new MyGain(0);

		this.filterFade.connect(this.g); this.l.connect(this.g.gain.gain);
		this.g.connect(this.output);

		this.startArray = [this.l];

	},

	// preset 4
	fmShaper: function(cFreq, mFreq, mGain){

		this.cFreq = cFreq;
		this.mFreq = mFreq;
		this.mGain = mGain;

		this.w = new MyWaveShaper();
		this.w.makeFm(this.cFreq, this.mFreq, 1);
		this.wG = new MyGain(this.mGain);

		this.filterFade.connect(this.wG);
		this.wG.connect(this.w);
		this.w.connect(this.output);

	},

	// preset 5
	amShaper: function(cFreq, mFreq, mGain){

		this.cFreq = cFreq;
		this.mFreq = mFreq;
		this.mGain = mGain;

		this.w = new MyWaveShaper();
		this.w.makeAm(this.cFreq, this.mFreq, 1);
		this.wG = new MyGain(this.mGain);

		this.filterFade.connect(this.wG);
		this.wG.connect(this.w);
		this.w.connect(this.output);

	},

	// presett 6
	randomShortDelay: function(){

		this.dly = new MyStereoDelay(randomFloat(0.01, 0.035), randomFloat(0.01, 0.035), randomFloat(0, 0.1), 1);

		this.filterFade.connect(this.dly);
		this.dly.connect(this.output);

	},

	// preset 7
	randomEcho: function(){

		this.dly = new MyStereoDelay(randomFloat(0.35, 0.6), randomFloat(0.35, 0.6), randomFloat(0, 0.2), 1);

		this.filterFade.connect(this.dly);
		this.dly.connect(this.output);

	},

	// preset 8
	randomSampleDelay: function(){

		this.s = 1/audioCtx.sampleRate;

		this.dly = new MyStereoDelay(randomInt(this.s, this.s*100), randomInt(this.s, this.s*100), randomFloat(0.3, 0.4), 1);

		this.filterFade.connect(this.dly);
		this.dly.connect(this.output);

	},

	// preset 9
	filter: function(type, freq, Q){

		this.type = type;
		this.freq = freq;
		this.Q = Q;

		this.f = new MyBiquad(this.type, this.freq, this.Q);
		this.filterFade.connect(this.f);

		this.f.connect(this.output);

	},

	// filterFade to switchVal
	switch: function(switchVal){

		this.switchVal = switchVal;

		this.filterFade.start(this.switchVal, 30);

	},

	// filterFade to switchVal at specified time (in seconds)
	switchAtTime: function(switchVal, time){

		this.switchVal = switchVal;
		this.time = time;

		this.filterFade.startAtTime(this.switchVal, 20, this.time);


	},

	// specify a sequence of values to filterFade to
	switchSequence: function(valueSequence, timeSequence){

		this.valueSequence = valueSequence;
		this.timeSequence = timeSequence;
		this.v;
		this.j=0;

		for(var i=0; i<timeSequence.length; i++){
			this.v = this.valueSequence[this.j%this.valueSequence.length];
			this.filterFade.startAtTime(this.v, 20, this.timeSequence[i]);
			this.j++;
		}

	},

	// turn the effect on immdiately
	on: function(){

		this.filterFade.start(1, 30);

	},

	// turn the effect off immediately
	off: function(){

		this.filterFade.start(0, 20);

	},

	// turn the effect on at the specified time (in seconds)
	onAtTime: function(time){

		this.time = time;

		this.filterFade.startAtTime(1, 20, this.time);

	},

	// turn the effect off at the specified time (in seconds)
	offAtTime: function(time){

		this.time = time;

		this.filterFade.startAtTime(0, 20, this.time);

	},

	// start the effect immediately
	start: function(){

		for(var i=0; i<this.startArray.length; i++){
			this.startArray[i].start();
		}

	},

	// stop the effect immediately
	stop: function(){

		for(var i=0; i<this.startArray.length; i++){
			this.startArray[i].stop();
		}

	},

	// start the effect at the specified time (in seconds)
	startAtTime: function(time){

		this.time = time;

			for(var i=0; i<startArray.length; i++){
				this.startArray[i].startAtTime(this.time);
			}

	},

	// stop the effect at the specified time (in seconds)
	stopAtTime: function(time){

		this.time = time;

			for(var i=0; i<startArray.length; i++){
				this.startArray[i].stopAtTime(this.time);
			}

	},

	// connect the output node of this object to the input of another
	connect: function(audioNode){
		if (audioNode.hasOwnProperty('input') == 1){
			this.output.connect(audioNode.input);
		}
		else {
			this.output.connect(audioNode);
		}
	},

}

//--------------------------------------------------------------

// INSTRUMENT

//--------------------------------------------------------------

// object within which to design signal-generating chains, which are
// stored as methods
function Instrument(){

	this.input = audioCtx.createGain();
	this.output = audioCtx.createGain();
	this.startArray = [];

}

Instrument.prototype = {

	input: this.input,
	output: this.output,
	startArray: this.startArray,

	// instrument preset template
	instrumentMethod: function(){
		this.startArray = [];
	},

	// preset 1
	bPS: function(rate, tArray, gainVal){

		this.rate = rate;
		this.tArray = tArray;
		this.gainVal = gainVal;

		this.output.gain.value = gainVal;

		// BREAKPOINT ENVELOPE ARRAY

			this.sL = this.tArray.length*2;

			this.tS = new Sequence();
			this.tS.loop(this.sL, this.tArray);
			this.tS.palindrome();
			this.tS.bipolar();
			this.tS.join([0]);

			this.dS = new Sequence();
			this.dS = this.dS.duplicates(this.tS.sequence.length, 1/this.tS.sequence.length,);

			this.eArray = this.tS.lace(this.dS);

		// BREAKPOINT EXPONENT ARRAY

			this.expArray1 = new Sequence();
			this.expArray1.randomInts(this.eArray.length/2, 14, 54);
			this.expArray2 = new Sequence();
			this.expArray2.randomFloats(this.eArray.length/2, 0.1, 0.991);

			this.expArray = this.expArray1.lace(this.expArray2.sequence);

		// BREAKPOINT

			this.bP = new BreakPoint(this.eArray, this.expArray);
			this.bP.loop = true;
			this.bP.playbackRate = this.rate;

		// SHAPER

			this.s = new MyWaveShaper();
			this.s.makeFm(107, 20, 1);
			this.sG = new MyGain(0.1);

		// FILTERS

			this.f1 = new MyBiquad("highshelf", 3000, 1);
			this.f1.biquad.gain.value = -8;
			this.f2 = new MyBiquad("lowpass", 3000, 1);
			this.f3 = new MyBiquad("highpass", 5, 1);

		// SHAPER

			this.w = new MyWaveShaper();
			this.w.makeSigmoid(5);
			this.wD = new MyStereoDelay(randomFloat(0.001, 0.01), randomFloat(0.001, 0.01), 0.1, 1);
			this.wD.output.gain.value = 0.2;

		// CONNECTIONS
			/*
			this.bP.connect(this.sG);

			this.sG.connect(this.s);
			this.s.connect(this.f1);
			this.f1.connect(this.f2);
			this.f2.connect(this.f3);

			this.f2.connect(this.w);
			this.w.connect(this.wD);
			this.wD.connect(this.f3);

			this.f3.connect(this.output);
			*/

			this.bP.connect(this.output);

		// STARTS

			this.startArray = [this.bP];

	},

	// preset 2
	lTone: function(fund){

		this.fund = fund;

		this.d2O = new LFO(0, 1, this.fund);
		this.d2O.buffer.makeUnipolarSine();
		this.d2OF = new MyBiquad("lowpass", 20000, 1);
		this.d2OF.output.gain.value = 0.5;
		this.d2OW = new Effect();
		this.d2OW.fmShaper(this.fund, this.fund*2, 0.0006);
		this.d2OW.on();

		this.p = new MyPanner2(randomFloat(-0.25, 0.25));
		this.p.output.gain.value = 1;

		this.t = new Effect();
		this.t.thru();

		this.dR = new Effect();
		this.dR.randomShortDelay();
		this.dR.output.gain.value = 0.3;
		this.dR.on();

		this.dE = new Effect();
		this.dE.randomEcho();
		this.dE.output.gain.value = 0.3;
		this.dE.on();

		this.d2O.connect(this.d2OF);
		this.d2OF.connect(this.d2OW);
		this.d2OW.connect(this.p);
		this.p.connect(this.t);

		this.t.connect(this.output);

		this.t.connect(this.dR);
		this.dR.connect(this.output);

		this.dR.connect(this.dE);
		this.dE.connect(this.output);

		this.d2O.start();

	},

	// preset3
	fm2: function(fund, rampRate, rampVals){

		this.fund = fund;
		this.rampRate = rampRate;
		this.rampVals = rampVals;

		this.b1 = new MyBuffer(1, 1, audioCtx.sampleRate);
		this.b2 = new MyBuffer(1, 1, audioCtx.sampleRate);
		this.b1.playbackRate = this.fund;
		this.b1.loop = true;

		this.cFA = [1,   2   , 3   , 4];
		this.mFA = [8,  5  , 7  ,  13];
		this.gA =  [0.1, 0.2 , 0.4 , 0.1];

		for(var i=0; i<this.cFA.length; i++){

			this.b2.makeFm(this.cFA[i], this.mFA[i], this.gA[i]);

			this.b1.addBuffer(this.b2.buffer);

		}

		this.b1.normalize(-1, 1);

		this.eB = new MyBuffer(1, 1, audioCtx.sampleRate);
		this.eB.makeRamp(this.rampVals[0], this.rampVals[1], this.rampVals[2]);
		this.eB.playbackRate = this.rampRate;
		this.eG = new MyGain(0);

		this.b1.connect(this.eG); this.eB.connect(this.eG.gain.gain);
		this.eG.gain.connect(this.output);

		this.b1.start();

		this.startArray = [this.eB];

		bufferGraph(this.b1.buffer);

	},

	// preset4
	rampWave: function(fund, rampRate, rampVals){

		this.fund = fund;
		this.rampRate = rampRate;
		this.rampVals = rampVals;

		this.b1 = new MyBuffer(1, 1, audioCtx.sampleRate);
		this.b2 = new MyBuffer(1, 1, audioCtx.sampleRate);
		this.b1.playbackRate = this.fund;
		this.b1.loop = true;

		this.pPA = [0.1, 0.9, 0.5, 0.25, 0.75];
		this.uEA = [2, 2, 12, 5, 5];
		this.dEA = [2, 2, 12, 5, 5];

		for(var i=0; i<this.pPA.length; i++){

			this.b2.makeRamp(this.pPA[i], this.uEA[i], this.dEA[i]);

			this.b1.addBuffer(this.b2.buffer);

		}

		this.b1.normalize(0, 1);

		this.eB = new MyBuffer(1, 1, audioCtx.sampleRate);
		this.eB.makeRamp(this.rampVals[0], this.rampVals[1], this.rampVals[2]);
		this.eB.playbackRate = this.rampRate;
		this.eG = new MyGain(0);

		// this.b1.connect(this.eG); this.eB.connect(this.eG.gain.gain);
		// this.eG.gain.connect(this.output);

		this.b1.connect(this.output);

		this.b1.start();

		this.startArray = [this.eB];

		bufferGraph(this.b1.buffer);

	},

	// preset5
	rpdWave: function(fund, rampRate, rampVals){

		this.fund = fund;
		this.rampRate = rampRate;
		this.rampVals = rampVals;

		this.b1 = new MyBuffer(1, 1, audioCtx.sampleRate);
		this.b2 = new MyBuffer(1, 1, audioCtx.sampleRate);
		this.b1.playbackRate = this.fund;
		this.b1.loop = true;

		this.nP = 10;

		for(var i=0; i<this.nP; i++){

			this.b2.makeRamp(randomFloat(0.1, 0.9), randomInt(128, 256), randomInt(128, 256));

			this.b1.addBuffer(this.b2.buffer);

		}

		this.b1.normalize(0, 1);

		this.eB = new MyBuffer(1, 1, audioCtx.sampleRate);
		this.eB.makeRamp(this.rampVals[0], this.rampVals[1], this.rampVals[2]);
		this.eB.playbackRate = this.rampRate;
		this.eG = new MyGain(0);

		// this.b1.connect(this.eG); this.eB.connect(this.eG.gain.gain);
		// this.eG.gain.connect(this.output);

		this.b1.connect(this.output);

		this.b1.start();

		this.startArray = [this.eB];

		bufferGraph(this.b1.buffer);

	},

	// preset6
	rwPluck: function(fund, rampRate, rampVals){

		this.fund = fund;
		this.rampRate = rampRate;
		this.rampVals = rampVals;

		this.b1 = new MyBuffer(1, 1, audioCtx.sampleRate);
		this.b2 = new MyBuffer(1, 1, audioCtx.sampleRate);
		this.eB = new MyBuffer(1, 1, audioCtx.sampleRate);
		this.eG = new MyGain(0);
		this.b1.playbackRate = this.fund;
		this.b1.loop = true;
		this.eB.playbackRate = this.rampRate;

		this.cFA = [1,   2   , 3   , 4];
		this.mFA = [8,  5  , 7  ,  13];
		this.gA =  [0.1, 0.2 , 0.4 , 0.1];

		for(var i=0; i<this.cFA.length; i++){

			this.b2.makeFm(this.cFA[i], this.mFA[i], this.gA[i]);

			this.b1.addBuffer(this.b2.buffer);

		}

		this.pPA = [0.5, 0.75, 0.25, 0.33, 0.66, 0.1, 0.9];
		this.uEA = [32, 8, 8, 16, 16, 0.4, 8];
		this.dEA = [32, 8, 8, 16, 16, 8, 0.4];

		for(var i=0; i<this.pPA.length; i++){

			this.b2.makeRamp(this.pPA[i], this.uEA[i], this.dEA[i]);

			this.b1.addBuffer(this.b1.buffer);
			this.eB.addBuffer(this.b2.buffer);

		}

		this.eB.applyRamp(0.1, 0.1, 2);

		this.b1.normalize(0, 1);


		this.b1.connect(this.eG); this.eB.connect(this.eG.gain.gain);
		this.eG.gain.connect(this.output);

		this.b1.start();

		this.startArray = [this.eB];

		bufferGraph(this.b1.buffer);
		bufferGraph(this.eB.buffer);

	},

	// preset8
	fx1: function(){

		this.fund = 432*0.25;
		this.rate = 3;

		this.b1 = new MyBuffer(1, 1, audioCtx.sampleRate);
		this.b2 = new MyBuffer(1, 1, audioCtx.sampleRate);
		this.b1.playbackRate = this.rate;

		this.n = 1;

		this.fmCFA = [21];
		this.fmMFA = [30];
		this.fmGVA = [10];
		this.fmMGA = [0.01, 0.1, 0.1];

		this.fmPPA = [0.5, 0.5, 0.75];
		this.fmUEA = [1,   1, 2];
		this.fmDEA = [1,   1, 2];

		this.amCFA = [1];
		this.amMFA = [2];
		this.amGVA = [1];
		this.amMGA = [1];

		this.rPPA = [0.2];
		this.rUEA = [32];
		this.rDEA = [32];
		this.rMGA = [0];

		for(var i=0; i<this.fmCFA.length; i++){
			this.b2.makeFm(this.fund*this.fmCFA[i], this.fund*this.fmMFA[i], this.fmGVA[i]);
			this.b2.applyRamp(this.fmPPA[i], this.fmUEA[i], this.fmDEA[i]);
			this.b2.multiply(this.fmMGA[i]);

			this.b1.addBuffer(this.b2.buffer);
		}

/*
		for(var i=0; i<this.amCFA.length; i++){
			this.b2.makeFm(this.amCFA[i], this.amMFA[i], this.amGVA[i]);
			this.b2.multiply(this.amMGA[i]);

			this.b1.addBuffer(this.b2.buffer);
		}

		for(var i=0; i<this.rPPA.length; i++){
			this.b2.makeRamp(this.rPPA[i], this.rUEA[i], this.rDEA[i]);
			this.b2.multiply(this.rMGA[i]);

			this.b1.addBuffer(this.b2.buffer);
		}
*/

		this.b1.normalize(-1, 1);

		this.b1.connect(this.output);

		this.startArray = [this.b1];

		bufferGraph(this.b1.buffer);

	},

	// preset9
	fx2: function(){

		this.fund = 432*0.25;
		this.rate = 3;

		this.b1 = new MyBuffer(1, 1, audioCtx.sampleRate);
		this.b2 = new MyBuffer(1, 1, audioCtx.sampleRate);
		this.b1.playbackRate = this.rate;

		this.n = 1;

		this.fmCFA = [21];
		this.fmMFA = [30];
		this.fmGVA = [10];
		this.fmMGA = [0.01, 0.1, 0.1];

		this.fmPPA = [0.5, 0.5, 0.75];
		this.fmUEA = [1,   1, 2];
		this.fmDEA = [1,   1, 2];

		this.amCFA = [1];
		this.amMFA = [2];
		this.amGVA = [1];
		this.amMGA = [1];

		this.rPPA = [0.2];
		this.rUEA = [32];
		this.rDEA = [32];
		this.rMGA = [0];

		for(var i=0; i<this.fmCFA.length; i++){
			this.b2.makeFm(this.fund*this.fmCFA[i], this.fund*this.fmMFA[i], this.fmGVA[i]);
			this.b2.applyRamp(this.fmPPA[i], this.fmUEA[i], this.fmDEA[i]);
			this.b2.multiply(this.fmMGA[i]);

			this.b1.addBuffer(this.b2.buffer);
		}

/*
		for(var i=0; i<this.amCFA.length; i++){
			this.b2.makeFm(this.amCFA[i], this.amMFA[i], this.amGVA[i]);
			this.b2.multiply(this.amMGA[i]);

			this.b1.addBuffer(this.b2.buffer);
		}

		for(var i=0; i<this.rPPA.length; i++){
			this.b2.makeRamp(this.rPPA[i], this.rUEA[i], this.rDEA[i]);
			this.b2.multiply(this.rMGA[i]);

			this.b1.addBuffer(this.b2.buffer);
		}
*/

		this.b1.normalize(-1, 1);

		this.b1.connect(this.output);

		this.startArray = [this.b1];

		bufferGraph(this.b1.buffer);

	},

	// preset10
	fxPhrase: function(){

		this.fund = 432*0.25;
		this.rate = 0.25;

		this.b1 = new MyBuffer(1, 1, audioCtx.sampleRate);
		this.b2 = new MyBuffer(1, 1, audioCtx.sampleRate);
		this.b1.playbackRate = this.rate;
		this.b1.loop = true;

		this.n = 1;

		this.fmCFA = [11, 11, 11];
		this.fmMFA = [26, 26, 26];
		this.fmGVA = [17, 17, 17];
		this.fmMGA = [0.01, 0.01, 0.01];

		this.fmPPA = [0.2,  0.4, 0.9];
		this.fmUEA = [2,    16,  256];
		this.fmDEA = [256,  9,   2];

		this.amCFA = [1];
		this.amMFA = [2];
		this.amGVA = [1];
		this.amMGA = [1];

		this.rPPA = [0.2];
		this.rUEA = [32];
		this.rDEA = [32];
		this.rMGA = [0];

		for(var i=0; i<this.fmCFA.length; i++){
			this.b2.makeFm(this.fund*this.fmCFA[i], this.fund*this.fmMFA[i], this.fmGVA[i]);
			this.b2.applyRamp(this.fmPPA[i], this.fmUEA[i], this.fmDEA[i]);
			this.b2.multiply(this.fmMGA[i]);

			this.b1.addBuffer(this.b2.buffer);
		}

/*
		for(var i=0; i<this.amCFA.length; i++){
			this.b2.makeFm(this.amCFA[i], this.amMFA[i], this.amGVA[i]);
			this.b2.multiply(this.amMGA[i]);

			this.b1.addBuffer(this.b2.buffer);
		}

		for(var i=0; i<this.rPPA.length; i++){
			this.b2.makeRamp(this.rPPA[i], this.rUEA[i], this.rDEA[i]);
			this.b2.multiply(this.rMGA[i]);

			this.b1.addBuffer(this.b2.buffer);
		}
*/

		this.b1.normalize(-1, 1);

		this.b1.connect(this.output);

		this.startArray = [this.b1];

		bufferGraph(this.b1.buffer);

	},

	// preset11
	fx3: function(){

		this.fund = 432*0.25;
		this.rate = 2;

		this.b1 = new MyBuffer(1, 1, audioCtx.sampleRate);
		this.b2 = new MyBuffer(1, 1, audioCtx.sampleRate);
		this.b1.playbackRate = this.rate;

		this.n = 1;

		this.fmCFA = [11];
		this.fmMFA = [26];
		this.fmGVA = [17];
		this.fmMGA = [0.01];

		this.fmPPA = [0.5,  0.4, 0.9];
		this.fmUEA = [1,    16,  256];
		this.fmDEA = [1,  9,   2];

		this.amCFA = [1];
		this.amMFA = [2];
		this.amGVA = [1];
		this.amMGA = [1];

		this.rPPA = [0.2];
		this.rUEA = [32];
		this.rDEA = [32];
		this.rMGA = [0];

		for(var i=0; i<this.fmCFA.length; i++){
			this.b2.makeFm(this.fund*this.fmCFA[i], this.fund*this.fmMFA[i], this.fmGVA[i]);
			this.b2.applyRamp(this.fmPPA[i], this.fmUEA[i], this.fmDEA[i]);
			this.b2.multiply(this.fmMGA[i]);

			this.b1.addBuffer(this.b2.buffer);
		}

/*
		for(var i=0; i<this.amCFA.length; i++){
			this.b2.makeFm(this.amCFA[i], this.amMFA[i], this.amGVA[i]);
			this.b2.multiply(this.amMGA[i]);

			this.b1.addBuffer(this.b2.buffer);
		}

		for(var i=0; i<this.rPPA.length; i++){
			this.b2.makeRamp(this.rPPA[i], this.rUEA[i], this.rDEA[i]);
			this.b2.multiply(this.rMGA[i]);

			this.b1.addBuffer(this.b2.buffer);
		}
*/

		this.b1.normalize(-1, 1);

		this.b1.connect(this.output);

		this.startArray = [this.b1];

		bufferGraph(this.b1.buffer);

	},

	// preset12
	fx4: function(){

		this.fund = 432*0.125;
		this.rate = 2;

		this.b1 = new MyBuffer(1, 1, audioCtx.sampleRate);
		this.b2 = new MyBuffer(1, 1, audioCtx.sampleRate);
		this.b1.playbackRate = this.rate;

		this.fmCFA = [11, 12, 13, 2];
		this.fmMFA = [26, 27, 28, 1];
		this.fmGVA = [17, 18, 19, 5];
		this.fmMGA = [0.01, 0.01, 0.01, 0.001];

		this.fmPPA = [0.2,  0.4, 0.9, 0.5];
		this.fmUEA = [2,    16,  1,   1];
		this.fmDEA = [256,  9,   2,   1];

		this.amCFA = [1];
		this.amMFA = [2];
		this.amGVA = [1];
		this.amMGA = [1];

		this.rPPA = [0.2];
		this.rUEA = [32];
		this.rDEA = [32];
		this.rMGA = [0];

		for(var i=0; i<this.fmCFA.length; i++){
			this.b2.makeFm(this.fund*this.fmCFA[i], this.fund*this.fmMFA[i], this.fmGVA[i]);
			this.b2.applyRamp(this.fmPPA[i], this.fmUEA[i], this.fmDEA[i]);
			this.b2.multiply(this.fmMGA[i]);

			this.b1.addBuffer(this.b2.buffer);
		}

/*
		for(var i=0; i<this.amCFA.length; i++){
			this.b2.makeFm(this.amCFA[i], this.amMFA[i], this.amGVA[i]);
			this.b2.multiply(this.amMGA[i]);

			this.b1.addBuffer(this.b2.buffer);
		}

		for(var i=0; i<this.rPPA.length; i++){
			this.b2.makeRamp(this.rPPA[i], this.rUEA[i], this.rDEA[i]);
			this.b2.multiply(this.rMGA[i]);

			this.b1.addBuffer(this.b2.buffer);
		}
*/

		this.b1.normalize(-1, 1);

		this.b1.connect(this.output);

		this.startArray = [this.b1];

		bufferGraph(this.b1.buffer);

	},

	// preset12
	fmWPhrase1: function(){

		this.fund = 432*0.125;
		this.rate = 1.5;

		this.b1 = new MyBuffer(1, 1, audioCtx.sampleRate);
		this.b2 = new MyBuffer(1, 1, audioCtx.sampleRate);
		this.b1.playbackRate = this.rate;
		this.b1.loop = true;

		this.fmCFA = [1, 1, 1, 1];
		this.fmMFA = [2, 2, 2, 2];
		this.fmGVA = [1, 1, 1, 1];
		this.fmMGA = [1, 1, 1, 1];

		this.fmPPA = [0.0001, 0.25, 0.5, 0.75];
		this.fmUEA = [256, 256, 256, 256];
		this.fmDEA = [128, 128, 128, 128];

		for(var i=0; i<this.fmCFA.length; i++){
			this.b2.makeFm(this.fund*this.fmCFA[i], this.fund*this.fmMFA[i], this.fmGVA[i]);
			this.b2.applyRamp(this.fmPPA[i], this.fmUEA[i], this.fmDEA[i]);
			this.b2.multiply(this.fmMGA[i]);

			this.b1.addBuffer(this.b2.buffer);
		}

		this.b1.normalize(-1, 1);

		this.b1.connect(this.output);

		this.startArray = [this.b1];

		bufferGraph(this.b1.buffer);

	},

	// preset12
	fmWPhrase: function(fund, rate, cFA, mFA, gVA, mGA, pPA, uEA, dEA){

		this.fund = fund;
		this.rate = rate;
		this.cFA = cFA;
		this.mFA = mFA;
		this.gVA = gVA;
		this.mGA = mGA;
		this.pPA = pPA;
		this.uEA = uEA;
		this.dEA = dEA;

		this.b1 = new MyBuffer(1, 1, audioCtx.sampleRate);
		this.b2 = new MyBuffer(1, 1, audioCtx.sampleRate);
		this.b1.playbackRate = this.rate;
		this.b1.loop = true;

		for(var i=0; i<this.cFA.length; i++){
			this.b2.makeFm(this.fund*this.cFA[i], this.fund*this.mFA[i], this.gVA[i]);
			this.b2.applyRamp(this.pPA[i], this.uEA[i], this.dEA[i]);
			this.b2.multiply(this.mGA[i]);

			this.b1.addBuffer(this.b2.buffer);
		}

		this.b1.normalize(-1, 1);

		this.b1.connect(this.output);

		this.startArray = [this.b1];

	},

	// preset12
	fmWPhrase1: function(fund, rate, div){

		this.fund = fund;
		this.rate = rate;
		this.div = div;

		this.b1 = new MyBuffer(1, 1, audioCtx.sampleRate);
		this.b2 = new MyBuffer(1, 1, audioCtx.sampleRate);
		this.b1.playbackRate = this.rate;
		this.b1.loop = true;

		for(var i=0; i<this.div; i++){
			this.b2.makeFm(this.fund*randomFloat(1, 3.1), this.fund*randomFloat(1, 3.1), randomFloat(0.3, 1));
			if(i==0){this.b2.applyRamp(0.0001, randomInt(128, 256), randomInt(128, 256));}
			else if(i!=0){this.b2.applyRamp(i/this.div, randomInt(256, 512), randomInt(256, 512));}
			this.b2.multiply(randomFloat(0.5, 1));
			this.b2.multiply(randomInt(0, 2));

			this.b1.addBuffer(this.b2.buffer);
		}

		this.b1.normalize(-1, 1);

		this.b1.connect(this.output);

		this.startArray = [this.b1];

	},

	// preset13
	hWAMPhrase: function(fund, rate){

		this.fund = 432*0.125;
		this.rate = 1;

		this.b1 = new MyBuffer(1, 1, audioCtx.sampleRate);
		this.b2 = new MyBuffer(1, 1, audioCtx.sampleRate);
		this.b1.playbackRate = this.rate;

		this.fmCFA = [10, 12, 15, 11.1];
		this.fmMFA = [25, 22, 30, 21];
		this.fmGVA = [0.1, 0.5, 0.3, 0.2];
		this.fmMGA = [1, 1, 1, 1];

		this.fmPPA = [0.2,  0.4, 0.9, 0.6];
		this.fmUEA = [2,    16,  99,   56];
		this.fmDEA = [256,  9,   12,   8];

		this.amCFA = [1];
		this.amMFA = [2];
		this.amGVA = [1];
		this.amMGA = [1];

		this.rPPA = [0.2];
		this.rUEA = [32];
		this.rDEA = [32];
		this.rMGA = [0];

		for(var i=0; i<this.fmCFA.length; i++){
			this.b2.makeFm(this.fund*this.fmCFA[i], this.fund*this.fmMFA[i], this.fmGVA[i]);
			this.b2.applyRamp(this.fmPPA[i], this.fmUEA[i], this.fmDEA[i]);
			this.b2.multiply(this.fmMGA[i]);

			this.b1.addBuffer(this.b2.buffer);
		}

/*
		for(var i=0; i<this.amCFA.length; i++){
			this.b2.makeFm(this.amCFA[i], this.amMFA[i], this.amGVA[i]);
			this.b2.multiply(this.amMGA[i]);

			this.b1.addBuffer(this.b2.buffer);
		}

		for(var i=0; i<this.rPPA.length; i++){
			this.b2.makeRamp(this.rPPA[i], this.rUEA[i], this.rDEA[i]);
			this.b2.multiply(this.rMGA[i]);

			this.b1.addBuffer(this.b2.buffer);
		}
*/

		this.b1.normalize(-1, 1);

		this.b1.connect(this.output);

		this.startArray = [this.b1];

		bufferGraph(this.b1.buffer);

	},

	// presetX
	hybridWave: function(fund, rate){

		this.fund = fund;
		this.rate = rate;

		this.b1 = new MyBuffer(1, 1, audioCtx.sampleRate);
		this.b2 = new MyBuffer(1, 1, audioCtx.sampleRate);
		this.b1.playbackRate = this.rate;

		this.fmCFA = [10];
		this.fmMFA = [25];
		this.fmGVA = [0.1];
		this.fmMGA = [1];

		this.fmPPA = [0.2];
		this.fmUEA = [1];
		this.fmDEA = [1];

		this.amCFA = [1];
		this.amMFA = [2];
		this.amGVA = [1];
		this.amMGA = [1];

		this.rPPA = [0.9];
		this.rUEA = [256];
		this.rDEA = [256];
		this.rMGA = [1];

		for(var i=0; i<this.fmCFA.length; i++){
			this.b2.makeFm(this.fund*this.fmCFA[i], this.fund*this.fmMFA[i], this.fmGVA[i]);
			this.b2.applyRamp(this.fmPPA[i], this.fmUEA[i], this.fmDEA[i]);
			this.b2.multiply(this.fmMGA[i]);

			this.b1.addBuffer(this.b2.buffer);
		}

/*
		for(var i=0; i<this.amCFA.length; i++){
			this.b2.makeFm(this.amCFA[i], this.amMFA[i], this.amGVA[i]);
			this.b2.multiply(this.amMGA[i]);

			this.b1.addBuffer(this.b2.buffer);
		}

		for(var i=0; i<this.rPPA.length; i++){
			this.b2.makeRamp(this.rPPA[i], this.rUEA[i], this.rDEA[i]);
			this.b2.multiply(this.rMGA[i]);

			this.b1.addBuffer(this.b2.buffer);
		}
*/

		this.b1.normalize(-1, 1);

		this.b1.connect(this.output);

		this.startArray = [this.b1];

		bufferGraph(this.b1.buffer);

	},

	// presetX
	fmWave: function(fund, rate){

		this.fund = fund;
		this.rate = rate;

		this.b1 = new MyBuffer(1, 1, audioCtx.sampleRate);
		this.b2 = new MyBuffer(1, 1, audioCtx.sampleRate);
		this.b1.playbackRate = this.rate;
		this.b1.loop = true;

		this.n = 10;

		for(var i=0; i<this.n; i++){
			this.b2.makeFm(this.fund*randomInt(1, 5), this.fund*randomInt(1, 10), randomFloat(1, 2));
			this.b2.applyRamp(randomFloat(0.1, 0.9), randomInt(64, 256), randomInt(64, 256));
			this.b2.multiply(randomFloat(0.25, 1));

			this.b1.addBuffer(this.b2.buffer);
		}

		this.b1.normalize(-1, 1);

		this.b1.connect(this.output);

		this.startArray = [this.b1];

		bufferGraph(this.b1.buffer);

	},

	// start instrument immediately
	start: function(){
		for(var i=0; i<this.startArray.length; i++){
			this.startArray[i].start();
		}
	},

	// stop instrument immediately
	stop: function(){
		for(var i=0; i<this.startArray.length; i++){
			this.startArray[i].stop();
		}
	},

	// start instrument at specified time (in seconds)
	startAtTime: function(time){

		this.time = time;

		for(var i=0; i<this.startArray.length; i++){
			this.startArray[i].startAtTime(this.time);
		}

	},

	// stop instrument at specified time (in seconds)
	stopAtTime: function(time){

		this.time = time;

		for(var i=0; i<this.startArray.length; i++){
			this.startArray[i].stopAtTime(this.time);
		}

	},

	// connect the output node of this object to the input of another
	connect: function(audioNode){
		if (audioNode.hasOwnProperty('input') == 1){
			this.output.connect(audioNode.input);
		}
		else {
			this.output.connect(audioNode);
		}
	},

}

//--------------------------------------------------------------

// PRESETS (3)
//  - objects for storing commonly used configurations of certain nodes

//--------------------------------------------------------------

// collection of commonly used configurations of MyBuffer
function BufferPreset(){

	this.output = audioCtx.createGain();

	this.playbackRateInlet = new MyGain(1);

}

BufferPreset.prototype = {

	output: this.output,
	myBuffer: this.myBuffer,
	buffer: this.buffer,
	playbackRate: this.playbackRate,
	loop: this.loop,

	playbackRateInlet: this.playbackRateInlet,

	// preset template
	presetTemplate: function(){

		this.myBuffer = new MyBuffer(1, 1, audioCtx.sampleRate);
		this.buffer = this.myBuffer.buffer;

	},

	// preset 1
	harmonicSeries: function(nHarmonics){

		this.nHarmonics = nHarmonics;

		this.myBuffer = new MyBuffer(1, 1, audioCtx.sampleRate);
		this.buffer = this.myBuffer.buffer;
		this.myBuffer.makeConstant(0);

		for(var i=0; i<this.nHarmonics; i++){
			this.myBuffer.addSine(i+1, 1/(i+1));
		}

		this.myBuffer.normalize(-1, 1);

	},

	// preset 2
	additiveSynth: function(hArray, gArray){

		this.hArray = hArray;
		this.gArray = gArray;

		this.myBuffer = new MyBuffer(1, 1, audioCtx.sampleRate);
		this.buffer = this.myBuffer.buffer;
		this.myBuffer.makeConstant(0);

		for(var i=0; i<this.hArray.length; i++){
			this.myBuffer.addSine(this.hArray[i], this.gArray[i]);
		}

		this.myBuffer.normalize(-1, 1);

	},

	// start buffer immediately
	start: function(){
		this.bufferSource = audioCtx.createBufferSource();
		this.bufferSource.loop = this.loop;
		this.bufferSource.playbackRate.value = this.playbackRate;
		this.bufferSource.buffer = this.buffer;
		this.playbackRateInlet.connect(this.bufferSource.playbackRate);
		this.bufferSource.connect(this.output);
		this.bufferSource.start();
	},

	// stop buffer immediately
	stop: function(){
		this.bufferSource.stop();
	},

	// start buffer at specified time (in seconds)
	startAtTime: function(time){

		this.time = time;

		this.bufferSource = audioCtx.createBufferSource();
		this.bufferSource.loop = this.loop;
		this.bufferSource.playbackRate.value = this.playbackRate;
		this.bufferSource.buffer = this.buffer;
		this.playbackRateInlet.connect(this.bufferSource.playbackRate);
		this.bufferSource.connect(this.output);
		this.bufferSource.start(this.time);

	},

	// stop buffer at specified time (in  seconds)
	stopAtTime: function(time){

		this.time = time;

		this.bufferSource.stop(this.time);

	},

	// connect the output node of this object to the input of another
	connect: function(audioNode){
		if (audioNode.hasOwnProperty('input') == 1){
			this.output.connect(audioNode.input);
		}
		else {
			this.output.connect(audioNode);
		}
	},

}

//--------------------------------------------------------------

// collection of commonly used configurations of MyConvolver
function ConvolverPreset(){

	this.input = audioCtx.createGain();
	this.output = audioCtx.createGain();

}

ConvolverPreset.prototype = {

	input: this.input,
	output: this.output,
	convolver: this.convolver,

	// preset 1
	noiseReverb: function(length, decayExp){

		this.length = length;
		this.decayExp = decayExp;

		this.convolver = new MyConvolver(2, this.length, audioCtx.sampleRate);
		this.convolver.makeNoise();
		this.convolver.applyDecay(this.decayExp);

		this.input.connect(this.convolver.input);
		this.convolver.connect(this.output);

		this.buffer = this.convolver.buffer;

	},

	// preset 2
	preset2: function(){

		this.convolver = new MyConvolver(1, 0.25, audioCtx.sampleRate);
		this.convolver.makeAm(432, 432*2, 1);

		this.input.connect(this.convolver.input);
		this.convolver.connect(this.output);

		this.buffer = this.convolver.buffer;

	},

	// connect the output node of this object to the input of another
	connect: function(audioNode){
		if (audioNode.hasOwnProperty('input') == 1){
			this.output.connect(audioNode.input);
		}
		else {
			this.output.connect(audioNode);
		}
	},

}

//--------------------------------------------------------------

// collection of commonly used Envelopes
function EnvelopePreset(){

	this.output = audioCtx.createGain();
	this.envelopeBuffer = new EnvelopeBuffer();

}

EnvelopePreset.prototype = {

	output: this.output,
	envelopeBuffer: this.envelopeBuffer,
	loop: this.loop,

	// preset 1
	evenRamp: function(length){

		this.length = length;

		this.envelopeBuffer.makeExpEnvelope(
			[1, this.length*0.5, 0, this.length*0.5],
			[1, 1],
		);

		this.buffer = this.envelopeBuffer.buffer;

	},

	// preset 2
	customRamp: function(length, peakPoint, upExp, downExp){

		this.length = length;
		this.peakPoint = peakPoint;
		this.upExp = upExp;
		this.downExp = downExp;

		this.envelopeBuffer.makeExpEnvelope(
			[1, this.length*this.peakPoint, 0, this.length*(1-this.peakPoint)],
			[this.upExp, this.downExp]
		);

		this.buffer = this.envelopeBuffer.buffer;

	},

	// start envelope immediately
	start: function(){
		this.bufferSource = audioCtx.createBufferSource();
		this.bufferSource.buffer = this.buffer.buffer;
		this.bufferSource.loop = this.loop;
		this.bufferSource.connect(this.output);
		this.bufferSource.start();
	},

	// stop envelope immediately
	stop: function(){
		this.bufferSource.stop();
	},

	// start envelope at specified time (in seconds)
	startAtTime: function(time){

		this.time = time;

		this.bufferSource = audioCtx.createBufferSource();
		this.bufferSource.buffer = this.buffer;
		this.bufferSource.loop = this.loop;
		this.bufferSource.connect(this.output);
		this.bufferSource.start(this.time);

	},

	// stop envelope at specified time (in seconds)
	stopAtTime: function(time){

		this.time = time;

		this.bufferSource.stop(this.time);

	},

	// connect the output node of this object to the input of another
	connect: function(audioNode){
		if (audioNode.hasOwnProperty('input') == 1){
			this.output.connect(audioNode.input);
		}
		else {
			this.output.connect(audioNode);
		}
	},

	// create an envelope with exponential curves applied to each line segment
	makeExpEnvelope: function(eArray, expArray){

		this.eArray,
		this.expArray,

		this.envelopeBuffer.makeExpEnvelope(this.eArray, this.expArray);

		this.buffer = this.envelopeBuffer.buffer;

	},

	// create an envelope
	makeEnvelope: function(eArray){

		this.eArray = eArray;

		this.envelopeBuffer.makeEnvelope(this.eArray);

		this.buffer = this.envelopeBuffer.buffer;

	},

}
