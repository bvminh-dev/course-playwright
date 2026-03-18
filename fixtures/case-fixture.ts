import { test as base, expect, Page } from "@playwright/test";

const caseFixture = base.extend<{
    pageCase: Page;
}>({
    pageCase: async ({ page }, use) => {
        // before each
        // giải sử login....
        
        // use test case
        await use(page);

        // after eache
        // giả sử clear data
    },
});

export { caseFixture };