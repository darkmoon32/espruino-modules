	/* Copyright (c) 2013 Gordon Williams, Pur3 Ltd. See the file LICENSE for copying permission. */
/*
Module for connecting to Rotary encoder. 

*/

var step = 0;
function MyEncoder(pina, pinb, holes) {
  this.HOLES = holes * 2;
  this.PINA = pina;
  this.PINB = pinb;
  this.angleOneStep = 360 / holes;
  this.Encoder = require("Encoder").connect(pina, pinb,function (direction) {
    step++;
  });
}

MyEncoder.prototype.getRounds = function(){
  return Math.floor(step / this.HOLES);
};

MyEncoder.prototype.clearRounds = function(){
  step = 0;
};

MyEncoder.prototype.getSteps = function(){
  return step / 2;
};

MyEncoder.prototype.getAngle = function(){
  return (((step / 2) % this.HOLES) * this.angleOneStep) % 360;
}

exports.connect = function(pina, pinb, holes) {
  return new MyEncoder(pina, pinb, holes);
};
