const { Builder, By, until } = require('selenium-webdriver');
require('chromedriver');  // If using Chrome

(async function test() {
    let driver = await new Builder().forBrowser('chrome').build(); // Change to 'firefox' if using Firefox
    try {
        // Navigate to the React application
        await driver.get('http://localhost:3000');

        // Check if the header is visible initially
        let header = await driver.findElement(By.css('header.App-header'));
        let isHeaderVisible = await header.isDisplayed();
        console.log(`Header visible: ${isHeaderVisible}`);
        if (!isHeaderVisible) throw new Error('Header should be visible initially');

        // Click the "Login" link and verify header disappears
        let loginLink = await driver.findElement(By.linkText('Login'));
        await loginLink.click();

        // Wait for the header to disappear
        await driver.wait(until.elementIsNotVisible(header), 5000);

        // Verify that the header is no longer visible
        isHeaderVisible = await header.isDisplayed();
        console.log(`Header visible after clicking Login: ${isHeaderVisible}`);
        if (isHeaderVisible) throw new Error('Header should not be visible after clicking Login');

        // Optionally, you can check if navigating to /login works
        await driver.get('http://localhost:3000/login');
        let loginTitle = await driver.getTitle();
        console.log(`Page title after navigating to /login: ${loginTitle}`);
        if (!loginTitle.includes('Login')) throw new Error('The page title should indicate the login page');

    } finally {
       // await driver.quit();
    }
})();
