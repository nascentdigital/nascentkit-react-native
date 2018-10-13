import PropTypes from "prop-types";
import React, {PureComponent} from "react";
import {
    View
} from "react-native";


// constants
const DIRECTION_VALUES = ["column", "row"];
const JUSTIFY_VALUES = ["flex-start", "center", "flex-end", "space-around", "space-between", "space-evenly"];
const ALIGN_ITEMS_VALUES = ["stretch", "flex-start", "center", "flex-end", "baseline"];
const TOUCHLESS_VALUES = ["self", "content"];


// class definition
export class Container extends PureComponent {

    static propTypes = {
        children: PropTypes.any,
        style: PropTypes.any,
        direction: PropTypes.oneOf(DIRECTION_VALUES),
        justify: PropTypes.oneOf(JUSTIFY_VALUES),
        alignItems: PropTypes.oneOf(ALIGN_ITEMS_VALUES),
        alignSelf: PropTypes.oneOf([...ALIGN_ITEMS_VALUES, "auto"]),
        flex: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.bool
        ]),
        wrap: PropTypes.bool,
        touchless: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.oneOf(TOUCHLESS_VALUES)
        ]),
        onResize: PropTypes.func,
    };

    static defaultProps = {
        direction: DIRECTION_VALUES[0],
        justify: JUSTIFY_VALUES[0],
        alignItems: ALIGN_ITEMS_VALUES[0],
        alignSelf: "auto",
        flex: 0,
        wrap: false,
        touchless: false,
        onResize: () => undefined
    };

    render() {

        // resolve properties
        const {style, children, direction, justify, alignItems, alignSelf, wrap, touchless} = this.props;

        // normalize flex
        let flex = this.props.flex;
        if (flex === true) {
            flex = 1;
        }
        else if (flex === false) {
            flex = 0;
        }

        // build styles
        const layoutStyle = {
            flex: flex,
            flexDirection: direction,
            flexWrap: wrap ? "wrap" : "nowrap",
            justifyContent: justify,
            alignItems,
            alignSelf
        };

        // determine pointer events
        let pointerEvents;
        if (touchless === true || touchless === "self") {
            pointerEvents = "box-none";
        }
        else if (touchless === "content") {
            pointerEvents = "none";
        }
        else {
            pointerEvents = "auto";
        }

        // render view
        return (
            <View style={[layoutStyle, style]}
                  pointerEvents={pointerEvents}
                  onLayout={this._onLayout}>
                {children}
            </View>
        );
    }

    _onLayout = ({nativeEvent}) => {
        const {onResize} = this.props;
        onResize(nativeEvent.layout);
    };
}