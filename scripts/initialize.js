var audioCtx;
var offlineAudioCtx;

var globalDiv = randomInt(6, 8);

var globalRate = (6/globalDiv)*randomFloat(0.65, 0.75);

var pieceLength = 1+((64-16)/globalRate);
var globalFund =  randomFloat(1000, 5000); // 2858.0239777604816, 2384.2687307393644, 3035.5823699104694, 2789.119110593511, 4729.794215593301, 4059.670969760362, 2284.942217193322

function init(){

	var AudioContext = window.AudioContext || window.webkitAudioContext;
	audioCtx = new AudioContext();
	audioCtx.latencyHint = "playback";
	onlineButton.disabled = true;

	// initUtilities();
	// initBuffers();
	initInstrumentsAndFX();
	initParts();
	initSections();
	initScript();

};

function initOffline(){

	var AudioContext = window.AudioContext || window.webkitAudioContext;
	onlineCtx = new AudioContext();
	audioCtx = new OfflineAudioContext(2, onlineCtx.sampleRate*pieceLength, onlineCtx.sampleRate);
	audioCtx.latencyHint = "playback";
	onlineButton.disabled = true;

	// initUtilities();
	// initBuffers();
	initInstrumentsAndFX();
	initParts();
	initSections();
	initScript();

};

// INITIALIZE UTILITIES

var includeUtilities;

function initUtilities(){

	includeUtilities = document.createElement('script');
	includeUtilities.src = "scripts/utilities.js"
	document.head.appendChild(includeUtilities);

}

// INITIALIZE BUFFERS

var includeBufferLoader;
var includeLoadBuffers;

function initBuffers(){

	includeBufferLoader = document.createElement('script');
	includeBufferLoader.src = "scripts/buffer_loader.js"
	document.head.appendChild(includeBufferLoader);

	includeLoadBuffers = document.createElement('script');
	includeLoadBuffers.src = "scripts/load_buffers.js"
	document.head.appendChild(includeLoadBuffers);

}

// INITIALIZE INSTRUMENTS AND EFFECTS

var includeInstrumentsAndFX;

function initInstrumentsAndFX(){

	includeInstrumentsAndFX = document.createElement('script');
	includeInstrumentsAndFX.src = "scripts/instruments_and_fx.js"
	document.head.appendChild(includeInstrumentsAndFX);

	includeInstrumentsAndFX_L = document.createElement('script');
	includeInstrumentsAndFX_L.src = "scripts/instruments_and_fx_library.js"
	document.head.appendChild(includeInstrumentsAndFX_L);

}

// INITIALIZE PARTS

var includeParts;

function initParts(){

	includeParts = document.createElement('script');
	includeParts.src = "scripts/parts.js"
	document.head.appendChild(includeParts);

}

// INITIALIZE SECTIONS

var includeSections;

function initSections(){

	includeSections = document.createElement('script');
	includeSections.src = "scripts/sections.js"
	document.head.appendChild(includeSections);

}

// INITIALIZE SCRIPT

var includeScript;

function initScript(){

	includeScript = document.createElement('script');
	includeScript.src = "script.js"
	document.head.appendChild(includeScript);

}
