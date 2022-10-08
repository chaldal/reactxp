/**
 * Picker.tsx
 *
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT license.
 *
 * RN-specific implementation of the cross-platform Picker abstraction.
 */


import * as RX from '../common/Interfaces';


export class Picker extends RX.Picker {
    render() {
        throw "Picker is removed from latest react-native! Use community picker";
        return null;
    }

    onValueChange = (itemValue: any, itemPosition: number) => {
        this.props.onValueChange(itemValue, itemPosition);
    };
}

export default Picker;
