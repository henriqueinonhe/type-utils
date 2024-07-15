export type Override<
  Target extends Record<string, unknown>,
  Source extends Partial<Record<DistributedKeyOf<Target>, unknown>>,
> = Target extends unknown
  ? Omit<Target, keyof Source> &
      Pick<Source, keyof Source & DistributedKeyOf<Target>>
  : never;

export type ArrayType<T extends Array<unknown>> = T extends Array<infer U>
  ? U
  : never;

export type ExtractTypeFromTypeGuard<
  T extends (value: unknown) => value is unknown,
> = T extends (value: unknown) => value is infer U ? U : never;

export type KeyLike = string | number | symbol;

// Omit doesn't distribute unions, so we need to do it manually
// Check https://github.com/microsoft/TypeScript/issues/39556
export type DistributedOmit<T, K extends KeyLike> = T extends unknown
  ? Omit<T, K>
  : never;

export type DistributedKeyOf<T> = T extends unknown ? keyof T : never;

export type UnionAllKeys<T> = {
  [K in DistributedKeyOf<T>]: T extends unknown
    ? K extends keyof T
      ? T[K]
      : undefined
    : never;
};

export type PickAllKeys<T, K extends DistributedKeyOf<T>> = Pick<
  UnionAllKeys<T>,
  K
>;

/**
 * Converts an interface to a type.
 *
 * Interfaces and types have slightly different
 * semantics.
 *
 * For example, a type is assignable to Record<string, unknown>
 * whereas an interface isn't.
 */
export type InterfaceToType<T> = {
  [Key in keyof T]: T[Key];
};

/**
 * Checks whether we exhausted all cases for a given literal/enum
 */
export const checkExhaustiveMatching = (value: never): never => {
  throw new Error("Failed exhaustive matching!");
};
