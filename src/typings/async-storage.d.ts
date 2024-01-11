declare module '@react-native-async-storage/async-storage' {
    type StorageValue = string | null;

    interface AsyncStorageStatic {
      setItem : (key: string, value: string, [callback]: ?(error: ?Error) => void) => Promise<void>,
      getItem : (key: string, [callback]: ?(error: ?Error, result: ?string) => void) => Promise<void>
      removeItem(key: string, [callback]: ?(error: ?Error) => void): Promise<void>
      mergeItem(key: string, value: string): Promise<void>;
      clear([callback]: ?(error: ?Error) => void): Promise<void>;
      getAllKeys(): Promise<string[]>;

      // Add other AsyncStorage methods if needed
    }

    const AsyncStorage: AsyncStorageStatic;

    export default AsyncStorage;
  }