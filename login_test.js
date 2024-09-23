const { Builder, By, until } = require('selenium-webdriver');
require('chromedriver');  // Ensure chromedriver is installed

(async function test() {
    let driver = await new Builder().forBrowser('chrome').build(); // Change to 'firefox' if using Firefox
    try {
        // Navigate to the React application
        await driver.get('http://localhost:3000/login');

        // Locate and interact with the email input field
        let emailInput = await driver.findElement(By.css('input[type="email"]'));
        await emailInput.sendKeys('nandini1@gmail.com');

        // Locate and interact with the password input field
        let passwordInput = await driver.findElement(By.css('input[type="password"]'));
        await passwordInput.sendKeys('123456');

        // Locate and click the login button
        let loginButton = await driver.findElement(By.css('button[type="submit"]'));
        await loginButton.click();

        // Wait for navigation to the /expense page
        await driver.wait(until.urlIs('http://localhost:3000/expense'), 5000);

        // Verify that the user has been redirected to the /expense page
        let currentUrl = await driver.getCurrentUrl();
        console.log(`Current URL after login: ${currentUrl}`);
        if (currentUrl !== 'http://localhost:3000/expense') {
            throw new Error('Login failed or redirection did not occur');
        }

    } catch (error) {
        console.error('Test failed:', error);
    } finally {
        //await driver.quit();
    }
})();
