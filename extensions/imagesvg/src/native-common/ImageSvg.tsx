/**
 * ImageSvg.tsx
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT license.
 *
 * RN-specific implementation of the cross-platform abstraction for
 * SVG (scalable vector graphics) images.
 */

import * as React from 'react';
import { Svg, SvgProps } from 'react-native-svg';

import assert from '../common/assert';

export class ImageSvg extends React.Component<SvgProps, {}> {
    render() {
        assert(this.props.width && this.props.height, 'The width and height on imagesvg are mandatory.');

        return (
            <Svg
                width={ this.props.width }
                height={ this.props.height }
                style={ this.props.style }
                opacity={ this.props.opacity }
                preserveAspectRatio={ this.props.preserveAspectRatio }
                viewBox={ this.props.viewBox }
            >
                {this.props.children}
            </Svg>
        );
    }
}

export default ImageSvg;
