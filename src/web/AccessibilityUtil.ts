/**
 * AccessibilityUtil.ts
 *
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT license.
 *
 * Web-specific implementation of accessiblity functions for cross-platform
 * ReactXP framework.
 */

import { AccessibilityUtil as CommonAccessibiltiyUtil } from '../common/AccessibilityUtil';
import { Types } from '../common/Interfaces';

import * as _ from './utils/lodashMini';

// Map of accessibility trait to an aria role attribute.
// What's a role attribute? https://www.w3.org/wiki/PF/XTech/HTML5/RoleAttribute
const roleMap: { [key: string]: string } = {
    [Types.AccessibilityRole.None]: 'presentation',
    [Types.AccessibilityRole.Button]: 'button',
    [Types.AccessibilityRole.Link]: 'link',
    [Types.AccessibilityRole.Header]: 'heading',
    [Types.AccessibilityRole.Search]: 'search',
    [Types.AccessibilityRole.Image]: 'img',
    [Types.AccessibilityRole.Summary]: 'region',
    [Types.AccessibilityRole.Adjustable]: 'slider',
    [Types.AccessibilityRole.Menu]: 'menu',
    [Types.AccessibilityRole.MenuItem]: 'menuitem',
    [Types.AccessibilityRole.MenuBar]: 'menubar',
    [Types.AccessibilityRole.Tab]: 'tab',
    [Types.AccessibilityRole.TabList]: 'tablist',
    [Types.AccessibilityRole.List]: 'list',
    [Types.AccessibilityRole.ListItem]: 'listitem',
    [Types.AccessibilityRole.ListBox]: 'listbox',
    [Types.AccessibilityRole.Group]: 'group',
    [Types.AccessibilityRole.CheckBox]: 'checkbox',
    [Types.AccessibilityRole.ComboBox]: 'combobox',
    [Types.AccessibilityRole.Log]: 'log',
    [Types.AccessibilityRole.Status]: 'status',
    [Types.AccessibilityRole.Dialog]: 'dialog',
    [Types.AccessibilityRole.Switch]: 'switch',
};

// Map of accesssibility live region to an aria-live property.
const liveRegionMap: { [key: string]: Types.AriaLive } = {
    [Types.AccessibilityLiveRegion.None]: 'off',
    [Types.AccessibilityLiveRegion.Assertive]: 'assertive',
    [Types.AccessibilityLiveRegion.Polite]: 'polite',
};

export class AccessibilityUtil extends CommonAccessibiltiyUtil {
    // Web equivalent value for aria-live property.
    accessibilityLiveRegionToString(liveRegion: Types.AccessibilityLiveRegion): Types.AriaLive | undefined {
        if (liveRegion) {
            return liveRegionMap[liveRegion];
        }
        return undefined;
    }

    // Web equivalent value for role property.
    // NOTE: Web only supports a single aria-role on a component.
    accessibilityRoleToString(roles: Types.AccessibilityRole | Types.AccessibilityRole[] | undefined,
            defaultRole?: Types.AccessibilityRole): string | undefined {
        // Combine & remove duplicate traits.
        let combinedTraits: Types.AccessibilityRole[] = defaultRole ? [defaultRole] : [];

        if (roles) {
            combinedTraits = _.union(combinedTraits, Array.isArray(roles) ? roles : [roles]);
        }

        // Max enum value in this array of traits is role for web. Return corresponding
        // role string from roleMap.
        return combinedTraits.length > 0 ?
            roleMap[_.max(_.filter(combinedTraits, t => roleMap.hasOwnProperty(t as any)))!]
            : undefined;
    }

    accessibilityRoleAndStateToAriaSelected(roles: Types.AccessibilityRole | Types.AccessibilityRole[] | undefined, state: Types.AccessibilityState | undefined): boolean | undefined {
        // Walk through each trait and check if there's a selected trait. Return if one is found.
        if (roles && Array.isArray(roles) && roles.indexOf(Types.AccessibilityRole.Tab) !== -1 && state) {
            return state.selected
        }

        // Here we are returning undefined if the above condition is not met
        // as we dont want to pollute the dom with "aria-selected = false" for every falsy condition
        return undefined;
    }

    accessibilityRoleAndStateToAriaChecked(roles: Types.AccessibilityRole | Types.AccessibilityRole[] | undefined, state: Types.AccessibilityState | undefined): boolean | undefined {
        // Walk through each trait and check if there's a checked trait. Return if one is found.
        if (roles && Array.isArray(roles) && roles.indexOf(Types.AccessibilityRole.CheckBox) !== -1 && state) {
            return state.checked == true
        }

        // Here we are returning undefined if the above condition is not met
        // as we dont want to pollute the dom with "aria-checked = false" for every falsy condition
        return undefined;
    }

    accessibilityRoleAndStateToAriaHasPopup(roles: Types.AccessibilityRole | Types.AccessibilityRole[] | undefined): boolean | undefined {
        // Walk through each trait and check if there's a hasPopup trait. Return if one is found.
        if (roles && Array.isArray(roles) && roles.indexOf(Types.AccessibilityRole.HasPopup) !== -1) {
            true
        }

        // Here we are returning undefined if the above condition is not met
        // as we dont want to pollute the dom with "aria-checked = false" for every falsy condition
        return undefined;
    }
}

export default new AccessibilityUtil();
