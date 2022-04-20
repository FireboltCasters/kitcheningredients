"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const react_1 = __importDefault(require("react"));
const Box_1 = __importDefault(require("../components/primitives/Box"));
const ResponsiveQueryProvider_1 = require("./useResponsiveQuery/ResponsiveQueryProvider");
function flattenChildren(children) {
    const childrenArray = react_1.default.Children.toArray(children);
    return childrenArray.reduce((flatChildren, child) => {
        if (child.type === react_1.default.Fragment) {
            return flatChildren.concat(flattenChildren(child.props.children));
        }
        flatChildren.push(child);
        return flatChildren;
    }, []);
}
const getSpacedChildren = (children, space, axis, reverse, divider) => {
    let childrenArray = react_1.default.Children.toArray(flattenChildren(children));
    childrenArray =
        reverse === 'reverse' ? [...childrenArray].reverse() : childrenArray;
    const orientation = axis === 'X' ? 'vertical' : 'horizontal';
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const responsiveQueryContext = react_1.default.useContext(ResponsiveQueryProvider_1.ResponsiveQueryContext);
    const disableCSSMediaQueries = responsiveQueryContext.disableCSSMediaQueries;
    // If there's a divider, we wrap it with a Box and apply vertical and horizontal margins else we add a spacer Box with height or width
    if (divider) {
        const spacingProp = {
            ...(axis === 'X' ? { mx: space } : { my: space }),
        };
        divider = react_1.default.cloneElement(divider, {
            orientation,
            ...spacingProp,
        });
        childrenArray = childrenArray.map((child, index) => {
            return (<react_1.default.Fragment key={child.key ?? `spaced-child-${index}`}>
                    {child}
                    {index < childrenArray.length - 1 && divider}
                </react_1.default.Fragment>);
        });
    }
    else {
        const spacingProp = {
            ...(axis === 'X' ? { width: space } : { height: space }),
        };
        childrenArray = childrenArray.map((child, index) => {
            return (<react_1.default.Fragment key={child.key ?? `spaced-child-${index}`}>
                    {child}
                    {disableCSSMediaQueries ? (index < childrenArray.length - 1 && <Box_1.default {...spacingProp}/>) : (<></>)}
                </react_1.default.Fragment>);
        });
    }
    return childrenArray;
};
exports.default = getSpacedChildren;
