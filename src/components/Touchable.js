import PropTypes from "prop-types";
import React, {PureComponent} from "react";
import {
    Platform,
    TouchableHighlight,
    TouchableNativeFeedback,
    TouchableOpacity
} from "react-native";


// constants
const TOUCH_BEHAVIORS = ["fade", "highlight"];


// class definition
export class Touchable extends PureComponent {

    static propTypes = {
        children: PropTypes.any,
        touchBehavior: PropTypes.oneOf(TOUCH_BEHAVIORS),
        opacity: PropTypes.number,
        onPress: PropTypes.func
    };

    static defaultProps = {
        touchBehavior: TOUCH_BEHAVIORS[0],
        opacity: 0.4,
        onPress: () => undefined
    };

    render() {

        // resolve properties
        const {children, touchBehavior, opacity, onPress} = this.props;

        // render iOS touchable component
        if (Platform.OS === "ios") {

            // use highlight touchable if specified
            if (touchBehavior === "highlight") {
                return (
                    <TouchableHighlight
                        onPress={onPress}>{children}</TouchableHighlight>
                );
            }

            // otherwise fallback to opacity touchable
            else {
                return (
                    <TouchableOpacity activeOpacity={opacity}
                                      onPress={onPress}>{children}</TouchableOpacity>
                );
            }
        }

        // or render native touchable for "ripple" effect on android
        else {
            return (
                <TouchableNativeFeedback
                    onPress={onPress}>{children}</TouchableNativeFeedback>
            );
        }
    }
}