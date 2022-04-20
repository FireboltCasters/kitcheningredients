"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavigationQueueItem = void 0;
class NavigationQueueItem {
    routeName;
    props;
    resetHistory;
    constructor(routeName, props, resetHistory = false) {
        this.routeName = routeName;
        this.props = props;
        this.resetHistory = resetHistory;
    }
}
exports.NavigationQueueItem = NavigationQueueItem;
