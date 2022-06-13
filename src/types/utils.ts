/**
 * Merges the given interfaces `T` and `U` overwriting any common field with
 * the latter.
 */
export type Overwrite<T, U> = Omit<T, keyof U> & U;
