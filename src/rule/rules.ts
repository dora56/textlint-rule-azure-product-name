import {
  type AzureProductParams,
  isAzurePrefix,
  hasIntermediateBlank,
  hasPascalCase,
  getPrefixRemovedAzureProduct,
  getFullProductName,
} from "./azureProducts";

import { prefixAzure, prefixMicrosoft } from "./types";
type Option = {
  wordBoundary?: true;
};

export type RuleParam = {
  expected: string;
  options?: Option;
  patterns?: string[];
};
type RuleParamExcludingPatterns = Omit<RuleParam, "patterns">;

export type WordBoundaryRuleParam = RuleParamExcludingPatterns & {
  options: Option;
};

export type Rules = RuleParam[];

export function createAzureProductRules(product: AzureProductParams[]): Rules {
  const rules: RuleParam[] = [];
  product.forEach((product) => {
    product = getPrefixRemovedAzureProduct(product);
    rules.push(createWordBoundaryRule(product));
    rules.push(createWrongPrefixRule(product));
    const maybeSpacingRule = createMaybeSpacingRule(product);
    if (maybeSpacingRule !== undefined) {
      rules.push(maybeSpacingRule);
    }
  });
  return rules;
}

// https://github.com/prh/prh/issues/34
function escapePattern(pattern: string): string {
  if (pattern.match(/-/) == null) return pattern;
  return `/${pattern}/`;
}

function createWordBoundaryRule(
  product: AzureProductParams
): WordBoundaryRuleParam {
  return { expected: product.name, options: { wordBoundary: true } };
}

function createWrongPrefixRule(product: AzureProductParams): RuleParam {
  const wrongPattern = isAzurePrefix(product.prefix)
    ? `${prefixMicrosoft} ${product.name}`
    : `${prefixAzure} ${product.name}`;
  const patternEscaper = escapePattern(wrongPattern);
  return {
    expected: getFullProductName(product),
    patterns: [patternEscaper],
    options: { wordBoundary: true },
  };
}

function createMaybeSpacingRule(
  product: AzureProductParams
): RuleParam | undefined {
  const patterns: string[] = [];
  
  if (hasIntermediateBlank(product.name)) {
    patterns.push(noSpacePattern(product.name));
  }

  if (hasPascalCase(product.name)) {
    patterns.push(modifiedPascalCasePattern(product.name));
    patterns.push(spaceDelimitedPattern(product.name));
  }

  if (patterns.length === 0) return undefined;
  const rule: RuleParam = {
    expected: product.name,
    patterns: patterns.map((pattern) => escapePattern(pattern)),
    options: { wordBoundary: true },
  };

  return rule;
}

function noSpacePattern(name: string): string {
  const noSpaceName = name.split(" ").join("");
  return noSpaceName;
}

const pascalCasePattern = /([A-Z][a-z]+)([A-Z][a-z]+)/g;

function spaceDelimitedPattern(name: string): string {
  const spaceDelimitedName = name.replace(pascalCasePattern, "$1 $2");
  return spaceDelimitedName;
}

// パスカルケースを先頭の以外の大文字を小文字に変換するパターン関数
// 例: AzureDevOps -> Azuredevops

function modifiedPascalCasePattern(name: string): string {
  return name
      .split('')
      .map((char: string, index: number) => index !== 0 && char === char.toUpperCase() ? char.toLowerCase() : char)
      .join('');
}
