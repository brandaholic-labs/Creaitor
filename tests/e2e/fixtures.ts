import { test as base } from '@playwright/test';

// Declare the types of your fixtures.
type MyFixtures = {
  // Define fixtures here
};

// Extend base test by providing "myFixture" and "myWorkerFixture".
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const test = base.extend<MyFixtures>({
  // Define fixtures here
});

export { expect } from '@playwright/test';
