import React from "react";

export enum CookieTypeEnum {
  Necessary = "Necessary",
  Preference = "Preference",
  Statistics = "Statistics",
  Marketing = "Marketing"
}

export type Cookie = {
  name: string;
  value: string;
  type: CookieTypeEnum;
}

export type CookieConfigType = {
  date_consent: string,
  [CookieTypeEnum.Necessary]: boolean,
  [CookieTypeEnum.Preference]: boolean,
  [CookieTypeEnum.Statistics]: boolean,
  [CookieTypeEnum.Marketing]: boolean,
}

export function getDefaultCookieConfig(): CookieConfigType {
  let empty: any = {
    date_consent: null,
  }
  Object.values(CookieTypeEnum).forEach((cookieType) => {
    empty[cookieType] = false;
  })
  empty[CookieTypeEnum.Necessary] = true;
  return empty;
}
