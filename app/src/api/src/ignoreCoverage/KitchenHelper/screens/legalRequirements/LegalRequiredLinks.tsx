// @ts-nocheck
import React from "react";
import {LegalRequiredInternalLink} from "./LegalRequiredInternalLink";
import {Navigation} from "../../navigation/Navigation";
import {LegalRequiredCookieLink} from "./LegalRequiredCookieLink";

export const LegalRequiredLinks = (props) => {

  return(
    <>
      <LegalRequiredInternalLink requiredMenuKey={Navigation.DEFAULT_MENU_KEY_ABOUT_US} />
      <LegalRequiredInternalLink requiredMenuKey={Navigation.DEFAULT_MENU_KEY_PRIVACY_POLICY} />
      <LegalRequiredInternalLink requiredMenuKey={Navigation.DEFAULT_MENU_KEY_LICENSE} />
      <LegalRequiredCookieLink />
    </>
  )

}
