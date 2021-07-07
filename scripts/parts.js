// load an instrument into a specified array
function initInst(inst, instArray, fxArray, gainVal){

  var inst = inst;
  var instArray = instArray;
  var fxArray = fxArray;
  var gainVal = gainVal;

  var output = new MyGain(gainVal);

  inst.connect(output);
  output.connect(masterGain);

  // connect FX chains
  for(var i=0; i<fxArray.length; i++){

    for(var j=0; j<fxArray[i].length+1; j++){
      if(j==0){inst.connect(fxArray[i][j])}
      else if(j>0 && j<fxArray[i].length){fxArray[i][j-1].connect(fxArray[i][j])}
      else if(j==fxArray[i].length){fxArray[i][j-1].connect(output)}
    }

  }

  instArray.push(inst);

}

// start and stop an instrument
function playInst(inst, startTime, stopTime){

  var inst = inst;
  var startTime = startTime;
  var stopTime = stopTime;

  inst.startAtTime(globalNow+startTime);
  inst.stopAtTime(globalNow+stopTime);

}

// not used
function fMWP1(startTime, stopTime, gainVal){

  var startTime = startTime;
  var stopTime = stopTime;
  var gainVal = gainVal;

  var output = new MyGain(gainVal);

  var s = new Instrument();
  s.fmWPhrase1();

  var f = new MyBiquad("lowpass", 5000, 1);
  var d = new Effect();
  d.randomShortDelay();
  d.on();
  d.output.gain.value = 0.4;

  s.connect(f);

  f.connect(d);

  f.connect(output);
  d.connect(output);

  output.connect(masterGain);

  s.startAtTime(startTime);
  s.stopAtTime(stopTime);

}
