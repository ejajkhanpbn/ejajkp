const { test, expect } = require('@playwright/test');
const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs');

// Read and parse the Excel file BEFORE the tests run
function findExcelFile() {
  const candidateDirs = [
    process.cwd(),
    path.resolve(__dirname, '..'),
    __dirname,
    path.resolve(__dirname, 'filesDir'),
    path.resolve(__dirname, '..', 'test-data'),
    path.resolve(__dirname, '..', 'data')
  ];

  const candidateFiles = [
    'test-data.xlsx',
    'test-data.xls',
    'data.xlsx',
    'data.xls',
    'excel.xlsx',
    'excel.xls'
  ];

  const checked = [];
  const visited = new Set();

  const walkDir = (dir) => {
    if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) return;
    if (visited.has(dir)) return;
    visited.add(dir);

    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      checked.push(fullPath);

      if (entry.isDirectory()) {
        walkDir(fullPath);
      }
    }
  };

  for (const dir of candidateDirs) {
    walkDir(dir);

    for (const fileName of candidateFiles) {
      const filePath = path.join(dir, fileName);
      if (fs.existsSync(filePath)) return filePath;
      checked.push(filePath);
    }
  }

  const uniqueChecked = [...new Set(checked)];
  throw new Error(`Excel file not found. Checked: ${uniqueChecked.join(', ')}`);
}

const excelFilePath = findExcelFile();
const workbook = xlsx.readFile(excelFilePath);
const worksheet = workbook.Sheets[workbook.SheetNames[0]];
const testData = xlsx.utils.sheet_to_json(worksheet);

// Loop through the data array to create a test for each row
for (const record of testData) {
  test(`Login test for user: ${record.Username}, Password: ${record.Password}`, async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    // Use the data from the Excel row
    await page.getByPlaceholder('Username').fill(record.Username);
    await page.getByPlaceholder('Password').fill(record.Password);

    await page.getByRole('button', { name: 'Login' }).click();

    // Add your assertions here
    await expect(await page.title()).toBe('Swag Labs');
  });
}