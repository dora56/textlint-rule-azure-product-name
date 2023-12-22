import { createAzureProductRules } from '../../../src/rule/rules';
import { type AzureProductParams } from '../../../src/rule/azureProducts';

describe('rules', () => {
  const product: AzureProductParams = {
    name: 'Functions',
    prefix: 'Azure',
  };

  const product2: AzureProductParams = {
    name: 'Dev Box',
    prefix: 'Microsoft',
  };

  const product3: AzureProductParams = {
    name: 'Visual Studio',
    prefix: '',
  };

  const product4: AzureProductParams = {
    name: 'DevOps',
    prefix: 'Azure',
  };
  const product5: AzureProductParams = {
    name: 'Container Apps',
    prefix: 'Azure',
  };

  it('createAzureProductRules', () => {
    const products: AzureProductParams[] = [
      product,
      product2,
      product3,
      product4,
      product5
    ];
    const result = createAzureProductRules(products);
    expect(result).toEqual([
      { expected: product.name, options: { wordBoundary: true } },
      {
        expected: 'Azure Functions',
        patterns: ['Microsoft Functions'],
        options: { wordBoundary: true },
      },
      {
        expected: 'Azure Functions',
        patterns: ['Azure Function'],
        options: { wordBoundary: true },
      },
      {
        expected: 'Dev Box',
        options: { wordBoundary: true },
      },
      {
        expected: 'Microsoft Dev Box',
        patterns: ['Azure Dev Box'],
        options: { wordBoundary: true },
      },
      {
        expected: 'Dev Box',
        patterns: ['DevBox'],
        options: { wordBoundary: true },
      },
      {
        expected: 'Visual Studio',
        options: { wordBoundary: true },
      },
      {
        expected: 'Visual Studio',
        patterns: ['Azure Visual Studio'],
        options: { wordBoundary: true },
      },
      {
        expected: 'Visual Studio',
        patterns: ['VisualStudio'],
        options: { wordBoundary: true },
      },
      {
        expected: 'DevOps',
        options: { wordBoundary: true },
      },
      {
        expected: 'Azure DevOps',
        patterns: ['Microsoft DevOps'],
        options: { wordBoundary: true },
      },
      {
        expected: 'DevOps',
        patterns: ['Devops', 'Dev Ops'],
        options: { wordBoundary: true },
      },
      {
        expected: 'Container Apps',
        options: { wordBoundary: true },
      },
      {
        expected: 'Azure Container Apps',
        patterns: ['Microsoft Container Apps'],
        options: { wordBoundary: true },
      },
      {
        expected: 'Container Apps',
        patterns: ['ContainerApps'],
        options: { wordBoundary: true },
      },
      {
        expected: 'Container Apps',
        patterns: ['Container App'],
        options: { wordBoundary: true },
      },
    ]);
  });
});
