import { test as testFixtures, expect } from './testFixtures';
import { caseFixture } from "./case-fixture";
import { mergeTests } from "@playwright/test";

export const test = mergeTests(caseFixture, testFixtures);
export { expect };