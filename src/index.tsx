export function multiply(a: number, b: number): Promise<number> {
  return Promise.resolve(a * b);
}

export * from "./ignoreCoverage/TextWithIcon";

import {OtherTextWithIcon} from "./ignoreCoverage/OtherTextWithIcon";
export {OtherTextWithIcon};
