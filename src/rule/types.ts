export type Product = string;

export const prefixAzure = "Azure";
export const prefixMicrosoft = "Microsoft";
export const prefixNone = "";

export type Prefix =
  | typeof prefixAzure
  | typeof prefixMicrosoft
  | typeof prefixNone;
