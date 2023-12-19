import { scrapeAzureProducts } from "./crawler";
import { prefixAzure, prefixMicrosoft, prefixNone, type Prefix } from "./types";

export type AzureProductParams = {
  name: string;
  prefix: Prefix;
};

export const getAzureProductNames = async (
  url: string,
  scrapeAzureProductsFunc: (
    url: string
  ) => Promise<string[]> = scrapeAzureProducts
): Promise<AzureProductParams[]> => {
  const products = await scrapeAzureProductsFunc(url);
  return products.map(createAzureProductParam);
};

const createAzureProductParam = (product: string): AzureProductParams => {
  return { name: product, prefix: getPrefix(product) };
};

const pascalCasePattern = /([A-Z][a-z]+)([A-Z][a-z]+)/g;

export const getPrefix = (name: string): Prefix => {
  if (name.startsWith(prefixAzure)) return prefixAzure;
  if (name.startsWith(prefixMicrosoft)) return prefixMicrosoft;
  return prefixNone;
};

export const isAzurePrefix = (prefix: string): boolean => {
  return prefix === prefixAzure;
};

export const isMicrosoftPrefix = (prefix: string): boolean => {
  return prefix === prefixMicrosoft;
};

export const isNonePrefix = (prefix: string): boolean => {
  return prefix === prefixNone;
};

export const hasIntermediateBlank = (productName: string): boolean => {
  return productName.includes(" ");
};

export const hasPascalCase = (productName: string): boolean => {
  return productName.search(pascalCasePattern) !== -1;
};

export const getFullProductName = (param: AzureProductParams): string => {
  if (param.prefix === prefixNone) return param.name;
  return `${param.prefix} ${param.name}`;
};

export const getPrefixRemovedAzureProduct = (
  params: AzureProductParams
): AzureProductParams => {
  let product = getPrefixRemovedProduct(params);
  product = getParenthesesRemovedProduct(product);
  return product;
};

const getPrefixRemovedProduct = (
  param: AzureProductParams
): AzureProductParams => {
  if (param.prefix === prefixNone) {
    return param;
  }
  const removedProductName = param.name.replace(param.prefix, "").trim();
  return { name: removedProductName, prefix: param.prefix };
};

// remove parentheses like Supply Chain (Preview) => Supply Chain
// or Supply Chain {Preview} => Supply Chain
const getParenthesesRemovedProduct = (
  param: AzureProductParams
): AzureProductParams => {
  const regex = / (\(|\{).*(\)|\})$/;
  const removedProductName = param.name.replace(regex, "").trim();
  return { name: removedProductName, prefix: param.prefix };
};
