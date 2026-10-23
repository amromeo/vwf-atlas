import { test, expect } from "@playwright/test";

test("reader can browse the clinical atlas homepage and return from a patient record", async ({ page }) => {
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("./");
    await expect(page.getByRole("navigation", { name: "Design concept switcher" })).toHaveCount(0);
    await expect(page.getByRole("heading", { level: 1, name: "VWF Multimer Atlas", exact: true })).toBeVisible();
    await expect(page.getByRole("complementary", { name: "Scientific review status" }).getByText("Draft for scientific review", { exact: true })).toBeVisible();
    const records = page.getByRole("table", { name: "Published patient records — Loss of large multimers", exact: true });
    await expect(records.getByRole("row")).toHaveCount(6);
    await records.getByRole("link", { name: "Patient 10", exact: true }).click();
    await expect(page.getByRole("row", { name: /VWF:Ag 44.6 U\/dL 60–160/ })).toBeVisible();
    await page.getByRole("link", { name: "VWF Atlas home" }).click();
    await page.getByText("Complete source Figure 1", { exact: true }).click();
    await expect(page.getByRole("img", { name: /Published multimer gel/ })).toHaveJSProperty("naturalWidth", 745);
    await expect(page.getByRole("link", { name: "CC BY 4.0", exact: true })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});
