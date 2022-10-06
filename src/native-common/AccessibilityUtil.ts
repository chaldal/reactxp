/**
 * AccessibilityUtil.ts
 *
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT license.
 *
 * RN-specific implementation of accessiblity functions for cross-platform
 * ReactXP framework.
 */

import * as React from 'react';
import * as RN from 'react-native';

import {
    AccessibilityPlatformUtil,
    AccessibilityUtil as CommonAccessibilityUtil,
} from '../common/AccessibilityUtil';
import { Types } from '../common/Interfaces';

import * as _ from './utils/lodashMini';

export { ImportantForAccessibilityValue } from '../common/AccessibilityUtil';

type AccessibilityLiveRegionValue = 'none' | 'polite' | 'assertive';

const liveRegionMap: { [key: string]: AccessibilityLiveRegionValue } = {
    [Types.AccessibilityLiveRegion.None]: 'none',
    [Types.AccessibilityLiveRegion.Assertive]: 'assertive',
    [Types.AccessibilityLiveRegion.Polite]: 'polite',
};

const rolesMap: { [key: string]: RN.AccessibilityRole } = {
    [Types.AccessibilityRole.None]: 'none',

    [Types.AccessibilityRole.Adjustable]: 'adjustable',
    [Types.AccessibilityRole.Alert]: 'alert',
    [Types.AccessibilityRole.Button]: 'button',
    [Types.AccessibilityRole.CheckBox]: 'checkbox',
    [Types.AccessibilityRole.ComboBox]: 'combobox',
    [Types.AccessibilityRole.Header]: 'header',
    [Types.AccessibilityRole.Image]: 'image',
    [Types.AccessibilityRole.Imagebutton]: 'imagebutton',
    [Types.AccessibilityRole.Keyboardkey]: 'keyboardkey',
    [Types.AccessibilityRole.Link]: 'link',
    [Types.AccessibilityRole.Menu]: 'menu',
    [Types.AccessibilityRole.MenuBar]: 'menubar',
    [Types.AccessibilityRole.MenuItem]: 'menuitem',
    [Types.AccessibilityRole.None]: 'none',
    [Types.AccessibilityRole.ProgressBar]: 'progressbar',
    [Types.AccessibilityRole.Radio]: 'radio',
    [Types.AccessibilityRole.RadioGroup]: 'radiogroup',
    [Types.AccessibilityRole.ScrollBar]: 'scrollbar',
    [Types.AccessibilityRole.Search]: 'search',
    [Types.AccessibilityRole.SpinButton]: 'spinbutton',
    [Types.AccessibilityRole.Summary]: 'summary',
    [Types.AccessibilityRole.Switch]: 'switch',
    [Types.AccessibilityRole.Tab]: 'tab',
    [Types.AccessibilityRole.TabList]: 'tablist',
    [Types.AccessibilityRole.Text]: 'text',
    [Types.AccessibilityRole.Timer]: 'timer',
    [Types.AccessibilityRole.ToggleButton]: 'togglebutton',
    [Types.AccessibilityRole.Toolbar]: 'toolbar'

};

export class AccessibilityUtil extends CommonAccessibilityUtil {
    // Handle to accessibility platform helper instance that gets initialized during ReactXP initialization using the setter.
    private _instance!: AccessibilityPlatformUtil;

    setAccessibilityPlatformUtil(instance: AccessibilityPlatformUtil): void {
        this._instance = instance;
    }

    // Converts an AccessibilityTrait to a string, but the returned value is only needed for iOS and UWP. Other platforms ignore it.
    // Presence of an AccessibilityTrait.None can make an element non-accessible on Android.
    // We use the override traits if they are present, else use the default trait.
    accessibilityRoleToString(overrideRole: Types.AccessibilityRole | undefined,
            defaultRole?: Types.AccessibilityRole): RN.AccessibilityRole | undefined {
        // Check if there are valid override traits. Use them or else fallback to default traits.
        if (!overrideRole && !defaultRole) {
            return undefined;
        }

        const role: Types.AccessibilityRole | undefined =  overrideRole ? overrideRole : defaultRole;

        return role ? rolesMap[role] : undefined;
    }

    overrideAccessibilityState(overrideState: RN.AccessibilityState | undefined, defaultState?: RN.AccessibilityState): RN.AccessibilityState | undefined {
        if (!overrideState && !defaultState) {
            return undefined;
        }

        let defaultStateFallback = defaultState ? defaultState : {};

        return {...defaultStateFallback, ...overrideState}
    }

    // Converts an AccessibilityLiveRegion to a string, but the return value is only needed for Android. Other platforms ignore it.
    accessibilityLiveRegionToString(liveRegion: Types.AccessibilityLiveRegion | undefined): AccessibilityLiveRegionValue | undefined {
        if (liveRegion && liveRegionMap[liveRegion]) {
            return liveRegionMap[liveRegion];
        }
        return undefined;
    }

    // Platform specific accessibility APIs.
    setAccessibilityFocus(component: React.Component<any, any>): void {
        this._instance.setAccessibilityFocus(component);
    }
}

export default new AccessibilityUtil();
