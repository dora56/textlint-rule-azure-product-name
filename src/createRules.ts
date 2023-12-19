import { getAzureProductNames } from './rule/azureProducts';
import { createAzureProductRules } from './rule/rules';
import { writeRegularRules } from './rule/writeRuleFile';

const productUrl = 'https://azure.microsoft.com/en-us/products/';

export const createRules = async (): Promise<void> => {
  const products = await getAzureProductNames(productUrl);
  const rules = createAzureProductRules(products);
  writeRegularRules(rules);
};

if (require.main === module) createRules().catch(console.error);
