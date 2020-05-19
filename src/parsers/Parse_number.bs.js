// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

import * as Utils from "../core/Utils.bs.js";

var onlyNumericRe = /[\d.]/g;

function testNumber(val_) {
  if (isNaN(Utils.$$parseFloat(val_))) {
    return false;
  } else {
    return onlyNumericRe.test(val_);
  }
}

var parseNumber = Utils.$$parseFloat;

export {
  testNumber ,
  parseNumber ,
  
}
/* No side effect */