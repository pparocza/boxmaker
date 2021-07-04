var fMWPArray = [];

function initInstruments(){

  initfMWP(fMWPArray);

}

function initfMWP(instArray){

  var instArray = instArray;

  var fV1A = globalFund*0.125;
  var rV1A = globalRate;
  var dV1A = globalDiv;

  var iV1A = new Instrument();
  iV1A.fmWPhrase1(fV1A, rV1A, dV1A);

  var gV1A = 0.3;

  var fxV1A = new Effect();
  fxV1A.randomShortDelay();
  fxV1A.on();
  fxV1A.output.gain.value = 1;

  var fxAV1A = [fxV1A];

  var fxAV1 = [fxAV1A];

  initInst(iV1A, instArray, fxAV1A, gV1A);

  var fV1B = globalFund*1;
  var rV1B = globalRate;
  var dV1B = globalDiv*2;

  var iV1B = new Instrument();
  iV1B.fmWPhrase1(fV1B, rV1B, dV1B);

  var gV1B = 0.15;

  var fxV1B = new Effect();
  fxV1B.randomShortDelay();
  fxV1B.on();
  fxV1B.output.gain.value = 1;

  var fxAV1B = [fxV1B];

  var fxAV1B = [fxAV1B];

  initInst(iV1B, instArray, fxAV1B, gV1B);

  var fV1C = globalFund*4;
  var rV1C = globalRate*0.5;
  var dV1C = globalDiv*4;

  var iV1C = new Instrument();
  iV1C.fmWPhrase1(fV1C, rV1C, dV1C);

  var gV1C = 0.15;

  var fxV1C = new Effect();
  fxV1C.randomShortDelay();
  fxV1C.on();
  fxV1C.output.gain.value = 1;

  var fxAV1C = [fxV1C];

  var fxAV1C = [fxAV1C];

  initInst(iV1C, instArray, fxAV1C, gV1C);

  var fV2A = globalFund*0.125;
  var rV2A = globalRate;
  var dV2A = globalDiv;

  var iV2A = new Instrument();
  iV2A.fmWPhrase1(fV2A, rV2A, dV2A);

  var gV2A = 0.3;

  var fxV2A = new Effect();
  fxV2A.randomShortDelay();
  fxV2A.on();
  fxV2A.output.gain.value = 1;

  var fxAV2A = [fxV2A];

  var fxAV2 = [fxAV2A];

  initInst(iV2A, instArray, fxAV2A, gV2A);

  var fV2B = globalFund*1;
  var rV2B = globalRate;
  var dV2B = globalDiv*2;

  var iV2B = new Instrument();
  iV2B.fmWPhrase1(fV2B, rV2B, dV2B);

  var gV2B = 0.15;

  var fxV2B = new Effect();
  fxV2B.randomShortDelay();
  fxV2B.on();
  fxV2B.output.gain.value = 1;

  var fxAV2B = [fxV2B];

  var fxAV2B = [fxAV2B];

  initInst(iV2B, instArray, fxAV2B, gV2B);

  var fV2C = globalFund*4;
  var rV2C = globalRate*0.5;
  var dV2C = globalDiv*4;

  var iV2C = new Instrument();
  iV2C.fmWPhrase1(fV2C, rV2C, dV2C);

  var gV2C = 0.15;

  var fxV2C = new Effect();
  fxV2C.randomShortDelay();
  fxV2C.on();
  fxV2C.output.gain.value = 1;

  var fxAV2C = [fxV2C];

  var fxAV2C = [fxAV2C];

  initInst(iV2C, instArray, fxAV2C, gV2C);

  var fV3A = globalFund*0.125;
  var rV3A = globalRate;
  var dV3A = globalDiv;

  var iV3A = new Instrument();
  iV3A.fmWPhrase1(fV3A, rV3A, dV3A);

  var gV3A = 0.3;

  var fxV3A = new Effect();
  fxV3A.randomShortDelay();
  fxV3A.on();
  fxV3A.output.gain.value = 1;

  var fxAV3A = [fxV3A];

  var fxAV3 = [fxAV3A];

  initInst(iV3A, instArray, fxAV3A, gV3A);

  var fV3B = globalFund*1;
  var rV3B = globalRate;
  var dV3B = globalDiv*2;

  var iV3B = new Instrument();
  iV3B.fmWPhrase1(fV3B, rV3B, dV3B);

  var gV3B = 0.15;

  var fxV3B = new Effect();
  fxV3B.randomShortDelay();
  fxV3B.on();
  fxV3B.output.gain.value = 1;

  var fxAV3B = [fxV3B];

  var fxAV3B = [fxAV3B];

  initInst(iV3B, instArray, fxAV3B, gV3B);

  var fV3C = globalFund*4;
  var rV3C = globalRate*0.5;
  var dV3C = globalDiv*4;

  var iV3C = new Instrument();
  iV3C.fmWPhrase1(fV3C, rV3C, dV3C);

  var gV3C = 0.15;

  var fxV3C = new Effect();
  fxV3C.randomShortDelay();
  fxV3C.on();
  fxV3C.output.gain.value = 1;

  var fxAV3C = [fxV3C];

  var fxAV3C = [fxAV3C];

  initInst(iV3C, instArray, fxAV3C, gV3C);

  var fV4A = globalFund*0.125;
  var rV4A = globalRate;
  var dV4A = globalDiv;

  var iV4A = new Instrument();
  iV4A.fmWPhrase1(fV4A, rV4A, dV4A);

  var gV4A = 0.3;

  var fxV4A = new Effect();
  fxV4A.randomShortDelay();
  fxV4A.on();
  fxV4A.output.gain.value = 1;

  var fxAV4A = [fxV4A];

  var fxAV4 = [fxAV4A];

  initInst(iV4A, instArray, fxAV4A, gV4A);

  var fV4B = globalFund*1;
  var rV4B = globalRate;
  var dV4B = globalDiv*2;

  var iV4B = new Instrument();
  iV4B.fmWPhrase1(fV4B, rV4B, dV4B);

  var gV4B = 0.15;

  var fxV4B = new Effect();
  fxV4B.randomShortDelay();
  fxV4B.on();
  fxV4B.output.gain.value = 1;

  var fxAV4B = [fxV4B];

  var fxAV4B = [fxAV4B];

  initInst(iV4B, instArray, fxAV4B, gV4B);

  var fV4C = globalFund*4;
  var rV4C = globalRate*0.5;
  var dV4C = globalDiv*4;

  var iV4C = new Instrument();
  iV4C.fmWPhrase1(fV4C, rV4C, dV4C);

  var gV4C = 0.15;

  var fxV4C = new Effect();
  fxV4C.randomShortDelay();
  fxV4C.on();
  fxV4C.output.gain.value = 1;

  var fxAV4C = [fxV4C];

  var fxAV4C = [fxAV4C];

  initInst(iV4C, instArray, fxAV4C, gV4C);

}

function fmWPSection(){

  var bL = 1/globalRate;

  var s1S =  bL*0;
  var s2S =  bL*4;
  var s3S =  bL*8;
  var s4S =  bL*12;
  var s5S =  bL*16;
  var s6S =  bL*20;
  var s7S =  bL*24;
  var s8S =  bL*28;
  var s9S =  bL*(32-16);
  var s10S = bL*(36-16);
  var s11S = bL*(40-16);
  var s12S = bL*(44-16);
  var s13S = bL*(48-16);
  var s14S = bL*(52-16);
  var s15S = bL*(56-16);
  var s16S = bL*(60-16);
  var s17S = bL*(64-16);

  // 1

  for(var i=0; i<3; i++){
    playInst(fMWPArray[i], s1S, s2S);
  }

  for(var i=3; i<6; i++){
    playInst(fMWPArray[i], s2S, s3S);
  }

  for(var i=0; i<3; i++){
    playInst(fMWPArray[i], s3S, s4S);
  }

  for(var i=3; i<6; i++){
    playInst(fMWPArray[i], s4S, s5S);
  }
/*
  // 2

  for(var i=0; i<6; i++){
    playInst(fMWPArray[i], s5S, s6S);
  }

  for(var i=3; i<6; i++){
    playInst(fMWPArray[i], s6S, s7S);
  }

  for(var i=0; i<6; i++){
    playInst(fMWPArray[i], s7S, s8S);
  }

  for(var i=3; i<6; i++){
    playInst(fMWPArray[i], s8S, s9S);
  }
*/
  // 3

  var rI = [0, 1]
  shuffle(rI);

  for(var i=6; i<9; i++){
    playInst(fMWPArray[i], s9S, s10S);
  }

  for(var i=(3*rI[0]); i<((3*rI[0])+3); i++){
    playInst(fMWPArray[i], s9S, s10S);
  }

  for(var i=9; i<12; i++){
    playInst(fMWPArray[i], s10S, s11S);
  }

  for(var i=(3*rI[1]); i<((3*rI[1])+3); i++){
    playInst(fMWPArray[i], s10S, s11S);
  }

  for(var i=6; i<9; i++){
    playInst(fMWPArray[i], s11S, s12S);
  }

  for(var i=(3*rI[0]); i<((3*rI[0])+3); i++){
    playInst(fMWPArray[i], s11S, s12S);
  }

  for(var i=9; i<12; i++){
    playInst(fMWPArray[i], s12S, s13S);
  }

  for(var i=(3*rI[1]); i<((3*rI[1])+3); i++){
    playInst(fMWPArray[i], s12S, s13S);
  }

  // 4

  var rA = [0, 1, 2, 3];
  shuffle(rA);

  for(var i=0; i<12; i++){
    playInst(fMWPArray[i], s13S, s14S);
  }

  for(var i=(3*rA[0]); i<((3*rA[0])+3); i++){
    playInst(fMWPArray[i], s14S, s15S);
  }

  for(var i=(3*rA[1]); i<((3*rA[1])+3); i++){
    playInst(fMWPArray[i], s14S, s15S);
  }

  for(var i=0; i<12; i++){
    playInst(fMWPArray[i], s15S, s16S);
  }


  for(var i=(3*rA[0]); i<((3*rA[0])+3); i++){
    playInst(fMWPArray[i], s16S, s17S);
  }

  for(var i=(3*rA[1]); i<((3*rA[1])+3); i++){
    playInst(fMWPArray[i], s16S, s17S);
  }


}
