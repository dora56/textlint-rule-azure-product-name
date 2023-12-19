import {
  getPrefix,
  isAzurePrefix,
  isMicrosoftPrefix,
  isNonePrefix,
  hasIntermediateBlank,
  hasPascalCase,
  getFullProductName,
  getPrefixRemovedAzureProduct,
} from '../../../src/rule/azureProducts';

describe('Azure Products', () => {
  test('getPrefix', () => {
    expect(getPrefix('Azure Functions')).toBe('Azure');
    expect(getPrefix('Microsoft Graph')).toBe('Microsoft');
    expect(getPrefix('Visual Studio')).toBe('');
  });

  test('isAzurePrefix', () => {
    expect(isAzurePrefix('Azure')).toBe(true);
    expect(isAzurePrefix('Microsoft')).toBe(false);
  });

  test('isMicrosoftPrefix', () => {
    expect(isMicrosoftPrefix('Microsoft')).toBe(true);
    expect(isMicrosoftPrefix('Azure')).toBe(false);
  });

  test('isNonePrefix', () => {
    expect(isNonePrefix('')).toBe(true);
    expect(isNonePrefix('Azure')).toBe(false);
  });

  test('hasIntermediateBlank', () => {
    expect(hasIntermediateBlank('Azure Functions')).toBe(true);
    expect(hasIntermediateBlank('VisualStudio')).toBe(false);
  });

  test('hasPascalCase', () => {
    expect(hasPascalCase('VisualStudio')).toBe(true);
    expect(hasPascalCase('Azure')).toBe(false);
  });

  test('getFullProductName', () => {
    expect(getFullProductName({ name: 'Functions', prefix: 'Azure' })).toBe(
      'Azure Functions',
    );
    expect(getFullProductName({ name: 'Graph', prefix: 'Microsoft' })).toBe(
      'Microsoft Graph',
    );
    expect(getFullProductName({ name: 'Visual Studio', prefix: '' })).toBe(
      'Visual Studio',
    );
  });

  test('getPrefixRemovedAzureProduct', () => {
    expect(
      getPrefixRemovedAzureProduct({
        name: 'Azure Functions',
        prefix: 'Azure',
      }),
    ).toEqual({ name: 'Functions', prefix: 'Azure' });
    expect(
      getPrefixRemovedAzureProduct({
        name: 'Microsoft Graph',
        prefix: 'Microsoft',
      }),
    ).toEqual({ name: 'Graph', prefix: 'Microsoft' });
    expect(
      getPrefixRemovedAzureProduct({ name: 'Visual Studio', prefix: '' }),
    ).toEqual({ name: 'Visual Studio', prefix: '' });
  });
});
