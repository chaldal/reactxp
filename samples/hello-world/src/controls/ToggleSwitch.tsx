/**
 * ToggleSwitch.tsx
 * Copyright: Microsoft 2017
 *
 * A simple toggle control built in ReactXP that allows users to
 * pick between two values.
 */
import * as React from 'react';
import * as RX from 'reactxp';

export interface ToggleSwitchProps extends RX.CommonProps {
    value?: boolean;
    onChange?: (newValue: boolean) => void;
}

const ANIMATION_DURATION = 250; // In milliseconds
const KNOB_LEFT_OFF = 2;        // In pixels
const KNOB_LEFT_ON = 22;        // In pixels

const _styles = {
    container: RX.Styles.createButtonStyle({
        flexDirection: 'row',
        alignItems: 'center'
    }),
    toggleSwitch: RX.Styles.createViewStyle({
        flexDirection: 'row',
        borderRadius: 15,
        marginVertical: 8,
        height: 30,
        width: 50,
        backgroundColor: '#ddd'
    }),
    toggleSwitchBackground: RX.Styles.createViewStyle({
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        borderRadius: 15
    }),
    toggleKnob: RX.Styles.createViewStyle({
        top: 2,
        height: 26,
        width: 26,
        borderRadius: 13,
        backgroundColor: 'white'
    })
};

export class ToggleSwitch extends RX.Component<ToggleSwitchProps, RX.Stateless> {
    private _knobLeftAnimationValue: RX.Animated.Value;
    private _knobLeftAnimationStyle: RX.Types.AnimatedViewStyleRuleSet;

    private _toggleColorAnimationValue: RX.Animated.Value;
    private _toggleColorAnimationStyle: RX.Types.AnimatedViewStyleRuleSet;

    constructor(props: ToggleSwitchProps) {
        super(props);

        // This value controls the left offset of the knob, which we will
        // animate when the user toggles the control.
        this._knobLeftAnimationValue = RX.Animated.createValue(props.value ? KNOB_LEFT_ON : KNOB_LEFT_OFF);
        this._knobLeftAnimationStyle = RX.Styles.createAnimatedViewStyle({
            left: this._knobLeftAnimationValue
        });

        // This value controls the background color of the control. Here we make
        // use of the interpolate method to smoothly transition between two colors.
        this._toggleColorAnimationValue = RX.Animated.createValue(props.value ? 1 : 0);
        this._toggleColorAnimationStyle = RX.Styles.createAnimatedTextInputStyle({
            backgroundColor: RX.Animated.interpolate(this._toggleColorAnimationValue, [0, 1], ['#66f', '#ddd'])
        });
    }

    componentDidUpdate(prevProps: ToggleSwitchProps) {
        // If the value of the toggle changes, animate the toggle sliding
        // from one side to the other. In parallel, animate the opacity change.
        if (prevProps.value !== this.props.value) {
            RX.Animated.parallel([
                RX.Animated.timing(this._knobLeftAnimationValue, {
                    duration: ANIMATION_DURATION,
                    toValue: this.props.value ? KNOB_LEFT_ON : KNOB_LEFT_OFF,
                    easing: RX.Animated.Easing.InOut()
                }),

                RX.Animated.timing(this._toggleColorAnimationValue, {
                    duration: ANIMATION_DURATION,
                    toValue: this.props.value ? 1 : 0,
                    easing: RX.Animated.Easing.InOut()
                })
            ])
                .start();
        }
    }

    render() {
        const backgroundStyle = [_styles.toggleSwitchBackground, this._toggleColorAnimationStyle];
        const knobStyles = [_styles.toggleKnob, this._knobLeftAnimationStyle];

        return (
            <RX.Button style={ _styles.container } onPress={ this._handleClick }>
                <RX.View style={ _styles.toggleSwitch }>
                    <RX.Animated.View style={ backgroundStyle }/>
                    <RX.Animated.View style={ knobStyles }/>
                </RX.View>
            </RX.Button>
        );
    }

    private _handleClick = (e: RX.Types.SyntheticEvent) => {
        e.stopPropagation();

        if (this.props.onChange) {
            this.props.onChange(!this.props.value);
        }
    }
}
