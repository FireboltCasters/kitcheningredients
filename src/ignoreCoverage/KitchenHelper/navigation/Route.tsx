// @ts-nocheck
import React, {FunctionComponent} from 'react';

export class Route{
    component: FunctionComponent;
    template: FunctionComponent;
    title: string;
    route: string;
    params: any;

    constructor(component: FunctionComponent, template: FunctionComponent = null,title: string, route: string, params: any=null) {
        this.component = component;
        this.template = template;
        this.title = title;
        this.route = route;
        this.params = params;
    }

}
