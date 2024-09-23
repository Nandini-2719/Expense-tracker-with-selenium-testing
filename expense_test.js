const { Builder, By, until } = require('selenium-webdriver');
require('chromedriver');  // Ensure chromedriver is installed

(async function test() {
    let driver = await new Builder().forBrowser('chrome').build(); // Change to 'firefox' if using Firefox
    try {
        // Step 1: Login
        await driver.get('http://localhost:3000/login');
        let emailInput = await driver.findElement(By.css('input[type="email"]')); // Use 'css' selector
        await emailInput.sendKeys('user@gmail.com');
        let passwordInput = await driver.findElement(By.css('input[type="password"]')); // Use 'css' selector
        await passwordInput.sendKeys('123456');
        let loginButton = await driver.findElement(By.css('button[type="submit"]')); // Use 'css' selector
        await loginButton.click();

        // Wait for navigation to the /expense page
        await driver.wait(until.urlIs('http://localhost:3000/expense'), 10000);

        // Step 2: Add an Expense
        // Wait for and locate the "Add Expense" button
        let addButton = await driver.wait(until.elementLocated(By.name('submit-expense')), 10000);
        await addButton.click();

        // Wait for the expense form to be visible
        await driver.wait(until.elementIsVisible(driver.findElement(By.name('expense-date'))), 10000);
        await driver.wait(until.elementIsVisible(driver.findElement(By.name('expense-location'))), 10000);
        await driver.wait(until.elementIsVisible(driver.findElement(By.name('expense-address'))), 10000);
        await driver.wait(until.elementIsVisible(driver.findElement(By.name('expense-items'))), 10000);
        await driver.wait(until.elementIsVisible(driver.findElement(By.name('expense-amount'))), 10000);

        // Fill in the expense details
        let dateInput = await driver.findElement(By.name('expense-date'));
        await dateInput.clear();
        await dateInput.sendKeys('2024-07-20');
        let locationInput = await driver.findElement(By.name('expense-location'));
        await locationInput.clear();
        await locationInput.sendKeys('Test Location');
        let addressInput = await driver.findElement(By.name('expense-address'));
        await addressInput.clear();
        await addressInput.sendKeys('123 Test Street');
        let itemsInput = await driver.findElement(By.name('expense-items'));
        await itemsInput.clear();
        await itemsInput.sendKeys('Test Items');
        let amountInput = await driver.findElement(By.name('expense-amount'));
        await amountInput.clear();
        await amountInput.sendKeys('100');
        let submitExpenseButton = await driver.findElement(By.name('submit-expense'));
        await submitExpenseButton.click();

        // Wait for the expense to be added
        await driver.sleep(3000);

        // Step 3: Edit the Expense
        // Wait for and locate the "Edit Expense" button
        let editButton = await driver.wait(until.elementLocated(By.name('edit-expense')), 10000);
        await editButton.click();

        // Wait for the expense form to be visible
        await driver.wait(until.elementIsVisible(driver.findElement(By.name('expense-date'))), 10000);
        await driver.wait(until.elementIsVisible(driver.findElement(By.name('expense-location'))), 10000);
        await driver.wait(until.elementIsVisible(driver.findElement(By.name('expense-address'))), 10000);
        await driver.wait(until.elementIsVisible(driver.findElement(By.name('expense-items'))), 10000);
        await driver.wait(until.elementIsVisible(driver.findElement(By.name('expense-amount'))), 10000);

        // Update the expense details
        let editDateInput = await driver.findElement(By.name('expense-date'));
        await editDateInput.clear();
        await editDateInput.sendKeys('2024-07-21');
        let editLocationInput = await driver.findElement(By.name('expense-location'));
        await editLocationInput.clear();
        await editLocationInput.sendKeys('Updated Location');
        let editAddressInput = await driver.findElement(By.name('expense-address'));
        await editAddressInput.clear();
        await editAddressInput.sendKeys('456 Updated Street');
        let editItemsInput = await driver.findElement(By.name('expense-items'));
        await editItemsInput.clear();
        await editItemsInput.sendKeys('Updated Items');
        let editAmountInput = await driver.findElement(By.name('expense-amount'));
        await editAmountInput.clear();
        await editAmountInput.sendKeys('150');
        let saveButton = await driver.findElement(By.name('submit-expense'));
        await saveButton.click();

        // Wait for the expense to be updated
        await driver.sleep(3000);

        // Step 4: Delete the Expense
        // Wait for and locate the "Delete Expense" button
        let deleteButton = await driver.wait(until.elementLocated(By.name('delete-expense')), 10000);
        await deleteButton.click();

        // Confirm deletion if necessary
        let confirmButton = await driver.findElement(By.name('confirm-delete'));
        await confirmButton.click();

        // Wait for the expense to be deleted
        await driver.sleep(3000);

    } catch (error) {
        console.error('Test failed:', error);
    } finally {
       // await driver.quit(); // Ensure browser closes
    }
})();
