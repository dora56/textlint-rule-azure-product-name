import TextLintTester from 'textlint-tester';
import * as lint from '../src/index';

const report = lint.default.fixer;
const tester = new TextLintTester();

tester.run('AI Studio', report, {
  valid: ['AI Studio', 'Azure AI Studio'],
  invalid: [
    {
      text: 'Microsoft AI Studio',
      errors: [
        {
          message: 'Microsoft AI Studio => Azure AI Studio',
        },
      ],
    },
    {
      text: 'AIStudio',
      errors: [
        {
          message: 'AIStudio => AI Studio',
        },
      ],
    },
  ],
});

tester.run('Container Apps', report, {
  valid: ['Container Apps', 'Azure Container Apps'],
  invalid: [
    {
      text: 'Microsoft Container Apps',
      errors: [
        {
          message: 'Microsoft Container Apps => Azure Container Apps',
        },
      ],
    },
    {
      text: 'ContainerApps',
      errors: [
        {
          message: 'ContainerApps => Container Apps',
        },
      ],
    },
    {
      text: 'Container App',
      errors: [
        {
          message: 'Container App => Container Apps',
        },
      ],
    },
  ],
});

tester.run('DevOps', report, {
  valid: ['DevOps', 'Azure DevOps'],
});

tester.run('Microsoft Entra ID', report, {
  valid: ['Microsoft Entra ID'],
  invalid: [
    {
      text: 'Azure Active Directory',
      errors: [
        {
          message: 'Azure Active Directory => Microsoft Entra ID',
        },
      ],
    },
    {
      text: 'Azure AD',
      errors: [
        {
          message: 'Azure AD => Microsoft Entra ID',
        },
      ],
    },
  ],
});
