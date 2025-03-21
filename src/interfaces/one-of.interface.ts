export type OneOf<T extends Array<unknown>> = T extends Array<infer U> ? U : void;
