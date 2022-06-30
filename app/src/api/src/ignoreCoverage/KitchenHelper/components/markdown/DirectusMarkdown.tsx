// @ts-nocheck
import React, {FunctionComponent, useEffect, useState} from "react";
import {ThemedMarkdown} from "./ThemedMarkdown";

export interface AppState{
    data: any,
    fieldname: string
}
export const DirectusMarkdown: FunctionComponent<AppState> = (props) => {

    let markdown = props.data?.[props?.fieldname]

    return (
      <ThemedMarkdown>
          {markdown}
      </ThemedMarkdown>
    )
}
