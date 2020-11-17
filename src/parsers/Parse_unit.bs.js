// Generated by ReScript, PLEASE EDIT WITH CARE


var _map = {"px":"px","em":"em","rem":"rem","ch":"ch","vw":"vw","vh":"vh","vmin":"vmin","vmax":"vmax","pct":"%","deg":"deg","rad":"rad","turn":"turn"};

var _revMap = {"px":"px","em":"em","rem":"rem","ch":"ch","vw":"vw","vh":"vh","vmin":"vmin","vmax":"vmax","%":"pct","deg":"deg","rad":"rad","turn":"turn"};

var numericRe = /[\d.-]+/;

function decomposeUnit(val_) {
  var value = parseFloat(val_);
  var unit = _revMap[val_.replace(numericRe, "")];
  return {
          value: value,
          unit: unit
        };
}

function testUnit(val_) {
  var match = decomposeUnit(val_);
  var unit = match.unit;
  if (unit !== undefined && !isNaN(match.value)) {
    return val_.endsWith(_map[unit]);
  } else {
    return false;
  }
}

function parseUnit(val_) {
  var match = decomposeUnit(val_);
  var unit = match.unit;
  var value = match.value;
  if (unit !== undefined) {
    return {
            value: value,
            unit: _map[unit]
          };
  } else {
    return {
            value: value,
            unit: null
          };
  }
}

export {
  testUnit ,
  parseUnit ,
  
}
/* No side effect */
