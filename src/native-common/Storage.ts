/**
 * Storage.ts
 *
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT license.
 *
 * Native implementation of the cross-platform database storage abstraction.
 */
import * as RX from '../common/Interfaces';
import { Defer } from '../common/utils/PromiseDefer';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class Storage extends RX.Storage {
    getItem(key: string): Promise<string | undefined> {
        const deferred = new Defer<string | undefined>();

        AsyncStorage.getItem(key, (error: any, result: string) => {
            if (!error) {
                deferred.resolve(result || undefined);
            } else {
                deferred.reject(error);
            }
        }).catch(err => {
            deferred.reject(err);
        });

        return deferred.promise();
    }

    setItem(key: string, value: string): Promise<void> {
        const deferred = new Defer<void>();

        AsyncStorage.setItem(key, value, (error: any) => {
            if (!error) {
                deferred.resolve(void 0);
            } else {
                deferred.reject(error);
            }
        }).catch(err => {
            deferred.reject(err);
        });

        return deferred.promise();
    }

    removeItem(key: string): Promise<void> {
        const deferred = new Defer<void>();

        AsyncStorage.removeItem(key, (error: any) => {
            if (!error) {
                deferred.resolve(void 0);
            } else {
                deferred.reject(error);
            }
        }).catch(err => {
            deferred.reject(err);
        });

        return deferred.promise();
    }

    clear(): Promise<void> {
        const deferred = new Defer<void>();

        AsyncStorage.clear((error: any) => {
            if (!error) {
                deferred.resolve(void 0);
            } else {
                deferred.reject(error);
            }
        }).catch(err => {
            deferred.reject(err);
        });

        return deferred.promise();
    }
}

export default new Storage();
