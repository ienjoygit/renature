// Generated by ReScript, PLEASE EDIT WITH CARE

import * as $$Array from "bs-platform/lib/es6/array.js";
import * as Parse_unit from "./Parse_unit.bs.js";
import * as Parse_number from "./Parse_number.bs.js";

var _map = {"translate":"translate","translateX":"translateX","translateY":"translateY","translateZ":"translateZ","skew":"skew","skewX":"skewX","skewY":"skewY","skewZ":"skewZ","rotate":"rotate","rotateX":"rotateX","rotateY":"rotateY","rotateZ":"rotateZ","scale":"scale","scaleX":"scaleX","scaleY":"scaleY","scaleZ":"scaleZ","perspective":"perspective"};

var transformRe = /(\w+)\(([^)]*)\)/g;

function testTransform(val_) {
  var transform = transformRe.exec(val_);
  transformRe.lastIndex = 0;
  if (transform !== null) {
    return transform.filter(function (param, i) {
                  if (i === 1) {
                    return true;
                  } else {
                    return i === 2;
                  }
                }).every(function (c) {
                if (c == null) {
                  return false;
                }
                var isTransformUnit = Parse_unit.testUnit(c);
                var isTransformNumber = Parse_number.testNumber(c);
                var match = _map[c];
                var isTransformProperty = match !== undefined;
                var isTransformMultiple = c.split(", ").every(function (s) {
                      if (Parse_unit.testUnit(s)) {
                        return true;
                      } else {
                        return Parse_number.testNumber(s);
                      }
                    });
                if (isTransformUnit || isTransformNumber || isTransformProperty) {
                  return true;
                } else {
                  return isTransformMultiple;
                }
              });
  } else {
    return false;
  }
}

var transformsRe = /(?:[^\s(]+|\([^)]*\))+/g;

function testTransforms(val_) {
  var transforms = val_.match(transformsRe);
  if (transforms !== null) {
    return transforms.every(testTransform);
  } else {
    return false;
  }
}

function parseTransform(val_) {
  var transform = transformRe.exec(val_);
  transformRe.lastIndex = 0;
  var t = {
    contents: {
      transform: null,
      transformProperty: null
    }
  };
  if (transform === null) {
    return t.contents;
  }
  var captures = transform.filter(function (param, i) {
        if (i === 1) {
          return true;
        } else {
          return i === 2;
        }
      });
  $$Array.iteri((function (i, propOrValue) {
          if (i === 0) {
            var init = t.contents;
            t.contents = {
              transform: init.transform,
              transformProperty: propOrValue
            };
            return ;
          }
          var init$1 = t.contents;
          t.contents = {
            transform: propOrValue,
            transformProperty: init$1.transformProperty
          };
          
        }), captures);
  return t.contents;
}

function parseTransforms(val_) {
  var transforms = val_.match(transformsRe);
  if (transforms !== null) {
    return transforms;
  } else {
    return [];
  }
}

export {
  testTransform ,
  testTransforms ,
  parseTransform ,
  parseTransforms ,
  
}
/* No side effect */
