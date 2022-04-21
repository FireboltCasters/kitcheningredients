export function multiply(a: number, b: number): Promise<number> {
  return Promise.resolve(a * b);
}

import App from "./ignoreCoverage/App";
export {App};

import {ConfigHolder} from "./ignoreCoverage/ConfigHolder";
export {ConfigHolder}
