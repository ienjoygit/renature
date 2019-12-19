/* TypeScript file generated by genType. */
/* eslint-disable import/first */


// tslint:disable-next-line:no-var-requires
const Curry = require('bs-platform/lib/es6/curry.js');

// tslint:disable-next-line:no-var-requires
const Interpolate_transformBS = require('./Interpolate_transform.bs');

// tslint:disable-next-line:interface-over-type-literal
export type cssTransform = { readonly transform: string; readonly transformProperty: (null | undefined | string) };

export const parseTransform: (_1:string) => cssTransform = function (Arg1: any) {
  const result = Interpolate_transformBS.parseTransform(Arg1);
  return {transform:result[0], transformProperty:result[1]}
};

export const remapTransform: (_1:{
  readonly range: [number, number]; 
  readonly domain: [string, string]; 
  readonly value: number
}) => string = function (Arg1: any) {
  const result = Curry._3(Interpolate_transformBS.remapTransform, Arg1.range, Arg1.domain, Arg1.value);
  return result
};
