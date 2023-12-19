import * as yaml from "yaml";
import { join } from "path";
import { writeFileSync } from "fs";
import { type Rules } from "./rules";

export type RuleStruct = {
  version: 1;
  rules: Rules;
};

const regularFilePath = join("dict", "auto-create-regular-rules.yml");

export function writeRegularRules(
  rules: Rules,
  writeFileSyncFunc: typeof writeFileSync = writeFileSync,
  ): string {
  const ruleStruct: RuleStruct = {
    version: 1,
    rules,
  };
  const doc = new yaml.Document(ruleStruct);
  const ymlString = doc.toString();
  writeFileSyncFunc(regularFilePath, ymlString);
  return regularFilePath;
}
