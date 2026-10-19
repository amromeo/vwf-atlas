import { test, expect } from "@playwright/test";

test("scientific editor can review the original figure with its patient-specific evidence", async ({
  page,
}) => {
  await page.goto("./examples/casonato-2017-patient-10/");
  await expect(
    page.getByRole("heading", { name: "Loss of large multimers", exact: true }),
  ).toBeVisible();
  await page.getByText("Complete source Figure 1", { exact: true }).click();
  await expect(
    page.getByText("Draft for scientific review", { exact: true }),
  ).toBeVisible();
  const figure = page.getByRole("img", { name: /Published multimer gel/ });
  await expect(figure).toBeVisible();
  await expect(figure).toHaveJSProperty("naturalWidth", 745);
  await expect(
    page.getByRole("row", { name: /VWF:Ag 44.6 U\/dL 60–160/ }),
  ).toBeVisible();
  await expect(
    page.getByRole("row", { name: /PFA 100 >300 seconds 94–193/ }),
  ).toBeVisible();
  await expect(page.getByText("p.R1308C", { exact: true })).toBeVisible();
  await expect(
    page.getByRole("link", { name: "CC BY 4.0", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText(/This third-party figure is excluded from/),
  ).toBeVisible();
});

test("each pictured patient has an individual lane view, source reference, and their own results", async ({
  page,
}) => {
  for (const [patient, antigen, variant] of [
    [17, "35.9", "p.V1316M"],
    [18, "142.9", "p.V1316M"],
    [10, "44.6", "p.R1308C"],
    [9, "81.2", "p.R1308C"],
    [19, "44.7", "p.R1306W"],
  ] as const) {
    await page.goto(`./examples/casonato-2017-patient-${patient}/`);
    await expect(
      page.getByRole("img", {
        name: `Patient ${patient} lane, cropped from original Figure 1`,
        exact: true,
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("img", {
        name: /NP reference lane.*cropped from original Figure 1/,
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("row", {
        name: new RegExp(`VWF:Ag ${antigen.replace(".", "\\.")} U/dL 60–160`),
      }),
    ).toBeVisible();
    await expect(page.getByText(variant, { exact: true })).toBeVisible();
    await expect(
      page
        .getByRole("navigation", { name: "Patients in source Figure 1" })
        .getByRole("link"),
    ).toHaveCount(5);
    await expect(
      page.getByRole("heading", {
        name: `Patient ${patient}`,
        exact: true,
        level: 2,
      }),
    ).toBeVisible();
  }
});
