/* eslint-disable import/first */
import { type Rules } from "../../../src/rule/rules";
import { type RuleStruct, writeRegularRules } from "../../../src/rule/writeRuleFile";

jest.mock('fs', () => ({
    writeFileSync: jest.fn(),
}));

import * as fs from 'fs';
import * as yaml from "yaml";

describe('writeRegularRules', () => {
    beforeEach(() => {
        jest.restoreAllMocks();
      });
      
      it('should write rules to file', () => {
        const rules: Rules = [
            {
            expected: 'Azure Functions',
            patterns: ['Microsoft Functions'],
            options: { wordBoundary: true }
        }];
    
        const ruleStruct: RuleStruct = {
          version: 1,
          rules,
        };

        const yamlString = yaml.stringify(ruleStruct);

        const filePath = writeRegularRules(rules);

        expect(fs.writeFileSync).toHaveBeenCalledWith(filePath, yamlString);
    });
});