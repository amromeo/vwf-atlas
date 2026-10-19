import { test, expect } from "@playwright/test";

test("scientific editor can review the original figure with its patient-specific evidence", async ({
  page,
}) => {
  await page.goto("./examples/casonato-2017-patient-10/");
  await expect(
    page.getByRole("heading", { name: "Loss of large multimers", exact: true }),
  ).toBeVisible();
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
