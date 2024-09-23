const { Builder, By, until } = require('selenium-webdriver');
require('chromedriver');  // Ensure chromedriver is installed

(async function test() {
    let driver = await new Builder().forBrowser('chrome').build(); // Change to 'firefox' if using Firefox
    try {
        // Navigate to the Registration page
        await driver.get('http://localhost:3000/register');

        // Locate and interact with the email input field
        let emailInput = await driver.findElement(By.css('input[type="email"]'));
        await emailInput.sendKeys('user@gmail.com');

        // Locate and interact with the password input field
        let passwordInput = await driver.findElement(By.css('input[type="password"]'));
        await passwordInput.sendKeys('123456');

        // Locate and interact with the confirm password input field
        let confirmPasswordInput = await driver.findElement(By.css('input[placeholder="Confirm Password"]'));
        await confirmPasswordInput.sendKeys('123456');

        // Locate and click the Register button
        let registerButton = await driver.findElement(By.css('button[type="submit"]'));
        await registerButton.click();

        // Wait for navigation to the /expense page
        await driver.wait(until.urlIs('http://localhost:3000/expense'), 10000);

        // Verify that the user has been redirected to the /expense page
        let currentUrl = await driver.getCurrentUrl();
        console.log(`Current URL after registration: ${currentUrl}`);
        if (currentUrl !== 'http://localhost:3000/expense') {
            throw new Error('Registration failed or redirection did not occur');
        }

    } catch (error) {
        console.error('Test failed:', error);
    } finally {
        //await driver.quit();
    }
})();
